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
      body: JSON.stringify({ token }),
    })

    if (!response.ok) {
      throw new Error(`Ошибка при авторизации: ${response.statusText}`)
    }
  }

  async getLimits () {
    const response = await fetch(`${this.#apiPath}/limits`)

    if (!response.ok) {
      throw new Error(`Ошибка при запросе лимита: ${response.statusText}`)
    }

    const data = await response.json()

    return data
  }

  async search (content) {
    const searchRequestBody = {
      message: {
        content,
      },
      site: ['https://help.docsvision.com/' + window.location.pathname.split('/')[1]],
    }
    const response = await fetch(this.#apiPath, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchRequestBody),
    })

    if (!response.ok) {
      throw new Error(`Ошибка при запросе: ${response.statusText}`)
    }

    const data = await response.json()

    this.#requestCount -= 1

    if (!this.#requestCount) {
      document.dispatchEvent(new Event('ai-search limit is reached'))
    }

    return data
  }
}
