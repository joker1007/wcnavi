function createWcAnnotation(toilet){
  var annotation = null;
	if (toilet.stin == Ti.App.ST_STIN) {
		annotation = Titanium.Map.createAnnotation({
			latitude:toilet.lat,
			longitude:toilet.lon,
			title:toilet.stname,
			image: "toilet_and_shadow.png",
			pincolor:Titanium.Map.ANNOTATION_GREEN,
			rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
			data:toilet,
			animate:true
		});
	} else {
		annotation = Titanium.Map.createAnnotation({
			latitude:toilet.lat,
			longitude:toilet.lon,
			title:toilet.tname,
			pincolor:Titanium.Map.ANNOTATION_PURPLE,
			data:toilet,
			animate:true
		});
	}

	annotation.addEventListener('click', function(e) {
		if (e.clicksource == 'rightbutton') {
			Ti.API.info(this.data)
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
		data:station,
		animate:true
	});

	annotation.addEventListener('click', function(e) {
		if (e.clicksource == 'rightButton') {
			Ti.API.info(e.source.data);
		}
	});
	return annotation;
}
