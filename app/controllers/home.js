module.exports.index = function(application, req, res){

  // Initialize the DB Connection...
  var conn = application.config.dbConnection();

  // Get the 5 last posts
  var Posts = new application.app.models.Post(conn);
  Posts.getPosts({ from: 'home', limit: 5 }, function(error, result){

    if(error) 
      throw error;

    var dateFormat = require('dateformat');

    res.render('home/index', { 
      view: '../home\/recents', 
      params: { 
        authenticated: req.session.authorization ? true : false,
        posts: result,
        dateFormat: dateFormat
      } 
    });

  });

}

module.exports.post = function(application, req, res){

  // Getting the post's ID
  var id = req.params.id;

  // Initialize the DB Connection...
  var conn = application.config.dbConnection();

  // Instantiating the model Post
  var Post = new application.app.models.Post(conn);
  Post.getPost(id, function(error, result){

    if(error) 
      throw error;

    var dateFormat = require('dateformat');

    res.render('home/index', { 
      view: '../home\/post', 
      params: { 
        authenticated: req.session.authorization ? true : false,
        post: result,
        dateFormat: dateFormat
      } 
    });

  })

}

module.exports.posts = function(application, req, res){

  // Initialize the DB Connection...
  var conn = application.config.dbConnection();
    
  // Instantiating the model Post
  var Post = new application.app.models.Post(conn);
  Post.getPosts(null, function(error, result){

    if(error) 
      throw error;

    var dateFormat = require('dateformat');

    res.render('home/index', { 
      view: '../home\/posts', 
      params: { 
        authenticated: req.session.authorization ? true : false,
        data: result,
        dateFormat: dateFormat
      } 
    });

  });

}