export default (pageContext) => {
  const { url } = pageContext;

  const num_slashes = (url.match(/\//g) || []).length;
  if (num_slashes < 3) {
    return false;
  }
  return {
    routeParams: { cat: "catt", dog: "dogg", not_used: "not_used, but need 3!" },
  };
};
