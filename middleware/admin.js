module.exports = function(req, res, next) {
  if (req.user.isAdmin !== true)
    return res.status(403).send("Unauthorized! Admin only!");
  else {
    next();
  }
};

// Checks an isAdmin variable in the database which defaults to false for customers
// returns a 403(forbidden) response if the value is still false
