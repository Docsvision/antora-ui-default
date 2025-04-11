const TOKEN_KEY = 'token'

export class AiSearch {
  #requestCount = 0
  #apiPath

  constructor (apiPath) {
    this.#apiPath = apiPath
    this.#init()
  }

  get isAvailable () {
    return this.#requestCount > 0
  }

  async #init () {
    try {
      await this.login()

      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.delete(TOKEN_KEY)
      window.history.replaceState({}, '', currentUrl.toString())

      const response = await this.getLimits()
      this.#requestCount = response.left
      document.dispatchEvent(new Event('ai-search initialised'))
    } catch (error) {
      console.error(error)
    }
  }

  async login () {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    if (!token) {
      return
    }

    const response = await fetch(`${this.#apiPath}/account/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(token),
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Ошибка при авторизации: ${data.message || response.statusText}`)
    }
  }

  async getLimits () {
    const response = await fetch(`${this.#apiPath}/limits`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Ошибка при запросе лимита: ${data.message || response.statusText}`)
    }

    return data
  }

  async search (message) {
    const searchRequestBody = {
      content: {
        message,
        site: [window.location.origin + window.location.pathname],
      },
    }
    const response = await fetch(this.#apiPath, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchRequestBody),
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Ошибка при запросе: ${data.message || response.statusText}`)
    }

    this.#requestCount -= 1

    if (!this.#requestCount) {
      document.dispatchEvent(new Event('ai-search limit is reached'))
    }

    return data
  }
}
