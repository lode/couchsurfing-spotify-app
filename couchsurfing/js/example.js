var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var player = models.player;

function init() {

    var sp = getSpotifyApi();
    var models = sp.require('sp://import/scripts/api/models');
    
    var toplist = new models.Toplist();
    toplist.toplistType = models.TOPLISTTYPE.USER;
    toplist.matchType = models.TOPLISTMATCHES.ARTISTS;
    var user = models.USER;
    
    console.log(models.session.anonymousUserID);
    
    toplist.observe(models.EVENT.CHANGE, function() {
        toplist.results.forEach(function(artist) {
           // console.log(artist.name);
        });
    });

    var a = models.Artist.fromURI('spotify:artist:5EEw5ABtKN2jJWKvoe7NYU', function(artist) {
    	  console.log(artist);
    	});
    
    toplist.run();
}
init();