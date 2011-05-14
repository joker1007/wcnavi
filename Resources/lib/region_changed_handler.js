function checkDistance(evt, base_region) {
	if (base_region.latitude && base_region.longitude) {
		var lat_delta = base_region.latitude - evt.latitude;
		var lon_delta = base_region.longitude - evt.longitude;
		var distance = Math.sqrt(Math.pow(lat_delta, 2) + Math.pow(lon_delta, 2));
		if (distance > 0.02) {
			return true;
		}
	}
	return false;
}

function updateToiletMap(evt, base_region) {
	getToilet(evt.latitude, evt.longitude, function(toilets) {
		base_region.latitude = evt.latitude;
		base_region.longitude = evt.longitude;
		tableview.data = [];
		var stations = toiletsToStations(toilets);
		var no_stations = toiletsToNoStationsToilets(toilets);
		var st_annotations = [];
		var annotations = [];
		for (keys in stations) {
			var st_annotation = createStationAnnotation(stations[keys]);
			st_annotation.image = "toilet_and_shadow.png";
			st_annotations.push(st_annotation);

			appendSuggestRow(stations[keys]);
		}
		for (var i = 0; i < no_stations.length; i++) {
			annotations.push(createWcAnnotation(no_stations[i]));

			appendSuggestRow(no_stations[i]);
		}
		mapview.removeAllAnnotations();
		mapview.addAnnotations(st_annotations);
		mapview.addAnnotations(annotations);
	});
}

function updateStationMap(evt, base_region) {
	getStation(evt.latitude, evt.longitude, function(stations) {
		base_region.latitude = evt.latitude;
		base_region.longitude = evt.longitude;
		tableview.data = [];
		var st_annotations = [];
		for (var i = 0; i < stations.length; i++) {
			var st_annotation = createStationAnnotation(stations[i]);
			st_annotation.addEventListener("click", function(e) {
				var alert_dialog = Titanium.UI.createAlertDialog({
					title:'投稿確認',
					message:e.source.title + "の情報を登録しますか？",
					buttonNames:["OK", "Cancel"]
				});
				alert_dialog.show();
			});
			st_annotations.push(st_annotation);
		}
		mapview.removeAllAnnotations();
		mapview.addAnnotations(st_annotations);
	});
}
