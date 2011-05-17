exports.toilet = function(toilet_data) {
	for(property in toilet_data) {
		this[property] = toilet_data[property];
	}
};
exports.toilet.prototype = {
	getName:function() {
		return this.tname;
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
