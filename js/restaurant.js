
$(document).ready(function(){

//Global variables   

let lat;
let lng;
let map;
let infowindow;
let service;
let marker;
let results;
let request;
let address;


//On button click, initiate the apps principle functions and gets data from API

$(".js-submit").on("click", function(){
    event.preventDefault();
    $(".peekinghamster").removeClass('hide'); 

    swap();

    //Assign user inputs to local variables

    let addressInput = $(".js-search").val().trim();
    let address = encodeURIComponent(addressInput);
    let queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBsoxYLBOzXA90YtKwlMYslED2h0Hf7v7A";

    //Access apps API with ajax

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response){
    
          console.log(response);
      //Assigns API data to global variables

      lat = response.results[0].geometry.location.lat;
      lng = response.results[0].geometry.location.lng;
      initMap(lat, lng);

      console.log(lat, lng);
      });
      $("#ingredient-input").val('');
});
//App functions

//Substitutes message-div with map-div upon search-button click

function swap(){
  if($(".instructions").css('display')!="none"){
    $("#map").show().siblings(".instructions").hide();
    $(".js-rest-card").show();
  }
};

//Initializes map with data from API in the map-div
function initMap(lat, lng) {
    
  // Creates a map object and selects the map-div for display.
    
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: lat, lng: lng},
      zoom: 16
    });

      $("#map").addClass("border border-danger");
    
        //Calls up data from search term surrounding input location
        infowindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);
        
        service.nearbySearch({
          location: {lat: lat, lng: lng},
          radius: 1000,
          type: ['restaurant']
        }, callback);
};

//Finds the details of clickable locations on the map object

function placeDetailsByPlaceId(service, map, infowindow) {
    // Create and send the request to obtain details for a specific place,
    // using its Place ID.
    request = {
      placeId: document.getElementById('place-id').value
    };
    
    // If the request succeeds, draw the place location on the map as a marker
    service.getDetails(request, function (place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {

        //Registers an event to handle a click on the marker.
        marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
        });
          //Display selected data on marker click
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
              'Place ID: ' + place.place_id + '<br>' +
              place.formatted_address + '</div>');
            infowindow.open(map, this);  
            
          });
        }
});}

//Orders the creation of markers for every location returned by search

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
}

//Create and places markers on the map object

function createMarker(place) {
    var placeLoc = place.geometry.location;
    marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      animation: google.maps.Animation.DROP
});

  //On map/marker click, displays restaurant information in a card beneath the map object

  google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
      
      console.log(place)
      
        //conditional to convert hours data from true/false to open/closed in display
        
        let open;
        if (place.opening_hours.open_now === true){
          open = "Open!"
        }
        else{
          open = "Closed."
        }

          //Instructions to display card and target info in the appropriate fields

          $(".js-cardDisplay").removeClass("d-none");
          $(".rName").text(place.name);
          $(".rAddress").text(place.vicinity);
          $(".rOpen").html("Open/Closed: " + "<b>" + open + "</b>");
          $(".rRating").text("Rating out of 5: " + place.rating);
          $(".rPrice").text("Price level: " + place.price_level);
          $(".rImg").attr("src", place.photos[0].getUrl({'maxWidth': 300, 'maxHeight': 150}));
          
          console.log(place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}));
    });
  };

});