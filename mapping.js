var w = 500;
var h = 300;

var projection = d3.geo.albersUsa()
.translate([w/2, h/2])
.scale([500]);

var path = d3.geo.path().projection(projection);

var svg = d3.select("body")
    .append("svg")
    .attr({
        width: w,
        height: h
    });

    var colors = d3.scale.linear()
        .range(['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c']);

    d3.csv("state-sales.csv", function(data){

        colors.domain([
            0,
            d3.max(data, function(d) { return d.sales; })
        ])

        d3.json("us.json", function(json){

            for (var i=0; i<data.length; i++) {
                var salesState = data[i].state;
                var salesVal = parseFloat(data[i].sales);

                for (var j = 0; j<json.features.length; j++) {
                    var usState = json.features[j].properties.NAME;

                    if (salesState == usState) {
                        json.features[j].properties.value = salesVal;
                        break;
                    }
                }
            }

            var getColour = function(d){
                var value = d.properties.value;

                if (value) {
                    return colors(value)
                } else {
                    return "#666666";
                }
            }

            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr({
                    "d": path,
                    "fill": getColour
                });
                //.style("fill", getColour);

            var getRadius = function(d) {
                return Math.sqrt(parseInt(d.sales) * 0.0005);
            }

            var func = function(d) { 
                var p = projection([d.lon, d.lat]);
                
                if (p == null)
                {
                    var x = true;
                }
                else
                {
                    return p[0];
                }
            };

            d3.csv("sales-by-city.csv", function(data) {
                svg.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr({
                        cx: func,
                        cy: function(d) { return projection([d.lon, d.lat])[1]},
                        r:  getRadius,
                        "fill": "lime"
                    });
            });
        });

    });