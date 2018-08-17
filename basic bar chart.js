var w = 100;
var h = 200;
var padding = 2;
var dataset = [5, 10, 15, 20, 25];
var svg = d3.select("body")
    .append("svg")
        .attr("width", w)
        .attr("height", h);

var getXOffset = function(d, i) {
    return i * (w / dataset.length);
}

var getYOffset = function(d) {
    return h - getBarHeight(d);
}

var getBarHeight = function(d) {
    return d * 4;
}

var barWidth = w / dataset.length - padding;

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
        .attr("x", getXOffset)
        .attr("y", getYOffset)
        .attr("width", barWidth)
        .attr("height", getBarHeight);