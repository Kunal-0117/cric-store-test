import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { StoreProvider } from "@/stores/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cric Heroes Project",
  description: "A small-scale, functional component of a cricket apparel web store.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>

          <Navbar />
          <main className="mt-12">
            {children}
          </main>
          <footer />

        </StoreProvider>
      </body>
    </html>
  );
}
