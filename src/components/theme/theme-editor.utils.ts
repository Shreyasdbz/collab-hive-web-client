export function hslToHex(hsl: string): string {
  const [h, s, l] = hsl.split(" ").map((val, index) => {
    if (index === 0) return parseFloat(val); // Hue
    return parseFloat(val.replace("%", "")) / 100; // Saturation, Lightness
  });

  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - chroma / 2;

  const [r, g, b] = (() => {
    if (h < 60) return [chroma, x, 0];
    if (h < 120) return [x, chroma, 0];
    if (h < 180) return [0, chroma, x];
    if (h < 240) return [0, x, chroma];
    if (h < 300) return [x, 0, chroma];
    return [chroma, 0, x];
  })();

  const toHex = (val: number) =>
    Math.round((val + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function hexToHsl(hex: string): string {
  // Remove the hash if present
  hex = hex.replace(/^#/, "");

  // Parse r, g, b values
  let r: number, g: number, b: number;
  if (hex.length === 3) {
    // Convert shorthand format (#RGB) to full format (#RRGGBB)
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else {
    throw new Error("Invalid HEX color.");
  }

  // Convert r, g, b to percentages
  r /= 255;
  g /= 255;
  b /= 255;

  // Find min and max values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  // Calculate luminance
  let h = 0;
  const l = (max + min) / 2;

  // Calculate saturation
  let s = 0;
  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    // Calculate hue
    if (max === r) {
      h = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
    } else if (max === g) {
      h = ((b - r) / delta + 2) * 60;
    } else {
      h = ((r - g) / delta + 4) * 60;
    }
  }

  // Round values for CSS output
  h = Math.round(h);
  s = Math.round(s * 100);
  const lPercentage = Math.round(l * 100);

  // Return the CSS-friendly HSL string
  return `${h} ${s}% ${lPercentage}%`;
}
