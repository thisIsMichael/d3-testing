var w = 400;
var h = 300;
var padding = 2;

var dataset = [5, 10, 13, 19, 21, 25, 11, 25, 22, 18, 7];

var svg = d3.select("body")
    .append("svg")
        .attr("width", w)
        .attr("height", h);

var barWidth = w / dataset.length - padding;

var getBarHeight = function(d) {
    return d * 4;
}

var getXOffset = function(d, i) {
    return i * (barWidth + padding);
}

var getYOffset = function(d) {
    return h - getBarHeight(d);
}

var getBarColor = function(d) {
    return "rgb(0, 0," + (d * 10) + ")";
}

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
        .attr({
            width: barWidth,
            height: getBarHeight,
            x: getXOffset,
            y: getYOffset,
            fill: getBarColor});

var getLabel = function(d) { return d;};

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(getLabel)
    .attr({
        "text-anchor": "middle",
        x: function(d, i) { return 0.5 * barWidth + getXOffset(d, i);},
        y: function(d) { return getYOffset(d) + 15;},
        "font-size": 12,
        fill: "white"
    });