module.exports.add = function(req, res){

  res.render('home/index', { 
    view: '../admin\/add', 
    params: {
      authenticated: req.session.authorization ? true : false,
    } 
  });

}

module.exports.delete = function(application, req, res){
  var connection = application.config.dbConnection();
  var Post = new application.app.models.Post(connection);
  var data = req.body;

  Post.deletePost(data.id, function(error, result){
    if(error) 
      throw error;

    res.json({ success: true });
  });
}

module.exports.edit = function(application, req, res){
  
  var id = req.params.id;
  var connection = application.config.dbConnection();
  var Post = new application.app.models.Post(connection);
  Post.getPost(id, function(error, result){

    if(error) 
      throw error;

    var dateFormat = require('dateformat');

    res.render('home/index', { 
      view: '../admin\/edit', 
      params: {
        authenticated: req.session.authorization ? true : false,
        post: result,
        dateFormat: dateFormat
      } 
    });

  });

}

module.exports.login = function(req, res){

  let url = req.originalUrl;

  if(url !== ""){
    url = req.originalUrl.split("?");

    if(url.length === 2)
      url = url[1].replace('url=', '');
  }

  if(typeof url === "object" && url[0] === "/admin/login")
    url = "";

  res.render('home/index', { 
    view: '../admin\/login', 
    params: { 
      authenticated: req.session.authorization ? true : false, 
      url 
    }
  });

}

module.exports.loginAuth = function(application, req, res){

  // Initialize the DB Connection...
  var connection = application.config.dbConnection();
    
  // Instantiating the model User
  var User = new application.app.models.User(connection);
  User.authenticate(req, res, function(err, data){

    if(err) 
      throw err;

    if(data.length === 1){

      const bcrypt = require('bcrypt');

      bcrypt.compare(req.body.password, data[0].password, (err, result) => {
        if(err) 
          throw err;

        if(result){
          
          const jwt = require('jsonwebtoken');
          const token = jwt.sign({ id: result.id }, process.env.SECRET, { expiresIn: 86400 });

          res.setHeader('authorization', token);
          req.session.authorization = token;

          // Let's redirect
          if(req.body._url !== ""){
            res.redirect(req.body._url);
          }
          else {
            res.redirect('/admin/add');
          }

        }
        else {
          res.render('home/index', { 
            view: '../admin\/login', 
            params: {
              authenticated: req.session.authorization ? true : false,
              url: req.body._url, 
              errors: ['Password is wrong.']
            }
          });
        }
      });
      
    }
    else
      res.render('home/index', { 
        view: '../admin\/login', 
        params: { 
          authenticated: req.session.authorization ? true : false,
          url: req.body._url, 
          errors: ['Username or password invalid.']
        }
      });

  });

}

module.exports.logout = function(req, res){
  const token = req.session.authorization;

  if(token)
    req.session.authorization = null;

  res.redirect('/admin/login');
}

module.exports.manage = function(application, req, res){

  // Initialize the DB Connection...
  var conn = application.config.dbConnection();

  // Preparing the settings
  var settings = {
    limit: req.query.rows ? req.query.rows : 25,
    page: req.query.page ? req.query.page : 1
  };
    
  // Instantiating the model Post
  var Post = new application.app.models.Post(conn);
  Post.getPosts(settings, function(error, result){

    if(error) 
      throw error;

    var dateFormat = require('dateformat');

    res.render('home/index', { 
      view: '../admin\/posts', 
      params: { 
        authenticated: req.session.authorization ? true : false,
        data: result,
        dateFormat: dateFormat
      } 
    });

  });

}

module.exports.save = function(application, req, res){
  var connection = application.config.dbConnection();
  var Post = new application.app.models.Post(connection);
  var data = req.body;
  var errors;

  // Validating
  req.assert('title', 'Title is required.').notEmpty();
  req.assert('title', 'Title must has at least 5 and max of 255 characters.').len(5, 255);
  req.assert('author', 'Author is required').notEmpty();
  req.assert('post_date', 'The publication date is required.').notEmpty();
  req.assert('contents', 'Content is required').notEmpty();

  errors = req.validationErrors();

  if(errors){
    res.render('home/index', { 
      view: '../admin\/add', 
      params: { 
        authenticated: req.session.authorization ? true : false,
        data: data, 
        errors: errors 
      } 
    });

    return;
  }

  Post.savePost(data, function(error, result){
    if(error) 
      throw error;

    res.redirect("/admin/manage");
  });
}

module.exports.update = function(application, req, res){
  var id = req.params.id;
  var connection = application.config.dbConnection();
  var Post = new application.app.models.Post(connection);
  var data = req.body;

  Post.updatePost(id, data, function(error, result){
    if(error) 
      throw error;

    res.redirect("/admin/manage");
  });
}