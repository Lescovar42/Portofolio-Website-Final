"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background abstract element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-left"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            Muhammad Farhan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Abdul Azis
            </span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Informatics Student at Universitas Diponegoro specializing in AI, Computer Vision, Robotics, and Web Development. Building intelligent systems and immersive experiences.
          </motion.p>
          
          <motion.a
            href="#projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ y: -5, boxShadow: "0 0 20px rgba(0, 242, 254, 0.5)" }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all duration-300"
          >
            View Work
            <ArrowRight size={20} className="text-primary" />
          </motion.a>
        </motion.div>

        {/* 3D-like Abstract Geometric Shape */}
        <motion.div
          className="relative flex justify-center items-center h-[400px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.div
            animate={{ 
              rotateX: [0, 15, 0],
              rotateY: [0, 45, 0],
              y: [-15, 15, -15]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-64 h-64 md:w-80 md:h-80"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Using nested divs with borders to simulate a wireframe 3D object */}
            <div className="absolute inset-0 border border-primary/50 rounded-2xl animate-float shadow-[0_0_30px_rgba(0,242,254,0.2)] backdrop-blur-sm" />
            <div className="absolute inset-4 border border-accent/40 rounded-full animate-[float_7s_ease-in-out_infinite_reverse]" />
            <div className="absolute inset-8 border border-secondary/30 rotate-45 rounded-lg animate-[float_5s_ease-in-out_infinite]" />
            <div className="absolute inset-1/4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-xl animate-pulse-glow" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
