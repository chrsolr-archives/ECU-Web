module.exports = function (app, express) {

    var api = express.Router();

    app.use('/api', api);
};