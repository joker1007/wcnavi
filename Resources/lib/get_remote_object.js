function getToilet(lat, lon, callback) {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', 'http://wcnavix.appspot.com/search?lat='+lat+'&lon='+lon+'&sort=distance');

	xhr.onload = function(){
		var result = JSON.parse(this.responseText);
		if (result.res == 0) {
			var annotations = [];
			for (var i = 0; i < result.toilets.length; i++) {
				annotations.push(createWcAnnotation(result.toilets[i]));
			}
			callback(annotations);
		}
	};

	xhr.onerror = function(){
		Titanium.UI.createAlertDialog({
			title:'通信エラー',
			message:'サーバーに接続できません',
			buttonNames:["OK"]
		}).show();
	};

	xhr.send();
}

function getStation(lat, lon, callback) {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', 'http://wcnavix.appspot.com/stations?lat='+lat+'&lon='+lon+'&sort=distance');

	xhr.onload = function(){
		var result = JSON.parse(this.responseText);
		if (result.res == 0) {
			var annotations = [];
			for (var i = 0; i < result.stations.length; i++) {
				annotations.push(createStationAnnotation(result.stations[i]));
			}
			callback(annotations);
		}
	};

	xhr.onerror = function(){
		Titanium.UI.createAlertDialog({
			title:'通信エラー',
			message:'サーバーに接続できません',
			buttonNames:["OK"]
		}).show();
	};

	xhr.send();
}
