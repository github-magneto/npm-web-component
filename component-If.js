class ComponentIf {
  constructor(node, data) {
    this.node = node
    this.data = data

    this.cache = this.node.cloneNode(true)
  }

  get observedAttributes() {
    return ['if']
  }

  ifObserve = () => {
    const if_ = this.node.getAttribute('if')

    this.node.innerHTML = ''

    if (if_ !== null) {
      const node_ = this.cache.cloneNode(true)

      const childNodes = node_.childNodes

      while (childNodes[0]) {
        this.node.appendChild(childNodes[0])
      }
    }
  }

  connectedCallback = () => {
    this.ifObserve()
  }

  disconnectedCallback = () => {

  }

  attributeChangedCallback = (attributeName) => {
    if (attributeName === 'if') {
      this.ifObserve()
    }
  }

  dataChangedCallback = (data) => {

  }
}