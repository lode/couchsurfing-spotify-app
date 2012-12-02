var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var player = models.player;
var spotifyuser = {};
spotifyuser.spotifyprofileid = null;
spotifyuser.toplist = null;
var artists,
	similar,
	events = [],
	timer,
	lastFMLoader = new LastFMLoader()
lastFMLoader.getUserTopArtists("RobinNieuwboer", returnedTopArtists, 200)

Usergrid.ApiClient.init('lode', 'sandbox');
var hosts = new Usergrid.Collection('csmembers');
hosts.setQueryParams({"ql":"city='Amsterdam' and availability='Yes' or availability='Maybe'"});
hosts.get(function(){
	while(hosts.hasNextEntity()) {
		var host = hosts.getNextEntity();
	}
});
rePopulateHostList(hosts._data);

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
        	lastFMLoader.getArtistEvents(artist.name, returnedArtistEvents, 99);
        });
    });

    toplist.run();
}
init();

$("#custom-search form").live("submit",function(e){
	e.preventDefault();
	events = [];
	$("#sugested > ul").empty();
	//console.log($(".npt").attr("value"));
	lastFMLoader.getArtistEvents($(".npt").attr("value"), returnedArtistEvents, 99);
})

function returnedTopArtists(data){
	//artists = LastFMParser.parseTopArtists(data);

	//lastFMLoader.getArtistsSimilar(artists[0]["name"], returnedSimilarArtists, 10);
}
function returnedSimilarArtists(data){
	//similar = LastFMParser.parseSimilarArtists(data);

	//lastFMLoader.getArtistEvents(artists[4]["name"], returnedArtistEvents, 10);
}
function returnedArtistEvents(data){
	events = events.concat(LastFMParser.parseArtistEvents(data));
	clearTimeout(timer);
	timer = setTimeout(rePopulateConcertList,40,[events]);
}
$("#sugested > ul > li").live('mouseenter', function(){
	_top = 10+ $(this).offset().top - $("#sugested").offset().top
	$("#available-couches .arrow").css("top" , _top);
	$("#available-couches").css("min-height" , _top+120);
	rePopulateHostList();
})



function rePopulateHostList(userArray){
	$('#available-couches').html('');
	
	hosts.get(function(){
		while (hosts.hasNextEntity()) {
			var host = hosts.getNextEntity();
			var random = Math.floor(Math.random() * 4)+0;
			if (random < 1) {
				var $couchTpl = $('#tpl-host').html();
				var $couch = $.mustache($couchTpl, host._data);
				$('#available-couches').append($couch);
			}
		}
	});
}

function rePopulateConcertList(concertArray){
	concertArray = concertArray[0];
	$("#sugested > ul").empty();
	for(var i = 0, l = concertArray.length; i<l; i++){
		if(concertArray[i].getBaseClass() == Concert){
			var liString = "<li></li>";
			var $concertListContainer = $(liString);
			$concertListContainer.append($("<h3></h3>").text(concertArray[i].name))
			for(var ii = 0, ll = concertArray[i].artists.length; ii<ll; ii++){
				$concertListContainer.append($("<a></a>").text(concertArray[i].artists[ii].name).attr({title:this.name,href:"#"}))
				
			}
			
			$concertListContainer.append($("<ul></ul>").append($("<li></li>").text(concertArray[i].venue)).append($("<li></li>").text(concertArray[i].city)));
			
			$("#sugested > ul").append($concertListContainer);
		}
	}
}
$(document).ready(function(){
	$("#sugested > ul > li").live("hover",function(){
		_top = 10+ $(this).offset().top - $("#sugested").offset().top
		$("#available-couches").css("margin-top" , _top);
	})
});
/**
 * <b>Concert</b>
 * Dec 1, 2012 Robin
 * 
 * handles Holds all the data for a concert
 * @author Robin
 * 
 * @returns
 */

