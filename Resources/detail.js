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
	title:win.data.liname + " - " + win.data.tname,
	height: 30,
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
	height: 30,
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

var rooms_row_head = Titanium.UI.createTableViewRow({
	title:'合計       洋式       和式       多目的',
		height: 30,
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});

var rooms_row = Titanium.UI.createTableViewRow({
	height: 30,
	title:"    " + win.data.room.toString() + "            " + win.data.west.toString() + "            "  + win.data.japan.toString() + "               " + win.data.multi.toString(),
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});

rooms.add(rooms_row_head);
rooms.add(rooms_row);
table_data.push(rooms);

var rate = Titanium.UI.createTableViewSection({
		headerTitle: '評価'
});
var rate_row = Titanium.UI.createTableViewRow({
	height:30,
	left: 130,
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});

var rate_label = Titanium.UI.createLabel({
	height:'auto',
	width:'auto',
	left:115,
	backgroundImage:'./img/40.png'
});


rate_row.add(rate_label);
rate.add(rate_row);
table_data.push(rate);

//
// CREATE ANNOTATIONS
//
var wc_annotation = Titanium.Map.createAnnotation({
	latitude:win.data.lat,
	longitude:win.data.lon,
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
		height: 145,
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		className:'maprow'
});
var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region:{latitude:win.data.lat, longitude:win.data.lon, latitudeDelta:0.005, longitudeDelta:0.005},
	animate:true,
	regionFit:true,
	annotations:[wc_annotation]
});

map_row.add(mapview);
map_section.add(map_row);
table_data.push(map_section);

var rankpos_section = Titanium.UI.createTableViewSection({
		headerTitle: '綺麗さ'
});
var rankpos_row = Titanium.UI.createTableViewRow({
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		height: 30,
		className:'rankposrow'
});

var rank_object01 = [
	{image:'./img/10.png', width:60},
	{image:'./img/20.png', width:60},
	{image:'./img/30.png', width:60},
	{image:'./img/40.png', width:60},
	{image:'./img/50.png', width:60}
];

var ToilePosTB1 = Titanium.UI.createTabbedBar({
	index:2,
	labels:rank_object01,
	style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	backgroundColor:'#33F',
	backgroundSelectedColor:'#FFF',
	height:35
});

rankpos_row.add(ToilePosTB1);
rankpos_section.add(rankpos_row);
table_data.push(rankpos_section);


var commentpos_section = Titanium.UI.createTableViewSection({
		headerTitle: 'コメント登録(空白可)'
});
var commentpos_row = Titanium.UI.createTableViewRow({
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		height: 97,
		className:'rankposrow'
});

var ToilePosTA1 = Titanium.UI.createTextArea({
        value:'',
        height:100,
		width: 308,
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

commentpos_row.add(ToilePosTA1);
commentpos_section.add(commentpos_row);
table_data.push(commentpos_section);

var subpos_section = Titanium.UI.createTableViewSection({
		headerTitle: ''
//		borderWidth:0
});
var subpos_row = Titanium.UI.createTableViewRow({
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		height: 38,
		className:'rankposrow'
});

var subpos_button = Titanium.UI.createButton({
	title:'登録',
	color:'#000000',
	height:40,
	width:308,
	font:{fontSize:18}
});

subpos_row.add(subpos_button);
subpos_section.add(subpos_row);
table_data.push(subpos_section);

subpos_button.addEventListener('click', function(e) {

	var alertDialog = Titanium.UI.createAlertDialog({
		title: '登録しますか?',
		buttonNames: ['OK','キャンセル'],
		cancel: 1
});

alertDialog.addEventListener('click',function(event){

	if(event.index == 1){
//        alert("cancel");
    } else {
 	   if(event.index == 0){


	var tid      = win.data.tid;
	var uid      =  win.data.uid;
	var comment  = ToilePosTA1.value;
	var point    = ToilePosTB1.index + 1;

	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('POST', 'http://wcnavix.appspot.com/feedback');
	Ti.API.info(tid);
	Ti.API.info(uid);
	Ti.API.info(comment);
	Ti.API.info(point);
	xhr.send({tid:tid, uid:uid, comment:comment, point:point});
	
	xhr.onload = function(){
	    Ti.API.info(this.responseText);
	};

	xhr.onerror = function(){
		Titanium.UI.createAlertDialog({
			title:'通信エラー',
			message:'サーバーに接続できません',
			buttonNames:["OK"]
		}).show();
	};
		}
	}
});
alertDialog.show();

});





var tableview = Titanium.UI.createTableView({
		data:table_data,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED
//		backgroundColor:'#fff',
//		rowBackgroundColor:'white'
});

win.add(tableview);
