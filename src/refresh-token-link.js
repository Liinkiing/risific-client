import { onError } from "apollo-link-error";
// import { createHttpLink } from "apollo-link-http";

export const refreshTokenMiddleware = onError(error => {
  console.log(error);
});
