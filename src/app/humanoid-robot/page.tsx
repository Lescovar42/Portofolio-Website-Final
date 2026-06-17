import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function HumanoidRobot() {
  return (
    <main className="min-h-screen bg-background relative pt-32 pb-20">
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>
        
        <div className="max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-glow">Humanoid Soccer Robot (ROBOTIS OP3 platform)</h1>
          <p className="text-xl text-gray-400 italic mb-8">A full-stack humanoid soccer robot, built on the ROBOTIS OP3 platform with URDC EWS Bascorro, Universitas Diponegoro&apos;s competitive robotics team, covering mechanical design, motion planning, computer vision, and control systems.</p>
          
          <div className="mb-8 p-6 glass-card rounded-xl">
            <p className="mb-2"><strong className="text-white">Type:</strong> <span className="text-gray-300">Group project — university robotics competition team</span></p>
            <p><strong className="text-white">Role:</strong> <span className="text-gray-300">Computer vision (currently building stereoscopic vision)</span></p>
          </div>

          <h2 className="text-2xl font-semibold text-accent mt-12 mb-4">MY CONTRIBUTION</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            I work on the robot&apos;s vision system, handling real-time ball detection and field navigation in Webots simulation. I&apos;m currently developing the stereoscopic vision pipeline, which will let the robot perceive depth and distance to the ball and other objects rather than just 2D position.
          </p>

          <h2 className="text-2xl font-semibold text-accent mt-12 mb-4">IMPACT</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Vision is what lets the robot make any decision at all — without reliable ball detection, none of the motion planning or control systems have anything to act on. Moving from single-camera to stereoscopic vision is a meaningful upgrade for the team because it should let the robot judge distance and positioning far more accurately, which directly affects how competitively it can play.
          </p>

          <h2 className="text-2xl font-semibold text-accent mt-12 mb-4">WHAT I LEARNED</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            This project pushed me to connect computer vision theory with hardware constraints I hadn&apos;t dealt with before — calibration, latency, and the difference between vision that looks correct on a single frame versus vision that holds up across an entire moving match. Working on stereoscopic vision specifically has meant learning depth estimation and camera calibration from the ground up, which is still ongoing and one of the more technically demanding things I&apos;ve taken on.
          </p>

          <div className="mt-12 mb-6">
            <div className="relative w-full h-[400px] sm:h-[500px] rounded-xl overflow-hidden glass-card p-2">
              <img 
                src="/images/humanoid.jpg" 
                alt="Left: the physical ROBOTIS OP3 build in the team workshop. Right: Webots simulation used for vision and motion testing"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <p className="text-gray-400 italic mt-4 text-center text-sm">
              Left: the physical ROBOTIS OP3 build in the team workshop. Right: Webots simulation used for vision and motion testing
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
