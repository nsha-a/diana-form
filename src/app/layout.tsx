import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { PT_Serif } from "next/font/google";

const serif = PT_Serif({
  style: 'normal',
  weight: "400",
  subsets: ["latin"], 
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        serif.className
      )}>
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
          <div className="container max-w-7xl mx-auto h-full pt-12">
            {children}
          </div>
      </body>
    </html>
  );
}
