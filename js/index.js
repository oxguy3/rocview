function Cam(title, rtsp, lat, lng) {
  this.title = title;
  this.rtsp = rtsp;
  this.latLng =  new google.maps.LatLng(lat, lng);
}

function findCamByLatLng(latLng) {
  for (var i = 0; i < cams.length; i++) {
    var cam = cams[i];
    if (cam.latLng.equals(latLng)) {
      return cam;
    }
  }
  return null;
}

$(document).ready(function(){
  resizeDiv();
});

window.onresize = function(event) {
  resizeDiv();
}

function resizeDiv() {
  vpw = $(window).width();
  vph = $(window).height();
  $('#map-canvas').css({'height': vph + 'px'});
}

function initialize() {
  var mapOptions = {
    center: { lat: 43.128988, lng: -77.630541},
    zoom: 16
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  for (var i = 0; i < cams.length; i++) {
    var cam = cams[i];
    var marker = new google.maps.Marker({
      position: cam.latLng,
      map: map,
      title: cam.title,
      icon: 'img/webcam.png'
    });

    google.maps.event.addListener(marker, 'click', function(event) {
      handleCamClick(findCamByLatLng(event.latLng));
    });
  }
  google.maps.event.addListener(map, 'click', function(event) {
    var latLng = event.latLng;
    console.log(latLng.lat() + ", " + latLng.lng());
  });
}

function handleCamClick(cam) {

  if (cam.rtsp.indexOf("rtsp://") == 0) {
    document.location = cam.rtsp;

  } else {
    window.open(cam.rtsp);
  }
  // $('#camModalLabel').html(cam.title);
  // $('#camModalLink').attr("href", cam.rtsp);

  // $('#camModal').modal('show');
  // var vlc = document.getElementById("vlc0");
  // console.log(vlc);
  // var playlistId = vlc.playlist.add(cam.rtsp);
  // vlc.playlist.playItem(playlistId);
}

google.maps.event.addDomListener(window, 'load', initialize);