import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { forceSimulation, forceCollide } from "d3-force"; 

const ChartD3 = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 800;

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.market_cap)])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.total_volume)])
      .range([height, 0]);

    const rScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.current_price)])
      .range([20, 50]);

    const bubbles = svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", (d) => rScale(d.current_price) * 2.15)
      .attr("fill", "transparent")
      .classed("bubble", true)
      .classed("green", (d) => d.price_change_percentage_24h > 0)
      .classed("red", (d) => d.price_change_percentage_24h <= 0)
      .attr("stroke-width", 3)
      .style("opacity", 0.7);

    bubbles
      .on("mouseover", (event, d) => {
        const tooltip = d3.select("#tooltip");
        tooltip.html(
          `<strong>${d.symbol}</strong><br>Market Cap: $${d.market_cap}<br>Total Volume: $${d.total_volume}<br>Price: $${d.current_price}`
        );
        tooltip.style("visibility", "visible");
        tooltip.style("top", `${event.pageY}px`);
        tooltip.style("left", `${event.pageX}px`);
      })
      .on("mouseout", () => {
        d3.select("#tooltip").style("visibility", "hidden");
      });

   
    const textLabels = svg
      .selectAll(null)
      .data(data)
      .enter()
      .append("text")
      .attr("text-anchor", "middle") 
      .attr("dy", ".35em") 
      .attr("fill", "white");

    textLabels
      .append("tspan")
      .attr("dy", "-0.5em") 
      .text((d) => d.symbol);

    textLabels
      .append("tspan")
      .attr("dy", "1.2em") 
      .attr("text-anchor", "middle")
      .text((d) => `${d.current_price.toFixed(2)}`);


    textLabels.attr("x", (d) => d.x).attr("y", (d) => d.y);

    const simulation = forceSimulation(data)
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05))
      .force(
        "collision",
        forceCollide()
          .radius((d) => rScale(d.current_price) + 40)
          .strength(0.5)
      )
      .on("tick", () => {
        bubbles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

        textLabels.attr("x", (d) => d.x).attr("y", (d) => d.y);
      });

    for (let i = 0; i < 100; ++i) {
      simulation.tick();
    }
  }, [data]);

  return (
    <div>
      <svg ref={svgRef} width={800} height={800} className="my-8 mx-auto"></svg>
      <div
        id="tooltip"
        style={{
          position: "absolute",
          visibility: "hidden",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "white",
          padding: "5px",
          borderRadius: "5px",
        }}
      ></div>
    </div>
  );
};

export default ChartD3;
