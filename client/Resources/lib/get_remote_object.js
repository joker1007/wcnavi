// CLASS定義読み込み
var Toilet = require('lib/toilet').toilet;
var Station = require('lib/station').station;

function getToilet(lat, lon, callback) {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', 'http://'+Ti.App.ServerHost+'/search?lat='+lat+'&lon='+lon+'&sort=distance');

	xhr.onload = function(){
		var result = JSON.parse(this.responseText);
		if (result.res == 0) {
			var toilets = result.toilets.map(function(elm) {
				return new Toilet(elm);
			});
			callback(toilets);
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
	xhr.open('GET', 'http://'+Ti.App.ServerHost+'/stations?lat='+lat+'&lon='+lon+'&sort=distance');

	xhr.onload = function(){
		var result = JSON.parse(this.responseText);
		if (result.res == 0) {
			callback(result.stations);
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
