var win = Titanium.UI.currentWindow;

var data = [];

var wc_name = Titanium.UI.createTableViewSection({
		headerTitle: '化粧室名'
});
var wc_name_row = Titanium.UI.createTableViewRow({
	title:win.data.title,
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});
wc_name.add(wc_name_row);
data.push(wc_name);

var rooms = Titanium.UI.createTableViewSection({
		headerTitle: '個室数'
});
var rooms_row = Titanium.UI.createTableViewRow({
	title:win.data.rooms.toString(),
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});
rooms.add(rooms_row);
data.push(rooms);

var western = Titanium.UI.createTableViewSection({
		headerTitle: '洋式'
});
var western_row = Titanium.UI.createTableViewRow({
	title:win.data.western.toString(),
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});
western.add(western_row);
data.push(western);

var oriental = Titanium.UI.createTableViewSection({
		headerTitle: '和式'
});
var oriental_row = Titanium.UI.createTableViewRow({
	title:win.data.oriental.toString(),
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});
oriental.add(oriental_row);
data.push(oriental);

var multi = Titanium.UI.createTableViewSection({
		headerTitle: '多目的'
});
var multi_row = Titanium.UI.createTableViewRow({
	title:win.data.multi.toString(),
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});
multi.add(multi_row);
data.push(multi);

var clean_level = Titanium.UI.createTableViewSection({
		headerTitle: '綺麗さ'
});
var clean_level_row = Titanium.UI.createTableViewRow({
	title:'★★★★☆',
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});
clean_level.add(clean_level_row);
data.push(clean_level);

//
// CREATE ANNOTATIONS
//
var wc_annotation = Titanium.Map.createAnnotation({
	latitude:win.data.latitude,
	longitude:win.data.longitude,
	title:win.data.title,
	pincolor:Titanium.Map.ANNOTATION_GREEN,
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
		touchEnabled:false, 
		className:'maprow'
});
var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region:{latitude:win.data.latitude, longitude:win.data.longitude, latitudeDelta:0.005, longitudeDelta:0.005},
	animate:true,
	regionFit:true,
	userLocation:true,
	annotations:[wc_annotation]
});

map_row.add(mapview);
map_section.add(map_row);
data.push(map_section);

var tableview = Titanium.UI.createTableView({
		data:data,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
		backgroundColor:'#fff',
		rowBackgroundColor:'white'
});

win.add(tableview);
