// replace any elements with the class tai with the image img/tai-optimised.svg
function replaceTai() {
    var tai = document.getElementsByClassName("tai");
    for (var i = 0; i < tai.length; i++) {
        tai[i].src = "img/tai-optimised.svg";
    }
}