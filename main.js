$(document).ready(function(){

    // need to push all ingredients to an array
    function showRecipes(){

        // 
        var queryURL = "https://api.edamam.com/search?q=chicken&app_id=40511119&app_key=ef36201a4e68b398295a867bfcb3f89a";
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
        });
    
    }

    showRecipes();
});