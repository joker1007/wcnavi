var win = Titanium.UI.currentWindow;
var view = Ti.UI.createView({
	backgroundGradient:{
		type:'linear',
		colors:[
			{color:'#d4d4d4',position:0.0},
			{color:'#888888',position:0.50},
			{color:'#b4b4b4',position:1.0}
		]
	}
});
view.layout = 'vertical';
win.add(view);

function getLines(station, callback) {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', 'http://wcnavix.appspot.com/lines?stid='+station.stid.toString());

	xhr.onload = function() {
		var result = JSON.parse(this.responseText);
		if (result.res == 0) {
		callback(result.lines);
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
}

var wc_name = Ti.UI.createLabel({
	text:'登録名: ' + win.data.stname,
	color:'#111',
	font:{fontSize:18},
	height:20,
	width:'auto',
	top:20,
	left:10,
	textAlign:'left'
});
view.add(wc_name);

var wc_lat = Ti.UI.createLabel({
	text:'緯度: ' + win.data.lat,
	color:'#111',
	font:{fontSize:18},
	height:20,
	width:'auto',
	top:10,
	left:10,
	textAlign:'left'
});
view.add(wc_lat);

var wc_lon = Ti.UI.createLabel({
	text:'軽度: ' + win.data.lon,
	color:'#111',
	font:{fontSize:18},
	height:20,
	width:'auto',
	top:10,
	left:10,
	textAlign:'left'
});
view.add(wc_lon);

var line_value = null;
var wc_line = Ti.UI.createLabel({
	text:'路線: ',
	color:'#111',
	font:{fontSize:18},
	height:20,
	width:'auto',
	top:10,
	left:10,
	textAlign:'left'
});
view.add(wc_line);

var line_button = Ti.UI.createButton({
	title:'路線選択',
	top:15,
	left:10,
	right:10,
	height:47
});
view.add(line_button);

var line_picker = Ti.UI.createPicker({top:80, height:'auto'});
line_picker.selectionIndicator = true;
var line_picker_button = Ti.UI.createButton({
	title: '選択',
	top:0,
	height:47
});
var line_win = Ti.UI.createWindow();
line_win.layout = 'vertical';
line_win.add(line_picker);
line_win.add(line_picker_button);

line_button.addEventListener('click', function(e) {
	getLines(win.data, function(lines) {
		var data = lines.map(function(line) {
			return (Ti.UI.createPickerRow({title:line}));
		});

		line_picker.add(data);
		line_win.open({
			modal:true,
			modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
			modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
		});
	});
});

line_picker.addEventListener('change', function(e) {
	line_value = e.row.title;
	wc_line.text = '路線: ' + line_value;
});
line_picker_button.addEventListener('click', function(e) {
	line_win.close();
});


var pos_value = null;
var wc_pos = Ti.UI.createLabel({
	text:'場所: ',
	color:'#111',
	font:{fontSize:18},
	height:20,
	width:'auto',
	top:15,
	left:10,
	textAlign:'left'
});
view.add(wc_pos);

var pos_button = Ti.UI.createButton({
	title:'場所選択',
	top:15,
	left:10,
	right:10,
	height:47
});
view.add(pos_button);

var pos_picker = Ti.UI.createPicker({top:80, height:'auto'});
pos_picker.selectionIndicator = true;
var pos_data = [
	Ti.UI.createPickerRow({title:"ホーム内", value:Ti.App.ST_POS_PLATHOME}),
	Ti.UI.createPickerRow({title:"改札付近", value:Ti.App.ST_POS_ENT}),
	Ti.UI.createPickerRow({title:"その他", value:Ti.App.ST_POS_OTHER})
];
pos_picker.add(pos_data);
var pos_picker_button = Ti.UI.createButton({
	title: '選択',
	top:0,
	height:47
});
var pos_win = Ti.UI.createWindow();
pos_win.layout = 'vertical';
pos_win.add(pos_picker);
pos_win.add(pos_picker_button);

pos_button.addEventListener('click', function(e) {
	pos_win.open({
		modal:true,
		modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
		modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
	});
});

pos_picker.addEventListener('change', function(e) {
	pos_value = e.row.value;
	wc_pos.text = '場所: ' + e.row.title;
});
pos_picker_button.addEventListener('click', function(e) {
	pos_win.close();
});

var wc_posinfo = Ti.UI.createLabel({
	text:'場所に関する補足情報: ',
	color:'#111',
	font:{fontSize:18},
	height:20,
	width:'auto',
	top:15,
	left:10,
	textAlign:'left'
});
view.add(wc_posinfo);