function Concert() {

	// *********************************************************************** 
	// CONSTRUCTOR METHOD WHICH EXECUTTES ITSELF ON CREATION OF THE CLASS
	// *********************************************************************** 
	(function() {

	})();

	// ***********************************************************************
	// PRIVATE VARIABLES  
	// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
	// *********************************************************************** 

	var className = Concert,
		self = this;

	// *********************************************************************** 
	// PRIVATE METHODS 
	// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
	// *********************************************************************** 
	

	// *********************************************************************** 
	// PRIVILEGED METHODS 
	// MAY BE INVOKED PUBLICLY AND MAY ACCESS PRIVATE ITEMS 
	// MAY NOT BE CHANGED; MAY BE REPLACED WITH PUBLIC FLAVORS 
	// ************************************************************************ 
	this.getBaseClass = function() {
		return className;
	}
	
	this.getGenres = function(){
		artists = self.artists;
		genres = [];
		for(var i =0, l = artists.length; i<l; i++){
			artistGenres = artist[i]["genres"];
			for(var i=0, l = artisGenres.length; i<l; i++){
				if(genres.indexOf(artistGenres[i]) > -1){
					genres.push(artistGenres[i]);
				}
			}
		}
		return genres;
	};

	// ************************************************************************ 
	// PUBLIC PROPERTIES -- ANYONE MAY READ/WRITE 
	// ************************************************************************ 
	
	this.name ="";
	this.venue ="";
	this.city ="";
	this.latLong ="";
	this.artists = [];
}

// ************************************************************************ 
// PUBLIC METHODS -- ANYONE MAY READ/WRITE Classname.prototype.method
// ************************************************************************ 


// ************************************************************************ 
// PROTOTYOPE PROERTIES -- ANYONE MAY READ/WRITE (but may be overridden) 
// ************************************************************************ 


// ************************************************************************ 
// STATIC PROPERTIES -- ANYONE MAY READ/WRITE 
// ************************************************************************ 

/**
 * <b>LatLong</b>
 * Dec 1, 2012 Robin
 * 
 * handles Latitude and longitude
 * @author Robin
 * 
 * @returns
 */

function LatLong(lat, long) {

	// *********************************************************************** 
	// CONSTRUCTOR METHOD WHICH EXECUTTES ITSELF ON CREATION OF THE CLASS
	// *********************************************************************** 
	(function() {

	})();

	// ***********************************************************************
	// PRIVATE VARIABLES  
	// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
	// *********************************************************************** 

	var className = LatLong

	// *********************************************************************** 
	// PRIVATE METHODS 
	// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
	// *********************************************************************** 
	

	// *********************************************************************** 
	// PRIVILEGED METHODS 
	// MAY BE INVOKED PUBLICLY AND MAY ACCESS PRIVATE ITEMS 
	// MAY NOT BE CHANGED; MAY BE REPLACED WITH PUBLIC FLAVORS 
	// ************************************************************************ 
	this.getBaseClass = function() {
		return className;
	}
	this.update = function(_lat, _long){
		lat = _lat
		long = _long;
	}
	this.setLat = function(_lat){
		lat = _lat
	}
	this.setLong = function(_long){
		long = _long;
	}
	
	this.getLat = function(){
		return lat;
	}
	this.getLong = function(){
		return long;
	}
	this.getLatLong = function(){
		return [lat, long];
	}

	// ************************************************************************ 
	// PUBLIC PROPERTIES -- ANYONE MAY READ/WRITE 
	// ************************************************************************ 
}

// ************************************************************************ 
// PUBLIC METHODS -- ANYONE MAY READ/WRITE Classname.prototype.method
// ************************************************************************ 


// ************************************************************************ 
// PROTOTYOPE PROERTIES -- ANYONE MAY READ/WRITE (but may be overridden) 
// ************************************************************************ 


// ************************************************************************ 
// STATIC PROPERTIES -- ANYONE MAY READ/WRITE 
// ************************************************************************ 

/**
 * <b>Artist</b>
 * Dec 1, 2012 Robin
 * 
 * holds all information related to an artist
 * @author Robin
 * 
 * @returns
 */

function Artist() {

	// *********************************************************************** 
	// CONSTRUCTOR METHOD WHICH EXECUTTES ITSELF ON CREATION OF THE CLASS
	// *********************************************************************** 
	(function() {

	})();

	// ***********************************************************************
	// PRIVATE VARIABLES  
	// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
	// *********************************************************************** 

	var className = Artist;

	// *********************************************************************** 
	// PRIVATE METHODS 
	// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
	// *********************************************************************** 
	

	// *********************************************************************** 
	// PRIVILEGED METHODS 
	// MAY BE INVOKED PUBLICLY AND MAY ACCESS PRIVATE ITEMS 
	// MAY NOT BE CHANGED; MAY BE REPLACED WITH PUBLIC FLAVORS 
	// ************************************************************************ 
	this.getBaseClass = function() {
		return className;
	}
	

	// ************************************************************************ 
	// PUBLIC PROPERTIES -- ANYONE MAY READ/WRITE 
	// ************************************************************************ 
	this.name ="";
	this.genres = [];
	this.events = [];
	this.fans = [];
	
}

