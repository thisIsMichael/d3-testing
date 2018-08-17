var h = 450;
var w = 400;

var monthlySales = [
    {"month":10, "sales":100},
    {"month":20, "sales":130},
    {"month":30, "sales":250},
    {"month":40, "sales":300},
    {"month":50, "sales":265},
    {"month":60, "sales":225},
    {"month":70, "sales":180},
    {"month":80, "sales":120},
    {"month":90, "sales":145},
    {"month":100, "sales":350}
];

var svg = d3.select("body")
    .append("svg")
        .attr({
            height: h,
            width: w
        });

var salesKPI = function(d) { 
    if (d >= 250) { 
        return "#33CC66";
    } else {
        return "#666666";
    }
}

var showMinMax = function(ds, col, val, type) {
    var max = d3.max(ds, function(d) { return d[col]});
    var min = d3.min(ds, function(d) { return d[col]});

    if (type == "minmax" && (val == max || val == min)) {
        return val;
    } else {
        if (type == "all") {
            return val;
        }
    }
}

svg.selectAll("circle")
        .data(monthlySales)
        .enter()
        .append("circle")
            .attr({
                cx: function(d) { return d.month * 3;},
                cy: function(d) { return h - d.sales;},
                r: 5,
                "fill": function(d) { return salesKPI(d.sales);}
            });

// Labels
svg.selectAll("text")
        .data(monthlySales)
        .enter()
        .append("text")
        .text(function(d) { return showMinMax(monthlySales, 'sales', d.sales, 'all')})
            .attr({
                x: function(d){return d.month * 3 - 25;},
                y: function(d){return h - d.sales}
            });

d3.select("select")
    .on("change", function(d){
        var sel = d3.select("#label-option").node().value;

        svg.selectAll("text")
            .data(monthlySales)
            .text(function(d) {
                return showMinMax(monthlySales, 'sales', d.sales, sel);
            });
    });
