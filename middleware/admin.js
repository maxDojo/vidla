module.exports = function(req, res, next) {
  if (req.user.isAdmin !== true)
    return res.status(403).send("Unauthorized! Admin only!");
  else {
    next();
  }
};
