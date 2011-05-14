var win = Titanium.UI.currentWindow;

var table_data = [];

var wc_name = Titanium.UI.createTableViewSection({
		headerTitle: '登録名: ' + win.data.stname + " - " + win.data.liname,
});
table_data.push(wc_name);

var wc_lat = Titanium.UI.createTableViewSection({
		headerTitle: '緯度: ' + win.data.lat.toString(),
});
table_data.push(wc_lat);

var wc_lon = Titanium.UI.createTableViewSection({
		headerTitle: '緯度: ' + win.data.lon.toString(),
});
table_data.push(wc_lon);
