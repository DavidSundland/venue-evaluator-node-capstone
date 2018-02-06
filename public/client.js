function searchNames() {
    var input, venueList, venueNames, a, i;
    input = document.getElementById("nameSearch").value.toUpperCase();
    venueList = document.getElementById("listBox");
    venueNames = venueList.getElementsByTagName("p");
    for (i = 0; i < venueNames.length; i++) {
        a = venueNames[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(input) > -1) {
            venueNames[i].style.display = "";
        } else {
            venueNames[i].style.display = "none";

        }
    }
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

function leaveReview() {
    $('.listBox').on('click', 'button', viewVenue); /* Note - viewVenue function is in index.html */
    let tempBoo = true; // REPLACE THIS ONCE USER LOG-IN FUNCTIONAL
    $('.venueBox').on('click', '#reviewButton', function () {
        $('#closeVenue').removeClass('venueVisible');
        if (tempBoo) {
            $('.login').addClass('venueVisible');
        } else {
            $('#leaveReview').addClass('venueVisible');
        }
        /* NOTE - WHEN REVIEW SUBMITTED OR CANCELLED, NEED TO MAKE #CLOSEVENUE BUTTON VISIBLE AGAIN */
    });
}

function rateVenue() {
    console.log("in rateVenue;")
    $("#userReviews").on('click', '.star', function () {
        console.log("clicked");
        let ratingClicked = $(this).attr("value");
        console.log(ratingClicked);
        let oldColor = $(this).parent().css("color"); /* target color gets changed when clicked, so get base color from parent instead */
        let newColor = "#86034D";
        if (ratingClicked === "5") {
            $(this).parent().find(".value1").css("color", newColor);
            $(this).parent().find(".value2").css("color", newColor);
            $(this).parent().find(".value3").css("color", newColor);
            $(this).parent().find(".value4").css("color", newColor);
            $(this).parent().find(".value5").css("color", newColor);
        } else if (ratingClicked === "4") {
            $(this).parent().find(".value1").css("color", newColor);
            $(this).parent().find(".value2").css("color", newColor);
            $(this).parent().find(".value3").css("color", newColor);
            $(this).parent().find(".value4").css("color", newColor);
            $(this).parent().find(".value5").css("color", oldColor);
        } else if (ratingClicked === "3") {
            $(this).parent().find(".value1").css("color", newColor);
            $(this).parent().find(".value2").css("color", newColor);
            $(this).parent().find(".value3").css("color", newColor);
            $(this).parent().find(".value4").css("color", oldColor);
            $(this).parent().find(".value5").css("color", oldColor);
        } else if (ratingClicked === "2") {
            $(this).parent().find(".value1").css("color", newColor);
            $(this).parent().find(".value2").css("color", newColor);
            $(this).parent().find(".value3").css("color", oldColor);
            $(this).parent().find(".value4").css("color", oldColor);
            $(this).parent().find(".value5").css("color", oldColor);
        } else {
            $(this).parent().find(".value1").css("color", newColor);
            $(this).parent().find(".value2").css("color", oldColor);
            $(this).parent().find(".value3").css("color", oldColor);
            $(this).parent().find(".value4").css("color", oldColor);
            $(this).parent().find(".value5").css("color", oldColor);
        }
    });
}

function listVenues() {
    let testVenueList = [{
        "Venue_Name": "701 Restaurant",
        "Primary_Genre": "Potpourri",
        "Website": "http://701restaurant.com/about/live-jazz/",
        "Google_Map_URL": "https://goo.gl/maps/seWMAXmPyKP2",
        "Latitude": 38.894292,
        "Longitude": -77.022442,
        "Full_Address": "701 Pennsylvania Ave. NW, Washington, DC 20004",
        "Street_Address": "701 Pennsylvania Ave. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": 20004,
        "Description": "701 offers the warmth and charm of a private club and a picturesque setting, providing guests with a truly memorable dining experience. Menus reflect an inventive approach to Contemporary Continental Cuisine. 701 also offers a bar with a vast selection of culinary treats and signature cocktails, and a recently renovated 'back lounge.' During the warmer months, the patio provides a pleasant view of the Navy Memorial's cascading fountains and the National Archives. Live piano is provided in the evening, Thursday through Saturday.",
        "Image_URL": "https://github.com/DavidSundland/venue-evaluator-node-capstone/blob/master/public/images/701.jpg?raw=true"
}, {
        "Venue_Name": "9:30 Club",
        "Primary_Genre": "Rock & Pop",
        "Website": "http://www.930.com/",
        "Google_Map_URL": "https://goo.gl/maps/EbAXTg6iEvE2",
        "Latitude": 38.9179969,
        "Longitude": -77.0258807,
        "Full_Address": "815 V St. NW, Washington, DC 20001",
        "Street_Address": "815 V St. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": 20001,
        "Description": "9:30 Club is a standing-only venue with a capacity of 1200 people. It is a state-of-the-art concert space which presents top-name rock, punk, hip-hop and country acts nightly. It has won multiple Billboard Touring Awards and Pollstar 'Nightclub of the Year' honors, and was rated as the #1 Big Room in America by Rolling Stone Magazine Online. It has long been the District's premier venue for nationally known touring acts.",
        "Image_URL": "https://github.com/DavidSundland/venue-evaluator-node-capstone/blob/master/public/images/930.jpg?raw=true"
}, {
        "Venue_Name": "Museum of American Art",
        "Primary_Genre": "Classical",
        "Website": "http://www.si.edu/Events/Calendar/?trumbaEmbed=filter1%3D_%26-index%26filterfield1%3D11153#/?i=2",
        "Google_Map_URL": "https://goo.gl/maps/LqZXy3Q9DxJ2",
        "Latitude": 38.8978609,
        "Longitude": -77.0251306,
        "Full_Address": "800 G St. NW, Washington, DC 20001",
        "Street_Address": "800 G St. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": 20001,
        "Description": "The Smithsonian American Art Museum and National Portrait Gallery share the Nan Tucker McEvoy Auditorium, a 346-seat facility located on the building's lower level, and the Kogod Courtyard, a covered space in the center of the building. Monthly concerts are also held in the American Art Museum's Luce Center.  In addition to music, public programming includes lectures, films, theater and dance performances.",
        "Image_URL": "https://github.com/DavidSundland/venue-evaluator-node-capstone/blob/master/public/images/american-art.jpg?raw=true"
}, {
        "Venue_Name": "American University - Greenberg",
        "Primary_Genre": "Classical",
        "Website": "http://american.tix.com",
        "Google_Map_URL": "https://goo.gl/maps/QFPcdRVHZg62",
        "Latitude": 38.9434072,
        "Longitude": -77.0798043,
        "Full_Address": "4200 Wisconsin Ave. NW, Washington, DC 20016",
        "Street_Address": "4200 Wisconsin Ave. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": 20016,
        "Description": "American University operates the off-campus Greenberg Theatre, which principally showcases the university, but which also features guest artists on occasion. Its mission is to provide American University and the local community a venue for live performances in music, theatre and dance. It is the primary performance space for AU's Performing Arts Department.",
        "Image_URL": "https://github.com/DavidSundland/venue-evaluator-node-capstone/blob/master/public/images/greenberg.jpg?raw=true"
}];
    $("#listBox").text(""); /* clear existing text, if any */
    for (let x = 0; x < testVenueList.length; x++) {
        testVenueList[x].Description.replace(/\s+/g, ' '); /* eliminate extra spaces, if any */
        let wordList = testVenueList[x].Description.split(" ");
        let maxWords = 30;
        let description = "";
        if (wordList.length > maxWords) {
            for (y = 0; y < maxWords; y++) {
                description += wordList[y] + " ";
            }
            description += "...";
        } else {
            description = testVenueList[x].Description;
        }
        $("#listBox").append(`<p class="oneVenue" id="venue${x}"><a href="${testVenueList[x].Website}" class="venueName">${testVenueList[x].Venue_Name}</a> - <span class="address">${testVenueList[x].Street_Address}</span><br><span class="description">${description}</span><button>More Info</button><input type="hidden" class = "picUrl" value="${testVenueList[x].Image_URL}"><input type="hidden" class = "fullDesc" value="${testVenueList[x].Description}"></p>`);
        //        let venueId = "venue" + x;
        //        let storageName = "object" + x;
        //        let dataLoc = $(venueId)[0];
        //        jQuery.data(dataLoc, storageName, testVenueList[x]);
    }
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

$(':radio').change(function () { // NEED TO ADAPT THIS TO ACTUALLY ASSIGN VALUES TO EACH RATING
    console.log('New star rating: ' + this.value);
});

//
//<input name="userName" placeholder="username">
//    <input name="password" placeholder="password">
//        <input name = "passwordConfirm" placeholder="password confirm">

$('#login').on('submit', function (event) {
    event.preventDefault();
    const uname = $('input[name="userName"]').val();
    const pw = $('input[name="password"]').val();
    const confirmPw = $('input[name="passwordConfirm"]').val();
    if (pw !== confirmPw) {
        alert('Passwords must match!');
    } else {
        const newUserObject = {
            username: uname,
            password: pw
        };
        // will assign a value to variable 'user' in signin step below
        // AJAX call to send form data up to server/DB and create new user
        $.ajax({
                type: 'POST',
                url: '/users/create',
                dataType: 'json',
                data: JSON.stringify(newUserObject),
                contentType: 'application/json'
            })
            .done(function (result) {
                //            newUserToggle = true;
                //            alert('Thanks for signing up! You may now sign in with your username and password.');
                //            showSignInPage();
                console.log(result)
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});






$(clickVenue);
$(clickClose);
$(raiseCurtain);
$(listVenues);
$(leaveReview);
$(rateVenue);
