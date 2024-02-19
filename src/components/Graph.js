import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const BubbleChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;

    // Set up scales
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

    // Create bubbles
    const bubbles = svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("g")
      .attr(
        "transform",
        (d) => `translate(${xScale(d.market_cap)}, ${yScale(d.total_volume)})`
      )
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

    bubbles
      .append("circle")
      .attr("r", (d) => rScale(d.current_price))
      .attr("fill", "gray")
      .attr("stroke", (d) =>
        d.price_change_percentage_24h > 0 ? "green" : "red"
      )
      .attr("stroke-width", 3)
      .attr("opacity", 0.7);

    bubbles
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("fill", "black")
      .text(function (d) {
        return d.symbol;
      });
  }, [data]);

  return (
    <div>
      <svg
        ref={svgRef}
        width={1000}
        height={700}
        className="my-8 mx-auto"
      ></svg>
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

export default BubbleChart;
