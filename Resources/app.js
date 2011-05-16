// STATUS CONST
//
Ti.App.ST_STIN = 1;
Ti.App.ST_STOUT = 0;
Ti.App.ST_POS_PLATHOME = 0;
Ti.App.ST_POS_ENT = 1;
Ti.App.ST_POS_OTHER = 2;
Ti.App.ST_MALE = 0;
Ti.App.ST_FEMALE = 1;
Ti.App.ST_NOPUBLIC = 0;
Ti.App.ST_PUBLIC = 1;

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var tabGroup = Titanium.UI.createTabGroup();

var win1 = Titanium.UI.createWindow({  
		title:'近くの化粧室',
		backgroundColor:'#fff',
		barColor:'#336699',
		url:'top.js',
		tabBarHidden:true
});

var win2 = Titanium.UI.createWindow({  
		title:'sub',
		backgroundColor:'#fff',
		barColor:'#336699',
		tabBarHidden:true
});

var tab1 = Titanium.UI.createTab({
		icon:'KS_nav_views.png',
		title:'検索',
		window:win1
});

var tab2 = Titanium.UI.createTab({
		icon:'KS_nav_views.png',
		title:'設定',
		window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'}
});

win2.add(label2);

tabGroup.addTab(tab1);
tabGroup.addTab(tab2);

tabGroup.open();
