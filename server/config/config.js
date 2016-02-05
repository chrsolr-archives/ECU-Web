/**
 * Config file
 */
var config = (function(){
    'use strict';
    
    /**
     * env variables
     */
    var server = {
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'dev',
		db: process.env.DB_CONNECTION || 'mongodb://dev:testdummy@ds051665.mongolab.com:51665/ecu-db-dev'
    };
    
    /**
     * apis keys
     */
    var apis_keys = {
        SC_CLIENT_ID: process.env.SC_CLIENT_ID || '500f3c5cdcf76cb1bcc8c35e97864840',
        YOUTUBE_ID: process.env.YOUTUBE_ID || 'AIzaSyDMVu01ka49DBvOGabKYo1vhrykghKJNoI',
        recaptcha_verify_key: process.env.recaptcha_verify_key || 'recaptcha_verify_key'
    }
    
    return {
        server: server,
        apis_keys: apis_keys
    }
    
})();

module.exports = config;