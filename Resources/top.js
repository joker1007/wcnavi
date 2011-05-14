var win = Titanium.UI.currentWindow;

// LOAD TEST DATA
var minatomirai = require("minatomirai");
var yokohama = require("yokohama");

wc_data = [
	minatomirai,
	yokohama
];

// アップロードモード選択ウインドウ
var upload_win = Titanium.UI.createWindow({
		backgroundImage:'./img/hantomei.png'
});
var button_win_kai = Titanium.UI.createButton({
	title:'駅改札内の化粧室',
	color:'#000000',
	height:40,
	width:230,
	top:80,
	left:45,
	font:{fontSize:18}
});
button_win_kai.addEventListener('click', function(e) {
	upload_win.close();
	mapModeEdit();
	win.rightNavButton = cancel_button;
});

var button_win_nor= Titanium.UI.createButton({
	title:'それ以外の化粧室',
	color:'#000000',
	height:40,
	width:230,
	top:160,
	left:45,
	font:{fontSize:18}
});

upload_win.add(button_win_kai);
upload_win.add(button_win_nor);


// NAVIGATION BAR
var upload_button = Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.COMPOSE});
upload_button.addEventListener('click', function(e) {
	upload_win.open();
});

var cancel_button = Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.CANCEL});
cancel_button.addEventListener('click', function(e) {
	mapModeNormal();
	win.rightNavButton = upload_button;
});

win.rightNavButton = upload_button;


// FUNCTION DEFINE
function getWcName(wc_data) {
	if (wc_data.stin == Ti.App.ST_STIN) {
		return wc_data.stname;
	}
	return wc_data.tname;
};

function toiletsToStations(toilets) {
	var stations = {};
	for (var i = 0; i < toilets.length; i++) {
		if (toilets[i].stid) {
			var stid = toilets[i].stid;
			if (stations[stid]) {
				stations[stid].toilets.push(toilets[i]);
			} else {
				var station = {
					stid:toilets[i].stid,
					stname:toilets[i].stname,
					lat:toilets[i].lat,
					lon:toilets[i].lon,
					toilets:[toilets[i]]
				};
				stations[stid] = station;
			}
		}
	}
	return stations;
}

function toiletsToNoStationsToilets(toilets) {
	var no_station_toilets = [];
	toilets.filter(function(toilet, index, array) {
		return (!toilet.stid);
	});
	return no_station_toilets;
}

function appendSuggestRow(item) {
	var row = {};
	if (item.stname) {
		row = Titanium.UI.createTableViewRow({
			title:item.stname + "駅",
			data_obj:item.toilets
		});
	} else {
		row = Titanium.UI.createTableViewRow({
			title:item.tname,
			data_obj:item
		});
	}
	row.hasDetail = true;

	tableview.appendRow(row);
}


Ti.include("lib/map_mode_change.js");
Ti.include("lib/get_remote_object.js");
Ti.include("lib/create_annotation.js");
Ti.include("lib/region_changed_handler.js");

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

// 後で切り替えるため、コールバック関数を保存
var map_normal_callback = function(e) {
	if (checkDistance(e, base_region)) {
		updateToiletMap(e, base_region);
	}
};

var map_edit_callback = function(e) {
	if (checkDistance(e, base_region)) {
		updateStationMap(e, base_region);
	}
};

mapview.addEventListener('regionChanged', map_normal_callback);

// create table view
var tableview = Titanium.UI.createTableView({
	top: 200
});

// create table view event listener
tableview.addEventListener('click', function(e)
{
	child_win = Titanium.UI.createWindow({
			title:e.rowData.title,
			barColor:'#336699',
			url:'semi_detail.js'
	});
  child_win.data = e.rowData.data_obj;
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
//  title:'位置取得',
	image:'./img/GPS.png',
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

	getToilet(e.lat, e.lon, function(toilets) {
		var stations = toiletsToStations(toilets);
		var no_stations = toiletsToNoStationsToilets(toilets);
		var st_annotations = [];
		var annotations = [];
		for (keys in stations) {
			var st_annotation = createStationAnnotation(stations[keys]);
			st_annotation.image = "toilet_and_shadow.png";
			st_annotations.push(st_annotation);

			appendSuggestRow(stations[keys]);
		}
		for (var i = 0; i < no_stations.length; i++) {
			annotations.push(createWcAnnotation(no_stations[i]));
			appendSuggestRow(no_stations[i]);
		}
		mapview.addAnnotations(st_annotations);
		mapview.addAnnotations(annotations);
	});

});


