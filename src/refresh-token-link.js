import { onError } from "apollo-link-error";
// import { createHttpLink } from "apollo-link-http";

export const refreshTokenLink = onError(error => {
  console.log(error);
});
