let LOGGEDIN = false;
let USERNAME = "";

// narrows list of venues based upon typed name
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
        //        console.log('clicked');
        $('.jsHide').removeClass('makeVisible');
        $('.login').removeClass('makeVisible');
        $('.newUser').removeClass('makeVisible');
        $('#leaveReview').removeClass('makeVisible');
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
        //        console.log("clicked");
        $('.login').removeClass('makeVisible');
        $('.jsHide').addClass("makeVisible");
    });
    $('.newUser').on('click', '#cancelNewUser', function () {
        $('.newUser').removeClass('makeVisible');
        $('.jsHide').addClass("makeVisible");
    });
}

function showReview(venueNameFromLogin) {
    $('#closeVenue').removeClass('makeVisible'); // Hide close venue button
    let venueName = $(this).attr("title");
    if (venueName === undefined) { // if 'this' is undefined, then got to this function via login
        venueName = venueNameFromLogin;
    }
    $('#reviewMarquee').html(venueName.toUpperCase());
    $('#reviewMarquee').attr("title", venueName); // store venue name in marquee
    if (!LOGGEDIN) {
        $('.login').addClass('makeVisible');
    } else {
        $.getJSON('/reviews/check/' + USERNAME + '/' + venueName, function (res) {
            if (res.results == null || res.results == "null") {
                rateVenue();
            } else {
                console.log(res);
                rateVenue({
                    listeningExperience: res.results.listeningExperience,
                    venueFeel: res.results.venueFeel,
                    musicValue: res.results.musicValue,
                    musicQuality: res.results.musicQuality,
                    foodQuality: res.results.foodQuality,
                    foodValue: res.results.foodValue
                }, res.results.userReview, res.results._id);
            }
        });
        //        console.log("REVIEW MARQUEE TITLE IS:  ", $('#reviewMarquee').attr("title"));
    }
    /* NOTE - WHEN REVIEW SUBMITTED OR CANCELLED, NEED TO MAKE #CLOSEVENUE BUTTON VISIBLE AGAIN */
}

function createNewUser(event) {
    event.preventDefault(); // otherwise page reloads when this function starts
    $('.login').removeClass('makeVisible');
    $('.newUser').addClass('makeVisible');
}

