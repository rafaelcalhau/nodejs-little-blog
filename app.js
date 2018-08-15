var app = require('./config/server');

// Server listener
app
  .listen(3000, function(){
    // This is a callback...
    console.log("Server is Online");
  });