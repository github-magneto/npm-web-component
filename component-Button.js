class ComponentButton {
  constructor(node, data) {
    this.node = node
    this.data = data
  }

  get observedAttributes() {
    return ['type', 'hover']
  }

  styleObserve = () => {
    const type = this.node.getAttribute('type')
    const hover = this.node.getAttribute('hover')

    if (type === 'outlined' && hover !== null) {
      this.node.style.background = 'rgba(0, 0, 0, 0.2)'
      this.node.style.boxShadow = 'rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px'
    }

    if (type === 'outlined' && hover === null) {
      this.node.style.background = 'rgba(0, 0, 0, 0)'
      this.node.style.boxShadow = 'rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px'
    }

    if (type === 'container' && hover === null) {
      this.node.style.background = 'rgb(70, 70, 70)'
      this.node.style.boxShadow = 'rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px'
      this.node.style.color = 'rgba(255, 255, 255, 1)'
      this.node.style.fill = 'rgba(255, 255, 255, 1)'
    }

    if (type === 'container' && hover !== null) {
      this.node.style.background = 'rgb(70, 70, 70)'
      this.node.style.boxShadow = 'rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px'
      this.node.style.color = 'rgba(255, 255, 255, 1)'
      this.node.style.fill = 'rgba(255, 255, 255, 1)'
    }
  }

  connectedCallback = () => {
    this.node.style.display = 'inline-flex'
    this.node.style.width = 'fit-content'
    this.node.style.height = 'fit-content'
    this.node.style.justifyContent = 'center'
    this.node.style.alignItems = 'center'
    this.node.style.position = 'relative'
    this.node.style.padding = '6px 12px'
    this.node.style.borderRadius = '4px'
    this.node.style.cursor = 'pointer'
    this.node.style.userSelect = 'none'

    this.styleObserve()

    this.node.addEventListener('mouseenter', () => this.node.setAttribute('hover', ''))
    this.node.addEventListener('mouseleave', () => this.node.removeAttribute('hover'))

    requestAnimationFrame(() => {
      this.node.style.transition = '0.5s all'
    })
  }

  disconnectedCallback = () => {

  }

  attributeChangedCallback = (attributeName) => {
    if (attributeName === 'hover' || attributeName === 'type') {
      this.styleObserve()
    }
  }

  dataChangedCallback = (data) => {

  }
}

ComponentButton.prototype.node = HTMLElement.prototype