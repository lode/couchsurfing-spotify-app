var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var player = models.player;

function init() {

    var sp = getSpotifyApi();
    var models = sp.require('sp://import/scripts/api/models');

    var toplist = new models.Toplist();
    toplist.toplistType = models.TOPLISTTYPE.USER;
    toplist.matchType = models.TOPLISTMATCHES.ARTISTS;

    toplist.observe(models.EVENT.CHANGE, function() {
        toplist.results.forEach(function(artist) {
            console.log(artist.name);
        });
    });

    toplist.run();
}
init();