import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "./components/navigation";
import Footer from "./components/footer";
import "./globals.css";

// Separate the SearchWrapper component into its own file

export default function RootLayout({ children }) {
  return (
    <html lang="de-DE">
      <GoogleTagManager gtmId="GTM-W8SRCCMZ" />
      <GoogleAnalytics gaId="G-NJQRXCHBD2" />
      <body>
        <Navbar />
          {children}
       <Footer />
      </body>
    </html>
  );
}