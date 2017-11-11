module.exports = function(environment) {
    var envs = {
      local: require('./local.js'),
      production: require('./production.js')
    };
  
    return envs.hasOwnProperty(environment) ? envs[environment] : envs['local'];
  };