var guide_label = null;

function createLabel() {

	if (guide_label == null) {
	guide_label = Titanium.UI.createLabel({
		text:'投稿したい駅を選択してください',
		textAlign:'center',
		width:'auto',
		font:{fontSize:20},
		backgroundColor:'#fff',
		color:'#336699',
		shadowColor:'#bbb',
		shadowOffset:{x:2,y:2},
		top:338
	});
	Titanium.UI.currentWindow.add(guide_label);
	} else {
		guide_label.show();
	}

}

function mapModeEdit() {
	tableview.animate({visible:false, duration:100}, function(e) {
		mapview.animate({height:338, duration:300}, function(e) {
			createLabel();
		});
	});
}

function tableShow(tb) {
	tb.show();
}

function mapShrink(map) {
	map.animate({height:200, duration:300}, function(e) {
		tableShow(tableview);
	});
}

function labelHide(label) {
	label.hide();
}

function mapModeNormal() {
	labelHide(guide_label);
	mapShrink(mapview);
}
