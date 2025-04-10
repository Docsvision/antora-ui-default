export class SearchMode {
  #switchElement
  #isAiSearchMode = false
  #modeListeners = new Set()

  constructor (switchElement) {
    this.#switchElement = switchElement
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
