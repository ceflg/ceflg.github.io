d3.json('data.json').then(function(data) {
    const svg = d3.select("#timeline").append("svg")
        .attr("width", 800)
        .attr("height", 600);

    // Scales and other setup...
    const xScale = d3.scaleLinear()
        .domain([1800, 2020])
        .range([0, 800]);

    // Drawing circles for each sociologist
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.theoryYear))
        .attr("cy", (d, i) => 50 + i * 40)
        .attr("r", 20)
        .on("click", d => window.open(d.wikiUrl, "_blank"));

    // Adding labels
    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", d => xScale(d.theoryYear) + 25)
        .attr("y", (d, i) => 55 + i * 40)
        .text(d => `${d.name} (${d.birth}-${d.death})`);
});
