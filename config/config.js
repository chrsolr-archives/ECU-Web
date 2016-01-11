module.exports = {
	server: {
    	port: process.env.PORT || 3000
	},
	apis_keys: {
		youtube: '',
		//parse_app_key: 'Mw0dWtJQYVzYlA4vHybSNmuyLJSjzpEpTarhZMEQ',
		parse_app_key: process.env.parse_app_key,
		//parse_client_key: 'gXEJhvTtHQcSNrryJ7u9IK4euVWOu00QEGnaK7ow',
		parse_client_key: process.env.parse_client_key,
		soundcloud_client_id: ''
	}
};