export default () => {
  const config = useRuntimeConfig().public;
  return {
    client_id: config.client_id,
    client_secret: config.client_secret,
    redirect_uri: config.redirect_uri,
    scope: ['publish_video', 'pages_show_list', 'pages_read_engagement', 'pages_read_user_content', 'pages_manage_posts', 'pages_manage_engagement'],
  };
};
