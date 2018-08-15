module.exports = function(application){

  application
    .get('/', function(req, res){
      application.app.controllers.home.index(application, req, res);
    })
    .get('/post/:id', function(req, res){
      application.app.controllers.home.post(application, req, res);      
    })
    .get('/posts', function(req, res){
      application.app.controllers.home.posts(application, req, res);      
    });

};