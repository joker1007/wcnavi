exports.toilet = function(toilet_data) {
	for(property in toilet_data) {
		this[property] = toilet_data[property];
	}
};
exports.toilet.prototype = {
	getName:function() {
		return this.tname;
	},
	getRateImageName:function() {
		if (this.rate < 0.5) {
			return "00.png";
		} else if (this.rate < 1.0) {
			return "05.png";
		} else if (this.rate < 1.5) {
			return "10.png";
		} else if (this.rate < 2.0) {
			return "15.png";
		} else if (this.rate < 2.5) {
			return "20.png";
		} else if (this.rate < 3.0) {
			return "25.png";
		} else if (this.rate < 3.5) {
			return "30.png";
		} else if (this.rate < 4.0) {
			return "35.png";
		} else if (this.rate < 4.5) {
			return "40.png";
		} else if (this.rate < 5.0) {
			return "45.png";
		} else {
			return "50.png";
		}
	},
	getWcPos:function() {
		switch (this.pos) {
			case Ti.App.ST_POS_PLATHOME:
				return "ホーム内";
			case Ti.App.ST_POS_ENT:
				return "改札付近";
			default:
				return "その他";
		}
	},

	getGender:function() {
		switch (this.gender) {
			case Ti.App.ST_MALE:
				return "男性用";
			case Ti.App.ST_FEMALE:
				return "女性用";
			default:
				return "その他";
		}
	}, 

	getPublic:function() {
		if (this.public == Ti.App.ST_PUBLIC) {
			return "公衆";
		} else {
			return "その他";
		}
	}
};
