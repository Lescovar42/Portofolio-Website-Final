"use client";

import { motion } from "framer-motion";
import { Code2, Layout, Database, Terminal, Cpu, Globe, Smartphone, Zap } from "lucide-react";

export default function About() {
  const skills = [
    { name: "Python & C/C++", icon: <Terminal size={24} />, delay: 0 },
    { name: "Machine Learning", icon: <Cpu size={24} />, delay: 0.2 },
    { name: "Computer Vision", icon: <Layout size={24} />, delay: 0.4 },
    { name: "IoT & Robotics", icon: <Zap size={24} />, delay: 0.1 },
    { name: "Cloud (AWS)", icon: <Globe size={24} />, delay: 0.5 },
    { name: "React / Next.js", icon: <Code2 size={24} />, delay: 0.3 },
    { name: "SQL & Databases", icon: <Database size={24} />, delay: 0.6 },
    { name: "Web Development", icon: <Smartphone size={24} />, delay: 0.7 },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-glow">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="flex flex-col gap-20">
          {/* Top Section: Photo & Bio */}
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Fancy Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative flex justify-center group perspective-[1000px]"
            >
              {/* Glowing backdrops */}
              <div className="absolute inset-4 bg-primary/20 blur-[60px] rounded-full group-hover:bg-primary/40 transition-all duration-500 animate-pulse-glow" />
              <div className="absolute inset-10 bg-accent/20 blur-[40px] rounded-full group-hover:bg-accent/40 transition-all duration-500" />
              
              {/* Image Frame */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border-[3px] border-white/10 glass shadow-2xl transform-gpu group-hover:rotate-y-6 group-hover:-rotate-x-6 transition-transform duration-700 ease-out">
                {/* Overlay gradient for antigravity premium feel */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-accent/30 mix-blend-overlay z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 bg-noise z-20 pointer-events-none" />
                <img 
                  src="/images/profile.jpg" 
                  alt="Muhammad Farhan Abdul Azis" 
                  className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                />
              </div>
            </motion.div>

            {/* Bio Cards */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-card p-8 group"
              >
                <h3 className="text-2xl font-semibold mb-4 text-primary group-hover:text-glow transition-all">The Journey</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  As an Informatics student at Universitas Diponegoro, I blend software engineering with hands-on hardware development. From being a Teaching Assistant for Fundamental Programming to mentoring students across Indonesia as a Cloud Computing Master Trainer, I love sharing knowledge and building impactful solutions.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-card p-8 ml-0 md:ml-12 group"
              >
                <h3 className="text-2xl font-semibold mb-4 text-accent group-hover:text-glow transition-all">The Vision</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  I am deeply passionate about Artificial Intelligence and Robotics. Whether I am competing with the RoboCup Humanoid Soccer Team or building Computer Vision models for disease detection, I strive to create systems that are intelligent, efficient, and bridge the physical and digital worlds.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Bottom Section: Tech Stack Grid */}
          <div className="relative">
            <h3 className="text-2xl font-semibold mb-8 text-center text-white">Core Technologies</h3>
            <div className="absolute inset-0 bg-secondary/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6 relative z-10">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: skill.delay }}
                  className="flex flex-col items-center justify-center gap-3 p-4 glass-card group cursor-default h-32"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  // Using inline style for animation duration and delay to create organic floating
                  style={{
                    animation: `float ${4 + (index % 3)}s ease-in-out infinite`,
                    animationDelay: `${skill.delay}s`
                  }}
                >
                  <div className="text-gray-400 group-hover:text-primary transition-colors duration-300">
                    {skill.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-300 text-center">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
