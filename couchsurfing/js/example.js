var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var player = models.player;

function init() {

    var sp = getSpotifyApi();
    var models = sp.require('sp://import/scripts/api/models');

    var toplist = new models.Toplist();
//    toplist.toplistType = models.TOPLISTTYPE.REGION;
//    toplist.matchType = models.TOPLISTMATCHES.ARTISTS;
//    toplist.region = 'SE';
    toplist.userName = models.TOPLISTUSER_CURRENT;

    toplist.observe(models.EVENT.CHANGE, function() {
        toplist.results.forEach(function(artist) {
            console.log(artist.name);
        });
    });

    toplist.run();
}
