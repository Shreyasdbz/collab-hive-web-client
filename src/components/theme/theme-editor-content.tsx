"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { IThemeColor, DEFAULT_THEME_COLORS } from "./theme-editor.interface";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { hexToHsl, hslToHex } from "./theme-editor.utils";
import { DialogFooter } from "../ui/dialog";
import { Code, RotateCcw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ThemeEditorContent = () => {
  const [colorsFromFile, setColorsFromFile] = useState<IThemeColor[]>([]);
  const [colors, setColors] = useState<IThemeColor[]>([]);

  function handleColorChange(name: string, value: string) {
    const newColors = [...colors];
    newColors.map((color) => {
      if (color.name === name) {
        color.hslValue = hexToHsl(value);
      }
      return color;
    });
    document.documentElement.style.setProperty(`--${name}`, hexToHsl(value));
    setColors(newColors);
  }

  function resetValues() {
    setColors([...colorsFromFile]);

    colorsFromFile.map((color) => {
      handleColorChange(color.name, hslToHex(color.hslValue));
    });
  }

  function getCode() {
    const cssClass = `
    .RENAME-ME {
      ${colors
        .map((color) => `--${color.name}: ${color.hslValue};`)
        .join("\n  ")}
    }
    `;

    navigator.clipboard.writeText(cssClass).then(
      () => {
        toast({
          title: "CSS copied to clipboard",
        });
      },
      (err) => {
        console.error("Failed to copy CSS", err);
        toast({
          title: "Failed to copy CSS",
          variant: "destructive",
        });
      }
    );
  }

  useEffect(() => {
    // Load colors from global styles
    const initialColors = DEFAULT_THEME_COLORS.map((color) => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(
        `--${color.name}`
      );
      return {
        ...color,
        hslValue: value || color.hslValue,
      };
    });
    setColorsFromFile(JSON.parse(JSON.stringify(initialColors))); // Deep copy
    setColors(JSON.parse(JSON.stringify(initialColors))); // Deep copy
  }, []);

  const ColorInputBlock = ({
    name,
    color,
  }: {
    name: string;
    color: IThemeColor;
  }) => {
    const [tempValue, setTempValue] = useState(hslToHex(color.hslValue));

    return (
      <div className="w-full flex flex-col items-center justify-center space-y-1 col-span-3 px-4">
        <Input
          id={color.name}
          type="color"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)} // Update tempValue during drag
          onBlur={(e) => handleColorChange(name, e.target.value)} // Commit change on focus loss
          className="w-full min-h-10 lg:min-h-16 border border-transparent hover:border-accent shadow-sm hover:shadow-md hover:cursor-pointer rounded-lg"
        />
        <span className="text-xs text-accent-foreground">
          HSL: {color.hslValue}
        </span>
      </div>
    );
  };

  return (
    <>
      <Card className="w-full shadow-none">
        <CardContent className="w-full px-0 py-0">
          <ScrollArea className="w-full">
            <div className="w-full flex flex-col space-y-4 max-h-64 lg:max-h-96">
              {colors.map((color) => (
                <div
                  key={color.name}
                  className="w-full grid grid-cols-5 items-center justify-center border-b border-accent py-2"
                >
                  <Label className="col-span-2 flex items-center justify-start pl-4">
                    {color.name}
                  </Label>
                  <ColorInputBlock name={color.name} color={color} />
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <DialogFooter>
        <Button
          variant={"ghost"}
          onClick={resetValues}
          aria-label="Reset"
          aria-describedby="reset"
        >
          <RotateCcw size={16} />
          <span className="sr-only">Reset</span>
        </Button>
        <Button variant={"default"} onClick={getCode}>
          <Code size={16} />
          <span>Copy code</span>
        </Button>
      </DialogFooter>
    </>
  );
};

export default ThemeEditorContent;
