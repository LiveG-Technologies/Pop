function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function change(user) {
    if (user && user.uid != currentUid) {
        // Signed in.
    } else {
        // Signed out.
        if (getURLParameter("test") != "true") {
            window.location.href = "../signin.html";
        }
    }
}

var currentUid = null;
firebase.auth().onAuthStateChanged(function(user) {
    // Checks if user auth state has changed.
    change(user);
});

function signOut() {
    firebase.auth().signOut();
}