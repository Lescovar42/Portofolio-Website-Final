"use client";

import { motion } from "framer-motion";
import { Code2, Layout, Database, Terminal, Cpu, Globe, Smartphone, Zap } from "lucide-react";

export default function About() {
  const skills = [
    { name: "React / Next.js", icon: <Globe size={24} />, delay: 0 },
    { name: "Tailwind CSS", icon: <Layout size={24} />, delay: 0.2 },
    { name: "TypeScript", icon: <Code2 size={24} />, delay: 0.4 },
    { name: "Node.js", icon: <Terminal size={24} />, delay: 0.1 },
    { name: "Database", icon: <Database size={24} />, delay: 0.5 },
    { name: "API Design", icon: <Zap size={24} />, delay: 0.3 },
    { name: "Mobile Responsive", icon: <Smartphone size={24} />, delay: 0.6 },
    { name: "System Architecture", icon: <Cpu size={24} />, delay: 0.7 },
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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio Cards */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8"
            >
              <h3 className="text-2xl font-semibold mb-4 text-primary">The Journey</h3>
              <p className="text-gray-300 leading-relaxed">
                I am a passionate developer who blends design and engineering. My focus is on creating web applications that not only function flawlessly but also provide a stunning, memorable user experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-8 ml-0 md:ml-12"
            >
              <h3 className="text-2xl font-semibold mb-4 text-accent">The Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                I believe in the "Antigravity" aesthetic—interfaces that feel light, responsive, and alive. By leveraging modern tools like Next.js and Framer Motion, I push the boundaries of what's possible on the web.
              </p>
            </motion.div>
          </div>

          {/* Tech Stack Grid */}
          <div className="relative">
            <div className="absolute inset-0 bg-secondary/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 relative z-10">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: skill.delay }}
                  className="flex flex-col items-center gap-3 p-6 glass-card group cursor-default"
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
