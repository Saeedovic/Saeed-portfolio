export const personalInfo = {
  name: 'Saeed Abdellah',
  title: 'Gameplay Programmer | Game Designer',
  subtitle: 'Unity • C# • Gameplay Systems',
  email: 'Saeed.alabdellah@gmail.com',
  phone: '+966 56 426 3595',
  location: 'Riyadh & Dubai',
  linkedin: 'https://www.linkedin.com/in/saeed-a-b2372a1b3/',
  github: 'https://github.com/Saeedovic',
  summary:
    'Game Programmer and Game Designer with a Bachelor\'s Degree in Game Programming & Design and professional experience developing games and interactive experiences across PC, mobile, VR, and mixed reality platforms. Strong background in C#, Unity, gameplay programming, game design, rapid prototyping, Game Design Documents, level design documentation, UI design, audio implementation, monetization, analytics, and performance optimization.',
}

export const aboutMe = {
  bio: `I am a Game Programmer and Game Designer focused on building engaging gameplay experiences across PC, mobile, VR, and mixed reality platforms. My work spans gameplay programming, systems design, game design, tool development, and performance optimization.

I enjoy the intersection of creativity and technical problem-solving — whether that means architecting a combat system, building editor tools for designers, designing core gameplay loops, or optimizing rendering pipelines.

I am experienced throughout the game development process, from early concepts and gameplay prototypes to feature development, iteration, testing, optimization, and release.`,
  highlights: [
    'Unity Engine specialist with C# expertise',
    'Gameplay systems architecture & implementation',
    'Game design, prototyping & documentation',
    'Editor tooling & workflow optimization',
    'Performance profiling & optimization',
    'VR & mixed reality development (Magic Leap 2)',
    'Playable ad development (Luna Playworks)',
    'Monetization, analytics & SDK integration',
  ],
}

export interface Project {
  id: string
  name: string
  tagline: string
  category: 'featured' | 'vr-mr' | 'game'
  description: string
  role: string
  responsibilities: string[]
  gameplaySystems: string[]
  technicalSystems: string[]
  tools: string[]
  results: string[]
  technologies: string[]
  images: string[]
  trailerUrl?: string
  buildUrl?: string
  githubUrl?: string
}

