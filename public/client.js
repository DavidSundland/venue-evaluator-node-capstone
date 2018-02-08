let LOGGEDIN = false;

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
        $('.login').removeClass('venueVisible');
        $('.newUser').removeClass('venueVisible');
        $('#leaveReview').removeClass('venueVisible');
    });
}

function raiseCurtain() {
    $(".curtainMain").delay(1000).slideUp(3000);
}

function watchButtons() {
    $('.listBox').on('click', 'button', viewVenue); /* Note - viewVenue function is in index.html */
    $('.venueBox').on('click', '#reviewButton', showReview);
    $('.login').on('click', '#newUserButton', createNewUser);
    $('.login').on('click', '#cancelLogin', function () {
        console.log("clicked");
        $('.login').removeClass('venueVisible');
        $('.jsHide').addClass("venueVisible");
    });
    $('.newUser').on('click', '#cancelNewUser', function () {
        $('.newUser').removeClass('venueVisible');
        $('.jsHide').addClass("venueVisible");
    });
}

function showReview() {
    $('#closeVenue').removeClass('venueVisible'); // Hide close venue button
    if (!LOGGEDIN) {
        $('.login').addClass('venueVisible');
    } else {
        $('#leaveReview').addClass('venueVisible');
    }
    /* NOTE - WHEN REVIEW SUBMITTED OR CANCELLED, NEED TO MAKE #CLOSEVENUE BUTTON VISIBLE AGAIN */
}

function createNewUser(event) {
    event.preventDefault(); // otherwise page reloads when this function starts
    $('.login').removeClass('venueVisible');
    $('.newUser').addClass('venueVisible');
}

