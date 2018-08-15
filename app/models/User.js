var User = function(connection){

  this._id = null;
  this._connection = connection;
  this._table = "users";

}

User.prototype.authenticate = function(req, res, callback) {

  const { username } = req.body;
  this._connection.query(
    "SELECT id, name, password FROM "+ this._table +" WHERE username = '"+ username +"'",
    callback
  );

}

module.exports = function(){
  return User;
}