//
// GEOLOCATION
// 利用前にpurposeを宣言すること
//

Titanium.Geolocation.purpose = '現在の位置情報を利用して、近くにあるトイレを検索する';
var current_loc = {};

// current_locに現在地を代入
function setCurrentPosition() {
	Titanium.Geolocation.getCurrentPosition(function(e) {
		if (e.error) {
			var alert_dialog = Titanium.UI.createAlertDialog({
				title: "位置情報取得",
				message: "位置情報の取得に失敗しました",
				buttonNames:["OK"]
			});
			alert_dialog.show();
			currennt_loc = {lat:35.45777, lon:139.63236};
		} else {
			var coords = e.coords;
			current_loc.lat = coords.latitude;
			current_loc.lon = coords.longitude;
		}
		Titanium.App.fireEvent('setlocation', {lat:current_loc.lat, lon:current_loc.lon});
	});
}

function getCurrentPosition(force) {
	if (force || !current_loc.lat) {
		setCurrentPosition();
	}
	return current_loc;
}
