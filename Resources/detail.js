var win = Titanium.UI.currentWindow;

// FUNCTION DEFINE
function getWcPos(wc_data) {
	switch (wc_data.pos) {
		case 0:
			return "ホーム内";
		case 1:
			return "改札付近";
		default:
			return "その他";
	}
}

var table_data = [];

var wc_name = Titanium.UI.createTableViewSection({
		headerTitle: '化粧室名'
});
var wc_name_row = Titanium.UI.createTableViewRow({
	title:win.data.stname + " - " + win.data.liname + " - " + win.data.tname,
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});
wc_name.add(wc_name_row);
table_data.push(wc_name);

var wc_pos = Titanium.UI.createTableViewSection({
		headerTitle: '場所'
});
var wc_pos_row = Titanium.UI.createTableViewRow({
	title:getWcPos(win.data),
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});
var wc_posword_row = Titanium.UI.createTableViewRow({
	title:win.data.posword,
	height:120,
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});
wc_pos.add(wc_pos_row);
wc_pos.add(wc_posword_row);
table_data.push(wc_pos);

var rooms = Titanium.UI.createTableViewSection({
		headerTitle: '個室数'
});
var rooms_row = Titanium.UI.createTableViewRow({
	title:win.data.room.toString(),
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});
rooms.add(rooms_row);
table_data.push(rooms);

var western = Titanium.UI.createTableViewSection({
		headerTitle: '洋式'
});
var western_row = Titanium.UI.createTableViewRow({
	title:win.data.west.toString(),
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});
western.add(western_row);
table_data.push(western);

var oriental = Titanium.UI.createTableViewSection({
		headerTitle: '和式'
});
var oriental_row = Titanium.UI.createTableViewRow({
	title:win.data.japan.toString(),
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});
oriental.add(oriental_row);
table_data.push(oriental);

var multi = Titanium.UI.createTableViewSection({
		headerTitle: '多目的'
});
var multi_row = Titanium.UI.createTableViewRow({
	title:win.data.multi.toString(),
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});
multi.add(multi_row);
table_data.push(multi);

var rate = Titanium.UI.createTableViewSection({
		headerTitle: '評価'
});
var rate_row = Titanium.UI.createTableViewRow({
	title:'★★★★☆',
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});
rate.add(rate_row);
table_data.push(rate);

//
// CREATE ANNOTATIONS
//
var wc_annotation = Titanium.Map.createAnnotation({
	latitude:win.data.latitude,
	longitude:win.data.longitude,
	title:win.data.stname,
	image:"toilet_and_shadow.png",
	pincolor:Titanium.Map.ANNOTATION_GREEN
});

//
// CREATE MAP SECTION
//
var map_section = Titanium.UI.createTableViewSection({
		headerTitle: '地図'
});
var map_row = Titanium.UI.createTableViewRow({
		height: 150,
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		className:'maprow'
});
var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region:{latitude:win.data.latitude, longitude:win.data.longitude, latitudeDelta:0.005, longitudeDelta:0.005},
	animate:true,
	regionFit:true,
	annotations:[wc_annotation]
});

map_row.add(mapview);
map_section.add(map_row);
table_data.push(map_section);

var tableview = Titanium.UI.createTableView({
		data:table_data,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
		backgroundColor:'#fff',
		rowBackgroundColor:'white'
});

win.add(tableview);
