var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    var config = require('./config.json');
    var envConfig = config[env];
    for(var key in envConfig){
        process.env[key] = envConfig[key];
    }
}