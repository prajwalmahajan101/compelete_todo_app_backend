module.exports.apiHealth = (req, res) => {
	return res.status(200).json({
		msg: 'API is Working Fine',
	});
};
