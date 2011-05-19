var win = Titanium.UI.currentWindow;

// CLASS定義読み込み
var Toilet = require('lib/toilet').toilet;
var Station = require('lib/station').station;

// FUNCTION DEFINE
function toiletsToStations(toilets) {
	var stations = [];
	for (var i = 0; i < toilets.length; i++) {
		if (toilets[i].stid) {
			var stid = toilets[i].stid;
			if (stations[stid]) {
				stations[stid].toilets.push(toilets[i]);
			} else {
				var station = new Station(toilets[i]);
				station.toilets = [toilets[i]]
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

// 外部関数定義読み込み
Ti.include("lib/map_mode_change.js");
Ti.include("lib/get_remote_object.js");
Ti.include("lib/create_annotation.js");
Ti.include("lib/region_changed_handler.js");
Ti.include("lib/get_location.js");


// NAVIGATION BAR
var upload_button = Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.COMPOSE});
win.rightNavButton = upload_button;
upload_button.addEventListener('click', function(e) {

	var optionsDialogOpts = {
		options:['駅改札内の化粧室', 'それ以外の化粧室', 'キャンセル'],
		cancel:2,
		title:'化粧室登録'
	};

	var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);

	dialog.addEventListener('click',function(e){
		 if(e.index == 0){
			mapModeEdit();
			win.rightNavButton = cancel_button;
		} 
	});
	dialog.show();
});

var cancel_button = Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.CANCEL});
cancel_button.addEventListener('click', function(e) {
	mapModeNormal();
	win.rightNavButton = upload_button;
});


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

tableview.initTable = function() {
	this.data = [];
	// CREATE LABEL
	var info_row = Titanium.UI.createTableViewRow({
		height:20,
		backgroundColor:'#0099ff',
		className:'guiderow'
	});

	var info_label = Titanium.UI.createLabel({
		text:'検索結果',
		font:{fontSize:14},
		color:'#fff',
		shadowColor:'#222',
		shadowOffset:{x:1,y:1},
		textAlign:'center'
	});
	info_row.add(info_label);
	this.appendRow(info_row);
};
tableview.initTable();

// create table view event listener
tableview.addEventListener('click', function(e)
{
	var child_win = Titanium.UI.createWindow({
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
	image:'./img/GPS.png',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});
location_button.addEventListener('click', function(e) {
	setCurrentPosition();
});

win.setToolbar([location_button, flexible, search]);

win.add(mapview);
win.add(tableview);


// GEOLOCATION
//

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
		tableview.initTable();
		for (keys in stations) {
			var st_annotation = createStationWcAnnotation(stations[keys]);
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

setCurrentPosition();

