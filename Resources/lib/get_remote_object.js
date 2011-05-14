function getToilet(lat, lon, callback) {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', 'http://wcnavix.appspot.com/search?lat='+lat+'&lon='+lon+'&sort=distance');

	xhr.onload = function(){
		var result = JSON.parse(this.responseText);
		if (result.res == 0) {
			callback(result.toilets);
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
