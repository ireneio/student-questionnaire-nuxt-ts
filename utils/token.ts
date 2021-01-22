class Token {
  constructor(key?: string) {
    if(key) {
      this.key = key
    }
  }

  private key: string = 'Y'

  public setToken(token: string): boolean {
    if(window) {
      window.localStorage.setItem(this.key, token)
      return true
    } else {
      return false
    }
  }

  public getToken(): boolean | string {
    if(window) {
      const res = window.localStorage.getItem(this.key)
      return res ? res : false
    } else {
      return false
    }
  }

  public deleteToken(): boolean {
    if(window) {
      window.localStorage.removeItem(this.key)
      return true
    } else {
      return false
    }
  }
}

export default new Token()
