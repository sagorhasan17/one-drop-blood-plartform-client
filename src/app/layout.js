import ReactToastContainer from "@/components/shared/ReactToastContainer";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "One Drop Blood",
  description: "Save Lives Through Blood Donation",

  icons: {
    icon: "/oneDropLogo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="dark scroll-smooth"
      data-theme="dark"
    >
      <body
        className={`${poppins.className} min-h-screen bg-background text-foreground flex flex-col`}
      >
        <main className="flex-1">{children}</main>
        <ReactToastContainer />
      </body>
    </html>
  );
}