export const projects: Project[] = [
  {
    id: 'content-creator-mansion',
    name: 'Content Creator Mansion',
    tagline: 'Mobile Game — Shipped on App Store & Google Play',
    category: 'featured',
    description:
      'A mobile game developed at Naphora where I contributed as a Gameplay Programmer. I developed gameplay systems and mechanics using Unity and C#, contributed to gameplay design including core gameplay loops, progression, mechanics, pacing, and player experience. The game was successfully shipped on both Google Play and the App Store.',
    role: 'Gameplay Programmer',
    responsibilities: [
      'Developed gameplay systems and mechanics using Unity and C#',
      'Contributed to gameplay design, including core gameplay loops, progression, mechanics, pacing, and player experience',
      'Designed and prototyped gameplay concepts and mechanics, testing and iterating on ideas throughout development',
      'Created custom Unity Editor tools that improved content creation and iteration workflows for the development team',
      'Implemented monetization features, including advertising, in-app purchases, and third-party SDK integrations',
      'Worked with AppLovin and ironSource as part of advertising and monetization development',
      'Developed playable ads using Luna Playworks',
      'Worked with Firebase Analytics, Remote Config, and A/B testing to support game iteration and development decisions',
      'Improved runtime performance through profiling, draw call reduction, texture optimization, debugging, and optimization across devices',
      'Contributed to UI implementation, gameplay feedback, VFX, audio systems, and features supporting the overall player experience',
      'Participated in testing, bug fixing, build preparation, and release processes',
      'Contributed to shipping Content Creator Mansion on Google Play and the App Store',
    ],
    gameplaySystems: [
      'Core gameplay loops and progression systems',
      'Gameplay mechanics design and prototyping',
      'Player experience and pacing',
      'Game balancing',
    ],
    technicalSystems: [
      'Custom Unity Editor tools for content creation and iteration workflows',
      'Monetization systems (advertising, in-app purchases, SDK integrations)',
      'Playable ad development with Luna Playworks',
      'Firebase Analytics, Remote Config, and A/B testing integration',
      'Performance optimization (profiling, draw call reduction, texture optimization)',
      'UI implementation with TextMeshPro',
      'VFX and particle systems',
      'Audio systems implementation',
    ],
    tools: [
      'Unity', 'C#', 'AppLovin', 'ironSource', 'Luna Playworks',
      'Firebase Analytics', 'Remote Config', 'TextMeshPro', 'Unity Editor Scripting', 'Git',
    ],
    results: [
      'Successfully shipped Content Creator Mansion on Google Play and the App Store',
      'Improved runtime performance across devices through profiling and optimization',
      'Built custom editor tools that improved team workflow',
      'Developed playable ads using Luna Playworks',
    ],
    technologies: ['Unity', 'C#', 'Mobile', 'Monetization', 'Analytics', 'Playable Ads'],
    images: [],
  },
  {
    id: 'vr-mixed-reality-development',
    name: 'VR & Mixed Reality Development',
    tagline: 'Professional Experience — VR and Mixed Reality',
    category: 'vr-mr',
    description:
      'At Power Interactive in Dubai, I worked as a Junior Game Developer on projects involving VR and mixed reality technologies. I gained experience with Magic Leap 2 and mixed reality development while contributing to gameplay programming, interactive systems, prototyping, debugging, and feature development.',
    role: 'Junior Game Developer',
    responsibilities: [
      'Developed and delivered interactive features as part of a multidisciplinary development team',
      'Built and iterated on gameplay and interactive prototypes to test ideas, interactions, and user experiences',
      'Contributed to projects involving VR and mixed reality technologies',
      'Gained experience with Magic Leap 2 and mixed reality development while working alongside senior developers',
      'Contributed to gameplay programming, interactive systems, prototyping, debugging, and feature development',
      'Collaborated with developers and other team members throughout the development process',
      'Contributed to code quality and development process improvements',
    ],
    gameplaySystems: [
      'Interactive gameplay prototypes',
      'VR and mixed reality interactions',
      'User experience testing and iteration',
    ],
    technicalSystems: [
      'Mixed reality development with Magic Leap 2',
      'Interactive systems and prototyping',
      'Debugging and feature development',
    ],
    tools: ['Unity', 'C#', 'Magic Leap 2', 'VR', 'Mixed Reality'],
    results: [
      'Delivered interactive features as part of a multidisciplinary team',
      'Gained hands-on experience with Magic Leap 2 and mixed reality development',
      'Contributed to code quality and development process improvements',
    ],
    technologies: ['Unity', 'C#', 'VR', 'Mixed Reality', 'Magic Leap 2'],
    images: [],
  },
  {
    id: 'lost-robot',
    name: 'Lost Robot',
    tagline: '3D Puzzle Adventure Game',
    category: 'game',
    description:
      'A robot appears to have woken up in an empty facility, however the reason behind this is not known. Discover what exactly you are as well as the strange events that appear to have taken place in the past. Find your way around and solve puzzles to build yourself up & open up more rooms in the facility.',
    role: 'Game Programmer & Designer',
    responsibilities: [],
    gameplaySystems: [
      'Player abilities: Cloaking, Melee (LightSaber), Speed Boost, Stun',
      'AI enemies with patrol, chase, combat, investigate, and capture behaviors',
      'Puzzle systems: KeyCard access, Shapes logic, Shooter puzzle, Arrow puzzles',
      'Room-based level progression with elevator and lockdown mechanics',
      'Checkpoint system for player progression',
    ],
    technicalSystems: [
      'A* pathfinding for enemy AI navigation',
      'AI state machine: Patrol, Chase, Combat, Investigate, Capture behaviors',
      'Player ability system with ScriptableObjects for ability data',
      'AI data configuration using ScriptableObjects (Easy, Medium, Hard difficulty)',
      'Cutscene system using Timeline (Introduction, Ability, Capture, Elevator, Ending)',
      'Room instancing system for level management',
      'Custom checkpoint and game manager systems',
    ],
    tools: ['Unity', 'C#', 'ProBuilder', 'Timeline', 'TextMesh Pro', 'A* Pathfinding'],
    results: [],
    technologies: ['Unity', 'C#', '3D', 'Timeline', 'ProBuilder', 'Pathfinding'],
    images: [],
    trailerUrl: 'https://www.youtube.com/watch?v=-I7MeJRsxsc',
    buildUrl: 'https://drive.google.com/file/d/1PuAD5Ub4X_CJHGOb3SDFrZruaQ3b5Xbm/view?usp=sharing',
    githubUrl: 'https://github.com/SixPathsLT/LostRobot',
  },
  {
    id: 'party-time',
    name: 'Party Time',
    tagline: 'Multiplayer Party Game',
    category: 'game',
    description:
      'It\'s Party Time!! Super Party time is a multiplayer game with 3 unique mini games. Players compete to earn coins. Most coins at end wins. Character customization and store with skins.',
    role: 'Game Programmer & Designer',
    responsibilities: [],
    gameplaySystems: [
      'Multiple mini-games: Endless Runner, Snow Globe, Falling Fruits/Bombs, Shooting Range, Turntable Platforms',
      'Coin collection and reward system',
      'Character customization system',
      'Shop system with skins',
      'Player selection and round handling',
    ],
    technicalSystems: [
      'Scene switching between mini-games',
      'Player movement: Dash, Boost, Platforming',
      'Shooting range with arrow projectiles and breakable targets',
      'Endless runner with ground spawning and obstacle generation',
      'Snow globe mini-game with timer and coin collection',
      'Falling objects system (fruits and bombs)',
      'Character customization and shop UI',
    ],
    tools: ['Unity', 'C#', 'TextMesh Pro'],
    results: [],
    technologies: ['Unity', 'C#', '3D', 'Multiplayer', 'TextMesh Pro'],
    images: [],
    buildUrl: 'https://drive.google.com/file/d/1psgCBzDeB8_n-TsTFcsJOIWSnp59TJUW/view?usp=sharing',
    githubUrl: 'https://github.com/scrubbzz/_PartyTime',
  },
  {
    id: 'back-to-safety',
    name: 'Back to Safety',
    tagline: 'Third-Person Shooter',
    category: 'game',
    description:
      'Single-player third-person shooter. A woman wakes during a zombie apocalypse, lost family; locate them/save citizens. Melee/rifle. Free roam to extent. Inspired by The Last of Us, Call of Duty: Zombies, The Walking Dead. Quests relevant to story.',
    role: 'Game Programmer & Designer',
    responsibilities: [],
    gameplaySystems: [
      'Third-person player controller with health system',
      'Rifle weapon system with shooting mechanics',
      'Melee punch attack',
      'Zombie enemies with attack and movement AI',
      'Vehicle driving system',
      'Free-roam environment',
    ],
    technicalSystems: [
      'Cinemachine third-person camera (Aim and Follow)',
      'Zombie AI: Movement and Attack behaviors',
      'Rifle shooting with bullet physics and damage',
      'WarFX bullet impacts, explosions, fire, and smoke effects',
      'Damage popup and health bar UI',
      'Inventory and weapon UI management',
      'Vehicle controller system',
      'Zombie spawner system',
    ],
    tools: ['Unity', 'C#', 'Cinemachine', 'ProBuilder', 'WarFX'],
    results: [],
    technologies: ['Unity', 'C#', '3D', 'Cinemachine', 'WarFX'],
    images: [],
    buildUrl: 'https://drive.google.com/file/d/1Gscn5QT4xX-7ZG6LotZN_wTWJT34fd89/view?usp=sharing',
    githubUrl: 'https://github.com/mazen320/BackToSafetyStudio3',
  },
  {
    id: 'shaytan-kids',
    name: 'Shaytan Kids',
    tagline: '2D Action Platformer',
    category: 'game',
    description:
      'A woman descends through two levels of hell to find lost siblings, save kidnapped kids, reach bottom and slay Wrath Prince. Sword melee; active/passive abilities; 2D movement up/down/sideways; hellish environment/demons; one boss and three enemies across two levels.',
    role: 'Game Programmer & Designer',
    responsibilities: [],
    gameplaySystems: [
      'Player abilities: Float, Lunge, Suppress, Power-up states (Powered/Depowered/NonPowered)',
      'Combat: Melee attack, shooting with arrows, aiming rotation',
      'Enemies: Archangel, Bizzaro, Wrath Prince (boss), Patrolling Enemy, Melee Enemy',
      'Items: Gate Key collectible, Green Potion, Power-ups',
      '2D platformer movement with teleporters and scene switching',
    ],
    technicalSystems: [
      'Enemy AI: Patrol, Archangel movement/attack/state machine, Bizzaro state, Wrath Prince boss state',
      'Player state machine for ability power-up system',
      'Health bar, Boss health UI, Trust bar, Meter manager',
      'Item counter and Inventory UI',
      'Checkpoint and checkpoint manager',
      'Spriter2UnityDX for 2D animation',
      'Scene switching and teleporter system',
    ],
    tools: ['Unity', 'C#', 'ProBuilder', 'Sequences', 'TextMesh Pro', 'Spriter2UnityDX'],
    results: [],
    technologies: ['Unity', 'C#', '2D', 'Sequences', 'Spriter'],
    images: [],
    buildUrl: 'https://drive.google.com/file/d/1YM7xL2uLvlOi1YUExNsakc-gYdL1_17F/view?usp=sharing',
    githubUrl: 'https://github.com/scrubbzz/ShaytanKids',
  },
  {
    id: 'bag-inspection',
    name: 'Bag Inspection',
    tagline: '2D Multiplayer Inspection Game',
    category: 'game',
    description:
      'A 2D multiplayer bag inspection game built in Unity with a server/client networking architecture. Players inspect bags on a conveyor belt system, identifying legal and illegal items. Features bag and human movement systems, item placement mechanics, NPC characters, and a points system.',
    role: 'Game Programmer & Designer',
    responsibilities: [],
    gameplaySystems: [
      'Bag inspection mechanics on conveyor belt system',
      'Legal and illegal item identification',
      'Bag and human movement systems',
      'Item placement and interaction',
      'NPC characters',
      'Points system',
    ],
    technicalSystems: [
      'Server/client networking architecture',
      'Network packet system: BagMovement, HumanMovement, Points, Random, NPC',
      'Network manager and network components',
      'Conveyor belt system',
      'Bag movement and human movement networking',
      'Item placement system for bags and humans',
      'Player data management',
      'Main menu and scene management',
    ],
    tools: ['Unity', 'C#', 'TextMesh Pro', 'Unity Networking'],
    results: [],
    technologies: ['Unity', 'C#', '2D', 'Multiplayer', 'Networking', 'TextMesh Pro'],
    images: [],
    githubUrl: 'https://github.com/Saeedovic/Bag-Inspection2D',
  },
  {
    id: 'hidden-in-plain-sight',
    name: 'Hidden in Plain Sight',
    tagline: '2D Hidden Object Educational Game',
    category: 'game',
    description:
      'A 2D hidden object game built in Unity designed to educate players about various subcultures that exist in today\'s society. Players search for hidden items across multiple themed levels, each representing a different subculture. Features a timer countdown system, click tracking with limited clicks, a hint system with cooldown, and score calculation with time bonuses.',
    role: 'Game Programmer & Designer',
    responsibilities: [],
    gameplaySystems: [
      'Hidden object mechanics: click to find and collect hidden items',
      'Multiple themed levels representing different subcultures: Surfer\'s Bar (Bar Hawaii), Gamer Room, Steampunk',
      'Timer countdown system (60 seconds per level)',
      'Click tracking with limited clicks per level',
      'Hint system with cooldown meter and visual feedback',
      'Score system with time bonus calculation',
      'Win/lose conditions based on finding all items or running out of time',
    ],
    technicalSystems: [
      'Object interaction via OnMouseDown detection',
      'Click tracking and remaining clicks display',
      'Timer countdown with coroutine-based implementation',
      'Hint meter with cooldown timer and particle system feedback',
      'Score calculation with time bonus',
      'Scene management and level transitions',
      'Pause menu with resume and scene reload functionality',
      'Main menu with play and quit options',
    ],
    tools: ['Unity', 'C#', 'TextMesh Pro'],
    results: [],
    technologies: ['Unity', 'C#', '2D', 'TextMesh Pro'],
    images: [],
    githubUrl: 'https://github.com/Saeedovic/CIU211-',
  },
  {
    id: 'endless-runner',
    name: 'Endless Runner',
    tagline: '2D Endless Runner Game',
    category: 'game',
    description:
      'A 2D endless runner game built in Unity. Features player controller, obstacle generation, collectible coins, power-ups (jump boost and speed boost), parallax scrolling background, UI controller, and a main menu scene. Uses TextMesh Pro for text rendering.',
    role: 'Game Programmer & Designer',
    responsibilities: [],
    gameplaySystems: [
      'Player movement and jump mechanics',
      'Obstacle generation system',
      'Coin collection',
      'Power-up system (Jump Boost, Speed Boost)',
      'Parallax scrolling background',
      'UI controller and main menu',
    ],
    technicalSystems: [
      'Player controller with ground detection',
      'Obstacle spawning and recycling',
      'Power-up effect system',
      'Parallax background scrolling',
      'UI state management',
      'TextMesh Pro integration',
    ],
    tools: ['Unity', 'C#', 'TextMesh Pro'],
    results: [],
    technologies: ['Unity', 'C#', '2D', 'TextMesh Pro'],
    images: [],
    githubUrl: 'https://github.com/Saeedovic/EndlessRunner',
  },
  {
    id: 'vr-horror-puzzle',
    name: 'VR Horror Puzzle',
    tagline: 'VR Puzzle Game',
    category: 'game',
    description:
      'A VR puzzle game built in Unity with XR support (Oculus and OpenXR). Features a player controller, multiple puzzle systems including door interactions, light puzzles, weight puzzles, and wheel puzzles. Includes lever and light switch interactions, audio management, and a detailed indoor environment with baked lightmapping.',
    role: 'Game Programmer & Designer',
    responsibilities: [],
    gameplaySystems: [
      'VR player controller',
      'Door interaction system',
      'Light puzzle mechanics',
      'Weight puzzle mechanics',
      'Wheel puzzle mechanics',
      'Lever and switch interactions',
    ],
    technicalSystems: [
      'XR interaction (Oculus + OpenXR)',
      'Player movement and interaction',
      'Puzzle state management',
      'Audio manager',
      'Baked lightmapping and reflection probes',
      'Occlusion culling',
    ],
    tools: ['Unity', 'C#', 'XR', 'Oculus', 'OpenXR', 'TextMesh Pro'],
    results: [],
    technologies: ['Unity', 'C#', 'VR', 'XR', 'Oculus', 'OpenXR'],
    images: [],
    githubUrl: 'https://github.com/Saeedovic/VR-Game',
  },
  {
    id: 'riddles-of-the-unknown',
    name: 'Riddles of the Unknown',
    tagline: 'Puzzle Adventure Game',
    category: 'game',
    description:
      'A puzzle adventure game built in Unity featuring a UFO player character, terrain with stone textures, vegetation spawning, and VFX explosion systems. Includes number-based puzzle elements, note/paper clues, and destination markers. Built with Universal Render Pipeline (URP).',
    role: 'Game Programmer & Designer',
    responsibilities: [],
    gameplaySystems: [
      'UFO player movement',
      'Number-based puzzle mechanics',
      'Clue and note system',
      'Destination marker navigation',
    ],
    technicalSystems: [
      'Universal Render Pipeline (URP)',
      'Terrain system with stone textures',
      'Vegetation spawning system',
      'VFX explosion system',
      'Player animation',
    ],
    tools: ['Unity', 'C#', 'URP', 'TextMesh Pro'],
    results: [],
    technologies: ['Unity', 'C#', 'URP', 'VFX', 'Terrain'],
    images: [],
    githubUrl: 'https://github.com/Saeedovic/Riddles-of-the-Unknown',
  },
  {
    id: 'memory-cards-game',
    name: 'Memory Cards Game',
    tagline: 'Card Matching Game',
    category: 'game',
    description:
      'A memory card matching game built in Unity. Features playing cards with flip mechanics, a leaderboard system for tracking high scores, and file-based save/load functionality for persisting player data.',
    role: 'Game Programmer & Designer',
    responsibilities: [],
    gameplaySystems: [
      'Card flip and matching mechanics',
      'Leaderboard system for high scores',
      'Token system',
    ],
    technicalSystems: [
      'File I/O for save/load functionality',
      'Player preferences for data persistence',
      'Game control and state management',
      'Leaderboard display and management',
      'UI canvas system',
    ],
    tools: ['Unity', 'C#', 'TextMesh Pro'],
    results: [],
    technologies: ['Unity', 'C#', '2D', 'TextMesh Pro'],
    images: [],
    githubUrl: 'https://github.com/Saeedovic/MemoryCardsGame',
  },
]

