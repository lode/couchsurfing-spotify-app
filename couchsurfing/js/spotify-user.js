var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var player = models.player;
var spotifyuser = {};
spotifyuser.spotifyprofileid = null;
spotifyuser.topartists = [];

function init() {

    var sp = getSpotifyApi();
    var models = sp.require('sp://import/scripts/api/models');
    
    var toplist = new models.Toplist();
    
    toplist.toplistType = models.TOPLISTTYPE.USER;
    toplist.matchType = models.TOPLISTMATCHES.ARTISTS;
    
    toplist.observe(models.EVENT.CHANGE, function() {
        toplist.results.forEach(function(artist) {
            spotifyuser.topartists.push(artist.name);
        });
    });

    toplist.run();
    
    spotifyuser.spotifyprofileid = models.session.anonymousUserID;
}
init();