"use strict";

$(document).ready(function() {
    var mapOptions = {
        center: {lat: 47.6, lng: -122.3},
        zoom: 12
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var infoWindow = new google.maps.InfoWindow();

    var cameras;
    var markers = [];

    $.getJSON('http://data.seattle.gov/resource/65fc-btcc.json', function(data) {
            cameras = data;
            data.forEach(function(camera) {
                var marker = new google.maps.Marker ({
                    position: {
                        lat: Number(camera.location.latitude),
                        lng: Number(camera.location.longitude)
                    },
                    map: map
                });
                google.maps.event.addListener(marker, 'click', function() {
                    map.panTo(this.getPosition());
                    var html = '<p>' + camera.cameralabel + '</p>';
                    html += '<img src=' + camera.imageurl.url + '>';
                    infoWindow.setContent(html);
                    infoWindow.open(map, marker);
                });
                $("#search").bind( "search keyup", function() {
                    var cam = camera.cameralabel.toLowerCase();
                    var searched = this.value.toLowerCase();
                    if (cam.indexOf(searched) != -1) {
                        marker.setMap(map);
                    } else {
                        marker.setMap(null);
                    }
                })
            });
        })
        .fail(function(error) {
            alert("Something went wrong!");
        });
});



