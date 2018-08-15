const auth = require('../../app/middlewares/auth');
module.exports = function(application){

  application
    .get('/admin/add', auth.isAuthenticated, function(req, res){
      application.app.controllers.admin.add(req, res);
    })
    .get('/admin/edit-post/:id', auth.isAuthenticated, function(req, res){      
      application.app.controllers.admin.edit(application, req, res);
    })
    .get('/admin/login', function(req, res){
      application.app.controllers.admin.login(req, res);
    })
    .get('/admin/logout', function(req, res){
      application.app.controllers.admin.logout(req, res);
    })
    .post('/admin/login', function(req, res){
      application.app.controllers.admin.loginAuth(application, req, res);
    })
    .get('/admin/manage', auth.isAuthenticated, function(req, res){
      application.app.controllers.admin.manage(application, req, res);
    })
    .delete('/admin/remove-post', auth.isAuthenticated, function(req, res){
      application.app.controllers.admin.delete(application, req, res);
    })
    .post('/admin/save-post', auth.isAuthenticated, function(req, res){
      application.app.controllers.admin.save(application, req, res);
    })
    .post('/admin/update-post/:id', auth.isAuthenticated, function(req, res){
      application.app.controllers.admin.update(application, req, res);
    })
    .get('/admin', auth.isAuthenticated, function(res){
      res.redirect('/admin/manage');
    });

}