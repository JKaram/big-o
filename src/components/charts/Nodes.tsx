import { useEffect } from "react";
import * as d3 from "d3";

type Node = {
  x: number;
  y: number;
  radius: number;
  color: string;
  children: Node[];
  value: number;
};

interface TreeNodeProps {
  node: Node;
  parent?: Node;
}

const rootNode: Node = {
  x: 400, // half of SVG's width
  y: 10, // half of SVG's height
  radius: 10,
  color: "red",
  children: [
    {
      x: 350,
      y: 50,
      radius: 10,
      color: "green",
      children: [
        { x: 300, y: 100, radius: 10, color: "green", children: [], value: 3 },
        { x: 350, y: 100, radius: 10, color: "green", children: [], value: 4 },
      ],
      value: 2,
    },
    { x: 450, y: 50, radius: 10, color: "blue", children: [], value: 5 },
  ],
  value: 1,
};

const TreeNode = ({ node, parent }: TreeNodeProps) => {
  return (
    <svg width="800" height="600">
      {parent && (
        <line
          x1={parent.x}
          y1={parent.y}
          x2={node.x}
          y2={node.y}
          stroke="black"
        />
      )}
      <g>
        <circle
          id={`node-${node.value}`}
          cx={node.x}
          cy={node.y}
          r={node.radius}
          fill={node.color}
        />
        <text
          x={node.x}
          y={node.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
        >
          {node.value}
        </text>
      </g>

      {node.children.map((childNode, index) => (
        <TreeNode key={index} node={childNode} parent={node} />
      ))}
    </svg>
  );
};

const NodeTree = ({ root }: { root: Node }) => <TreeNode node={root} />;

const depthFirstSearch = async (root: Node, value: number) => {
  let stack: Node[] = [];
  stack.push(root);

  while (stack.length !== 0) {
    let node = stack.pop();

    const current = `#node-${node?.value}`;

    await Promise.all([
      d3
        .select(current)
        .attr("fill", "purple")
        .transition()
        .duration(1000)
        .attrTween("transform", function () {
          return d3.interpolateString("scale(1)", "scale(2)");
        })
        .transition()
        .duration(1000)
        .attrTween("transform", function () {
          return d3.interpolateString("scale(2)", "scale(1)");
        })
        .end(),
    ]);

    if (node?.value === value) {
      return node;
    }

    for (let i: number = node?.children.length || 0 - 1; i >= 0; i--) {
      stack.push(node?.children[i]!);
    }
  }

  return null;
};

function Nodes() {
  useEffect(() => {
    depthFirstSearch(rootNode, 5);
  }, []);

  return <NodeTree root={rootNode} />;
}

export default Nodes;
