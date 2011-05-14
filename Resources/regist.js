var win = Titanium.UI.currentWindow;

var table_data = [];

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

var wc_name = Titanium.UI.createTableViewSection({
		headerTitle: '登録名: ' + win.data.stname + " - " + win.data.liname
});
table_data.push(wc_name);

var wc_lat = Titanium.UI.createTableViewSection({
		headerTitle: '緯度: ' + win.data.lat.toString()
});
table_data.push(wc_lat);

var wc_lon = Titanium.UI.createTableViewSection({
		headerTitle: '緯度: ' + win.data.lon.toString()
});
table_data.push(wc_lon);


var wc_line = Titanium.UI.createTableViewSection({
		headerTitle: '路線:'
});
var wc_line_row = Titanium.UI.createTableViewRow({height:200});
getLines(win.data, function(lines) {
	var picker = Titanium.UI.createPicker();
	var data = lines.map(function(item) {
		return Titanium.UI.createPickerRow({title:item});
	});
	picker.add(data);
	wc_line_row.add(picker);
});
wc_line.add(wc_line_row);
table_data.push(wc_line);

var wc_pos = Titanium.UI.createTableViewSection({
		headerTitle: '場所:'
});
var wc_pos_row = Titanium.UI.createTableViewRow({height:200});
var plathome = Titanium.UI.createPickerRow({title:'ホーム内', value:0});
var entry = Titanium.UI.createPickerRow({title:'改札付近', value:1});
var other = Titanium.UI.createPickerRow({title:'その他', value:2});
var data = [plathome, entry, other];
var pos_picker = Titanium.UI.createPicker();
pos_picker.add(data);
var uiview = Titanium.UI.createView();
uiview.add(pos_picker);
wc_pos_row.add(uiview);
wc_pos.add(wc_pos_row);
table_data.push(wc_pos);


var wc_posinfo = Titanium.UI.createTableViewSection({
		headerTitle: '場所に関する補足情報:'
});
var wc_posinfo_row = Titanium.UI.createTableViewRow({
	height:100,
});
var wc_posinfo_area = Titanium.UI.createTextArea({
	height:100,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
});
wc_posinfo_row.add(wc_posinfo_area);
wc_posinfo_row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
wc_posinfo_row.className = 'control';
wc_posinfo.add(wc_posinfo_row);
table_data.push(wc_posinfo);

var tableview = Titanium.UI.createTableView({
		data:table_data,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED
});

win.add(tableview);
