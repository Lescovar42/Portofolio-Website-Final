"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background abstract element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50 animate-breathe" />

      {/* Floating particles gimmick */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1.5 h-1.5 rounded-full blur-[1px] ${i % 2 === 0 ? 'bg-primary' : 'bg-accent'}`}
          initial={{
            x: ((i * 17) % 100) + "vw",
            y: ((i * 23) % 100) + "vh",
            opacity: ((i * 3) % 6) * 0.1 + 0.2,
            scale: ((i * 7) % 20) * 0.1,
          }}
          animate={{
            y: [null, -(((i * 13) % 300) + 100)],
            x: [null, (((i * 11) % 200) - 100)],
            opacity: [null, 0],
          }}
          transition={{
            duration: ((i * 5) % 5) + 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-left"
        >
          <motion.p 
            className="text-xl md:text-2xl text-primary font-mono mb-4 tracking-widest inline-block px-4 py-1 border border-primary/30 rounded-full bg-primary/5 backdrop-blur-sm shadow-[0_0_15px_rgba(0,242,254,0.3)]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            &gt; Hello, I'm Muh Farhan_
          </motion.p>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1.1] uppercase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1, type: "spring", stiffness: 100 }}
          >
            Building A <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-pulse-glow inline-block hover:scale-105 transition-transform cursor-default">
              Digital Reality
            </span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg font-light leading-relaxed border-l-2 border-primary pl-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Informatics Student at Universitas Diponegoro specializing in AI, Computer Vision, Robotics, and Web Development. Crafting intelligent systems with maximum aesthetics.
          </motion.p>
          
          <motion.a
            href="#projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ y: -5, scale: 1.05, boxShadow: "0 0 30px rgba(0, 242, 254, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-white/20 hover:border-primary/50 text-white font-medium transition-all duration-300 backdrop-blur-md relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Work
              <ArrowRight size={20} className="text-white group-hover:translate-x-1 transition-transform" />
            </span>
            {/* Hover shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
          </motion.a>
        </motion.div>

        {/* 3D Tesseract Geometric Shape */}
        <motion.div
          className="relative flex justify-center items-center h-[400px] lg:h-[600px] perspective-[1200px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.div
            animate={{ 
              rotateX: [0, 360],
              rotateY: [0, 360],
              rotateZ: [0, 360],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="relative w-48 h-48 md:w-64 md:h-64 preserve-3d"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Outer Cube */}
            <div className="absolute inset-0 preserve-3d border-primary text-primary shadow-[0_0_50px_rgba(0,242,254,0.3)]">
              <div className="absolute inset-0 border-2 border-current bg-primary/5" style={{ transform: "translateZ(128px)" }} />
              <div className="absolute inset-0 border-2 border-current bg-primary/5" style={{ transform: "translateZ(-128px)" }} />
              <div className="absolute inset-0 border-2 border-current bg-primary/5" style={{ transform: "rotateY(-90deg) translateZ(128px)" }} />
              <div className="absolute inset-0 border-2 border-current bg-primary/5" style={{ transform: "rotateY(90deg) translateZ(128px)" }} />
              <div className="absolute inset-0 border-2 border-current bg-primary/5" style={{ transform: "rotateX(90deg) translateZ(128px)" }} />
              <div className="absolute inset-0 border-2 border-current bg-primary/5" style={{ transform: "rotateX(-90deg) translateZ(128px)" }} />
            </div>

            {/* Inner Cube (Tesseract core) */}
            <motion.div 
              animate={{ 
                rotateX: [0, -720],
                rotateY: [0, -720],
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-1/4 left-1/4 w-1/2 h-1/2 preserve-3d border-accent text-accent"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 border-[3px] border-current bg-accent/10 shadow-[inset_0_0_20px_rgba(155,81,224,0.5)]" style={{ transform: "translateZ(64px)" }} />
              <div className="absolute inset-0 border-[3px] border-current bg-accent/10 shadow-[inset_0_0_20px_rgba(155,81,224,0.5)]" style={{ transform: "translateZ(-64px)" }} />
              <div className="absolute inset-0 border-[3px] border-current bg-accent/10 shadow-[inset_0_0_20px_rgba(155,81,224,0.5)]" style={{ transform: "rotateY(-90deg) translateZ(64px)" }} />
              <div className="absolute inset-0 border-[3px] border-current bg-accent/10 shadow-[inset_0_0_20px_rgba(155,81,224,0.5)]" style={{ transform: "rotateY(90deg) translateZ(64px)" }} />
              <div className="absolute inset-0 border-[3px] border-current bg-accent/10 shadow-[inset_0_0_20px_rgba(155,81,224,0.5)]" style={{ transform: "rotateX(90deg) translateZ(64px)" }} />
              <div className="absolute inset-0 border-[3px] border-current bg-accent/10 shadow-[inset_0_0_20px_rgba(155,81,224,0.5)]" style={{ transform: "rotateX(-90deg) translateZ(64px)" }} />
            </motion.div>
            
            {/* Inner Glowing Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full blur-[20px] animate-pulse-glow mix-blend-overlay" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
