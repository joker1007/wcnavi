var semi_win = Titanium.UI.currentWindow;

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
		title: '登録しますか',
//		message: 'テスト',
		buttonNames: ['OK','キャンセル'],
		cancel: 1
});

alertDialog.addEventListener('click',function(event){

//alert(ToilePosTB1.index)
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

//	xhr.send();


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
