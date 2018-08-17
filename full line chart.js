var h = 350;
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
    {"month":100, "sales":130}
];

var lineDraw = d3.svg.line()
    .x(function(d) { return d.month * 3;})
    .y(function(d) { return h - d.sales; })
    .interpolate("linear");

var svg = d3.select("body")
    .append("svg")
        .attr({
            width: w,
            height: h
        });

var viz = svg.append("path")
        .attr({
            d: lineDraw(monthlySales),
            "stroke": "purple",
            "stroke-width": 2,
            "fill": "none"
        });

// Labels

var labels = svg.selectAll("text")
        .data(monthlySales)
        .enter()
        .append("text")
            .text(function(d) { return d.sales;})
            .attr({
                x: function(d) { return d.month * 3 - 20 },
                y: function(d) { return h - d.sales;},
                "font-size": "10px",
                "font-family": "sans-serif",
                "fill": "#666666",
                "text-anchor": "middle",
                "dy": ".35em",
                "font-weight": function(d, i) { 
                    if (i===0 || i===monthlySales.length - 1) {
                        return "bold";
                    } else {
                        return "normal";
                    }
                }
            })