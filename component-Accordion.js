class ComponentAccordion {
  constructor(node, data) {
    this.node = node
    this.data = data
  }

  get observedAttributes() {
    return
  }

  onMouseEnter = () => {
    this.middle.style.height = '200px'
  }

  onMouseLeave = () => {
    this.middle.style.height = '0'
  }

  expandObserve = () => {
    const expand = this.node.getAttribute('expand')
    if (expand !== null) {
      this.node.removeEventListener('mouseenter', this.onMouseEnter)
      this.node.removeEventListener('mouseleave', this.onMouseLeave)

      if (expand === 'true') this.onMouseEnter()
      if (expand === 'false') this.onMouseLeave()
    }
    if (expand === null) {
      this.node.addEventListener('mouseenter', this.onMouseEnter)
      this.node.addEventListener('mouseleave', this.onMouseLeave)
    }
  }

  connectedCallback = () => {
    this.top = this.node.querySelector('[accordion=top]')
    this.middle = this.node.querySelector('[accordion=middle]')
    this.bottom = this.node.querySelector('[accordion=bottom]')

    this.node.style.padding = '8px'
    this.node.style.border = '1px black solid'
    this.node.style.borderRadius = '8px'

    this.top.style.borderBottom = '1px black solid'

    this.middle.style.transition = '0.5s all'
    this.middle.style.overflow = 'hidden'
    this.middle.style.height = '0px'

    this.bottom.style.borderTop = '1px black solid'

    this.expandObserve()
  }

  disconnectedCallback = () => {

  }

  attributeChangedCallback = (attributeName) => {
    if (attributeName === 'expand') {
      this.expandObserve()
    }
  }

  dataChangedCallback(data) {

  }
}

ComponentAccordion.prototype.node = HTMLElement.prototype