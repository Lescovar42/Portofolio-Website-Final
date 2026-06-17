import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function MazeGame() {
  return (
    <main className="min-h-screen bg-background relative pt-32 pb-20">
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>
        
        <div className="max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-glow">MazeRunner</h1>
          <p className="text-xl text-gray-400 italic mb-8">A first-person horror-survival game built in pure C, where the player collects items scattered through a procedurally generated maze while evading a ghost that hunts using pathfinding, all while managing a limited sprint stamina meter.</p>
          
          <div className="mb-8 p-6 glass-card rounded-xl">
            <p className="mb-2"><strong className="text-white">Type:</strong> <span className="text-gray-300">Group project — class project</span></p>
            <p><strong className="text-white">Role:</strong> <span className="text-gray-300">Maze generation, Ghost AI, game loop, stamina system &amp; win/lose logic, report finalization</span></p>
          </div>

          <h2 className="text-2xl font-semibold text-accent mt-12 mb-4">MY CONTRIBUTION</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            I designed and implemented the procedural maze generation using the Randomized Prim&apos;s Algorithm, and built the enemy AI (&quot;Ghost AI&quot;) using Breadth-First Search (BFS) combined with stealth mechanics so the ghost could intelligently path toward the player while respecting visibility rules. I also owned the main game loop architecture, the stamina/sprint system that limits how long the player can outrun the ghost, and the win/lose condition logic, and contributed to compiling, structuring, and finalizing the project report.
          </p>

          <h2 className="text-2xl font-semibold text-accent mt-12 mb-4">IMPACT</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            The maze generator and ghost AI were the two systems the rest of the game depended on — every other feature (player movement, collision, item collection, win conditions) plugged into the loop and maze structure I built. Getting the BFS pathfinding right was what made the ghost feel genuinely threatening instead of just random, and pairing that with a stamina limit (so sprinting away from the ghost isn&apos;t a free escape) is what made the horror tension actually land during playtesting.
          </p>

          <h2 className="text-2xl font-semibold text-accent mt-12 mb-4">WHAT I LEARNED</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            This was my first time implementing a graph search algorithm (BFS) for something other than a textbook exercise, and seeing it directly translate into &quot;the ghost actually hunts you now&quot; was a turning point in how I think about algorithms — they&apos;re not abstract, they&apos;re behavior. I also learned a lot about low-level memory management and game loop timing in C, which doesn&apos;t forgive sloppy structure the way higher-level languages do.
          </p>
          <div className="mt-12 mb-6">
            <div className="relative w-full h-[400px] sm:h-[500px] rounded-xl overflow-hidden glass-card p-2 bg-black/40">
              <img 
                src="/images/maze-runner.png" 
                alt="In-game footage: first-person maze corridors with item HUD, ghost distance readout, and stamina bar (bottom left)"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <p className="text-gray-400 italic mt-4 text-center text-sm">
              In-game footage: first-person maze corridors with item HUD, ghost distance readout, and stamina bar (bottom left)
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
