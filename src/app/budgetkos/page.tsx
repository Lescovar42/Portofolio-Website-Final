import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BudgetKos() {
  return (
    <main className="min-h-screen bg-background relative pt-32 pb-20">
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>
        
        <div className="max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-glow">BudgetKos — Personal Finance Tracker</h1>
          <p className="text-xl text-gray-400 italic mb-8">A cross-platform expense tracking app for boarding-house students, built around an AI chatbot (&quot;Bud-AI&quot;) that cross-checks the user&apos;s spending claims against their actual logged transactions in a casual, peer-like tone.</p>
          
          <div className="mb-8 p-6 glass-card rounded-xl">
            <p className="mb-2"><strong className="text-white">Type:</strong> <span className="text-gray-300">Group project — class project</span></p>
            <p><strong className="text-white">Role:</strong> <span className="text-gray-300">Bud-AI chatbot integration, testing &amp; QA lead</span></p>
          </div>

          <h2 className="text-2xl font-semibold text-accent mt-12 mb-4">MY CONTRIBUTION</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            I worked on integrating the Bud-AI chatbot into the app, and led testing and QA — making sure the logging flow worked reliably across categories and that Bud-AI&apos;s responses stayed grounded in the user&apos;s real transaction data rather than just generating plausible-sounding advice.
          </p>

          <h2 className="text-2xl font-semibold text-accent mt-12 mb-4">IMPACT</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Good QA is invisible when it works, and obvious when it doesn&apos;t — my job was making sure users never hit a broken input flow or a miscategorized transaction. That mattered even more for BudAI specifically, since its whole value is in correcting users when their assumptions don&apos;t match reality (e.g. catching it when someone thinks they have far more money left than they actually do) — if that grounding broke, the feature would be actively misleading instead of helpful.
          </p>
          <div className="mt-12 mb-6">
            <div className="relative w-full h-[400px] sm:h-[500px] rounded-xl overflow-hidden glass-card p-2 bg-black/40">
              <img 
                src="/images/budgetkos.jpg" 
                alt="Home dashboard (left) and Bud-AI correcting a balance assumption (right)"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <p className="text-gray-400 italic mt-4 text-center text-sm">
              Home dashboard (left) and Bud-AI correcting a balance assumption (right)
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-accent mt-12 mb-4">WHAT I LEARNED</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Building and testing the chatbot piece taught me how much harder it is to make an AI feature feel reliable versus just impressive in a demo — the moment the bot needs to reference real, structured data (the user&apos;s actual balance) instead of just chatting, the bar for testing goes way up. That gap between &quot;sounds right&quot; and &quot;is actually right&quot; reshaped how I think about building AI features end-to-end, not just shipping the first version that works in a demo.
          </p>
        </div>
      </div>
    </main>
  );
}
