const mongoose = require('mongoose');

const RaceSchema = new mongoose.Schema({
	POBLACION: {
		type: String
	},
	PAIS: {
		type: String
	},
	LOCALIZACION: {
		type: String
	},
	ANCESTRIA: {
		type: String
	}
});

module.exports = mongoose.model('Race',RaceSchema);