// ************************************************************************ 
// PUBLIC METHODS -- ANYONE MAY READ/WRITE Classname.prototype.method
// ************************************************************************ 


// ************************************************************************ 
// PROTOTYOPE PROERTIES -- ANYONE MAY READ/WRITE (but may be overridden) 
// ************************************************************************ 


// ************************************************************************ 
// STATIC PROPERTIES -- ANYONE MAY READ/WRITE 
// ************************************************************************ 

/**
 * <b>User</b>
 * Dec 1, 2012 Robin
 * 
 Holds the information about a user
 * @author Robin
 * 
 * @returns
 */

function User() {

	// *********************************************************************** 
	// CONSTRUCTOR METHOD WHICH EXECUTTES ITSELF ON CREATION OF THE CLASS
	// *********************************************************************** 
	(function() {

	})();

	// ***********************************************************************
	// PRIVATE VARIABLES  
	// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
	// *********************************************************************** 

	var className = User;

	// *********************************************************************** 
	// PRIVATE METHODS 
	// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
	// *********************************************************************** 
	

	// *********************************************************************** 
	// PRIVILEGED METHODS 
	// MAY BE INVOKED PUBLICLY AND MAY ACCESS PRIVATE ITEMS 
	// MAY NOT BE CHANGED; MAY BE REPLACED WITH PUBLIC FLAVORS 
	// ************************************************************************ 
	this.getBaseClass = function() {
		return className;
	}

	this.getGenres = function(){
		var artists = self.artists,
			genres = [];
		for(var i =0, l = artists.length; i<l; i++){
			artistGenres = artist[i]["genres"];
			for(var i=0, l = artisGenres.length; i<l; i++){
				if(genres.indexOf(artistGenres[i]) > -1){
					genres.push(artistGenres[i]);
				}
			}
		}
		return genres;
	};

	// ************************************************************************ 
	// PUBLIC PROPERTIES -- ANYONE MAY READ/WRITE 
	// ************************************************************************ 
	this.name ="";
	this.city ="";
	this.artists = [];
	this.csHook ="";
	this.lfmHook ="";
	this.latLong ="";
	this.description = "";
	
}

// ************************************************************************ 
// PUBLIC METHODS -- ANYONE MAY READ/WRITE Classname.prototype.method
// ************************************************************************ 


// ************************************************************************ 
// PROTOTYOPE PROERTIES -- ANYONE MAY READ/WRITE (but may be overridden) 
// ************************************************************************ 


// ************************************************************************ 
// STATIC PROPERTIES -- ANYONE MAY READ/WRITE 
// ************************************************************************ 

/**
 * <b>LastFMLoader</b>
 * Dec 1, 2012 Robin
 * 
 * handles the loading of data from last.fm
 * @author Robin
 * 
 * @returns
 */

function LastFMLoader() {

	// *********************************************************************** 
	// CONSTRUCTOR METHOD WHICH EXECUTTES ITSELF ON CREATION OF THE CLASS
	// *********************************************************************** 
	(function() {

	})();

	// ***********************************************************************
	// PRIVATE VARIABLES  
	// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
	// *********************************************************************** 

	var className = LastFMLoader;
		apiKey = "7f5ff80b980849aa562b58f35d97643b";

	// *********************************************************************** 
	// PRIVATE METHODS 
	// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
	// *********************************************************************** 
	

	// *********************************************************************** 
	// PRIVILEGED METHODS 
	// MAY BE INVOKED PUBLICLY AND MAY ACCESS PRIVATE ITEMS 
	// MAY NOT BE CHANGED; MAY BE REPLACED WITH PUBLIC FLAVORS 
	// ************************************************************************ 
	this.getBaseClass = function() {
		return className;
	}
	
	this.getArtistEvents = function(_artistName, handler, _length){
		var method = "artist.getevents",
			artist = _artistName,
			format = "json",
			numResults = _length;
		
		$.ajax({
			url:"http://ws.audioscrobbler.com/2.0/" +
					"?method=" + method +
					"&artist=" + artist +
					"&api_key=" + apiKey +
					"&format=" + format +
					"&limit=" + numResults,
			success: handler,
			dataType: "json"
		})
	};

	this.getUserTopArtists = function(_userName, handler, _length){
		var method = "user.getTopArtists",
			user = _userName,
			format = "json",
			numResults = _length;
		
		$.ajax({
			url:"http://ws.audioscrobbler.com/2.0/" +
					"?method=" + method +
					"&user=" + user +
					"&api_key=" + apiKey +
					"&format=" + format +
					"&limit=" + numResults,
			success: handler,
			dataType: "json"
		})
	};

	this.getArtistsSimilar = function(_artistName, handler, _length){
		var method = "artist.getSimilar",
			artist = _artistName,
			format = "json",
			numResults = _length;
		
		$.ajax({
			url:"http://ws.audioscrobbler.com/2.0/" +
					"?method=" + method +
					"&artist=" + artist +
					"&api_key=" + apiKey +
					"&format=" + format +
					"&limit=" + numResults,
			success: handler,
			dataType: "json"
		})
	};

	// ************************************************************************ 
	// PUBLIC PROPERTIES -- ANYONE MAY READ/WRITE 
	// ************************************************************************ 
	
};

