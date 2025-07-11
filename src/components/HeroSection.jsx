import React from "react"
import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"

const HeroSection = () => {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center  ">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
        Silent Alert — Report Crime, Stay Anonymous        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
        Use Silent Alert to report suspicious activity with full privacy. Share location, media, and help create safer streets

        </p>
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <NavLink to="/reports/create">
            <Button size="lg">Report a Crime</Button>
          </NavLink>
         

        </div>
      </div>
    </section>
  )
}

export default HeroSection
