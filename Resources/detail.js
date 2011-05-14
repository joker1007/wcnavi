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

function getGender(wc_data) {
	switch (wc_data.gender) {
		case 0:
			return "男性用";
		case 1:
			return "女性用";
		default:
			return "その他";
	}
}


function getPublic(wc_data) {
	switch (wc_data.public) {
		case 1:
			return "公衆";
		default:
			return "その他";
	}
}


function nvl(wc_data) {

	if(wc_data == null) {
		return "";
	} else {
		return wc_data;
	}
}


var table_data = [];

var wc_name = Titanium.UI.createTableViewSection({
		headerTitle: '登録名: ' + win.data.tname + " - " + win.data.liname,

});

//table_data.push(wc_name);

var wc_tid = Titanium.UI.createTableViewSection({
		headerTitle: '(登録: ' + win.data.uid + ')',
//			backgroundImage:'./img/40.png',
		bottom:20
});

//table_data.push(wc_tid);

var rate_label = Titanium.UI.createLabel({
	height:'auto',
	width:'auto',
	left:115,
	backgroundImage:'./img/35.png'
});

var rate = Titanium.UI.createTableViewSection({
		headerTitle: '評価'
});

var rate_row = Titanium.UI.createTableViewRow({
	height: 30,
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});


var wc_pos = Titanium.UI.createTableViewSection({
		headerTitle: '登録名: ' + win.data.tname + " - " + win.data.liname
});


var wc_pos_gen = Titanium.UI.createTableViewRow({
	title: '種類: ' + getGender(win.data) + '(' + getPublic(win.data) + ')',
	height: 30,
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});

var wc_pos_rank = Titanium.UI.createTableViewRow({
	title: '個室数: ' + win.data.room.toString() + ' (洋式' + win.data.west.toString() + ',和式' + win.data.japan.toString() +  ',多目的' + win.data.multi.toString() + ')',
	height: 30,
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});

var wc_pos_row = Titanium.UI.createTableViewRow({
	title: '場所: ' + getWcPos(win.data),
	height: 30,
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});


var wc_label = Titanium.UI.createLabel({
	height:'auto',
	width:'auto',
	text: win.data.comment
//	left:115,
//	backgroundImage:'./img/40.png'
});

var wc_posword_row = Titanium.UI.createTableViewRow({
	title:'',
	height:120,
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});

var wc_annotation = Titanium.Map.createAnnotation({
	latitude:win.data.lat,
	longitude:win.data.lon,
	title:win.data.stname,
	image:"toilet_and_shadow.png",
	pincolor:Titanium.Map.ANNOTATION_GREEN
});

var map_section = Titanium.UI.createTableViewSection({
		headerTitle: '地図'
});
var map_row = Titanium.UI.createTableViewRow({
		height: 130,
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		className:'maprow'
});
var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region:{latitude:win.data.lat, longitude:win.data.lon, latitudeDelta:0.005, longitudeDelta:0.005},
	animate:true,
	regionFit:true,
			height: 125,
	width: 270,
	annotations:[wc_annotation]
});


rate_row.add(rate_label);
//rate.add(rate_row);
wc_pos.add(rate_row);


wc_pos.add(wc_pos_gen);
wc_pos.add(wc_pos_rank);
wc_pos.add(wc_pos_row);

wc_posword_row.add(wc_label);
wc_pos.add(wc_posword_row);

map_row.add(mapview);
wc_pos.add(map_row);

table_data.push(wc_pos);




//
// CREATE ANNOTATIONS
//


//
// CREATE MAP SECTION
//

var rankpos_section = Titanium.UI.createTableViewSection({
		headerTitle: '口コミを投稿する'
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

var commentpos_row = Titanium.UI.createTableViewRow({
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		height: 97,
		className:'rankposrow'
});



var ToilePosTA1 = Titanium.UI.createTextArea({
        value:'',
        height:90,
		width: 260,
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
rankpos_section.add(commentpos_row);





var commentpos_section = Titanium.UI.createTableViewSection({
		headerTitle: 'コメント登録(空白可)'
});
var commentpos_row = Titanium.UI.createTableViewRow({
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		height: 120,
		className:'rankposrow'
});


//commentpos_row.add(ToilePosTA1);
//commentpos_section.add(commentpos_row);
//table_data.push(commentpos_section);

var subpos_section = Titanium.UI.createTableViewSection({
		headerTitle: ''
//		borderWidth:0
});
var subpos_row = Titanium.UI.createTableViewRow({
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		height: 55,
		className:'rankposrow'
});

var subpos_button = Titanium.UI.createButton({
	title:'登録',
	color:'#000000',
	height:40,
	width:200,
	font:{fontSize:18}
});

subpos_row.add(subpos_button);
rankpos_section.add(subpos_row);

//table_data.push(subpos_section);

table_data.push(rankpos_section);

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
