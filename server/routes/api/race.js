const Race = require('../../models/Race');

module.exports = (app) => {
	app.get('/api/account/continent',(req,res,next) => {
	Race.aggregate([
						{ $group : { _id: {
										loc: "$LOCALIZACION", 
									    pr: "$ANCESTRIA"
										  } 
									}
						}
					])
					.exec((err, continent) => {
					    if (err) throw err;
					    return res.send({continent: continent})	
					 })   
						//.map(item => {return item._id.loc})								
	})

	app.get('/api/account/detail',(req,res,next) => {
	const { query } = req;
    const { det } = query;
	console.log('DETALLE',req.body)	
	Race.find({LOCALIZACION: det})
			.exec((err, detail) => {
			    if (err) throw err;
			    return res.send({detail: detail})	
			 }) 	
	})
		
}