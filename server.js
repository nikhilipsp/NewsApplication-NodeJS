require('dotenv').config()
var app = require('./app');
const config = require('config');
const { service: { port, name } } = config;
// const logger = require('@dilligentech/logger');
// const utils = require('@dilligentech/utils');

app.listen(port, async () => {
	try {
		var start_message = "**** ApplicationServer " + name.toUpperCase() + " started running on port " + port + "****"
		console.log(start_message)
		//logger.info(start_message)
	} catch (error) {
		console.log("ApplicationServer Error ", error);
	//	logger.error("ApplicationServer Error ", error)
		process.exit(-1);
	}
});