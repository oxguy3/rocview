var infowindow = new google.maps.InfoWindow({
  content: '<div id="infowindowContent"></div>'
});

var markers = [];


function findCamByLatLng(latLng) {
  for (var i = 0; i < cams.length; i++) {
    var cam = cams[i];
    if (cam.latLng.equals(latLng)) {
      return cam;
    }
  }
  return null;
}

function findMarkerByLatLng(latLng) {
  for (var i = 0; i < markers.length; i++) {
    var marker = markers[i];
    if (marker.getPosition().equals(latLng)) {
      return marker;
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
    center: { lat: 43.126954, lng: -77.625124},
    zoom: 16
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  for (var i = 0; i < cams.length; i++) {
    var cam = cams[i];
    var marker = new google.maps.Marker({
      position: cam.latLng,
      map: map,
      icon: cam.getIcon()
    });
    markers[i] = marker;

    google.maps.event.addListener(marker, 'click', function(event) {
      handleCamClick(findCamByLatLng(event.latLng));
    });

    google.maps.event.addListener(marker, 'mouseover', function(event) {
      var cam = findCamByLatLng(event.latLng);
      var currMarker = findMarkerByLatLng(event.latLng);
      var html = '<div id="infowindowContent">';
      html += '<strong>' + cam.title + '</strong>';
      html += '<p>' + cam.getPrettyType() + ", " + cam.getPrettyPlacement() + '</p>';
      html += '</div>';
      infowindow.setContent(html);
      infowindow.open(map, currMarker);
    });

    google.maps.event.addListener(marker, 'mouseout', function(event) {
      var currMarker = findMarkerByLatLng(event.latLng);
      infowindow.close(map, currMarker);
    });

  }
  google.maps.event.addListener(map, 'click', function(event) {
    var latLng = event.latLng;
    console.log(latLng.lat().toFixed(6) + ", " + latLng.lng().toFixed(6));
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