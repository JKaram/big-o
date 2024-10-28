import * as d3 from "d3";
import { useEffect, useRef } from "react";

const nodePairs = [
  { name: "Eve", parent: "" },
  { name: "Cain", parent: "Eve" },
  { name: "Seth", parent: "Eve" },
  { name: "Enos", parent: "Seth" },
  { name: "Noam", parent: "Seth" },
  { name: "Abel", parent: "Eve" },
  { name: "Awan", parent: "Eve" },
  { name: "Enoch", parent: "Awan" },
  { name: "Azura", parent: "Eve" },
];

const root = d3
  .stratify()
  .id((d) => d.name)
  .parentId((d) => d.parent)(nodePairs);

export const NodeTree = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const treeLayout = d3.tree().size([500, 500]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg.attr("style", "border: 1px solid white");

    const treeData = treeLayout(root);
    const nodes = treeData.descendants();

    // Calculate scaling factors
    const viewBoxWidth = 100;
    const viewBoxHeight = 100;
    const layoutWidth = 400;
    const layoutHeight = 400;
    const scaleX = viewBoxWidth / layoutWidth;
    const scaleY = viewBoxHeight / layoutHeight;

    // Apply scaling factors to nodes
    nodes.forEach((node) => {
      node.x *= scaleX;
      node.y *= scaleY;
    });

    console.log(nodes);

    svg
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 3)
      .attr("fill", "white");

    svg
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y - 10)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text((d) => d.data.name);
  }, []);

  return (
    <>
      <svg
        height="500px"
        width="500px"
        viewBox="0 0 100 100"
        ref={svgRef}
      ></svg>
    </>
  );
};
