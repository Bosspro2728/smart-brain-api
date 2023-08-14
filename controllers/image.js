// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '11cbd022b3144b829eaf75214c1a15b2';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = '3lwetx2hzyc4';       
const APP_ID = 'My-first-app';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
// const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

const handleApiCall = (req, res) =>{
	const raw = JSON.stringify({
	  	"user_app_id": {
	      "user_id": USER_ID,
	      "app_id": APP_ID
	  	},
	    "inputs": [
	      	{
	          	"data": {
	              	"image": {
	                  "url": req.body.input,
	              	}
	          	}
	      	}
	    ]
	});

	const requestOptions = {
	    method: 'POST',
	    headers: {
	        'Accept': 'application/json',
	        'Authorization': 'Key ' + PAT
	    },
	    body: raw
	};

	fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
		.then(response => response.json())
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (req, res, db) =>{
	const { id } = req.body;
	db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries =>{
  		res.json(entries[0].entries);
  	})
  	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
};