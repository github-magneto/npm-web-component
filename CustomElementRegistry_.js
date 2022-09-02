class CustomElementRegistry_ {
  constructor(root = document, data = {}) {
    this.root = root
    this.data = data
    this.definedComponent = []
    this.renderedComponent = []
  }

  observe() {
    const callback = (mutationsList) => {

      mutationsList.forEach(mutation => {

        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach(node => {
            if (this.renderedComponent.some(component => component.node === node)) return

            this.definedComponent.forEach(component => {
              if (node.getAttribute && node.getAttribute('is') === component.is) this.render(node, component)
            })
          })
        }

        if (mutation.removedNodes.length) {
          mutation.removedNodes.forEach(node => {
            this.renderedComponent.forEach(component => {
              if (component.node === node) {
                if (component.disconnectedCallback) component.disconnectedCallback()
                this.renderedComponent = this.renderedComponent.filter(component_ => component_ !== component)
              }
            })
          })
        }

        if (mutation.attributeName) {
          this.renderedComponent.forEach(component => {
            if (component.node === mutation.target) {
              if (!component.observedAttributes || component.observedAttributes.includes(mutation.attributeName)) {
                if (component.attributeChangedCallback) component.attributeChangedCallback(mutation.attributeName)
              }
            }
          })
        }

      })

    }

    const observer = new MutationObserver(callback)

    observer.observe(this.root, { attributes: true, childList: true, subtree: true })
  }

  proxy() {
    const callback = () => {
      this.renderedComponent.forEach(component => {
        component.dataChangedCallback(this.data)
      })
    }

    const deepProxy = (target) => {
      if (target && typeof target === 'object') {
        return new Proxy(target, {
          get: (target, key) => {
            return target[key]
          },
          set: (target, key, value) => {
            target[key] = deepProxy(value)
            callback()
            return true
          },
          deleteProperty: (target, key) => {
            delete target[key]
            callback()
            return true
          }
        })
      }

      if (!target || typeof target !== 'object') return target
    }

    this.data = deepProxy(this.data)
  }

  define(is, component, options) {
    this.definedComponent.push({ is, component, options })

    document.querySelectorAll(`[is=${is}]`).forEach(node => {
      this.render(node, { is, component, options })
    })
  }

  render(node, component) {
    const componentInstance = new component.component(node, this.data)

    node.setAttribute('constructored', '')

    this.renderedComponent.push(componentInstance)

    if (componentInstance.connectedCallback) componentInstance.connectedCallback()
  }
}