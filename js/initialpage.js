$(document).ready(function(){
    $('#cook').hover( function(){
        $('#cook-hamster').removeClass('hide');
        $('#regular-hamster').addClass('hide');
    },function(){
        $('#cook-hamster').addClass('hide');
        $('#regular-hamster').removeClass('hide');
    });

    $('#buy').hover(function(){
        $('#regular-hamster').addClass('hide');
        $('#buy-hamster').removeClass('hide');
    },function(){
        $('#regular-hamster').removeClass('hide');
        $('#buy-hamster').addClass('hide');
    });
});

