import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RiceDisease() {
  return (
    <main className="min-h-screen bg-background relative pt-32 pb-20">
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>
        
        <div className="max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-glow">AI-Based Rice Plant Disease Detection</h1>
          <p className="text-xl text-gray-400 italic mb-8">A computer vision model using convolutional neural networks to identify diseases in rice plant images, submitted to the Intel Global Impact Festival 2023.</p>
          
          <div className="mb-8 p-6 glass-card rounded-xl">
            <p className="mb-2"><strong className="text-white">Type:</strong> <span className="text-gray-300">Group project — Intel Global Impact Festival 2023</span></p>
            <p><strong className="text-white">Role:</strong> <span className="text-gray-300">Machine learning, presentation script</span></p>
          </div>

          <h2 className="text-2xl font-semibold text-accent mt-12 mb-4">MY CONTRIBUTION</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            I handled all the machine learning work: building and training the CNN, tuning the model, and interpreting the training and validation curves. I also wrote the presentation script for the team's online submission video, which meant translating the technical decisions we made into something a general audience could follow without losing the substance.
          </p>

          <h2 className="text-2xl font-semibold text-accent mt-12 mb-4">IMPACT</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Rice disease detection has real agricultural relevance in Indonesia, where early detection can directly affect crop yield and a farmer's livelihood. The model was able to classify test images with high confidence (one test image was correctly identified as LeafBlast at 100% confidence), and building and presenting this at the Intel Global Impact Festival meant putting the model in front of an audience evaluating it not just as a coding exercise, but as a potential real-world tool.
          </p>
          <p className="text-gray-400 italic mb-6">Training/validation curves and a sample prediction (LeafBlast, 100% confidence)</p>

          <h2 className="text-2xl font-semibold text-accent mt-12 mb-4">WHAT I LEARNED</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            This was my entry point into applied machine learning, and it taught me lessons beyond just &quot;the model worked.&quot; Watching my training and validation curves diverge over time — training accuracy kept climbing while validation loss started increasing — was my first real encounter with overfitting, and it taught me that a confident prediction on one test image doesn&apos;t mean the model generalizes well. That gap between &quot;I understand what a CNN is&quot; and &quot;I built one that needs to actually work on messy real-world images&quot; shaped how I approach every ML project since, especially around data quality and knowing when to trust a result.
          </p>
        </div>
      </div>
    </main>
  );
}