function rateVenue() {
    let listeningExperience = 0;
    let venueFeel = 0;
    let musicValue = 0;
    let bandQuality = 0;
    let foodQuality = 0;
    let foodValue = 0;
    $('#leaveReview').on('click', '#skipReview', function () {
        console.log("clicked");
        $('#leaveReview').removeClass('venueVisible');
        $('.jsHide').addClass("venueVisible");
    }); // HAVE TO ADD FUNCTIONALITY TO RETURN STARS TO ORIGINAL COLOR AND CLEAR VALUES
    $("#userReviews").on('click', '.star', function () {
        let categoryClicked = $(this).parent().attr("id");
        console.log(categoryClicked, "clicked");
        let ratingClicked = $(this).attr("value");
        console.log(ratingClicked);
        if (categoryClicked === "listeningExperience") {
            listeningExperience = ratingClicked
        } else if (categoryClicked === "venueFeel") {
            venueFeel = ratingClicked
        } else if (categoryClicked === "musicValue") {
            musicValue = ratingClicked
        } else if (categoryClicked === "bandQuality") {
            bandQuality = ratingClicked
        } else if (categoryClicked === "foodQuality") {
            foodQuality = ratingClicked
        } else {
            foodValue = ratingClicked
        }
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
    $(".commentButtons").on('click', '#submitReview', function () {
        if (listeningExperience === 0 || venueFeel === 0 || musicValue === 0 || bandQuality === 0) {
            alert("You can't leave any of the first four star fields blank!");
        } else {
            event.preventDefault();
            let review = $("#userComments").val();
            const newReviewObject = { // Need to figure out how to pull username and venueId or venueName
                userName: "Joe ConcertGoer",
                listeningExperience: listeningExperience,
                venueFeel: venueFeel,
                musicValue: musicValue,
                bandQuality: bandQuality,
                foodQuality: foodQuality,
                foodValue: foodValue,
                review: review,
                venueName: "9:30 Club"
            };
            $.ajax({
                    type: 'POST',
                    url: '/reviews/create',
                    dataType: 'json',
                    data: JSON.stringify(newReviewObject),
                    contentType: 'application/json'
                })
                .done(function (result) {
                    console.log("new review posted");
                })
                .fail(function (jqXHR, error, errorThrown) {
                    console.log(jqXHR);
                    console.log(error);
                    console.log(errorThrown);
                });
            // HAVE TO ADD FUNCTIONALITY TO RETURN STARS TO ORIGINAL COLOR AND CLEAR VALUES
        }
        console.log(listeningExperience, venueFeel, musicValue, bandQuality, foodQuality, foodValue);
    });
}

$.getJSON('/cats', function (res) {
    console.log("logging results", res)
});

function listVenues() {
    $.getJSON('/locations', function (res) {
        $("#listBox").text(""); /* clear existing text, if any */
        for (x = 0; x < res.results.length; x++) {
            //            console.log("in for/let, key =", key);
            res.results[x].description.replace(/\s+/g, ' '); /* eliminate extra spaces, if any */
            let wordList = res.results[x].description.split(" ");
            let maxWords = 30;
            let description = "";
            if (wordList.length > maxWords) {
                for (y = 0; y < maxWords; y++) {
                    description += wordList[y] + " ";
                }
                description += "...";
            } else {
                description = res.results[x].description;
            }
            $("#listBox").append(`<p class="oneVenue" id="${res.results[x].venuename}"><a href="${res.results[x].website}" class="venueName">${res.results[x].venuename}</a> - <span class="address">${res.results[x].streetaddress}</span><br><span class="description">${description}</span><button>More Info</button><input type="hidden" class = "picUrl" value="${res.results[x].imageurl}"><input type="hidden" class = "fullDesc" value="${res.results[x].description}"></p>`);
            //        let venueId = "venue" + x;
            //        let storageName = "object" + x;
            //        let dataLoc = $(venueId)[0];
            //        jQuery.data(dataLoc, storageName, testVenueList[x]);
        };
    });
}


$(':radio').change(function () { // NEED TO ADAPT THIS TO ACTUALLY ASSIGN VALUES TO EACH RATING
    console.log('New star rating: ' + this.value);
});


// Code to create new user:

$('#newUser').on('submit', function (event) {
    event.preventDefault();
    const uname = $('input[name="userName"]').val();
    const pw = $('input[name="password"]').val();
    const confirmPw = $('input[name="passwordConfirm"]').val();
    if (pw !== confirmPw) {
        alert('Passwords must match!');
    } else if (uname.length === 0) {
        alert('You must enter a username!');
    } else if (pw.length < 6) {
        alert('Your password must have at least 6 characters!');
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
                alert('Thanks for signing up! You may now sign in with your username and password.');
                let tempBoo = false; // GET RID OF THIS PARAMETER ONCE TEST FOR LOGGED IN IS CREATED FOR leaveReview FUNCTION
                console.log(result);
                $('input[name="userName"]').val(""); // clear the input fields
                $('input[name="password"]').val("");
                $('input[name="passwordConfirm"]').val("");
                $('.newUser').removeClass('venueVisible');
                showReview(tempBoo); // ONCE LOG-IN CREATED, TAKE USER TO LOG-IN SCREEN
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});


// Code to log user in:

$('#login').on('click', '#loginClicked', function (event) {
    event.preventDefault();
    // AJAX call to validate login info and sign user in
    const inputUname = $('input[name="signinUserName"]').val();
    const inputPw = $('input[name="signinPassword"]').val();
    // check for spaces, empty, undefined
    if ((!inputUname) || (inputUname.length < 1) || (inputUname.indexOf(' ') > 0)) {
        alert('Invalid username');
    } else if ((!inputPw) || (inputPw.length < 1) || (inputPw.indexOf(' ') > 0)) {
        alert('Invalid password');
    } else {
        const unamePwObject = {
            username: inputUname,
            password: inputPw
        };
        user = inputUname;
        $.ajax({
                type: "POST",
                url: "/signin",
                dataType: 'json',
                data: JSON.stringify(unamePwObject),
                contentType: 'application/json'
            })
            .done(function (result) {
                // show the signout link in header as soon as user is signed in  DO I WANT TO HAVE THIS OPTION?
                //            $('#js-signout-link').show();
                //            if (newUserToggle === true) {
                //                showAddPage();
                //            } else {
                //                showHomePage();
                //            }
                LOGGEDIN = true;
                $('input[name="signinUserName"]').val("");
                $('input[name="signinPassword"]').val("");
                $('#closeVenue').addClass('venueVisible'); // Hide close venue button
                $('.login').removeClass('venueVisible');
                $('#leaveReview').addClass('venueVisible');

            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                alert('Invalid username and password combination. Pleae check your username and password and try again.');
            });
    };
});


$(clickVenue);
$(clickClose);
$(raiseCurtain);
$(listVenues);
$(watchButtons);
$(rateVenue);
