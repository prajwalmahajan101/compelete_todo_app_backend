const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '..', 'static', 'user_profile'));
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const uploadProfile = multer({storage});

module.exports = uploadProfile.single('profilePic');
