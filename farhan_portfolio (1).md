## **Muhammad Farhan Abdul Azis** 

## **Portfolio — Apple Developer Academy Indonesia Application** 

mfarhanazis@gmail.com  |  +62 812-2821-4805  |  Semarang, Indonesia 

I'm an Informatics student at Universitas Diponegoro, and most of what I do comes back to one thing: understanding systems well enough to rebuild them from scratch, then explaining that understanding to someone else. 

That shows up across my work in ways that are hard to separate. Before building the maze game, I spent time writing a research paper that benchmarked three different generation algorithms, so when it came to picking one for the actual game, I already had the numbers. On the robotics team, the vision work I took on goes beyond basic ball detection; I'm now figuring out how to give the robot a sense of depth, which is messier and more interesting. Outside my own projects, I've spent the last few years as a teaching assistant and trainer, walking AWS students through their first deployments, mentoring high schoolers through national research competitions, and debugging C and Python with university juniors one-on-one. 

The five projects below aren't polished case studies. They're snapshots of me working through problems, sometimes solo, sometimes with a team, across robotics, machine learning, web development, and game design. I hope they say something about how I think, not just what I've shipped. 

## **01** 

## **MazeRunner** 

_A first-person horror-survival game built in pure C, where the player collects items scattered through a procedurally generated maze while evading a ghost that hunts using pathfinding, all while managing a limited sprint stamina meter._ 

**Type:** Group project — class project  | **Role:** Maze generation, Ghost AI, game loop, stamina system & win/lose logic, report finalization 

## **MY CONTRIBUTION** 

I designed and implemented the procedural maze generation using the Randomized Prim's Algorithm, and built the enemy AI ("Ghost AI") using Breadth-First Search (BFS) combined with stealth mechanics so the ghost could intelligently path toward the player while respecting visibility rules. I also owned the main game loop architecture, the stamina/sprint system that limits how long the player can outrun the ghost, and the win/lose condition logic, and contributed to compiling, structuring, and finalizing the project report. 

## **IMPACT** 

