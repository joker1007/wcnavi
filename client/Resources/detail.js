var win = Titanium.UI.currentWindow;

var table_data = [];

var rate_image = Titanium.UI.createImageView({
	image:'./img/' + win.data.getRateImageName(),
	height:25
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
	title: '種類: ' + win.data.getGender() + '(' + win.data.getPublic() + ')',
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
	title: '場所: ' + win.data.getWcPos(),
	height: 30,
	selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	className:'valuerow'
});


var wc_label = Titanium.UI.createLabel({
	height:'auto',
	width:'auto',
	text: win.data.comment
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


rate_row.add(rate_image);
wc_pos.add(rate_row);


wc_pos.add(wc_pos_gen);
wc_pos.add(wc_pos_rank);
wc_pos.add(wc_pos_row);

wc_posword_row.add(wc_label);
wc_pos.add(wc_posword_row);

map_row.add(mapview);
wc_pos.add(map_row);

table_data.push(wc_pos);




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
	width: 280,
	color:'#888',
	textAlign:'left',
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

var subpos_section = Titanium.UI.createTableViewSection({
		headerTitle: ''
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


table_data.push(rankpos_section);

subpos_button.addEventListener('click', function(e) {
	var alertDialog = Titanium.UI.createAlertDialog({
		title: '登録しますか?',
		buttonNames: ['OK','キャンセル'],
		cancel: 1
	});

	alertDialog.addEventListener('click',function(event){

		if(event.index == 1){
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
});

win.add(tableview);
