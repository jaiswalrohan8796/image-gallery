const uploadForm = document.querySelector("#uploadForm");
const upBtn = document.querySelector("#upBtnFill");
const message = document.querySelector("#message");

//form toggler
function toggleForm() {
    if (uploadForm.style.display == "flex") {
        uploadForm.style.display = "none";
        upBtnFill.style.fill = "#fefefe";
    } else {
        uploadForm.style.display = "flex";
        upBtnFill.style.fill = "#73f8db";
    }
}

//message disappering
const statusMessage = () => {
    setTimeout(() => {
        message.style.display = "none";
    }, 5000);
};
statusMessage();

//delete handler
function deleteHandler(id) {
    axios
        .delete(`/delete/${id}`)
        .then(() => {
            // location.href = "http://localhost:3000";
            location.href = "http://localhost:3000";
        })
        .catch((err) => {
            console.log(err);
        });
}

//edit handler
function editHandler(id) {
    location.href = `http://localhost:3000/edit/${id}`;
}

//share handler
function shareHandler(title, desc) {
    if (navigator.share) {
        navigator
            .share({
                title: title,
                text: desc,
                url: location.href,
            })
            .then(() => console.log("Successful share"))
            .catch((error) => console.log("Error sharing", error));
    } else {
        alert(
            "Sharing failed!. Only works in Mobile devices with latest browser"
        );
    }
}
