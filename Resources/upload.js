var win = Titanium.UI.currentWindow;

var data = [];
var text_field_option = {
	color:'#336699',
	height:35,
	top:10,
	left:10,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
};

var wc_name = Titanium.UI.createTableViewSection({
		headerTitle: '化粧室名'
});
var wc_name_row = Titanium.UI.createTableViewRow({
	height:50,
	className:'textfield'
});
var wc_name_tf = Titanium.UI.createTextField(text_field_option);
wc_name_tf.hintText = "化粧室名";
wc_name_row.add(wc_name_tf);
wc_name.add(wc_name_row);
data.push(wc_name);

var rooms = Titanium.UI.createTableViewSection({
		headerTitle: '個室数'
});
var rooms_row = Titanium.UI.createTableViewRow({
	height:50,
	className:'textfield'
});
var rooms_tf = Titanium.UI.createTextField(text_field_option);
rooms_tf.hintText = '個室数';
rooms_row.add(rooms_tf);
rooms.add(rooms_row);
data.push(rooms);

var western = Titanium.UI.createTableViewSection({
		headerTitle: '洋式'
});
var western_row = Titanium.UI.createTableViewRow({
	height:50,
	className:'textfield'
});
var western_tf = Titanium.UI.createTextField(text_field_option);
western_tf.hintText = '洋式';
western_row.add(western_tf);
western.add(western_row);
data.push(western);

var oriental = Titanium.UI.createTableViewSection({
		headerTitle: '和式'
});
var oriental_row = Titanium.UI.createTableViewRow({
	height:50,
	className:'textfield'
});
var oriental_tf = Titanium.UI.createTextField(text_field_option);
oriental_tf.hintText = '和式';
oriental_row.add(oriental_tf);
oriental.add(oriental_row);
data.push(oriental);

var multi = Titanium.UI.createTableViewSection({
		headerTitle: '多目的'
});
var multi_row = Titanium.UI.createTableViewRow({
	height:50,
	className:'textfield'
});
var multi_tf = Titanium.UI.createTextField(text_field_option);
multi_tf.hintText = '多目的';
multi_row.add(multi_tf);
multi.add(multi_row);
data.push(multi);

var clean_level = Titanium.UI.createTableViewSection({
		headerTitle: '綺麗さ'
});
var clean_level_row = Titanium.UI.createTableViewRow({
	height:30,
	className:'buttonbar'
});
var clean_level_bb = Titanium.UI.createButtonBar({
	labels:['★☆☆☆☆', '★★☆☆☆', '★★☆☆☆', '★★☆☆☆'],
	font:{fontSize:10}
});
clean_level_row.add(clean_level_bb);
clean_level.add(clean_level_row);
data.push(clean_level);

var tableview = Titanium.UI.createTableView({
		data:data,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
		backgroundColor:'#fff',
		rowBackgroundColor:'white'
});

win.add(tableview);