export interface ExperienceItem {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  location: string
  description: string
  responsibilities: string[]
  technologies: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: 'exp-1',
    company: 'Naphora',
    role: 'Gameplay Programmer',
    startDate: 'Sept 2023',
    endDate: 'Sept 2024',
    location: 'Riyadh, Saudi Arabia',
    description:
      'Developed gameplay systems and mechanics for Content Creator Mansion using Unity and C#. Contributed to gameplay design, monetization, playable ads, analytics, and performance optimization. Shipped on Google Play and App Store.',
    responsibilities: [
      'Developed gameplay systems and mechanics for Content Creator Mansion using Unity and C#',
      'Contributed to gameplay design, including core gameplay loops, progression, mechanics, pacing, and player experience',
      'Designed and prototyped gameplay concepts and mechanics, testing and iterating on ideas',
      'Created custom Unity Editor tools that improved content creation and iteration workflows',
      'Implemented monetization features, including advertising, in-app purchases, and third-party SDK integrations',
      'Worked with AppLovin and ironSource for advertising and monetization development',
      'Developed playable ads using Luna Playworks',
      'Worked with Firebase Analytics, Remote Config, and A/B testing',
      'Improved runtime performance through profiling, draw call reduction, texture optimization',
      'Contributed to UI implementation, gameplay feedback, VFX, audio systems',
      'Participated in testing, bug fixing, build preparation, and release processes',
      'Contributed to shipping Content Creator Mansion on Google Play and the App Store',
    ],
    technologies: ['Unity', 'C#', 'AppLovin', 'ironSource', 'Luna Playworks', 'Firebase', 'TextMeshPro', 'Git'],
  },
  {
    id: 'exp-2',
    company: 'Power Interactive',
    role: 'Junior Game Developer',
    startDate: 'Oct 2024',
    endDate: 'Aug 2025',
    location: 'Dubai, UAE',
    description:
      'Developed and delivered interactive features as part of a multidisciplinary team. Contributed to VR and mixed reality projects using Magic Leap 2.',
    responsibilities: [
      'Developed and delivered interactive features as part of a multidisciplinary development team',
      'Built and iterated on gameplay and interactive prototypes',
      'Contributed to projects involving VR and mixed reality technologies',
      'Gained experience with Magic Leap 2 and mixed reality development',
      'Contributed to gameplay programming, interactive systems, prototyping, debugging, and feature development',
      'Collaborated with developers and other team members',
      'Contributed to code quality and development process improvements',
    ],
    technologies: ['Unity', 'C#', 'Magic Leap 2', 'VR', 'Mixed Reality'],
  },
  {
    id: 'exp-3',
    company: 'NEOM',
    role: 'Client Advisor',
    startDate: 'Seasonal 2018',
    endDate: '2024',
    location: 'Sindalah Island, Saudi Arabia',
    description:
      'Consistently exceeded sales KPIs. Built and maintained client relationships through personalized communication and service.',
    responsibilities: [
      'Consistently exceeded sales KPIs, including UPT, ATV, and CRM acquisition targets',
      'Built and maintained client relationships through personalized communication and service',
      'Developed strong communication, problem solving, and customer experience skills in a professional environment',
    ],
    technologies: [],
  },
  {
    id: 'exp-4',
    company: 'Middle East Film & Comic Con',
    role: 'Sales Agent',
    startDate: '2022',
    endDate: '2023',
    location: 'Dubai, UAE',
    description:
      'Delivered customer service, sales, and promotional support across multiple annual events. Supported positive customer experiences across seven consecutive events.',
    responsibilities: [
      'Delivered customer service, sales, and promotional support across multiple annual events',
      'Worked effectively in high volume environments requiring communication, teamwork, adaptability, and problem solving',
      'Supported positive customer experiences across seven consecutive events',
    ],
    technologies: [],
  },
]

