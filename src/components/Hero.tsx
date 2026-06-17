"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Tesseract geometry
// A tesseract (4D hypercube) has 16 vertices, each coordinate in {-1, 1}^4.
// Its 8 "cells" are 3D cubes (fix one of the 4 axes to +-1, vary the other 3).
// Each cube cell has 6 square faces, giving the nested/intersecting-cube look
// when rendered with solid translucent faces.
// ---------------------------------------------------------------------------

type Vec4 = [number, number, number, number];

const VERTICES: Vec4[] = Array.from({ length: 16 }, (_, i) => [
  i & 1 ? 1 : -1,
  i & 2 ? 1 : -1,
  i & 4 ? 1 : -1,
  i & 8 ? 1 : -1,
]);

type Cell = { dim: number; val: number; vertIndices: number[] };

const CELLS: Cell[] = (() => {
  const cells: Cell[] = [];
  for (let dim = 0; dim < 4; dim++) {
    for (const val of [-1, 1]) {
      const vertIndices: number[] = [];
      VERTICES.forEach((v, i) => {
        if (v[dim] === val) vertIndices.push(i);
      });
      cells.push({ dim, val, vertIndices });
    }
  }
  return cells;
})();

type Face = { cellIdx: number; vertIndices: number[] };

const FACES: Face[] = (() => {
  const faces: Face[] = [];
  CELLS.forEach((cell, cellIdx) => {
    const otherDims = [0, 1, 2, 3].filter((d) => d !== cell.dim);
    for (const fixDim of otherDims) {
      for (const fixVal of [-1, 1]) {
        const verts = cell.vertIndices.filter((vi) => VERTICES[vi][fixDim] === fixVal);
        faces.push({ cellIdx, vertIndices: verts });
      }
    }
  });
  return faces;
})();

const EDGES: [number, number][] = (() => {
  const edges: [number, number][] = [];
  for (let i = 0; i < 16; i++) {
    for (let j = i + 1; j < 16; j++) {
      let diff = 0;
      for (let k = 0; k < 4; k++) if (VERTICES[i][k] !== VERTICES[j][k]) diff++;
      if (diff === 1) edges.push([i, j]);
    }
  }
  return edges;
})();

// One accent color per cell (8 cells) so the nested cubes read as distinct
// volumes rather than one undifferentiated blob. Cycles through the site's
// primary/accent/secondary palette.
const CELL_COLORS = [
  "#00f2fe", // primary
  "#4facfe",
  "#9b51e0", // accent
  "#c46bff",
  "#00f2fe",
  "#4facfe",
  "#9b51e0",
  "#c46bff",
];

function rotate4D(v: Vec4, angleXW: number, angleYZ: number): Vec4 {
  const [x, y, z, w] = v;
  const cosXW = Math.cos(angleXW);
  const sinXW = Math.sin(angleXW);
  const x1 = x * cosXW - w * sinXW;
  const w1 = x * sinXW + w * cosXW;
  const cosYZ = Math.cos(angleYZ);
  const sinYZ = Math.sin(angleYZ);
  const y1 = y * cosYZ - z * sinYZ;
  const z1 = y * sinYZ + z * cosYZ;
  return [x1, y1, z1, w1];
}

function project4Dto3D(v: Vec4, wDistance = 3): [number, number, number] {
  const [x, y, z, w] = v;
  const f = 1 / (wDistance - w);
  return [x * f, y * f, z * f];
}

function project3Dto2D(v: [number, number, number], zDistance = 4) {
  const [x, y, z] = v;
  const f = 1 / (zDistance - z);
  return { x: x * f, y: y * f, depth: z };
}

const SCALE = 760;
const CENTER = 200;

