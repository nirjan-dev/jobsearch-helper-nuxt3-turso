import { defineEventHandler } from "h3";

export default defineEventHandler(function getCurrentUser(event) {
  return event.context.user;
});
