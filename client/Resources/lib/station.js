exports.station = function(station_data) {
	this.stid = station_data.stid;
	this.stname = station_data.stname;
	this.lat = station_data.lat;
	this.lon = station_data.lon;
	this.toilets = [station_data.toilets];
	this.lines = station_data.lines;
};

exports.station.prototype = {
	getName:function() {
		return this.stname;
	}
};