function TesseractSVG() {
  const [angles, setAngles] = useState({ xw: 0, yz: 0 });
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion.current) {
      // Respect reduced-motion: render a single static, pleasing angle instead of animating.
      setAngles({ xw: 0.6, yz: 0.35 });
      return;
    }

    const XW_PERIOD = 9; // seconds per full rotation in the XW plane
    const YZ_PERIOD = 13; // seconds per full rotation in the YZ plane (different period -> non-repeating combined motion)

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const t = (now - startRef.current) / 1000;
      setAngles({
        xw: (t / XW_PERIOD) * Math.PI * 2,
        yz: (t / YZ_PERIOD) * Math.PI * 2,
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const rotated = VERTICES.map((v) => rotate4D(v, angles.xw, angles.yz));
  const proj3D = rotated.map((v) => project4Dto3D(v));
  const proj2D = proj3D.map((v) => project3Dto2D(v));

  const screen = proj2D.map((p) => ({
    x: CENTER + p.x * SCALE,
    y: CENTER + p.y * SCALE,
    depth: p.depth,
  }));

  // Painter's algorithm: draw far faces first, near faces last, so transparency
  // composites correctly and near faces visually sit in front of far ones.
  const facesWithDepth = FACES.map((face) => {
    const depths = face.vertIndices.map((vi) => screen[vi].depth);
    const avgDepth = depths.reduce((a, b) => a + b, 0) / depths.length;
    return { ...face, avgDepth };
  }).sort((a, b) => a.avgDepth - b.avgDepth);

  // Map depth (~ -0.5 to 0.5 in practice, but keep generous bounds) to a
  // 0..1 brightness/opacity factor so near faces glow brighter and far faces
  // recede, which is what sells the "solid 3D" read.
  const minDepth = Math.min(...screen.map((s) => s.depth));
  const maxDepth = Math.max(...screen.map((s) => s.depth));
  const depthRange = Math.max(maxDepth - minDepth, 0.001);
  const normDepth = (d: number) => (d - minDepth) / depthRange;

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full max-w-[500px] drop-shadow-[0_0_30px_rgba(0,242,254,0.3)] group-hover:drop-shadow-[0_0_50px_rgba(0,242,254,0.6)] transition-all duration-500"
    >
      <defs>
        <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f2fe" />
          <stop offset="100%" stopColor="#9b51e0" />
        </linearGradient>
      </defs>

      {/* Solid translucent faces, painter's-algorithm sorted far -> near */}
      {facesWithDepth.map((face, idx) => {
        const pts = face.vertIndices
          .map((vi) => `${screen[vi].x.toFixed(2)},${screen[vi].y.toFixed(2)}`)
          .join(" ");
        const brightness = 0.35 + normDepth(face.avgDepth) * 0.65;
        return (
          <polygon
            key={idx}
            points={pts}
            fill={CELL_COLORS[face.cellIdx]}
            fillOpacity={0.14 + normDepth(face.avgDepth) * 0.34}
            stroke={CELL_COLORS[face.cellIdx]}
            strokeOpacity={brightness * 0.6}
            strokeWidth={1}
          />
        );
      })}

      {/* Edge wireframe on top, brighter near vertices */}
      {EDGES.map(([a, b], idx) => {
        const depthA = normDepth(screen[a].depth);
        const depthB = normDepth(screen[b].depth);
        const avg = (depthA + depthB) / 2;
        return (
          <line
            key={idx}
            x1={screen[a].x}
            y1={screen[a].y}
            x2={screen[b].x}
            y2={screen[b].y}
            stroke="url(#edgeGrad)"
            strokeOpacity={0.3 + avg * 0.5}
            strokeWidth={0.6 + avg * 0.9}
          />
        );
      })}

      {/* Vertex points, brighter when nearer the viewer */}
      {screen.map((s, idx) => {
        const d = normDepth(s.depth);
        return (
          <circle
            key={idx}
            cx={s.x}
            cy={s.y}
            r={1.2 + d * 1.8}
            fill="#ffffff"
            opacity={0.4 + d * 0.6}
          />
        );
      })}
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 md:pt-20 md:pb-0">
      {/* Background abstract element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[800px] max-h-[800px] bg-primary/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none opacity-50 animate-breathe" />

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

        {/* 3D Rotating Tesseract */}
        <motion.div
          className="relative flex justify-center items-center h-[400px] lg:h-[600px] group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <TesseractSVG />
        </motion.div>
      </div>
    </section>
  );
}
