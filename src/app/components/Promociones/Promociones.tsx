"use client"
import React from 'react'
import { motion } from 'framer-motion'
export const Promociones = () => {
  return (
    <div>
      <div className="top-of-promotions">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
        </svg>
      </div>
      <div className="grid md:flex justify-around items-center bg-[#E4F0D0] p-10">
          <motion.div 
            className="p-10 bg-white h-[30vh] w-auto md:w-[25vw] rounded-lg border-2 border-slate-200"
            initial={{ opacity: 0, x: -100 }} // initial state with x set to -100
            animate={{ opacity: 1, x: 0 }} // animate to this state with x set to 0
            transition={{ duration: 0.5 }} // transition duration
          >
          </motion.div>
          <motion.div 
            className="w-auto md:w-[30vw] text-wrap"
            initial={{ opacity: 0, x: 100 }} // initial state
            animate={{ opacity: 1, x: 0 }} // animate to this state
            transition={{ duration: 0.5 }} // transition duration

          >
              <span className="text-2xl md:text-4xl font-bold text-slate-400">Quieres promocionar algun evento? Quieres promocionarte?</span>
              <span className="text-slate-400">Comuniquece con nosotros y podriamos llegar a un acuerdo.</span>
          </motion.div>
      </div>
      <div className="bottom-of-promotions">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
        </svg>
      </div>
    </div>
  )
}
