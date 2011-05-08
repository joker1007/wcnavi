var win = Titanium.UI.currentWindow;

var button_win_kai = Titanium.UI.createButton({
  title:'駅改札内の化粧室',
  color:'#000000',
  height:40,
  width:230,
  top:50,
  left:45,
   font:{fontSize:18}
});

var button_win_nor= Titanium.UI.createButton({
  title:'それ以外の化粧室',
  color:'#000000',
  height:40,
  width:230,
  top:120,
  left:45,
   font:{fontSize:18}
});

win.add(button_win_kai);
win.add(button_win_nor);



button_win_kai.addEventListener('click', function(e) {
	var upload_win_kai = Titanium.UI.createWindow({
		title: '駅名(路線)の選択',
		backgroundColor:'#fff',
		barColor:'#336699'
//		url:'upload.js'
	});
	Titanium.UI.currentTab.open(upload_win_kai, {animated:true});
	
	var picker_win_kai = Ti.UI.createPicker();

	var data_win_kai_data = require("data_win_kai");
	var data_win_kai = [];

	for (var kaic = 0; kaic < data_win_kai_data.title.length; kaic++){
		data_win_kai[kaic] = Ti.UI.createPickerRow();
		data_win_kai[kaic].title = data_win_kai_data.title[kaic];
		data_win_kai[kaic].custom_item = data_win_kai_data.custom_item[kaic];
	}
	picker_win_kai.add(data_win_kai);

	picker_win_kai.selectionIndicator = true;
	upload_win_kai.add(picker_win_kai);

	picker_win_kai.addEventListener('change',function(e){
//		alert(e.rowIndex);
		var upload_win_kai_sel = Titanium.UI.createWindow({
			title: '' + data_win_kai[e.rowIndex].title,
			backgroundColor:'#fff',
			barColor:'#336699'
//		url:'upload.js'
		});
		Titanium.UI.currentTab.open(upload_win_kai_sel, {animated:true});
		
		var picker_win_kai_wc = Ti.UI.createPicker();
		var data_win_kai_wc_data = require("data_win_kai_wc");
		var data_win_kai_wc = [];
	
		for (var kaic2 = 0; kaic2 < data_win_kai_wc_data.location.length; kaic2++){
			data_win_kai_wc[kaic2] = Ti.UI.createPickerRow();			
			data_win_kai_wc[kaic2].title = data_win_kai_wc_data.sex[kaic2] + ':' + data_win_kai_wc_data.location[kaic2] +' - '  + data_win_kai_wc_data.comment[kaic2];
			data_win_kai_wc[kaic2].custom_item = data_win_kai_wc_data.custom_item[kaic2];
		}
		data_win_kai_wc[data_win_kai_wc_data.location.length] = Ti.UI.createPickerRow();	
		data_win_kai_wc[kaic2].title = '上記以外の化粧室';
		data_win_kai_wc[kaic2].custom_item = data_win_kai_wc_data.location.length;
		
		picker_win_kai_wc.add(data_win_kai_wc);

		picker_win_kai_wc.selectionIndicator = true;
		upload_win_kai_sel.add(picker_win_kai_wc);

		picker_win_kai_wc.addEventListener('change',function(e){

			if(e.rowIndex == data_win_kai_wc_data.location.length){
				alert("");
			} else {
			
	var winpos = Titanium.UI.createWindow({
		title: '' + data_win_kai_wc[e.rowIndex].title,
		backgroundColor:'#fff',
		barColor:'#336699'
//		url:'upload.js'
	});

			Titanium.UI.currentTab.open(winpos, {animated:true});
			
			var data = [];
var text_field_option = {
	color:'#336699',
	height:35,
	top:10,
	left:10,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
};

var wc_name1 = Titanium.UI.createTableViewSection({
		headerTitle: '' + data_win_kai[e.rowIndex].title
});

var wc_name2 = Titanium.UI.createTableViewSection({
		headerTitle: '' + data_win_kai_wc[e.rowIndex].title
});

/*
var wc_name_row = Titanium.UI.createTableViewRow({
	height:50,
	className:'textfield'
});
var wc_name_tf = Titanium.UI.createTextField(text_field_option);
wc_name_tf.hintText = "化粧室名";
wc_name_row.add(wc_name_tf);
wc_name.add(wc_name_row);
*/
data.push(wc_name1);
data.push(wc_name2);
/*
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
*/
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

var wc_pos_kai_coment = Titanium.UI.createTableViewSection({
		headerTitle: 'コメント(空白可)'
});

var wc_pos_kai_coment_row = Titanium.UI.createTableViewRow({
	height:100,
	className:'textarea'
});

var wc_pos_kai_coment_area = Titanium.UI.createTextArea({
        font:{fontSize:20,fontFamily:'Marker Felt', fontWeight:'bold'},
        color:'#888',
        textAlign:'left',
        appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,       
        keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
        returnKeyType:Titanium.UI.RETURNKEY_EMERGENCY_CALL,
        borderWidth:2,
        borderColor:'#bbb',
        borderRadius:5
});

wc_pos_kai_coment_row.add(wc_pos_kai_coment_area);
wc_pos_kai_coment.add(wc_pos_kai_coment_row);
data.push(wc_pos_kai_coment);

var wc_pos_kai_sub = Titanium.UI.createTableViewSection({
		headerTitle: ''
});

var wc_pos_kai_sub_row = Titanium.UI.createTableViewRow({
	height:40,
	className:'button'
});

var wc_pos_kai_sub_button = Titanium.UI.createButton({
  title:'登録',
  color:'#000000',
   font:{fontSize:18}
});

wc_pos_kai_sub_row.add(wc_pos_kai_sub_button);
wc_pos_kai_sub.add(wc_pos_kai_sub_row);
data.push(wc_pos_kai_sub);



var tableview = Titanium.UI.createTableView({
		data:data,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
		backgroundColor:'#fff',
		rowBackgroundColor:'white'
});
			
			
			winpos.add(tableview);
			
			}
		});

	});	
	
});




button_win_nor.addEventListener('click', function(e) {
	var upload_win_nor = Titanium.UI.createWindow({
		title: '普通の化粧室',
		backgroundColor:'#fff',
		barColor:'#336699'
//		url:'upload.js'
	});
	Titanium.UI.currentTab.open(upload_win_nor, {animated:true});
});