The maze generator and ghost AI were the two systems the rest of the game depended on — every other feature (player movement, collision, item collection, win conditions) plugged into the loop and maze structure I built. Getting the BFS pathfinding right was what made the ghost feel genuinely threatening instead of just random, and pairing that with a stamina limit (so sprinting away from the ghost isn't a free escape) is what made the horror tension actually land during playtesting. 

## **WHAT I LEARNED** 

This was my first time implementing a graph search algorithm (BFS) for something other than a textbook exercise, and seeing it directly translate into "the ghost actually hunts you now" was a turning point in how I think about algorithms — they're not abstract, they're behavior. I also learned a lot about low-level memory management and game loop timing in C, which doesn't forgive sloppy structure the way higher-level languages do. 

_In-game footage: first-person maze corridors with item HUD, ghost distance readout, and stamina bar (bottom left)_ 

## **02** 

## **BudgetKos — Personal Finance Tracker** 

_A cross-platform expense tracking app for boarding-house students, built around an AI chatbot ("Bud-AI") that cross-checks the user's spending claims against their actual logged transactions in a casual, peer-like tone._ 

**Type:** Group project — class project  | **Role:** Bud-AI chatbot integration, testing & QA lead 

## **MY CONTRIBUTION** 

I worked on integrating the Bud-AI chatbot into the app, and led testing and QA — making sure the logging flow worked reliably across categories and that Bud-AI's responses stayed grounded in the user's real transaction data rather than just generating plausible-sounding advice. 

## **IMPACT** 

Good QA is invisible when it works, and obvious when it doesn't — my job was making sure users never hit a broken input flow or a miscategorized transaction. That mattered even more for BudAI specifically, since its whole value is in correcting users when their assumptions don't match reality (e.g. catching it when someone thinks they have far more money left than they actually do) — if that grounding broke, the feature would be actively misleading instead of helpful. 

_Home dashboard (left) and Bud-AI correcting a balance assumption (right)_ 

## **WHAT I LEARNED** 

Building and testing the chatbot piece taught me how much harder it is to make an AI feature feel reliable versus just impressive in a demo — the moment the bot needs to reference real, structured data (the user's actual balance) instead of just chatting, the bar for testing goes way up. That gap between "sounds right" and "is actually right" reshaped how I think about building AI features end-to-end, not just shipping the first version that works in a demo. 

## **03** 

## **Humanoid Soccer Robot (ROBOTIS OP3 platform)** 

_A full-stack humanoid soccer robot, built on the ROBOTIS OP3 platform with URDC EWS Bascorro, Universitas Diponegoro's competitive robotics team, covering mechanical design, motion planning, computer vision, and control systems._ 

**Type:** Group project — university robotics competition team  | **Role:** Computer vision (currently building stereoscopic vision) 

## **MY CONTRIBUTION** 

I work on the robot's vision system, handling real-time ball detection and field navigation in Webots simulation. I'm currently developing the stereoscopic vision pipeline, which will let the robot perceive depth and distance to the ball and other objects rather than just 2D position. 

## **IMPACT** 

Vision is what lets the robot make any decision at all — without reliable ball detection, none of the motion planning or control systems have anything to act on. Moving from single-camera to stereoscopic vision is a meaningful upgrade for the team because it should let the robot judge distance and positioning far more accurately, which directly affects how competitively it can play. 

## **WHAT I LEARNED** 

This project pushed me to connect computer vision theory with hardware constraints I hadn't dealt with before — calibration, latency, and the difference between vision that looks correct on a single frame versus vision that holds up across an entire moving match. Working on stereoscopic vision specifically has meant learning depth estimation and camera calibration from the ground up, which is still ongoing and one of the more technically demanding things I've taken on. 

_Left: the physical ROBOTIS OP3 build in the team workshop. Right: Webots simulation used for vision and motion testing_ 

## **04 AI-Based Rice Plant Disease Detection** 

_A computer vision model using convolutional neural networks to identify diseases in rice plant images, submitted to the Intel Global Impact Festival 2023._ 

**Type:** Group project — Intel Global Impact Festival 2023  | **Role:** Machine learning, presentation script 

## **MY CONTRIBUTION** 

I handled all the machine learning work: building and training the CNN, tuning the model, and interpreting the training and validation curves. I also wrote the presentation script for the team's online submission video, which meant translating the technical decisions we made into something a general audience could follow without losing the substance. 

## **IMPACT** 

Rice disease detection has real agricultural relevance in Indonesia, where early detection can directly affect crop yield and a farmer's livelihood. The model was able to classify test images with high confidence (one test image was correctly identified as LeafBlast at 100% confidence), and building and presenting this at the Intel Global Impact Festival meant putting the model in front of an audience evaluating it not just as a coding exercise, but as a potential real-world tool. 

_Training/validation curves and a sample prediction (LeafBlast, 100% confidence)_ 

## **WHAT I LEARNED** 

This was my entry point into applied machine learning, and it taught me lessons beyond just "the model worked." Watching my training and validation curves diverge over time — training accuracy kept climbing while validation loss started increasing — was my first real encounter with overfitting, and it taught me that a confident prediction on one test image doesn't mean the model generalizes well. That gap between "I understand what a CNN is" and "I built one that needs to actually work on messy real-world images" shaped how I approach every ML project since, especially around data quality and knowing when to trust a result. 

**05** 

## **Maze Generation Algorithm Comparison** 

_A research paper, "Comparative Analysis of Divide and Conquer, Backtracking, and Prim's Algorithm in Procedural Maze Generation Based on Grid Size and Path Complexity," comparing all three algorithms — implemented entirely from scratch in Python 3 with no external maze-generation libraries — across grid sizes from 5×5 up to 100×100._ 

## **Type:** Individual project — class assignment 

## **IMPACT** 

Rather than just picking an algorithm and using it, I wanted evidence for the tradeoffs, so I tested all three algorithms across 10 grid sizes with 5 repetitions per scenario, measuring five metrics: solution path length, path ratio, dead-end ratio, average branching, and path straightness. The results were concrete: Divide and Conquer was the fastest algorithm at every grid size tested, running 3.63× faster than Backtracking and 4.09× faster than Prim's Algorithm at a 100×100 grid, while Backtracking produced the longest and most winding solution paths with the fewest dead ends, making it the most cognitively challenging to solve, and Prim's Algorithm produced the most dead ends but the shortest solution paths. This research is also what MazeRunner (Project 1) ended up using, since I'd already implemented and benchmarked Randomized Prim's here before bringing it into the game. 

## **WHAT I LEARNED** 

Benchmarking taught me that "which algorithm is best" is almost always the wrong question — it's "best for what." Backtracking and Prim's produce very different maze structures from the same starting rules: one optimizes for long, winding solution paths, the other for a dense scattering of dead ends. Seeing those tradeoffs laid out numerically, rather than just visually, is what made me confident enough in Prim's to bring it into MazeRunner afterward. 

_Sample mazes generated by each algorithm at increasing grid sizes, and the paper's title page_ 

Muhammad Farhan Abdul Azis — Apple Developer Academy Indonesia Portfolio 

