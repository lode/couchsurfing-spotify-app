var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var player = models.player;
var spotifyuser = {};
spotifyuser.spotifyprofileid = null;
spotifyuser.toplist = null;

function init() {

    var sp = getSpotifyApi();
    var models = sp.require('sp://import/scripts/api/models');
    
    var toplist = new models.Toplist();
    spotifyuser.toplist = toplist;
    
    toplist.toplistType = models.TOPLISTTYPE.USER;
    toplist.matchType = models.TOPLISTMATCHES.ARTISTS;
    var user = models.USER;
    
    spotifyuser.spotifyprofileid = models.session.anonymousUserID;
    
    toplist.observe(models.EVENT.CHANGE, function() {
        toplist.results.forEach(function(artist) {
           // console.log(artist.name);
        });
    });

    toplist.run();
}
init();