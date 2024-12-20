'use client'; // Đảm bảo chính xác

import {Poppins } from "next/font/google";
import {Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./Utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Providers";
import { SessionProvider } from "next-auth/react";
import Loader from "./components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSilce";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  variable: "--font-Poppins",
})

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  variable: "--font-Josefin",
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat  dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300 ` }>
          <Providers>
            <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Custom>{children}</Custom>
            {/* {children} */}
            <Toaster position='top-center' reverseOrder={false} />
          </ThemeProvider>
          </SessionProvider>
          </Providers>
      </body>
    </html>
  );
}

const Custom: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {isLoading} = useLoadUserQuery({});
  return(
    <>
    {
      isLoading ? <Loader /> : <>{children}</>
    }
    </>
  )
}