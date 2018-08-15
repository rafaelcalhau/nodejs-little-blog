var Post = function(connection){

  this._connection = connection;
  this._table = "posts";

}

Post.prototype.deletePost = function(id, callback){
  this._connection.query("DELETE FROM "+ this._table +" WHERE id = '"+ id +"'", callback);
}

Post.prototype.getPost = function(id, callback){
  this._connection.query("SELECT * FROM "+ this._table +" WHERE id = '"+ id +"'", callback);
}

Post.prototype.getPosts = function(settings, callback){

  var orderBy = " ORDER BY created_at DESC";
  var query = "SELECT * FROM "+ this._table;
  var page = 1;
  var numRows = 25;

  if(settings !== null){
    if(settings.limit !== undefined)
      numRows = parseInt(settings.limit);

    if(settings.page !== undefined)
      page = parseInt(settings.page);

    if(settings.rows !== undefined)
      numRows = parseInt(settings.rows);

    if(settings.from !== undefined)
      switch(settings.from){
        case 'home':
          query = "SELECT id, title, description, author, post_date FROM "+ this._table;
        break;
        default:
      }
  }
 
  query += orderBy;
  query += " LIMIT " + (page === 1 ? "0," : ((page - 1) * numRows) + ",") + numRows;

  this._connection.query(query, callback);
}

Post.prototype.savePost = function(data, callback){
  var date = data.post_date.split("/");
  data.post_date = date[2]+"-"+date[0]+"-"+date[1];

  this._connection.query("INSERT INTO posts SET ?", data, callback);
}

Post.prototype.updatePost = function(id, data, callback){
  var date = data.post_date.split("/");
  data.post_date = date[2]+"-"+date[0]+"-"+date[1];

  this._connection.query("UPDATE posts SET ? WHERE id = '"+ id +"'", data, callback);
}

module.exports = function(){
  return Post;
}