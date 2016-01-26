"use strict";


var view = {
    title : "Mustache",
    rank : "Good"
};

function loadtemp(json){
    var output = Mustache.render("{{rank}} rank of  {{title}}", view);
    document.getElementById('rank').innerHTML = output;
}

function requestFail() {
	$("#latest-release").html("<p>Unable to locate release!(</p>");
}


$(document).ready(function() {
	var requri = 'https://api.github.com/repos/d-ronin/dRonin/releases/latest';
    requestJSON(requri, function(json) {
    	if(json.message == "Not Found") {
    		releaseNotFound();
    	}
    	else {
    		loadtemp(json);
    	}
    });
});