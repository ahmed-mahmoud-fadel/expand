"use client"

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import MobileFrame from '@/global/img/mobile-frame.png'
import QRCode from '@/global/img/demo-link.png'
import ContactForm from "@/components/forms/ContactForm";
import supportedOS from "@/global/supportedOS";
import solutions from "@/global/solutions";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const DemoSelectionPage = () => {
  const [navObject, setNavObject] = useState<Navigator | null>(null)
  // const isSupported = useMemo(() => {
  //   if (!navObject) return null
  //   return supportedOS.reduce((p, c) => {
  //     return p || navObject.userAgent.match(c) !== null 
  //   }, false)
  // }, [navObject])
  const isSupported = true

  const router = useRouter()

  useEffect(() => {
    setNavObject(navigator)
  }, [])

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="flex flex-col">
        {
          isSupported === true &&
          <div className="flex flex-col items-center gap-16 py-12 justify-evenly">
            <button
            className="flex gap-3 items-center absolute bottom-6 left-6"
            onClick={router.back}
            >
              <FaArrowLeft /> Back
            </button>
            <h1>Pick a solution to try</h1>
            {
              solutions.map((solution, n) => (
                <Link
                className="text-xl flex flex-col items-center gap-1 hover:brightness-125 transition active:opacity-50"
                href={`/demo/${solution.name.toLowerCase()}`}
                replace
                key={n}
                >
                  <div className="text-3xl p-3 rounded-full bg-primary">
                    { solution.icon }
                  </div>
                  { solution.name }
                </Link>
              ))
            }
          </div>
        }
        {
          false &&
          <>
          <Header />
          <div className="flex justify-center p-16">
            <div className="flex flex-col gap-10 rounded-3xl bg-primary p-16">
              <div className="flex justify-center items-center">
                <Image
                src={MobileFrame}
                className="w-40 bg-white rounded-[22px]"
                alt="An image of a mobile frame."
                />
                <div className="absolute flex flex-col items-center gap-3">
                  <Image
                  src={QRCode}
                  className="w-32"
                  alt="QR Code: A link to demo page."
                  />
                  {/* <p className="text-white bg-black w-full text-center rounded text-2xl font-bold">SCAN ME</p> */}
                </div>
              </div>
              <p className="text-xl w-96 text-center">
                To try our demo, please visit this page on your
                smartphone by scanning the code above.
              </p>
            </div>
          </div>
          {/* <ContactForm /> */}
          <Footer />
          </>
        }
      </main>
    </ThemeProvider>
  );
}
 
export default DemoSelectionPage;