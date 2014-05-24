
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};


/*
 * Create a new band.
 */

exports.create = function(req, res){
  res.render('create', { title: 'Express' });
};


/*
 * Shows a list of existing bands.
 */

exports.join = function(req, res){
  res.render('join', { title: 'Express' });
};


/*
 * Shows the band!
 */

exports.band = function(req, res){
  res.render('band', { title: 'Express' });
};