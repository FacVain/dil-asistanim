function isLoggedIn(req, res, next) {
  if (req.user) {
    return next(); // User is logged in, continue to the next middleware/route handler
  } else {
    res.status(401).send("You are not logged in.");
  }
}

module.exports = {
  isLoggedIn,
};
