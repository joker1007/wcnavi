var win = Titanium.UI.currentWindow;

// LOAD TEST DATA
var minatomirai = require("minatomirai");
var yokohama = require("yokohama");

// NAVIGATION BAR
var upload_button = Titanium.UI.createButton({title:'投稿'});
win.rightNavButton = upload_button;

// NAVIGATION BAR EVENT
upload_button.addEventListener('click', function(e) {
	var upload_win = Titanium.UI.createWindow({
		title: '化粧室情報の投稿',
		backgroundColor:'#fff',
		barColor:'#336699',
		url:'upload.js'
	});
	Titanium.UI.currentTab.open(upload_win, {animated:true});
});

wc_data = [
	minatomirai,
	yokohama
];

//
// CREATE ANNOTATIONS
//
var wc_annotations = [];

for (var i = 0; i < wc_data.length; i++) {
	wc_annotations.push(Titanium.Map.createAnnotation({
		latitude:wc_data[i].latitude,
		longitude:wc_data[i].longitude,
		title:wc_data[i].title,
		pincolor:Titanium.Map.ANNOTATION_GREEN,
		animate:true
	}));
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
	annotations:wc_annotations,
	top: 0,
	height: 200
});

// create table view
var tableview = Titanium.UI.createTableView({
	top: 200
});

for (var i = 0; i < wc_data.length; i++) {
	tableview.appendRow(Titanium.UI.createTableViewRow({
		title:wc_data[i].title,
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
	Ti.API.info('detail ' + e.detail);
	//Titanium.UI.createAlertDialog({title:'Table View',message:'row ' + row + ' index ' + index + ' section ' + section  + ' row data ' + rowdata}).show();
	child_win = Titanium.UI.createWindow({
			title:e.rowData.title,
			barColor:'#336699',
			url:'detail.js'
	});
  child_win.data = wc_data[e.index];
	Titanium.UI.currentTab.open(child_win);
});

win.add(mapview);
win.add(tableview);
