import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { UserProvider } from "@/providers/UserProvider";
import { Toaster } from "@/components/ui/toaster";

const defaultUrl = process.env.NEXT_PUBLIC_APP_URL
  ? new URL(process.env.NEXT_PUBLIC_APP_URL)
  : new URL("http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "CollabHive",
  description: "Discover hobby projects and collaborators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute={"class"}
          defaultTheme={"system"}
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <QueryProvider>
              {children}
              <Toaster />
            </QueryProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
