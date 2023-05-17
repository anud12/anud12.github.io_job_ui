export const init = () => {

    // function to actually ask the permissions
    function handlePermission(permission) {
        // set the button to shown or hidden, depending on what the user answers

    }

    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        console.log("This browser does not support notifications.");
    } else if (checkNotificationPromise()) {
        Notification.requestPermission().then((permission) => {
            handlePermission(permission);
        });
    } else {
        Notification.requestPermission((permission) => {
            handlePermission(permission);
        });
    }
}

function checkNotificationPromise() {
    try {
        Notification.requestPermission().then();
    } catch (e) {
        return false;
    }

    return true;
}


export const push = (/**@type string*/ tag, /**@type string */ title, /**@type string=undefined */ text) => {
    new Notification(title, { body: text, tag });
}