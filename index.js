// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?",(req, res)=>{
	var YeDaMo=req.params.date.split("-")
	//undefined 
	if(typeof req.params.date === 'undefined'){
		var r=new Date(YeDaMo[0],YeDaMo[1],YeDaMo[2]); 
		x=r.getTime()  
		res.json({unix:x,utc:r.toString()})
	}
	//is unix
	if(!isNaN(req.params.date)){ 
	var r=new Date(req.params.date*1000); 
	var x=new Date(req.params.date*1000).getTime() 
	res.json({unix:x,utc:r.toString()})
	
	}else{
	//normal date
	var regExp = /[a-zA-Z]/u;
		if(!regExp.test(req.params.date)){
			var ut=new Date(YeDaMo[0],YeDaMo[1],YeDaMo[2]); 
			console.log(ut)
			var x=ut.getTime() 
			 
			res.json({unix:x,utc:ut.toString()}) 
		}else{
		//Error
			res.json({error:"Invalid Date" })
		}
	}
	
	 
})




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
