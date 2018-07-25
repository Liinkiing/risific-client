import { onError } from "apollo-link-error";
import Observable from 'zen-observable';
import AuthManager from "./managers/AuthManager";

export const refreshTokenMiddleware = onError(
  ({ forward, operation, networkError }) => {
    return new Observable(observer => {
      let sub = null;
      if (networkError && networkError.statusCode === 401) {
        if (AuthManager.isLoggedIn()) {
          const oldHeaders = operation.getContext().headers;
          AuthManager.askNewToken().then(({token, refresh_token}) => {
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: `Bearer ${token}`
              }
            });

            AuthManager.setTokens(token, refresh_token);
            sub = forward(operation).subscribe(observer);
          });
        } else {
          sub = forward(operation).subscribe(observer);
        }
      }
      return () => (sub ? sub.unsubscribe() : null);
    });
  }
);
