/*
 * @Author: Hhvcg
 * @Date: 2022-07-27 15:01:55
 * @LastEditors: -_-
 * @Description: 
 */
var point = view.center;

var colors = [];
var cycles = 4;
for (var i = 0, l = 60; i < l; i++) {
    var brightness = 1 - (i / l) * 1.5;
    var hue = i / l * cycles * 360;
    var color = {
        hue: hue,
        saturation: 1,
        brightness: brightness
    };
    colors.push(color);
}

var path = new Path.Rectangle(view.bounds);
var gradient = new Gradient(colors, true);
var radius = Math.max(view.size.width, view.size.height) * 0.75;
path.fillColor = new Color(gradient, point, point + [radius, 0]);
var gradientColor = path.fillColor;

var mouseDown = false,
    mousePoint = view.center;

function onMouseDown(event) {
    mouseDown = true;
    mousePoint = event.point;
}

function onMouseDrag(event) {
    mousePoint = event.point;
}

function onMouseUp(event) {
    vector.length = 10;
    mouseDown = false;
}

var grow = false;
var vector = new Point(150, 0);

function onFrame() {
    for (var i = 0, l = gradient.stops.length; i < l; i++)
        gradient.stops[i].color.hue -= 20;
    if (grow && vector.length > 300) {
        grow = false;
    } else if (!grow && vector.length < 75) {
        grow = true;
    }
    if (mouseDown) {
        point = point + (mousePoint - point) / 10;
    } else {
        vector.length += (grow ? 1 : -1);
        vector.angle += 5;
    }
    gradientColor.highlight = mouseDown ? point : point + vector;
}