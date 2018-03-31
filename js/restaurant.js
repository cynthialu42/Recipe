

$(document).ready(function(){

//Creates global variables   

let type = "restaurants";
let address = "1443 W Argyle";
let queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBsoxYLBOzXA90YtKwlMYslED2h0Hf7v7A"
let lat;
let lng;
let mapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDLu3qEb-a08j4oxG1ooo8ih6l9WBIBYT4&callback=initMap";



$.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
console.log(response);

let lat = response.results[0].geometry.location.lat;
let lng = response.results[0].geometry.location.lng;

console.log(lat, lng);
    });
        






})