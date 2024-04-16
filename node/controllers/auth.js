const client = require("../middleware/client");

// login - gets authorisation
exports.login = (req, res) => {
  return res.redirect(client.getAuthorizationUri());
};
// sends link to client
exports.link = (req, res) => {
  const link = client.getAuthorizationUri();
  return res.send({ link: link });
};

// redirect to logged in user with cookie
exports.authorisation = async (req, res) => {
  const errors = {};
  const token = await client.getToken(req.originalUrl);
  if (!token) {
    errors["error"] = "unable to login";
    return res.status(400).send(errors);
  }

  res.cookie("token", token.access_token);
  return res.redirect(process.env.ORIGIN);
};
// exports logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  return res.send({ msg: "logged out succesfully" });
};

