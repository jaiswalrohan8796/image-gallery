uploadForm = document.querySelector("#uploadForm");
upBtn = document.querySelector("#upBtnFill");

function toggleForm() {
    if (uploadForm.style.display == "flex") {
        uploadForm.style.display = "none";
        upBtnFill.style.fill = "#fefefe";
    } else {
        uploadForm.style.display = "flex";
        upBtnFill.style.fill = "#73f8db";
    }
}
