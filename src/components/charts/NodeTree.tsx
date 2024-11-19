import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface NodeData {
  id: string;
  value: number;
  parent: string;
}
const nodePairs: NodeData[] = [
  { id: "1", value: 1, parent: "" },
  { id: "2", value: 2, parent: "1" },
  { id: "3", value: 3, parent: "1" },
  { id: "4", value: 4, parent: "3" },
  { id: "5", value: 5, parent: "1" },
  { id: "6", value: 6, parent: "1" },
  { id: "7", value: 7, parent: "1" },
  { id: "8", value: 8, parent: "7" },
  { id: "9", value: 9, parent: "1" },
  { id: "10", value: 9, parent: "1" },
];

const root: d3.HierarchyNode<NodeData> = d3
  .stratify<NodeData>()
  .id((d) => d.id)
  .parentId((d) => d.parent)(nodePairs);

const VIEW_BOX_WIDTH = 100;
const VIEW_BOX_HEIGHT = 100;

const layoutWidth = 1000;
const layoutHeight = 400;

const viewBox = `0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_HEIGHT}`;

export const NodeTree = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const treeLayout = d3.tree<NodeData>().size([layoutWidth, layoutHeight]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const treeData = treeLayout(root);
    const nodes = treeData.descendants();
    const links = treeData.links();

    // Calculate the bounding box of the tree layout
    const xExtent = d3.extent(nodes, (d) => d.x) as [number, number];
    const yExtent = d3.extent(nodes, (d) => d.y) as [number, number];

    const xRange = xExtent[1] - xExtent[0];
    const yRange = yExtent[1] - yExtent[0];

    // Calculate scaling factors
    const scaleX = VIEW_BOX_WIDTH / xRange;
    const scaleY = VIEW_BOX_HEIGHT / yRange;
    const scale = Math.min(scaleX, scaleY);

    // Calculate the offset to center the tree
    const offsetX = (VIEW_BOX_WIDTH - xRange * scale) / 2 - xExtent[0] * scale;
    const offsetY = (VIEW_BOX_HEIGHT - yRange * scale) / 2 - yExtent[0] * scale;

    // Apply scaling and centering to nodes
    nodes.forEach((node) => {
      node.x = node.x * scale + offsetX;
      node.y = node.y * scale + offsetY;
    });

    // Add lines for each link
    svg
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y)
      .attr("stroke", "white")
      .attr("stroke-width", 1);

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
      .attr("font-size", 3)
      .attr("fill", "white")
      .text((d) => d.data.value);
  }, [treeLayout]);

  return (
    <>
      <svg
        height={layoutHeight}
        width={layoutWidth}
        viewBox={viewBox}
        ref={svgRef}
      />
    </>
  );
};
