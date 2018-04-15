function change(user) {
    if (user && user.uid != currentUid) {
        window.location.href = "user/index.html";
    }
}

var currentUid = null;
firebase.auth().onAuthStateChanged(function(user) {
    // Checks if user auth state has changed.
    change(user);
});

setTimeout(function() {
    $("body").css("padding-top", "10vh");
}, 2000);

setTimeout(function() {
    $("#info").css("opacity", "1");
}, 4000);