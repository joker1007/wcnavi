function createWcAnnotation(toilet){
  var annotation = null;
	annotation = Titanium.Map.createAnnotation({
		latitude:toilet.lat,
		longitude:toilet.lon,
		title:toilet.tname,
		image: "toilet_and_shadow.png",
		pincolor:Titanium.Map.ANNOTATION_PURPLE,
		data_obj:toilet,
		animate:true
	});

	annotation.addEventListener('click', function(e) {
		if (e.clicksource == 'rightbutton') {
			child_win = Titanium.UI.createWindow({
					title:e.source.title,
					barColor:'#336699',
					url:'no_station_detail.js'
			});
			child_win.data = e.source.data_obj;
			Titanium.UI.currentTab.open(child_win);
		}
	});
	return annotation;
}

function createStationWcAnnotation(station){
  var annotation = null;
	annotation = Titanium.Map.createAnnotation({
		latitude:station.lat,
		longitude:station.lon,
		title:station.stname,
		pincolor:Titanium.Map.ANNOTATION_GREEN,
		image: "toilet_and_shadow.png",
		rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
		data_obj:station.toilets,
		animate:true
	});

	annotation.addEventListener("click", function(e) {
		if (e.clicksource == "rightButton") {
			child_win = Titanium.UI.createWindow({
					title:e.source.title,
					barColor:'#336699',
					url:'semi_detail.js'
			});
			child_win.data = e.source.data_obj;
			Titanium.UI.currentTab.open(child_win);
		}
	});
	return annotation;
}

function createStationAnnotation(station){
  var annotation = null;
	annotation = Titanium.Map.createAnnotation({
		latitude:station.lat,
		longitude:station.lon,
		title:station.stname,
		pincolor:Titanium.Map.ANNOTATION_GREEN,
		rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
		data_obj:station,
		animate:true
	});

	annotation.addEventListener("click", function(e) {
		var alert_dialog = Titanium.UI.createAlertDialog({
			title:'投稿確認',
			message:e.source.title + "の情報を登録しますか？",
			buttonNames:["OK", "Cancel"]
		});
		alert_dialog.addEventListener('click', function(ev) {
			if (ev.index == 0) {
				child_win = Titanium.UI.createWindow({
						title:e.source.title,
						barColor:'#336699',
						url:'regist.js'
				});
				child_win.data = e.source.data_obj;
				Titanium.UI.currentTab.open(child_win);
			}
		});
		alert_dialog.show();
	});
	return annotation;
}
