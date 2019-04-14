var canvas = document.getElementById("myCanvas");
var width = canvas.width;
var height = canvas.height;
var context = canvas.getContext("2d");
var BB = canvas.getBoundingClientRect();
var offsetX = BB.left;
var offsetY = BB.top;
var points = [];

var dragok = false;
var startX;
var startY;

var x1 = document.getElementById("x1_output");
var x2 = document.getElementById("x2_output");
var cx1 = document.getElementById("cx1_output");
var cx2 = document.getElementById("cx2_output");
var cy1 = document.getElementById("cy1_output");
var cy2 = document.getElementById("cy2_output");
var y1 = document.getElementById("y1_output");
var y2 = document.getElementById("y2_output");

function drawCurve() {
    context.clearRect(0, 0, width, height);
    context.beginPath();
    for (var i = 0; i < 9; i++) {
        context.moveTo(i * 25, 0);
        context.lineTo(i * 25, height);
    }

    context.moveTo(parseInt(x1.value), parseInt(y1.value));

    context.bezierCurveTo(parseInt(cx1.value), parseInt(cy1.value), parseInt(cx2.value), parseInt(cy2.value), parseInt(x2.value), parseInt(y2.value));
    context.stroke();
}
function circle(points) {
    points.forEach(function (pt) {
        context.fillStyle = pt.fillStyle;
        context.beginPath();
        context.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    });
    context.moveTo(points[0].x, points[0].y);
    context.bezierCurveTo(points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y);
    
    context.stroke();
}
// function getCursorPosition(canvas, event) {
//     var rect = canvas.getBoundingClientRect();
//     var x = event.clientX - rect.left;
//     var y = event.clientY - rect.top;
//     console.log("x: " + x + " y: " + y);
// }
function draw(){
    context.clearRect(0, 0, width, height);
    circle(points);    
    x1.innerHTML = points[0].x;
    y1.innerHTML = points[0].y;
    cx1.innerHTML = points[1].x;
    cy1.innerHTML = points[1].y;
    cx2.innerHTML = points[2].x;
    cy2.innerHTML = points[2].y;
    x2.innerHTML = points[3].x;
    y2.innerHTML = points[3].y;
}
function myDown(e) {
    e.preventDefault();
    e.stopPropagation();

    var mx = parseInt(e.clientX - offsetX)
    var my = parseInt(e.clientY - offsetY)

    dragok = false;
    points.forEach(function (pt) {
        var dx = pt.x - mx;
        var dy = pt.y - my;
        if (dx * dx + dy * dy < pt.r * pt.r) {
            dragok = true;
            pt.isDragging = true;
        }
    });
    startX = mx;
    startY = my;
}
function myUp(e) {
    e.preventDefault();
    e.stopPropagation();
    dragok = false;
    points.forEach(function (pt) {
        pt.isDragging = false;
    });
}
function myMove(e) {
    if (dragok) {
        e.preventDefault();
        e.stopPropagation();
        
        var mx = parseInt(e.clientX - offsetX);
        var my = parseInt(e.clientY - offsetY);

        var dx = mx - startX;
        var dy = my - startY;

        points.forEach(function(pt){
            if(pt.isDragging){
                pt.x += dx;
                pt.y += dy;
            }
        });
        draw();

        startX = mx;
        startY = my;
    }
}
window.onload = function () {
    points.push({ x: 500, y: 500, r: 10, fillStyle: "blue", isDragging: false, });
    points.push({ x: 500, y: 10, r: 10, fillStyle: "green", isDragging: false, });
    points.push({ x: 10, y: 10, r: 10, fillStyle: "yellow", isDragging: false, });
    points.push({ x: 10, y: 500, r: 10, fillStyle: "red", isDragging: false, });
    canvas.onmousedown = myDown;
    canvas.onmouseup = myUp;
    canvas.onmousemove = myMove;
    draw();
}

