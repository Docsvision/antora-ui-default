export class SearchMode {
  #switchElement
  #labelElement
  #isAiSearchMode = false
  #modeListeners = new Set()

  constructor (switchElement) {
    this.#switchElement = switchElement
    this.#labelElement = switchElement.labels?.[0]
    this.#switchElement.checked = this.#isAiSearchMode
    this.#switchElement.addEventListener('change', (event) => {
      this.toggleMode(event.target.checked)
    })
  }

  get isAiSearchMode () {
    return this.#isAiSearchMode
  }

  get switchElement () {
    return this.#switchElement
  }

  get labelElement () {
    return this.#labelElement
  }

  showElement () {
    if (this.#labelElement) {
      this.#labelElement.classList.add('available')
    }
    this.#switchElement.disabled = false
  }

  hideElement () {
    if (this.#labelElement) {
      this.#labelElement.classList.remove('available')
    }
    this.#switchElement.disabled = true
  }

  toggleMode (value) {
    this.#isAiSearchMode = value
    this.#switchElement.checked = value
    this.#notify()
  }

  subscribe (listener) {
    this.#modeListeners.add(listener)

    return () => this.#modeListeners.delete(listener)
  }

  #notify () {
    for (const listener of this.#modeListeners) {
      listener(this.#isAiSearchMode)
    }
  }
}
