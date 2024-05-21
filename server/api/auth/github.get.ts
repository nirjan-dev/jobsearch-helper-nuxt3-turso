export default oauth.githubEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, { user });
    return sendRedirect(event, "/");
  },

  onError(_event, error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  },
});
