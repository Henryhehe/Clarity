const jwtoken = require('jsonwebtoken');

function verifyJWT(req, res, next) {
  if (!req.headers || !req.headers('Authorization')) {
    res.status(404).json({
      message: 'Unauthorized',
      reason: 'Authorization header not found or an invalid token is present, please reauthenticate',
    });
    // TODO: Maybe look into redirecting them
  }
  const token = req.headers('Authorization').split('Bearer')[1];
  jwtoken.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      res.status(404).json({
        message: 'Unauthorized',
        reason: 'Authorization header not found or an invalid token is present, please reauthenticate',
      });
      return;
    }
    // Save the user in the request object
    req.user = decodedToken;
    next();
  });
}


module.exports.verifyJWT = verifyJWT;
