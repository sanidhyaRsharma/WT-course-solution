window.onload = function () {
    var body = document.getElementById("body-container")
    var close_button = document.getElementById("close-button")

    close_button.onclick = function () {
        body.style.display = "none";
    }
}