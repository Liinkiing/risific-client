import { AUTH_REFRESH_TOKEN, AUTH_TOKEN } from "../vue-apollo";
import jwtDecode from "jwt-decode";

class AuthManager {
  isTokenValid() {
    try {
      const decoded = jwtDecode(this.getToken());
      const expirationDate = new Date(decoded.exp * 1000);
      return expirationDate < Date.now();
    } catch (e) {
      this.removeToken();
      this.removeRefreshToken();
      return false;
    }
  }

  hasToken() {
    return (
      localStorage.getItem(AUTH_TOKEN) !== "undefined" &&
      localStorage.getItem(AUTH_TOKEN) !== undefined &&
      localStorage.getItem(AUTH_TOKEN) !== null
    );
  }

  hasRefreshToken() {
    return (
      localStorage.getItem(AUTH_REFRESH_TOKEN) !== "undefined" &&
      localStorage.getItem(AUTH_REFRESH_TOKEN) !== undefined &&
      localStorage.getItem(AUTH_REFRESH_TOKEN) !== null
    );
  }

  removeToken() {
    localStorage.removeItem(AUTH_TOKEN);
  }

  removeRefreshToken() {
    localStorage.removeItem(AUTH_REFRESH_TOKEN);
  }

  setToken(token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }

  setRefreshToken(refreshToken) {
    localStorage.setItem(AUTH_REFRESH_TOKEN, refreshToken);
  }

  getToken() {
    return localStorage.getItem(AUTH_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(AUTH_REFRESH_TOKEN);
  }

  setTokens(token, refreshToken) {
    this.setToken(token);
    this.setRefreshToken(refreshToken);
  }

  async askNewToken() {
    if (this.isLoggedIn()) {
      let request = await fetch(process.env.VUE_APP_REFRESH_TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${this.getToken()}`
        },
        body: JSON.stringify({
          refresh_token: this.getRefreshToken()
        })
      });
      if (request.ok) {
        return await request.json();
      }

      return null;
    }

    return null;
  }

  isLoggedIn() {
    return this.hasToken() && this.isTokenValid() && this.hasRefreshToken();
  }
}

const instance = new AuthManager();
export default instance;
