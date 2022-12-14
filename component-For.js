class ComponentFor {
  constructor(node, data) {
    this.node = node
    this.data = data

    this.cache = this.node.cloneNode(true)
  }

  get observedAttributes() {
    return ['for']
  }

  forObserve = () => {
    const for_ = JSON.parse(this.node.getAttribute('for'))
    const name = this.node.getAttribute('for-name') ? this.node.getAttribute('for-name') : 'props'

    this.node.innerHTML = ''

    for_.forEach(i => {
      const node_ = this.cache.cloneNode(true)

      const childNodes = node_.childNodes

      while (childNodes[0]) {
        if (childNodes[0].setAttribute) childNodes[0].setAttribute(name, JSON.stringify(i))
        this.node.appendChild(childNodes[0])
      }
    })
  }

  connectedCallback = () => {
    this.forObserve()
  }

  disconnectedCallback = () => {

  }

  attributeChangedCallback = (attributeName) => {
    if (attributeName === 'for') {
      this.forObserve()
    }
  }

  dataChangedCallback = (data) => {

  }
}