var uuid = require("uuid");
var bands = [];

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};


/*
 * Shows page to choose Band Name.
 */

exports.chooseName = function(req, res){
  res.render('create', { title: 'Express' });
};

exports.create = function(req, res) {
	var name = req.body.bandName;
	var id = uuid.v4();

	//Instantiate a new "band" object
	var newBand = {"id": id, "name": name, "members": []}

	//Add it to the array of bands
	bands.push(newBand);

	//Take user to join band page to select name and instrument 
	res.send(newBand.id);
}


/*
 * Shows a list of existing bands.
 */

exports.list = function(req, res){
  var data = [];
  res.render('list', {data:data});
};


/*
 * Input user info right before joining a band
 */

exports.join = function(req, res){
  res.render('join');
};


/*
 * Shows the band!
 */

exports.band = function(req, res){
	console.log('bands', bands)

	//Get band that matches the ID in URL
	var band = bands.filter(function(band) {
		return band.id = req.params.id;
	})[0]; 
	if (band) {
		console.log("band", band)
	  res.render('band', { name: band.name });
	}
	else res.send(500, "No band found")
};