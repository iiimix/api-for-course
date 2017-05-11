module.exports = (app) => {
	app.get('/', (req, res) => {
		res.json({
			message: 'hello index!'
		});
	});


	app.use('/api', require('./users')); // 在路由前加/api
	app.use('/api', require('./grade'));
	app.use('/api', require('./file'));




};