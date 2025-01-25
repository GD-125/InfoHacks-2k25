import dynamic from "next/dynamic"
import Navbar from "@/components/Navbar"
import About from "@/components/About"
import ProjectShowcase from "@/components/ProjectShowcase"
import Coordinators from "@/components/Coordinators"
import Awards from "@/components/Awards"
import Venue from "@/components/Venue"
import Footer from "@/components/Footer"
import { ThemeProvider } from "./providers"
import Team from "@/components/Team"

const Hero = dynamic(() => import("@/components/Hero"), { ssr: false })

export default function Home() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
        <Hero />
        <About />
        <ProjectShowcase />
        <Awards id="awards" />
        <Venue id="venue" />
        <Team />
        <Coordinators />
        <Footer />
      </main>
    </ThemeProvider>
  )
}

