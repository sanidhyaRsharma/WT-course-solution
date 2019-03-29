window.onload = function () {
    var pages = [];
    pages.push(document.getElementById("page1"));
    pages.push(document.getElementById("page2"));
    pages.push(document.getElementById("page3"));
    pages.push(document.getElementById("page4"));
    pages.push(document.getElementById("page5"));

    // console.log(pages);
    pages.forEach(function (item, index) {
        item.style.display = "none";
    });

    pages[2].style.display = "block";

    var sidebarElements = document.getElementsByClassName("btn");
    // console.log(sidebarElements);
    for (var i = 0; i < sidebarElements.length; i++) {
        sidebarElements[i].addEventListener("click", function () {
            var curr = document.getElementsByClassName("active");
            curr[0].className = curr[0].className.replace(" active", "");
            this.className += " active";
            for (var j = 0; j < pages.length; j++) {
                if (sidebarElements[j].className.includes("active")) {
                    pages[j].style.display = "block";
                }
                else {
                    pages[j].style.display = "none";
                }
            }
        });
    }

    //COLOR MIXER
    rSlider = document.getElementById('red-range');
    bSlider = document.getElementById('blue-range');
    gSlider = document.getElementById('green-range');
    aSlider = document.getElementById('alpha-range');
    box = document.getElementById('color-box');
    redval = document.getElementById('red-text');
    greenval = document.getElementById('green-text');
    blueval = document.getElementById('blue-text');
    alphaval = document.getElementById('alpha-text');
    hexval = document.getElementById('hex-text');
    function componentToHex(c) {
        var hex = parseInt(c).toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    function changeColor() {
        color = "rgba(" + rSlider.value + "," + bSlider.value + "," + gSlider.value + "," + ((aSlider.value) / 100) + ")";
        console.log(color);
        box.style.backgroundColor = color;
        redval.innerHTML = rSlider.value;
        greenval.innerHTML = gSlider.value;
        blueval.innerHTML = bSlider.value;
        alphaval.innerHTML = aSlider.value;
        hexval.innerHTML = "#" + componentToHex(rSlider.value) + componentToHex(gSlider.value) + componentToHex(bSlider.value);
    }
    rSlider.oninput = changeColor;
    bSlider.oninput = changeColor;
    gSlider.oninput = changeColor;
    aSlider.oninput = changeColor;
    //END COLOR MIXER    

}