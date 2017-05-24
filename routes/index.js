module.exports = (app) => {
	app.get('/', (req, res) => {
		res.json({
			message: 'Welcome'
		});
	});


	app.use('/api', require('./user')); // 在路由前加/api
	app.use('/api', require('./grade'));
	app.use('/api', require('./file'));
	app.use('/api', require('./comment'));


};