
$(document).ready(function(){



//Creates global variables   
let lat;
let lng;

$(".js-submit").on("click", function(){
    event.preventDefault();

let addressInput = $(".js-search").val().trim();
let address = encodeURIComponent(addressInput);

let queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBsoxYLBOzXA90YtKwlMYslED2h0Hf7v7A";

$.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
console.log(response);

lat = response.results[0].geometry.location.lat;
lng = response.results[0].geometry.location.lng;
initMap(lat, lng);

console.log(lat, lng);
    });


});

let map;
let infowindow;
let service;

function initMap(lat, lng) {
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: lat, lng: lng},
      zoom: 16
    });

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    
    service.nearbySearch({
      location: {lat: lat, lng: lng},
      radius: 500,
      type: ['restaurant']
    }, callback);
  }

  service.getDetails({
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          'Place ID: ' + place.place_id + '<br>' +
          place.formatted_address + '</div>');
        infowindow.open(map, this);
      });
    }
  });

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });

    
  };

  
  

})