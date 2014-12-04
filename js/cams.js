var dir_N = 0;
var dir_NE = 45;
var dir_E = 90;
var dir_SE = 135;
var dir_S = 180;
var dir_SW = 225;
var dir_W = 270;
var dir_NW = 315;

var type_STATIC = 101;
var type_PTZ = 102

var place_INDOOR = 201;
var place_OUTDOOR = 202;

var adj_RC = 338; // offset for more logical directions on River Campus



function Cam(title, rtsp, direction, type, placement, lat, lng) {
	this.title = title;
	this.rtsp = rtsp;
	this.direction = direction % 360;
	this.type = type;
	this.placement = placement;
	this.latLng =  new google.maps.LatLng(lat, lng);
}

Cam.prototype.getIcon = function() {
	var iconScale = 5;
	var icon = {
	    path: (this.type == type_STATIC) ? google.maps.SymbolPath.FORWARD_CLOSED_ARROW : google.maps.SymbolPath.FORWARD_OPEN_ARROW,
	    scale: iconScale,
	    strokeColor: (this.placement == place_OUTDOOR) ? '#c0392b' : '#8e44ad',
	    rotation: this.direction
	};
	return icon;
}



var cams = [
  new Cam("ITSC Mezzanine 1",
  	"rtsp://172.29.22.8/live.sdp",
  	dir_SE + adj_RC, type_STATIC, place_INDOOR,
  	43.128537, -77.628001),

  new Cam("ITSC Mezzanine 2",
  	"rtsp://172.29.22.9/live.sdp",
  	dir_W + adj_RC, type_STATIC, place_INDOOR,
  	43.128479, -77.627874),

  new Cam("College Town East",
  	"rtsp://ghcamera1.net.rochester.edu/nph-h264.cgi?0",
  	dir_E, type_STATIC, place_OUTDOOR,
  	43.122901, -77.620564),

  new Cam("College Town West",
  	"rtsp://ghcamera3.net.rochester.edu/nph-h264.cgi?0",
  	dir_N, type_STATIC, place_OUTDOOR,
  	43.123067, -77.620778),

  new Cam("LeChase Hall",
  	"http://burton-camera.net.rochester.edu/index.html?size=1&mode=0",
  	dir_S + adj_RC, type_STATIC, place_OUTDOOR,
  	43.129163, -77.631433),

  new Cam("Interfaith Chapel",
  	"http://128.151.54.30/",
  	dir_E + adj_RC, type_PTZ, place_OUTDOOR,
  	43.127065, -77.632240),
  
  new Cam("Rettner Hall",
  	"http://latt-const-camera.net.rochester.edu/index.html?size=2&mode=0",
  	dir_E + adj_RC, type_STATIC, place_OUTDOOR,
  	43.128571, -77.630564),
  
  new Cam("Wilson Commons",
  	"http://wilsoncommons-webcam01.its.rochester.edu/",
  	dir_NW + adj_RC, type_PTZ, place_INDOOR,
  	43.128851, -77.629834),
  
  // new Cam("asdf",
  // 	"asdf",
  // 	asdf, type_STATIC,
  // 	asdf),
  
  // new Cam("asdf",
  // 	"asdf",
  // 	asdf, type_STATIC,
  // 	asdf),
  
  // new Cam("asdf",
  // 	"asdf",
  // 	asdf, type_STATIC,
  // 	asdf),
  
  // new Cam("asdf",
  // 	"asdf",
  // 	asdf, type_STATIC,
  // 	asdf),
  
  // new Cam("asdf",
  // 	"asdf",
  // 	asdf, type_STATIC,
  // 	asdf),
  
  // new Cam("asdf",
  // 	"asdf",
  // 	asdf, type_STATIC,
  // 	asdf),
];