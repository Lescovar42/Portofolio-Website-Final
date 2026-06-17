import Link from 'next/link';
import { ArrowLeft, FileText, Download } from 'lucide-react';

export default function MazeResearch() {
  const figures = [
    { name: "fig1_sample_mazes.png", caption: "Generated Mazes Comparison" },
    { name: "fig2_solution_path.png", caption: "BFS Solution Paths" },
    { name: "fig3_execution_time.png", caption: "Execution Time vs Grid Size" },
    { name: "fig4_complexity_metrics.png", caption: "Maze Complexity Metrics (Dead-end Ratio & Path Length)" },
    { name: "fig5_structural_metrics.png", caption: "Structural Metrics (Junctions & Branches)" },
    { name: "fig6_complexity_fit.png", caption: "Time Complexity Power-Law Fit" },
    { name: "fig7_dashboard.png", caption: "All-in-One Benchmark Dashboard" },
  ];

  return (
    <main className="min-h-screen bg-background relative pt-32 pb-20">
      <div className="container mx-auto px-6 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-glow">Maze Algorithm Analysis</h1>
          <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
            A comprehensive IEEE-compliant study comparing Divide & Conquer, Backtracking, and Prim's algorithms for procedural maze generation. 
            This benchmark analyzes execution time complexity $O(N^b)$, structural integrity (branching factors and junctions), and path length ratios across grid sizes ranging from $5 \times 5$ to $100 \times 100$.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="/maze-research/paper.pdf" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 bg-primary/20 text-white rounded-full border border-primary/50 hover:bg-primary/30 transition-colors">
              <FileText size={20} />
              Read IEEE Paper
            </a>
            <a href="/maze-research/paper.pdf" download className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-white rounded-full border border-white/10 hover:bg-white/10 transition-colors">
              <Download size={20} />
              Download PDF
            </a>
          </div>
        </div>

        <div className="space-y-12">
          {figures.map((fig, idx) => (
            <div key={idx} className="glass-card p-6 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-accent mb-6 w-full text-left">{fig.caption}</h3>
              <div className="relative w-full rounded-xl overflow-hidden bg-white/5 p-4 flex items-center justify-center">
                <img 
                  src={`/maze-research/${fig.name}`} 
                  alt={fig.caption} 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
