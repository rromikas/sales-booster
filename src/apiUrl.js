const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://serene-reaches-49323.herokuapp.com"
    : "http://localhost:1337";

export default apiUrl;
