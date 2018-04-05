
$(document).ready(function(){



//Creates global variables   
let lat;
let lng;

$(".js-submit").on("click", function(){
    event.preventDefault();
    $(".peekinghamster").removeClass('hide');
    
    swap();

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

    $("#ingredient-input").val('');
});

let map;
let infowindow;
let service;
let marker;
let results;
let request;
let address;


function swap(){
  if($(".instructions").css('display')!="none"){
    $("#map").show().siblings(".instructions").hide();
    $(".js-rest-card").show();
  }
};

function initMap(lat, lng) {
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: lat, lng: lng},
      zoom: 16
    });

    $("#map").addClass("border border-danger");
    

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    
    service.nearbySearch({
      location: {lat: lat, lng: lng},
      radius: 1000,
      type: ['restaurant']
    }, callback);
  };

  function placeDetailsByPlaceId(service, map, infowindow) {
    // Create and send the request to obtain details for a specific place,
    // using its Place ID.
    request = {
      placeId: document.getElementById('place-id').value
    };
    
  
    service.getDetails(request, function (place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        // If the request succeeds, draw the place location on the map
        // as a marker, and register an event to handle a click on the marker.
        marker = new google.maps.Marker({
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
  });}

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
 
      console.log(place)
      
      let open;
      if (place.opening_hours.open_now === "true"){
        open = "Open!"
      }
      else{
        open = "Closed."
      }
      $(".js-cardDisplay").removeClass("d-none");
      $(".rName").text(place.name);
      $(".rAddress").text(place.vicinity);
      $(".rOpen").text("Open/Closed: " + open);
      $(".rRating").text("Rating out of 5: " + place.rating);
      $(".rPrice").text("Price level: " + place.price_level);
      $(".rImg").attr("src", place.photos[0].getUrl({'maxWidth': 300, 'maxHeight': 150}));
      
      console.log(place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}));

    });

    
  };

})