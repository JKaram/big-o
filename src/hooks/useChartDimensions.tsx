import { useEffect, useRef, useState } from "react";
import combineChartDimensions from "../utils/combineChartDimensions";

export const useChartDimensions = (passedSettings) => {
  const ref = useRef();
  const dimensions = combineChartDimensions(passedSettings);
  const [width, changeWidth] = useState(0);
  const [height, changeHeight] = useState(0);
  useEffect(() => {
    if (dimensions.width && dimensions.height) return;
    const element = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;
      const entry = entries[0];
      if (width != entry.contentRect.width)
        changeWidth(entry.contentRect.width);
      if (height != entry.contentRect.height)
        changeHeight(entry.contentRect.height);
    });
    resizeObserver.observe(element);
    return () => resizeObserver.unobserve(element);
  }, []);
  const newSettings = combineChartDimensions({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  });
  return [ref, newSettings];
};
