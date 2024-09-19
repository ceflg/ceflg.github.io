document.addEventListener('DOMContentLoaded', function() {
    d3.json('data.json').then(function(data) {
        // Järjestä data teoreettisen vuoden mukaan nousevasti
        data.sort((a, b) => b.theoryYear - a.theoryYear);
        drawTimeline(data);
    }).catch(function(error) {
        console.error('Error loading the data:', error);
    });
});

function drawTimeline(data) {
    const width = 960, height = 500;
    const margin = {top: 40, right: 20, bottom: 30, left: 200};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select("#timeline").append("svg")
        .attr("width", width)
        .attr("height", height);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const yScale = d3.scalePoint()
        .domain(data.map(d => d.name))
        .range([0, innerHeight])
        .padding(1);

    const xScale = d3.scaleLinear()
        .domain([1750, 2020])
        .range([0, innerWidth]);

    // Draw the life span dashed line
    g.selectAll(".life-span")
        .data(data)
        .enter().append("line")
        .attr("class", "life-span")
        .attr("x1", d => xScale(d.birth))
        .attr("x2", d => xScale(d.death))
        .attr("y1", d => yScale(d.name))
        .attr("y2", d => yScale(d.name))
        .attr("stroke", "#ccc")
        .attr("stroke-dasharray", "5,5");

    // Draw circles for theory year
    g.selectAll(".theory-point")
        .data(data)
        .enter().append("circle")
        .attr("cx", d => xScale(d.theoryYear))
        .attr("cy", d => yScale(d.name))
        .attr("r", 5)
        .attr("fill", "steelblue");

    // Draw info texts
    g.selectAll(".info-text")
        .data(data)
        .enter().append("text")
        .attr("x", d => xScale(d.theoryYear) - 10) 
        .attr("y", d => yScale(d.name) - 20)
        .attr("text-anchor", "start")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .each(function(d) {
            d3.select(this).append("tspan")
                .attr("x", xScale(d.theoryYear) - 10)
                .attr("dy", "-1.2em")
                .text(`Contribution: ${d.contribution}`);
            d3.select(this).append("tspan")
                .attr("x", xScale(d.theoryYear) - 10)
                .attr("dy", "1.2em")
                .text(`Key works: ${d.keyWorks}`);
        });

    // Add theory year labels above each circle, slightly left aligned
    g.selectAll(".theory-year-text")
        .data(data)
        .enter().append("text")
        .attr("x", d => xScale(d.theoryYear) - 10) 
        .attr("y", d => yScale(d.name) - 10)
        .text(d => d.theoryYear)
        .attr("text-anchor", "start")
        .attr("font-size", "10px")
        .attr("fill", "darkblue");

    // Add the axes
    g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

    g.append("g").call(d3.axisLeft(yScale));
}




    
