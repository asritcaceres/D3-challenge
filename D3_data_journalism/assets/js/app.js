var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(healthData) {
  
    //  Parse Data/Cast as numbers
    
    healthData.forEach(function(data) {
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;      
    });

    // Create scale functions
    
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(healthData, d => d.poverty + 3)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([3, d3.max(healthData, d => d.healthcare + 2)])
      .range([height, 0]);

    //Create axis functions

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Create Circles

    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "10")
    .attr("fill", "steelblue")
    .attr("opacity", ".75")

    // Add abbreviations to the circles

    var circlesText = chartGroup.selectAll()
    .data(healthData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .attr("font-size", "10px")
    .style("text-anchor", "middle")
    .style("fill", "white")
    .text(function (d) { return d.abbr })
    
    
    // Initialize tool tip
   
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([0, 10])
      .style("background", "#000")
      .style("color", "white")
      .style("padding", "10px")
      .html(function(d) {
        return (`${d.state}<br>Lacks healthcare (%): ${d.healthcare}<br>In Poverty(%): ${d.poverty}`);
      });

    // Create tooltip in the chart
    chartGroup.call(toolTip);

    //Create event listeners to display and hide the tooltip
    
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
      
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
    
      // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .style("font-weight", "bold")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .style("font-weight", "bold")
      .text("In Poverty (%)");

  }).catch(function(error) {
    console.log(error);
  });