export interface SkillCategory {
  name: string
  skills: { name: string; level: number }[]
}

export const skills: SkillCategory[] = [
  {
    name: 'Game Engines',
    skills: [
      { name: 'Unity', level: 90 },
      { name: 'Unreal Engine', level: 50 },
      { name: 'Magic Leap 2', level: 60 },
    ],
  },
  {
    name: 'Programming',
    skills: [
      { name: 'C#', level: 90 },
      { name: 'Object Oriented Programming', level: 85 },
      { name: 'Design Patterns', level: 80 },
      { name: 'ScriptableObjects', level: 85 },
      { name: 'Async Programming / UniTask', level: 70 },
    ],
  },
  {
    name: 'Game Design & Development',
    skills: [
      { name: 'Gameplay Systems', level: 90 },
      { name: 'Game Design', level: 85 },
      { name: 'Rapid Prototyping', level: 85 },
      { name: 'Game Design Documents', level: 80 },
      { name: 'Level Design', level: 75 },
      { name: 'UI/UX Design', level: 80 },
    ],
  },
  {
    name: 'Monetization & Analytics',
    skills: [
      { name: 'Playable Ads (Luna Playworks)', level: 80 },
      { name: 'AppLovin / ironSource', level: 75 },
      { name: 'Firebase Analytics', level: 80 },
      { name: 'A/B Testing / Remote Config', level: 75 },
      { name: 'SDK Integration', level: 80 },
    ],
  },
  {
    name: 'Tools & Workflow',
    skills: [
      { name: 'Unity Editor Scripting', level: 85 },
      { name: 'Custom Editor Tools', level: 85 },
      { name: 'Git', level: 80 },
      { name: 'Jira', level: 75 },
      { name: 'Figma', level: 65 },
      { name: 'DOTween', level: 75 },
    ],
  },
  {
    name: 'Platforms',
    skills: [
      { name: 'Mobile (Android/iOS)', level: 85 },
      { name: 'PC', level: 75 },
      { name: 'VR', level: 65 },
      { name: 'Mixed Reality', level: 65 },
    ],
  },
]

export const education = [
  {
    degree: "Bachelor's Degree in Game Programming & Design",
    school: 'SAE University College',
    year: 'Dubai, UAE',
    description: '',
  },
]

export const achievements = [
  'Certificate of Best Game Studio Award — SAE University College',
  'Shipped Content Creator Mansion on Google Play and App Store',
  'Developed playable ads using Luna Playworks',
]