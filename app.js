// app.js
var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

// Set up your search parameters // q = query
var params = {
  q: '#ux, #uxdesign, #userexperience',
  count: 1000,
  result_type: 'recent',
  lang: 'en'
}

// Plug parameters into get request
T.get('search/tweets', params, function(err, data, response) {
  if(!err) {
    // Loop through the returned tweets
      for(let i = 0; i < data.statuses.length; i++) {
        // Get the tweet Id from the returned data
          let id = { id: data.statuses[i].id_str }
          // Try to Favorite the selected tweet
          T.post('favorites/create', id, function(err, response){
            // If the favorite fails, log the error message
              if(err){
                console.log(err[0].message);
              }
              // If the favorite is successful, log the URL of the tweet
              else{
                let username = response.user.screen_name;
                let tweetId = response.id_str;
                console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
              }
          });
      }
  }
  else {
    console.log(err);
  }
});