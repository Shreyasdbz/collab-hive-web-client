export interface IThemeColor {
  name: string;
  hslValue: string;
}
export const DEFAULT_THEME_COLORS: IThemeColor[] = [
  { name: "background", hslValue: "0 0% 100%" },
  { name: "foreground", hslValue: "240 10% 3.9%" },
  { name: "card", hslValue: "0 0% 100%" },
  { name: "card-foreground", hslValue: "240 10% 3.9%" },
  { name: "popover", hslValue: "0 0% 100%" },
  { name: "popover-foreground", hslValue: "240 10% 3.9%" },
  { name: "primary", hslValue: "240 5.9% 10%" },
  { name: "primary-foreground", hslValue: "0 0% 98%" },
  { name: "secondary", hslValue: "240 4.8% 95.9%" },
  { name: "secondary-foreground", hslValue: "240 5.9% 10%" },
  { name: "muted", hslValue: "240 4.8% 95.9%" },
  { name: "muted-foreground", hslValue: "240 3.8% 46.1%" },
  { name: "accent", hslValue: "240 4.8% 95.9%" },
  { name: "accent-foreground", hslValue: "240 5.9% 10%" },
  { name: "destructive", hslValue: "0 84.2% 60.2%" },
  { name: "destructive-foreground", hslValue: "0 0% 98%" },
  { name: "border", hslValue: "240 5.9% 90%" },
  { name: "input", hslValue: "240 5.9% 90%" },
  { name: "ring", hslValue: "240 10% 3.9%" },
  { name: "chart-1", hslValue: "12 76% 61%" },
  { name: "chart-2", hslValue: "173 58% 39%" },
  { name: "chart-3", hslValue: "197 37% 24%" },
  { name: "chart-4", hslValue: "43 74% 66%" },
  { name: "chart-5", hslValue: "27 87% 67%" },
];
