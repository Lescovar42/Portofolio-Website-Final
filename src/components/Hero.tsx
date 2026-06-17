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

        {/* High-Tech Digital Reality Orb */}
        <motion.div
          className="relative flex justify-center items-center h-[400px] lg:h-[600px] group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.svg
            viewBox="0 0 400 400"
            className="w-full h-full max-w-[500px] drop-shadow-[0_0_30px_rgba(0,242,254,0.3)] group-hover:drop-shadow-[0_0_50px_rgba(0,242,254,0.6)] transition-all duration-500"
          >
            <defs>
              <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f2fe" />
                <stop offset="100%" stopColor="#4facfe" />
              </linearGradient>
              <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9b51e0" />
                <stop offset="100%" stopColor="#00f2fe" />
              </linearGradient>
            </defs>

            {/* Outer dashed ring - slow clockwise rotation */}
            <motion.circle
              cx="200"
              cy="200"
              r="180"
              fill="none"
              stroke="url(#primaryGrad)"
              strokeWidth="2"
              strokeDasharray="4 12"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              style={{ originX: "50%", originY: "50%" }}
            />

            {/* Middle thick ring with dash offset - counter-clockwise */}
            <motion.circle
              cx="200"
              cy="200"
              r="140"
              fill="none"
              stroke="url(#accentGrad)"
              strokeWidth="4"
              strokeDasharray="60 40"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              style={{ originX: "50%", originY: "50%" }}
            />

            {/* Inner Hexagon - pulsing and rotating */}
            <motion.polygon
              points="200,80 304,140 304,260 200,320 96,260 96,140"
              fill="none"
              stroke="url(#primaryGrad)"
              strokeWidth="3"
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ originX: "50%", originY: "50%" }}
            />

            {/* Inner Star/Diamond */}
            <motion.polygon
              points="200,120 230,170 280,200 230,230 200,280 170,230 120,200 170,170"
              fill="url(#accentGrad)"
              opacity="0.2"
              animate={{ rotate: -360, scale: [0.8, 1.2, 0.8] }}
              transition={{ 
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ originX: "50%", originY: "50%" }}
            />

            {/* Inner Solid Connecting Lines */}
            <motion.circle
              cx="200"
              cy="200"
              r="80"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ originX: "50%", originY: "50%" }}
            />

            {/* Glowing Core */}
            <motion.circle
              cx="200"
              cy="200"
              r="20"
              fill="#fff"
              className="animate-pulse-glow"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ originX: "50%", originY: "50%" }}
            />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
}
