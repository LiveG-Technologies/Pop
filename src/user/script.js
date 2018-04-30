var ppics = ["smile", "laugh", "love", "think", "crazy", "cool", "moneymouth", "mindblown", "ghost", "alien", "robot", "monkey", "coderm", "coderf", "scientistm", "scientistf"];
var currentUid = null;

function getURLParameter(name) {
    return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.search) || [null, ""])[1].replace(/\+/g, "%20")) || null;
}

function change(user) {
    if (user && user.uid != null) {
        // Signed in.
        firebase.database().ref("users/" + user.uid + "/_settings/name").on("value", function(snapshot) {
            if (getURLParameter("test") != "true") {
                $(".myname").text(snapshot.val());
            }
        });

        firebase.database().ref("users/" + user.uid + "/_settings/ppic").on("value", function(snapshot) {
            if (getURLParameter("test") != "true") {
                if (user.uid == "sbh6Y1L6Q1as5rekRqRKTdrQGo53") {
                    $(".myppic").attr("src", "ppics/popteam.png");
                } else {
                    $(".myppic").attr("src", "ppics/" + ppics[snapshot.val()] + ".png");
                }
            }
        });
    } else {
        // Signed out.
        if (getURLParameter("test") != "true") {
            window.location.href = "../signin.html";
        }
    }
}

firebase.auth().onAuthStateChanged(function(user) {
    // Checks if user auth state has changed.
    if (user) {currentUid = user.uid;} else {currentUid = null;}

    change(user);
});

function signOut() {
    firebase.auth().signOut();
}

function setName() {
    firebase.database().ref("users/" + currentUid + "/_settings/name").set(profanity.clean($("#setname").val().substring(0, 20)));

    $(".nameedit").addClass("hidden");
    $(".notnameedit").removeClass("hidden");
}

function setPpic(ppic) {
    console.log(ppic);
    firebase.database().ref("users/" + currentUid + "/_settings/ppic").set(ppic);

    $("#ppicedit").addClass("hidden");
}

$(".editable").parent().parent().mouseenter(function(event) {
    $(event.target).parent().find(".editablecontainer").removeClass("hidden");
}).mouseleave(function() {
    $(event.target).parent().find(".editablecontainer").addClass("hidden");
});

$(".editable").mouseleave(function() {
    $(event.target).parent().addClass("hidden");
});

var input = document.getElementById("setname");

input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        setName();
    }
});

for (i = 0; i < ppics.length; i++) {
    $("#ppicedit").append(`<img class="ppic item tappable" src="ppics/` + ppics[i] + `.png" onclick="setPpic(` + i + `);" />`);
}