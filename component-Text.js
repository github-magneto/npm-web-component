class ComponentText {
  constructor(node, data) {
    this.node = node
    this.data = data

    this.node.innerHTML = this.node.getAttribute('text')
  }

  get observedAttributes() {
    return ['text']
  }

  connectedCallback() {

  }

  disconnectedCallback() {

  }

  attributeChangedCallback(attributeName) {
    if (attributeName === 'text') {
      this.node.innerHTML = this.node.getAttribute('text')
    }
  }

  dataChangedCallback(data) {

  }
}

ComponentText.prototype.node = HTMLElement.prototype

customElements_.define('component-text', ComponentText)