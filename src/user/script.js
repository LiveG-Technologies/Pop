function change(user) {
    if (user && user.uid != currentUid) {
        // Signed in.
    } else {
        // Signed out.
        window.location.href = "../signin.html";
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