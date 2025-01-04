import { useState, useEffect, useCallback } from "react";

export const useDraggable = (id: string) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      const element = document.getElementById(id);
      if (!element) return;

      const startX = e.clientX - position.x;
      const startY = e.clientY - position.y;

      const handleMouseMove = (e: MouseEvent) => {
        setPosition({
          x: e.clientX - startX,
          y: e.clientY - startY,
        });
        // Dispatch a custom event to notify that dragging is happening
        element.dispatchEvent(new CustomEvent("dragging"));
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [id, position]
  );

  useEffect(() => {
    const element = document.getElementById(id);
    if (element) {
      element.style.position = "fixed";
      element.style.left = `${position.x}px`;
      element.style.top = `${position.y}px`;
      element.style.cursor = "move";
      element.addEventListener("mousedown", handleMouseDown);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousedown", handleMouseDown);
      }
    };
  }, [id, handleMouseDown, position]);

  return position;
};
