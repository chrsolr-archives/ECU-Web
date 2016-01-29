module.exports = {
    server: {
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'dev',
		db: process.env.DB_CONNECTION || 'mongodb://dev:testdummy@ds051665.mongolab.com:51665/ecu-db-dev'
    },
    apis_keys: {
        parse_app_key: process.env.parse_app_key || 'aWSciE1mXkreaNl9lC95hkW66oeZZRwdmIXCcD7Y',
        parse_client_key: process.env.parse_client_key || 'mEMpRwvnHUNKRf9wjyzvEmRSWu1uxb5BcxI0fsRL',
        recaptcha_verify_key: process.env.recaptcha_verify_key || 'recaptcha_verify_key'
    }
};
