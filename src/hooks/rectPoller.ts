import React from "react";

const useRectPoller = () => {
  const [rect, setRect] = React.useState<DOMRect>();
  const divRef = React.createRef<HTMLDivElement>();

  setInterval(() => {
    if (!divRef.current) {
      return;
    }
    const currentRect = divRef.current.getBoundingClientRect();
    setRect(currentRect);
  }, 1000);

  const top = rect?.top;
  const left = rect?.left;

  return { rect, divRef, top, left };
};

export default useRectPoller;
