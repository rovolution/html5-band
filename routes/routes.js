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
	var newBand = {"id": id, "name": name, "members": []};

	//Add it to the array of bands
	bands.push(newBand);

	//Take user to join band page to select name and instrument 
	res.send(newBand.id);
};


/*
 * Shows a list of existing bands.
 */

exports.list = function(req, res){
  res.render('list', {data:bands});
};


/*
 * Input user info right before joining a band
 */

exports.join = function(req, res){
  res.render('join', { band_id: req.param("id") });
};


/*
 * Shows the band!
 */

exports.band = function(req, res){
	//Get band that matches the ID in URL
	var band = bands.filter(function(band) {
		return band.id == req.params.id;
	})[0];

	var currentUser = band.members.filter(function(member) {
        return member.id == req.session.userId;
    })[0];

	if (band) {
	  res.render('band', { 
	  	name: band.name,
	  	currentUser: currentUser
	  });
	}
	else res.send(500, "No band found")
};

exports.members = function(req, res){
    //Get band that matches the ID in URL
    var band = bands.filter(function(band) {
        return band.id === req.params.id;
    })[0];

    var otherMembers = band.members.filter(function(member) {
        return member.id !== req.param("user_id");
    });

    if (band) {
        res.render("members", { members: otherMembers });
    }
    else res.send(500, "No band found")

};
/*
 * Adds member to band and redirects to band room
 */

exports.joinBand = function(req, res) {
	var band = bands.filter(function(band) {
		return band.id == req.body.band;
	})[0]; 

	var user = {};
	user.id = uuid.v4();
	user.userName = req.body.username;
	user.instrument = req.body.instrument;
	user.instrumentImg = user.instrument + '.jpg';

	band.members.push(user);
	req.session.userId = user.id;

	res.redirect('/bands/' + band.id)
};

exports.leaveBand = function(req, res) {
    var band = bands.filter(function(band) {
        return band.id == req.body.band;
    })[0];

    band.members.forEach(function (item, index) {
        if(item.id === req.session.userId){
            band.members.splice(index, 1);
        }
    });

    //delete req.session.userId;

    res.redirect('/');
};
