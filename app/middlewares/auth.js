const jwt = require('jsonwebtoken');

module.exports.isAuthenticated = (req, res, next) => {
  const token = req.session.authorization;

  if(!token || token.split(".").length !== 3){
    return res.redirect('/admin/login?url='+ req.originalUrl);
  }


  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if(err)
      return res.status(401).send({ error: 'Unauthorized access: Invalid or expired token.' });
    
    req.userId = decoded.id;
    next();
  });
}