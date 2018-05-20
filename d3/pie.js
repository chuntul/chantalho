
  function makePie(names, nums) {
    //setting up data: [{"name": "Name", "num": 3}
    var data = [];
    for (var i = 0; i < names.length; i++) {
      data.push({"name": names[i], "num": nums[i]});
    }
  
    //sum 
    var sum = nums.reduce(function (a, b) {
      return a + b;
    }, 0);

  
    //positions and dimensions
    var margin = {
      top: 20,
      right: 100,
      bottom: 100,
      left: 80
    };
  
    var width = 800;
    var height = 350;
    var radius = 190;
    var color = d3.scale.category10();
  
  
  
    // Add the svg canvas
    var svg = d3.select("#piePlot")
        .append("svg:svg")
        .attr("fill", "white")
          .data([data])
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")")
        .attr("id", "pie")
        .append("g")
            .attr("transform",
                  "translate(" + radius + "," + (radius+50) + ")")
  
  
  
    // graph title
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("fill","black")
      .style("font-size", "20px")
      .attr("transform", "translate("+ (width/8) +","+ -210 +")")
      .text("A donut plot");
  
    var arc = d3.svg.arc()
      .outerRadius(radius)
      .innerRadius(radius - 80);
        //.outerRadius(radius);
  
    var pie = d3.layout.pie()
        .value(function(d) {
            return d.num;
        });
  
    //making each slice of pie
    var arcs = svg.selectAll("g.slice")
        .data(pie)
        .enter()
            .append("svg:g")
            .attr("class", function(d,i) {return data[i].name});
  
  
        arcs.append("svg:path")
          .attr("fill", function(d, i) { return color(i); } )
          .attr("d", arc);
  
        arcs.append("svg:title")
          .text(function(d,i) {return data[i].name});

        //percentage
        arcs.append("svg:text")
            .attr("transform", function(d) {  //center
            d.innerRadius = 0;
            d.outerRadius = radius;
            var coords = arc.centroid(d);
            coords[0] *= 1;
            coords[1] *= 1;
            return "translate(" + coords + ")"; //return coordinates
          })

        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .style("font-size", "13px")
        .text(function(d, i) {
          return d3.format(".2f")((data[i].num/sum)*100) + "%";
        });
  
        
      //legend
      for (var i = 0; i < data.length; i++) {
        svg.append('rect')
            .attr("x", width-500)
            .attr("y", i * 35 - 150)
            .attr("width", 15)
            .attr("height", 15)
            .style("fill", color(i));
  
  
        svg.append('text')
            .attr("x", width-480)
            .attr("y",  i * 35 - 138)
            .attr("id", "legendLabel" + names[i])
            .style("text-anchor", "start")
            .style("font-size", "14px")
            .style("opacity", 1)
            .attr("fill", "black")
            .text(names[i]);

        }
  
        // total number
        svg.append('text')
            .attr("x", 320)
            .attr("y",  300)
            .style("text-anchor", "start")
            .style("font-size", "14px")
            .attr("fill", "black")
            .text("Total number of cell lines: " + sum)
  
  
  
  }