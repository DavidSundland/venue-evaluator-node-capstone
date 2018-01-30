window.initMap = function () { // making sure available to global scope (else "initMap is not a function" error possible)
    var mapPoints = [{
        "id": "club930",
        "title": "9:30 Club",
        "position": {
            "lat": 38.9179969,
            "lng": -77.023692
        }
    }, {
        "id": "restaurant701",
        "title": "701 Restaurant",
        "position": {
            "lat": 38.894292,
            "lng": -77.022442
        }
    }, {
        "id": "americanArt",
        "title": "Museum of American Art",
        "position": {
            "lat": 38.8978609,
            "lng": -77.0251306
        }
    }];
    var mapCenter = {
        lat: 38.9222375,
        lng: -77.0093275
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: mapCenter
    });
    var markers = [];
    for (let x = 0; x < mapPoints.length; x++) {
        console.log(mapPoints[x].position);
        markers.push(new google.maps.Marker({
            position: mapPoints[x].position,
            map: map,
            title: mapPoints[x].title
        }));
        markers[x].addListener('click', viewVenue);
    }
}

function clickVenue() {
    console.log("In viewVenue");
    $('.listBox').on('click', 'button', viewVenue);
}


function viewVenue() {
    $('.jsHide').addClass("venueVisible");
    var venueLoc = {
        lat: 38.9179969, // MAKE A VARIABLE THAT IS TIED TO DATABASE / 'THIS'
        lng: -77.023692
    };
}

function clickClose() {
    $('#closeVenue').click(function () {
        console.log('clicked');
        $('.jsHide').removeClass('venueVisible');
    });
}

function raiseCurtain() {
    $(".curtainMain").delay(1000).slideUp(4000);
}


//function initVenueMap() {
//    console.log("In initVenueMap");
//    var venueMap = new google.maps.Map(document.getElementById('venueMap'), {
//        zoom: 13,
//        center: venueLoc
//    });
//    //    src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAa9jFz1GClkj8pW9ytY6tB70hVFj1RGYQ&callback=initMap";
//    var marker = new google.maps.Marker({
//        position: venueLoc,
//        map: venueMap,
//        title: "9:30 Club" // MAKE A VARIABLE
//    });
//}

//var marker = new google.maps.Marker({
//position: uluru,
//map: map,
//title: "9:30 Club"
//});
//var marker = new google.maps.Marker({
//position: bob,
//map: map
//});
//}
$(clickVenue);
$(clickClose);
$(raiseCurtain);
