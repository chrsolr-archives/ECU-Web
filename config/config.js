module.exports = {
	server: {
    		port: process.env.PORT || 3000,
    		env: process.env.NODE_ENV || 'dev'
	},
	apis_keys: {
		parse_app_key: process.env.parse_app_key || 'aWSciE1mXkreaNl9lC95hkW66oeZZRwdmIXCcD7Y',
		parse_client_key: process.env.parse_client_key || 'mEMpRwvnHUNKRf9wjyzvEmRSWu1uxb5BcxI0fsRL'
	}
};
