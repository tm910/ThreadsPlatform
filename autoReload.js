const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const path = require('path');
// Start livereload server
const liveReloadServer = livereload.createServer();// استخدم منفذ مختلف
 
liveReloadServer.watch(path.join(__dirname, "public"));

// Export middleware function
function setupLiveReload(app) {
  app.use(connectLivereload());
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);  
  }); 
}        

module.exports = setupLiveReload;           
   