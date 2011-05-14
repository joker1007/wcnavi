var win = Titanium.UI.currentWindow;

var data = [];

var header = Ti.UI.createView({
	backgroundColor:'#999',
	height:'auto'
});

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

win.data.sort(function(t1,t2) { 
	if (t1.liname == t2.liname) {
		return t1.pos - t2.pos;
	} else {
		return t1.liname - t2.liname;
	}
});


var current_section = "";


var sections = [];
var current_section = {};
win.data.forEach(function(elm, index, array) {
	if (current_section.headerTitle !== elm.liname) {
		current_section = Titanium.UI.createTableViewSection();
		current_section.headerTitle = elm.liname;
		sections.push(current_section);
	}
	
	current_section.add(Titanium.UI.createTableViewRow({
		title:getWcPos(elm) + "/" + elm.posinfo,
		hasDetail:true,
		data_obj:elm
	}));
});





var tableview = Titanium.UI.createTableView({
	data:sections
});

win.add(tableview);
