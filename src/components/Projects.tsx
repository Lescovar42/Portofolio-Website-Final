"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import React, { useRef } from "react";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
);

const projects = [
  {
    title: "AI Rice Plant Disease Detection",
    description: "A computer vision model capable of identifying diseases in rice plant images using convolutional neural networks. Showcased at the Intel Global Impact Festival.",
    tags: ["Python", "TensorFlow", "OpenCV"],
    link: "/rice-disease",
    github: "#",
  },
  {
    title: "Humanoid Soccer Robot",
    description: "Developed motion programming, computer vision, and control systems for a humanoid competition soccer robot with the RoboCup team.",
    tags: ["ROS 2", "Webots", "C++", "OpenCV"],
    link: "/humanoid-robot",
    github: "#",
  },
  {
    title: "BudgetKos Finance Tracker",
    description: "A cross-platform expense tracking app designed for university students to log and automatically organize financial records without manual bookkeeping.",
    tags: ["Dart", "Go", "HTML"],
    link: "/budgetkos",
    github: "https://github.com/rafrusth/budgetKos_KB",
  },
  {
    title: "MazeRunner Game",
    description: "A 3D glut-based maze navigation game in C featuring procedurally generated mazes, player movement, and collision detection, built from scratch with pure C.",
    tags: ["C", "OpenGL", "Game Dev"],
    link: "/maze-game",
    github: "https://github.com/Lescovar42/GTI",
  },
  {
    title: "Procedural Maze Algorithms",
    description: "An IEEE-compliant analytical study comparing Divide & Conquer, Backtracking, and Prim's algorithms for procedural maze generation. Evaluated time complexity and structural metrics.",
    tags: ["Python", "Data Analysis", "Matplotlib"],
    link: "/maze-research",
    github: "#",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-full perspective-[1000px]"
    >
      <div 
        className="glass-card h-full p-8 flex flex-col absolute inset-0 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(0,242,254,0.4)] transition-colors duration-500"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
          <p className="text-gray-400 mb-6">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag, i) => (
              <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-auto">
          <a href={project.github} className="text-gray-400 hover:text-white transition-colors">
            <GithubIcon />
          </a>
          <a href={project.link} className="text-gray-400 hover:text-primary transition-colors">
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-glow">
            Selected Work
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 h-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
