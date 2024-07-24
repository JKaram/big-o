import * as d3 from "d3";

const bubbleSort = async (arr: number[]) => {
  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;

        const current = `#rect${arr[i]}`;
        const right = `#rect${arr[i + 1]}`;

        const currentX = d3.select(current).attr("x");
        const rightX = d3.select(right).attr("x");

        d3.select(current).attr("fill", "red");
        d3.select(right).attr("fill", "yellow");

        await Promise.all([
          d3
            .select(`#rect${arr[i]}`)
            .transition()
            .duration(1000)
            .attr("x", rightX)
            .end(),
          d3
            .select(`#rect${arr[i + 1]}`)
            .transition()
            .duration(1000)
            .attr("x", currentX)
            .end(),
        ]);

        d3.select(current).attr("fill", "#6baed6");
        d3.select(right).attr("fill", "#6baed6");
      }
    }
  } while (swapped);
  return arr;
};

export { bubbleSort };
