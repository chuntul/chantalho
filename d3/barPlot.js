function makeHorizBarPlot(names, nums) {
  //positions and dimensions
  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 70
  };
 
  var width = 250;
  var height = 250;
  var color = d3.scale.category10();

  //this formats the data (adding an empty set so that the bars don't start
  //at the very first tick)
  names.unshift(" ")
  nums.unshift(0)

  //calculating max for data
  var maxNum = Math.max.apply(null, nums)

  //set range for data by domain, and scale by range
  //check out https://www.dashingd3js.com/d3js-scales for a guide to domains and ranges in d3
  var xrange = d3.scale.linear()
    .domain([0, maxNum+10])
    .range([0, width]);

  var yrange = d3.scale.linear()
    .domain([0, names.length])
    .range([0, height]);

  //set axes for graph
  var xAxis = d3.svg.axis()
    .scale(xrange)
    .orient("bottom")
    .tickPadding(2);

  var yAxis = d3.svg.axis()
    .scale(yrange)
    .orient("left")
    .tickSize(5)
		.tickFormat(function(d,i){ return names[i] })
		.tickValues(d3.range(names.length));

  // Add the svg canvas
  var svg = d3.select("#horizBarPlot")
      .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
      .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")
      .attr("fill", "white");

  // graph title
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("fill","black")
    .style("font-size", "20px")
    .attr("transform", "translate("+ (width/2) +","+ -20 +")")
    .text("A horizontal bar plot");

  // Add the X Axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," +  height + ")")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .call(xAxis)
      .selectAll("text")
        .attr("fill", "black")
        .style("font-size", 15)
        .attr("stroke", "none");


  // Add the Y Axis
  svg.append("g")
      .attr("class", "y axis")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .call(yAxis)
      .selectAll("text")
        .attr("fill", "black")
        .style("font-size", 15)
        .attr("stroke", "none");

  //formatting the ticks
  svg.selectAll(".tick").select("text")
    .attr("fill", "black")
    .attr("stroke", "none")

  //adding bars
  var chart = svg.append('g')
  		.attr("transform", "translate(1,0)")
  		.attr('id','bars')
  		.selectAll('rect')
  		.data(nums)
  		.enter()
      .append('rect')
        .attr('width',function(d){ return xrange(d); })
        .attr('height',19)
        .attr({
          'x':-1,
          'y':function(d,i){ 
            // d refers to nums
            // i refers to each item in nums
            return yrange(i)-10; 
          }
        })
        .style('fill', "#2d5faf")
        .on({
          "mouseover": function(d,i) {
            d3.select(this).transition()
            .duration(300).style("opacity", 0.6);
            d3.select("#" + names[i] + "num").transition()
            .duration(300).style("opacity", 1);
            d3.select(this).style("cursor", "pointer");
          },
          "mouseout": function(d,i) {
            d3.select(this).transition()
            .duration(300).style("opacity", 1);
            d3.select("#" + names[i] + "num").transition()
            .duration(300).style("opacity", 0);
            d3.select(this).style("cursor", "default");
          }
        })

  // appending text on hover		
  for (var i = 1; i < nums.length; i++) {
    svg.append("text")
      .attr({'x': xrange(nums[i]) + 5, 'y': yrange(i)+5})
      .attr("id", names[i] + "num")
      .style("text-anchor", "start")
      .style("font-size", "13px")
      .attr("fill", "black")
      .style("opacity", 0)
      .text(nums[i])
  }

}

function makeVertBarPlot(names, nums) {
  //positions and dimensions
  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 70
  };
  var width = 250;
  var height = 250;
  var color = d3.scale.category10();

  //calculating max for data
  var maxNum = Math.max.apply(null, nums)

  //set range for data by domain, and scale by range
  var xrange = d3.scale.linear()
    .domain([0, names.length])
    .range([0, width]);

  var yrange = d3.scale.linear()
    .domain([0, maxNum+10])
    .range([height, 0]);

  //set axes for graph
  var xAxis = d3.svg.axis()
    .scale(xrange)
    .orient("bottom")
    .tickPadding(2)
    .tickFormat(function(d,i){ return names[i] })
		.tickValues(d3.range(names.length));

  var yAxis = d3.svg.axis()
    .scale(yrange)
    .orient("left")
    .tickSize(5)
    .tickFormat(d3.format("s"));

  // Add the svg canvas
  var svg = d3.select("#vertBarPlot")
      .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
      .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")
      .attr("fill", "white");

  // graph title
  svg.append("text")
  .attr("text-anchor", "middle")
  .attr("fill","black")
  .style("font-size", "20px")
  .attr("transform", "translate("+ (width/2) +","+ -20 +")")
  .text("A vertical bar plot");

  // Add the Y Axis
  svg.append("g")
      .attr("class", "y axis")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .call(yAxis)
      .selectAll("text")
        .attr("fill", "black")
        .style("font-size", 15)
        .attr("stroke", "none");

      svg.selectAll(".tick")
        .select("text")
        .attr("fill", "black")
        .attr("stroke", "none")

  // Add the X Axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," +  height + ")")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .call(xAxis)
      .selectAll("text")
        .attr("fill", "black")
        .style("font-size", 15)
        .attr("stroke", "none");
      

  //adding chart group
  var chart = svg.append('g')
  		.attr("transform", "translate(0,0)")
  		.attr('id','chart')

  // adding each bar
  chart.selectAll('.bar')
  		.data(nums)
  		.enter()
      .append('rect')
        .attr("class", "bar")
        .attr('width', 20)
    		.attr({
          'x':function(d,i){ return xrange(i)-10}, // each i is the number of the dataset
          'y':function(d){ return yrange(d)} // each d is the actual number of drugs (the num)
        })
    		.style('fill',"#2d5faf") // blue
    		.attr('height',function(d){ return height - yrange(d);})
        .on({
          "mouseover": function(d,i) {
            d3.select(this).transition()
            .duration(300).style("opacity", 0.6);
            d3.select("#" + names[i] + "vertnum").transition()
            .duration(300).style("opacity", 1);
            d3.select(this).style("cursor", "pointer");
          },
          "mouseout": function(d,i) {
            d3.select(this).transition()
            .duration(300).style("opacity", 1);
            d3.select("#" + names[i] + "vertnum").transition()
            .duration(300).style("opacity", 0);
            d3.select(this).style("cursor", "default");
          }
        })

  // appending text on hover
  for (var i = 1; i < nums.length; i++) {
    svg.append("text")
      .attr({'x': xrange(i), 'y': yrange(nums[i])-10})
      .attr("id", names[i] + "vertnum")
      .style("text-anchor", "middle")
      .style("font-size", "13px")
      .attr("fill", "black")
      .style("opacity", 0)
      .text(nums[i])
    }



}