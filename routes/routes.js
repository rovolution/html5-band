
/*
 * GET home page.
 */
var data = [
{
	name:"Yalcin"
},
{
	name:"Rohit "
},{
	name:"Ed"
}

]
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
  res.render('join', {data:data});
};