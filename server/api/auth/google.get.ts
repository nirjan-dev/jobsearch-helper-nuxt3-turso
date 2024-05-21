export default oauth.googleEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, { user });
    return sendRedirect(event, "/");
  },
});