//function rateVenue(listeningExperience, venueFeel, musicValue, musicQuality, foodValue, userReview) {
function rateVenue(ratingsArray, userReview, reviewId) {
    console.log("In rateVenue, initial value of reviewId:", reviewId);
    $('#leaveReview').addClass('makeVisible');
    let oldColor = $("body").css("color"); /* target color gets changed when clicked, so get base color from body instead */
    let newColor = "#86034D";
    if (userReview === undefined) { // array is ONLY passed if user is logged in and has already left review for venue
        $("#deleteReview").html(""); // remove 'delete review' button if it exists
        userReview = ' ';
        ratingsArray = {
            listeningExperience: "0",
            venueFeel: "0",
            musicValue: "0",
            musicQuality: "0",
            foodQuality: "0",
            foodValue: "0"
        };
    } else {
        $("#skipReview").html("Cancel Changes");
        $("#deleteReview").html("<button id='deleteReviewButton'>Delete Review</button>");
    }
    console.log("initial value of ratingsArray", ratingsArray);
    $("#userComments").val(userReview);
    // change the rating stars colors, as applicable
    Object.keys(ratingsArray).forEach(function (key) {
        let starId = "#" + key;
        if (ratingsArray[key] === "5") {
            $(starId).find(".value1").css("color", newColor);
            $(starId).find(".value2").css("color", newColor);
            $(starId).find(".value3").css("color", newColor);
            $(starId).find(".value4").css("color", newColor);
            $(starId).find(".value5").css("color", newColor);
        } else if (ratingsArray[key] === "4") {
            $(starId).find(".value1").css("color", newColor);
            $(starId).find(".value2").css("color", newColor);
            $(starId).find(".value3").css("color", newColor);
            $(starId).find(".value4").css("color", newColor);
            $(starId).find(".value5").css("color", oldColor);
        } else if (ratingsArray[key] === "3") {
            $(starId).find(".value1").css("color", newColor);
            $(starId).find(".value2").css("color", newColor);
            $(starId).find(".value3").css("color", newColor);
            $(starId).find(".value4").css("color", oldColor);
            $(starId).find(".value5").css("color", oldColor);
        } else if (ratingsArray[key] === "2") {
            $(starId).find(".value1").css("color", newColor);
            $(starId).find(".value2").css("color", newColor);
            $(starId).find(".value3").css("color", oldColor);
            $(starId).find(".value4").css("color", oldColor);
            $(starId).find(".value5").css("color", oldColor);
        } else if (ratingsArray[key] === "1") {
            $(starId).find(".value1").css("color", newColor);
            $(starId).find(".value2").css("color", oldColor);
            $(starId).find(".value3").css("color", oldColor);
            $(starId).find(".value4").css("color", oldColor);
            $(starId).find(".value5").css("color", oldColor);
        } else {
            $(starId).find(".value1").css("color", oldColor);
            $(starId).find(".value2").css("color", oldColor);
            $(starId).find(".value3").css("color", oldColor);
            $(starId).find(".value4").css("color", oldColor);
            $(starId).find(".value5").css("color", oldColor);
        }
    });
    $('#leaveReview').on('click', '#skipReview', function () {
        //       reset all values in array before exiting
        event.preventDefault();
        ratingsArray.listeningExperience = "0";
        ratingsArray.foodQuality = "0";
        ratingsArray.foodValue = "0";
        ratingsArray.musicQuality = "0";
        ratingsArray.musicValue = "0";
        ratingsArray.userName = "";
        ratingsArray.userReview = "";
        userReview = "";
        //        $("#userComments").html("");
        $('#leaveReview').removeClass('makeVisible');
        $('.jsHide').addClass("makeVisible");
    });
    $('#leaveReview').on('click', '#deleteReviewButton', function () {
        //        event.preventDefault();
        myBoolean("Are you sure you want to permanently delete your review?", "Delete Review", "Don't Delete!").then(function (res) {
            if (res) {
                ratingsArray.listeningExperience = "0";
                ratingsArray.foodQuality = "0";
                ratingsArray.foodValue = "0";
                ratingsArray.musicQuality = "0";
                ratingsArray.musicValue = "0";
                ratingsArray.userName = "";
                ratingsArray.userReview = "";
                userReview = "";
                console.log("Delete button clicked, initial value of reviewId:", reviewId);
                $.ajax({
                    method: 'DELETE',
                    url: '/delete/' + reviewId
                });
            } else {
                console.log("Delete button clicked, but myBoolean returned", myBoo);
            }
        });
    });
    $("#userReviews").on('click', '.star', function () {
        let categoryClicked = $(this).parent().attr("id");
        //        console.log(categoryClicked, "clicked");
        let ratingClicked = $(this).attr("value");
        //        console.log(ratingClicked);
        if (categoryClicked === "listeningExperience") {
            ratingsArray.listeningExperience = ratingClicked;
        } else if (categoryClicked === "venueFeel") {
            ratingsArray.venueFeel = ratingClicked;
        } else if (categoryClicked === "musicValue") {
            ratingsArray.musicValue = ratingClicked;
        } else if (categoryClicked === "musicQuality") {
            ratingsArray.musicQuality = ratingClicked;
        } else if (categoryClicked === "foodQuality") {
            ratingsArray.foodQuality = ratingClicked;
        } else {
            ratingsArray.foodValue = ratingClicked;
        }
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
    console.log("value of ratingsArray after click", ratingsArray);
    $(".commentButtons").on('click', '#submitReview', function () {
        event.preventDefault();
        if (ratingsArray.listeningExperience === "0" || ratingsArray.venueFeel === "0" || ratingsArray.musicValue === "0" || ratingsArray.musicQuality === "0") {
            myAlert("You can't leave any of the first four star fields blank!", "oops");
        } else {
            event.preventDefault();
            console.log("The array that is gonna be sent: ", ratingsArray);
            let venueName = $('#reviewMarquee').attr("title");
            userReview = $("#userComments").val().trim();
            if (userReview.length === 0) {
                userReview = " ";
            }
            ratingsArray.userReview = userReview;
            ratingsArray.venueName = venueName;
            ratingsArray.userName = USERNAME;
            //            const newReviewObject = {
            //                venueName: venueName,
            //                userName: USERNAME,
            //                listeningExperience: listeningExperience,
            //                venueFeel: venueFeel,
            //                musicValue: musicValue,
            //                musicQuality: musicQuality,
            //                foodQuality: foodQuality,
            //                foodValue: foodValue,
            //                userReview: userReview
            //            };
            $.ajax({
                    type: 'POST',
                    url: '/new/create',
                    dataType: 'json',
                    data: JSON.stringify(ratingsArray),
                    contentType: 'application/json'
                })
                .done(function (result) {
                    console.log("new review posted:", result);
                    getOneVenue(ratingsArray.venueName);
                    $('#leaveReview').removeClass('makeVisible');
                    ratingsArray.listeningExperience = "0";
                    ratingsArray.foodQuality = "0";
                    ratingsArray.foodValue = "0";
                    ratingsArray.musicQuality = "0";
                    ratingsArray.musicValue = "0";
                    ratingsArray.userName = "";
                    ratingsArray.userReview = "";
                    userReview = "";
                    myAlert(`Thank you for reviewing ${venueName}, ${USERNAME}!`, 'ok');
                })
                .fail(function (jqXHR, error, errorThrown) {
                    console.log(jqXHR);
                    console.log(error);
                    console.log(errorThrown);
                });
            // HAVE TO ADD FUNCTIONALITY TO RETURN STARS TO ORIGINAL COLOR AND CLEAR VALUES
            //                            }
            //        console.log(listeningExperience, venueFeel, musicValue, musicQuality, foodQuality, foodValue);

        }

        //$.getJSON('/cats', function (res) {
        //    console.log("logging results", res)
        //});
        //
        //function newCat() {
        //    let heresacat = {
        //        name: "Mittens",
        //        color: "tan"
        //    };
        //    $.ajax({
        //            type: 'POST',
        //            url: '/new/create',
        //            dataType: 'json',
        //            data: JSON.stringify(heresacat),
        //            contentType: 'application/json'
        //        })
        //        .done(function (result) {
        //            console.log("meow!")
        //        })
        //        .fail(function (jqXHR, error, errorThrown) {
        //            console.log(jqXHR);
        //            console.log(error);
        //            console.log(errorThrown);
    });
}



function listenForFilters() {
    let venuetype = "all";
    let venuesize = "all";
    let freeticketed = "all";
    $("#venueType").change(function () {
        venuetype = $("#venueType").val();
        getSomeVenues(venuetype, venuesize, freeticketed);
        initMap(venuetype, venuesize, freeticketed);
    });
    $("#size").change(function () {
        venuesize = $("#size").val();
        getSomeVenues(venuetype, venuesize, freeticketed);
        initMap(venuetype, venuesize, freeticketed);
    });
    $("#freeTicketed").change(function () {
        freeticketed = $("#freeTicketed").val();
        getSomeVenues(venuetype, venuesize, freeticketed);
        initMap(venuetype, venuesize, freeticketed);
    });
}

function getSomeVenues(venuetype, venuesize, freeticketed) {
    $.getJSON('/venues/partiallist/' + venuetype + '/' + venuesize + '/' + freeticketed, function (res) {
        console.log("type", venuetype, "size", venuesize, "free/tick", freeticketed, res);
        //    });
        //}
        //  ORIGINALLY PULLED VENUES JUST ONCE AT STARTUP, WITHOUT FILTERS...  IF NOTHING BREAKS HERE, CAN GET RID OF /locations ENDPOINT
        //function listVenues() {
        //    $.getJSON('/locations', function (res) {
        $("#listBox").text(""); /* clear existing text, if any */
        if (res.results.length === 0) {
            $("#listBox").append(`<p>No results found!  You'll need to modify your preferences.</p>`);
        }
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

function getOneVenue(venueName) {
    $.getJSON('/locations/onevenue/' + venueName, function (res) {
        console.log(res, res.results, res.results.website, res.results.streetaddress);
        renderVenue(res.results.venuename, res.results.website, res.results.streetaddress, res.results.description, res.results.imageurl);
    });
}
//$(getReviews("701 Restaurant"));

//
//$(':radio').change(function () { // NEED TO ADAPT THIS TO ACTUALLY ASSIGN VALUES TO EACH RATING
//    console.log('New star rating: ' + this.value);
//});


// Code to create new user:

$('#newUser').on('submit', function (event) {
    event.preventDefault();
    const uname = $('input[name="userName"]').val();
    const pw = $('input[name="password"]').val();
    const confirmPw = $('input[name="passwordConfirm"]').val();
    if (pw !== confirmPw) {
        myAlert('Passwords must match!', 'ok');
    } else if (uname.length === 0) {
        myAlert('You must enter a username!', 'ok');
    } else if (pw.length < 6) {
        myAlert('Your password must have at least 6 characters!', 'oops');
    } else if (/\s/.test(uname) || /\s/.test(pw)) {
        myAlert("Sorry, usernames & passwords cannot contain spaces!", "oops");
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
                myAlert(`Thanks for signing up, ${uname}! You may now sign in with your username and password.`, 'ok');
                console.log(result);
                $('input[name="userName"]').val(""); // clear the input fields
                $('input[name="password"]').val("");
                $('input[name="passwordConfirm"]').val("");
                $('.newUser').removeClass('makeVisible');
                $('.login').addClass('makeVisible');
            })
            .fail(function (jqXHR, error, errorThrown) {
                alert("Uh-oh, something went wrong! Try a different username.");
                $('input[name="userName"]').val(""); // clear the input fields
                $('input[name="password"]').val("");
                $('input[name="passwordConfirm"]').val("");
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
        myAlert('You entered an invalid username', 'oops');
    } else if ((!inputPw) || (inputPw.length < 1) || (inputPw.indexOf(' ') > 0)) {
        myAlert('You entered an invalid password', 'oops');
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
                USERNAME = user;
                myAlert(`Welcome, ${user}!  You're now logged in!`, "ok");
                $('input[name="signinUserName"]').val("");
                $('input[name="signinPassword"]').val("");
                //                $('#closeVenue').addClass('makeVisible'); // Show close venue button
                $('.login').removeClass('makeVisible');
                //                $('#leaveReview').addClass('makeVisible');
                let venueName = $('#reviewMarquee').attr("title");
                showReview(venueName);
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                myAlert('You entered an invalid username and password combination. Pleae check your username and password and try again.', 'oops');
            });
    };
});

function myAlert(sayThis, choice) {
    console.log(sayThis, choice);
    let okChoices = ["Uhh, sure... OK", "Happy to oblige", "Did I have any other choice?", "It seemed the right thing to do", "I was bored", "My cat's breath smells like cat food", "I didn't realize I had a choice", "Hooray?", "Snazzy.", "Well, I'll be!", "Well, ain't that grand!"];
    let oopsChoices = ["My mouse finger slipped", "I was young, I needed the money", "I was trying to play a cat video", "I did no such thing!", "My cat ran across my keyboard", "The peer pressure got to me", "Somebody else must have done that", "I must have been drunk", "I hit the wrong key", "Don't blame me for that!", "It was an accident", "Don't hold it against me!"];
    let reasons;
    if (choice === "oops") {
        reasons = oopsChoices;
    } else {
        reasons = okChoices;
    }
    let thisReason = reasons[Math.floor(Math.random() * reasons.length)];
    console.log("myAlert choice whatnot:", choice, reasons, thisReason);
    $(".alertBoxContainer").addClass("visibleAlert");
    $(".alertBox").addClass("visibleAlert");
    $(".alertBox").html(sayThis + `<br><button id='yes'>${thisReason}</button>`);
    $(".alertBox").on('click', '#yes', function () {
        event.preventDefault();
        $(".alertBoxContainer").removeClass("visibleAlert");
        $(".alertBox").removeClass("visibleAlert");
        $(".alertBox").html("");
    });
}

function myBoolean(sayThis, buttonOne, buttonTwo) {
    $(".alertBoxContainer").addClass("visibleAlert");
    $(".alertBox").addClass("visibleAlert");
    $(".alertBox").html(`${sayThis}<br><button title='true'>${buttonOne}</button><button title='false'>${buttonTwo}</button>`);
    return new Promise((resolve, reject) => {
        $(".alertBox").on('click', 'button', function () {
            event.preventDefault();
            $(".alertBoxContainer").removeClass("visibleAlert");
            $(".alertBox").removeClass("visibleAlert");
            $(".alertBox").html("");
            console.log($(this), $(this).attr("title"));
            resolve($(this).attr("title"));
        });
    });
}

//function myBoolean(sayThis, buttonOne, buttonTwo) {
//    $(".alertBoxContainer").addClass("visibleAlert");
//    $(".alertBox").addClass("visibleAlert");
//    $(".alertBox").html(`${sayThis}<br><button title='true'>${buttonOne}</button><button title='false'>${buttonTwo}</button>`);
//    $(".alertBox").on('click', 'button', function () {
//        event.preventDefault();
//        $(".alertBoxContainer").removeClass("visibleAlert");
//        $(".alertBox").removeClass("visibleAlert");
//        $(".alertBox").html("");
//        console.log($(this), $(this).attr("title"));
//        return $(this).attr("title");
//    });
//}

//$(clickVenue);
$(clickClose);
$(getSomeVenues("all", "all", "all")); // seed the venue list with no filters
$(watchButtons);
$(listenForFilters);
//$(rateVenue);
$(raiseCurtain);
//$(newCat);
