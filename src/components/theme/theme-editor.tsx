"use client";

import { useState, useRef } from "react";
import { Paintbrush } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDraggable } from "./use-draggable";
import { Button } from "../ui/button";
import ThemeEditorContent from "./theme-editor-content";

const ThemeEditor = ({
  useFloatingButton,
}: {
  useFloatingButton?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const position = useDraggable("floating-color-editor-trigger");
  const isDragging = useRef(false);

  function handleMouseDown() {
    isDragging.current = false;
  }

  function handleMouseMove() {
    isDragging.current = true;
  }

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();

    if (!isDragging.current) {
      setIsOpen(true);
    }
    isDragging.current = false;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="relative">
        {useFloatingButton ? (
          <Button
            id="floating-color-editor-trigger"
            variant="outline"
            size="icon"
            className="rounded-full shadow-lg"
            style={{
              position: "fixed",
              right: `${position.x}px`,
              bottom: `${position.y}px`,
              zIndex: 50,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
          >
            <Paintbrush className="h-4 w-4" />
            <span className="sr-only">Open color editor</span>
          </Button>
        ) : (
          <Button
            id="color-editor-trigger"
            variant="ghost"
            size="icon"
            onClick={handleClick}
            className="rounded-full none"
          >
            <Paintbrush className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Open color editor</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Theme Editor</DialogTitle>
          <DialogDescription>
            <>
              <span className="font-bold">1.</span>{" "}
              <strong>Load from CSS:</strong> Click the{" "}
              <em>&quot;Load from CSS&quot;</em> button to import the current
              color scheme of your app for the active mode (dark or light).{" "}
              <br />
              <span className="font-bold">2.</span>{" "}
              <strong>Modify Colors:</strong> Use the color picker inputs to
              adjust the color values as desired. <br />
              <span className="font-bold">3.</span> <strong>Copy Code:</strong>{" "}
              Click the <em>&quot;Copy Code&quot;</em> button to copy the
              updated CSS code to your clipboard.
            </>
          </DialogDescription>
        </DialogHeader>
        <ThemeEditorContent />
      </DialogContent>
    </Dialog>
  );
};

export default ThemeEditor;