// ************************************************************************ 
// PUBLIC METHODS -- ANYONE MAY READ/WRITE Classname.prototype.method
// ************************************************************************ 


// ************************************************************************ 
// PROTOTYOPE PROERTIES -- ANYONE MAY READ/WRITE (but may be overridden) 
// ************************************************************************ 


// ************************************************************************ 
// STATIC PROPERTIES -- ANYONE MAY READ/WRITE 
// ************************************************************************ 



/**
 * <b>LastFMParser</b>
 * Dec 1, 2012 Robin
 * 
 * handles description
 * @author Robin
 * 
 * @returns
 */

function LastFMParser() {

	// *********************************************************************** 
	// CONSTRUCTOR METHOD WHICH EXECUTTES ITSELF ON CREATION OF THE CLASS
	// *********************************************************************** 
	(function() {

	})();

	// ***********************************************************************
	// PRIVATE VARIABLES  
	// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
	// *********************************************************************** 

	var className = LastFMParser;

	// *********************************************************************** 
	// PRIVATE METHODS 
	// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
	// *********************************************************************** 
	

	// *********************************************************************** 
	// PRIVILEGED METHODS 
	// MAY BE INVOKED PUBLICLY AND MAY ACCESS PRIVATE ITEMS 
	// MAY NOT BE CHANGED; MAY BE REPLACED WITH PUBLIC FLAVORS 
	// ************************************************************************ 
	this.getBaseClass = function() {
		return className;
	}
	
	// ************************************************************************ 
	// PUBLIC PROPERTIES -- ANYONE MAY READ/WRITE 
	// ************************************************************************ 
	
}

// ************************************************************************ 
// PUBLIC METHODS -- ANYONE MAY READ/WRITE Classname.prototype.method
// ************************************************************************ 


// ************************************************************************ 
// PROTOTYOPE PROERTIES -- ANYONE MAY READ/WRITE (but may be overridden) 
// ************************************************************************ 


// ************************************************************************ 
// STATIC PROPERTIES -- ANYONE MAY READ/WRITE 
// ************************************************************************ 

LastFMParser.parseTopArtists = function(_jsonString) {
	var artists = [];
	var artistJson = _jsonString["topartists"]["artist"];
	if(artistJson.length > 0){
		for(var i = 0, l = artistJson.length; i<l; i++){
			var newArtist = new Artist()
			newArtist.name = artistJson[i]["name"];
			artists.push(newArtist)
		}
	}
	return artists;
}
LastFMParser.parseSimilarArtists = function(_jsonString) {
	var artists = [];
	var artistJson = _jsonString["similarartists"]["artist"];
	if(artistJson.length > 0){
		for(var i = 0, l = artistJson.length; i<l; i++){
			var newArtist = new Artist()
			newArtist.name = artistJson[i]["name"];
			artists.push(newArtist)
		}
	}
	return artists;
}
LastFMParser.parseArtistEvents = function(_jsonString) {
	var concerts = [];
	var concertsJson = _jsonString["events"]["event"];
	if(concertsJson.length > 0){
		for(var i = 0, l = concertsJson.length; i<l; i++){
			var newConcert = new Concert()
			newConcert.name = concertsJson[i]["title"];
			newConcert.venue = concertsJson[i]["venue"]["name"];
			newConcert.city = concertsJson[i]["venue"]["location"]["city"];
			newConcert.latLong = new LatLong(concertsJson[i]["venue"]["location"]["geo:point"]["geo:lat"], concertsJson[i]["venue"]["location"]["geo:point"]["geo:long"]);
			for(var ii = 0, ll = concertsJson[i]["artists"]["artist"].length; ii<ll; ii++){
				var newArtist = new Artist()
				newArtist.name = concertsJson[i]["artists"]["artist"][ii];
				newConcert.artists.push(newArtist);
			}
			concerts.push(newConcert);
		}
	}
	return concerts;
}
