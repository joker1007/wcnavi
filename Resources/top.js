var win = Titanium.UI.currentWindow;

// LOAD TEST DATA
var minatomirai = require("minatomirai");
var yokohama = require("yokohama");
//var current_loc = {lat:35.45777, lon:139.63236};

// NAVIGATION BAR
var upload_button = Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.COMPOSE});
win.rightNavButton = upload_button;

var button_win_kai = Titanium.UI.createButton({
  title:'駅改札内の化粧室',
  color:'#000000',
  height:40,
  width:230,
  top:80,
  left:45,
   font:{fontSize:18}
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


//
// CREATE MAP VIEW
//
var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region:{latitude:35.45777, longitude:139.63236, latitudeDelta:0.01, longitudeDelta:0.01},
	animate:true,
	regionFit:true,
	userLocation:true,
	top: 0,
	height: 200
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
	if (Titanium.Network.online == false) {
		Titanium.UI.createAlertDialog({
			title:'通信エラー',
			message:'ネットワークに接続されていません',
			buttonNames:["OK"]
		}).show();
		return;
	}

	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', 'http://wcnavix.appspot.com/search?lat='+e.lat+'&lon='+e.lon+'&sort=distance');

	xhr.onload = function(){
		var result = JSON.parse(this.responseText);
		if (result.res == 0) {
			var annotations = [];
			for (var i = 0; i < result.toilets.length; i++) {
				annotations.push(createWcAnnotation(result.toilets[i]));
			}
			mapview.addAnnotations(annotations);
		}
	};

	xhr.onerror = function(){
		Titanium.UI.createAlertDialog({
			title:'通信エラー',
			message:'サーバーに接続できません',
			buttonNames:["OK"]
		}).show();
	};

	xhr.send();
});


	var upload_win = Titanium.UI.createWindow({
		backgroundImage:'./hantomei.png'
//		url:'upload.js'
	});

// NAVIGATION BAR EVENT
upload_button.addEventListener('click', function(e) {

upload_win.add(button_win_kai);
upload_win.add(button_win_nor);

		upload_win.open({transition: Ti.UI.iPhone.AnimationStyle.NONE});

});



Ti.include('lib/map_mode_change.js');

//var win = Titanium.UI.currentWindow;

var cancel_button = Titanium.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.CANCEL});


button_win_kai.addEventListener('click', function(e) {
	upload_win.close();
	mapModeEdit();
	win.rightNavButton = cancel_button;

	cancel_button.addEventListener('click', function(e) {
		mapModeNormal();
		win.rightNavButton = upload_button;
	});

});
