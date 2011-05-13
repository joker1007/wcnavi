var win = Titanium.UI.currentWindow;

// LOAD TEST DATA
var minatomirai = require("minatomirai");
var yokohama = require("yokohama");
//var current_loc = {lat:35.45777, lon:139.63236};

// NAVIGATION BAR
var upload_button = Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.COMPOSE});
var cancel_button = Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.CANCEL});
win.rightNavButton = upload_button;

// NAVIGATION BAR EVENT
upload_button.addEventListener('click', function(e) {
	/*
	 *var upload_win = Titanium.UI.createWindow({
	 *  title: '化粧室情報の投稿',
	 *  backgroundColor:'#fff',
	 *  barColor:'#336699',
	 *  url:'upload.js'
	 *});
	 */
	//Titanium.UI.currentTab.open(upload_win, {animated:true});
	mapModeEdit();
	win.rightNavButton = cancel_button;
});

cancel_button.addEventListener('click', function(e) {
	mapModeNormal();
	win.rightNavButton = upload_button;
});

wc_data = [
	minatomirai,
	yokohama
];

// FUNCTION DEFINE
function getWcName(wc_data) {
	if (wc_data.stin == Ti.App.ST_STIN) {
		return wc_data.stname;
	}
	return wc_data.tname;
};

function createWcAnnotation(toilet){
  var annotation = null;
	if (toilet.stin == Ti.App.ST_STIN) {
		annotation = Titanium.Map.createAnnotation({
			latitude:toilet.lat,
			longitude:toilet.lon,
			title:toilet.stname,
			image: "toilet_and_shadow.png",
			pincolor:Titanium.Map.ANNOTATION_GREEN,
			animate:true
		});
	} else {
		annotation = Titanium.Map.createAnnotation({
			latitude:toilet.lat,
			longitude:toilet.lon,
			title:toilet.tname,
			pincolor:Titanium.Map.ANNOTATION_PURPLE,
			animate:true
		});
	}

	return annotation;
}

function createStationAnnotation(station){
  var annotation = null;
	annotation = Titanium.Map.createAnnotation({
		latitude:station.lat,
		longitude:station.lon,
		title:station.stname,
		pincolor:Titanium.Map.ANNOTATION_GREEN,
		animate:true
	});
	return annotation;
}

Ti.include("lib/map_mode_change.js");
Ti.include("lib/get_remote_object.js");


//
// CREATE MAP VIEW
//
var base_region = {};
var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region:{latitude:35.45777, longitude:139.63236, latitudeDelta:0.01, longitudeDelta:0.01},
	animate:true,
	regionFit:true,
	userLocation:true,
	top: 0,
	height: 200
});

mapview.addEventListener('regionChanged', function(e) {
	if (base_region.latitude && base_region.longitude) {
		var lat_delta = base_region.latitude - e.latitude;
		var lon_delta = base_region.longitude - e.longitude;
		var distance = Math.sqrt(Math.pow(lat_delta, 2) + Math.pow(lon_delta, 2));
		if (distance > 0.02) {
			getToilet(e.latitude, e.longitude, function(annos) {
				base_region.latitude = e.latitude;
				base_region.longitude = e.longitude;
				mapview.removeAllAnnotations();
				mapview.addAnnotations(annos);
			});
		}
	}
});

// create table view
var tableview = Titanium.UI.createTableView({
	top: 200
});

for (var i = 0; i < wc_data.length; i++) {
	tableview.appendRow(Titanium.UI.createTableViewRow({
		title:getWcName(wc_data[i]),
		hasDetail:true
	}));
}

// create table view event listener
tableview.addEventListener('click', function(e)
{
	// event data
	var index = e.index;
	var section = e.section;
	var row = e.row;
	var rowdata = e.rowData;
	//Titanium.UI.createAlertDialog({title:'Table View',message:'row ' + row + ' index ' + index + ' section ' + section  + ' row data ' + rowdata}).show();
	child_win = Titanium.UI.createWindow({
			title:e.rowData.title,
			barColor:'#336699',
			url:'detail.js'
	});
  child_win.data = wc_data[e.index];
	Titanium.UI.currentTab.open(child_win);
});


// CREATE Toolbar Button
var flexible = Titanium.UI.createButton({
  systemButton:Titanium.UI.iPhone.SystemButtonStyle.FLEXIBLE_SPACE
});

var search = Titanium.UI.createButton({
  title:'詳細検索',
  style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

var location_button = Titanium.UI.createButton({
  title:'位置取得',
  style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

win.setToolbar([location_button, flexible, search]);

win.add(mapview);
win.add(tableview);


// GEOLOCATION
//
Titanium.Geolocation.purpose = '現在の位置情報を利用して、近くにあるトイレを検索する';
Ti.include("lib/get_location.js");
setCurrentPosition();

// 位置情報取得後に表示領域を更新
Ti.App.addEventListener('setlocation', function(e) {
	mapview.setLocation({latitude:e.lat, longitude:e.lon, latitudeDelta:0.01, longitudeDelta:0.01});
	base_region.latitude = e.lat;
	base_region.longitude = e.lon;
	if (Titanium.Network.online == false) {
		Titanium.UI.createAlertDialog({
			title:'通信エラー',
			message:'ネットワークに接続されていません',
			buttonNames:["OK"]
		}).show();
		return;
	}

	getToilet(e.lat, e.lon, function(e) {
		mapview.addAnnotations(e);
	});

});
