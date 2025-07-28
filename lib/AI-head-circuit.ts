// AI Head Circuit - Futuristic AI/Robot Head Structure
export const AI_HEAD_CIRCUIT_PATHS = {
  // Main head outline - sleek robotic profile with rounded top
  headOutline: "M 24 6 C 16 6 10 10 10 18 L 10 30 C 10 38 16 42 24 42 C 32 42 38 38 38 30 L 38 18 C 38 10 32 6 24 6 Z",
  
  // Face plate with angular geometric design
  facePlate: "M 14 14 L 14 28 L 20 34 L 28 34 L 34 28 L 34 14 L 28 10 L 20 10 Z",
  
  // Digital eye displays - larger and more prominent
  leftEye: "M 15 17 L 21 17 L 21 23 L 15 23 Z",
  rightEye: "M 27 17 L 33 17 L 33 23 L 27 23 Z",
  
  // Eye connectors
  leftEyeConnect: "M 20 20 L 24 20",
  rightEyeConnect: "M 24 20 L 28 20",
  
  // Circuit patterns on the head - more complex
  circuitPattern1: "M 10 16 L 12 16 L 12 20 L 14 20 M 12 20 L 12 24 L 14 24",
  circuitPattern2: "M 38 16 L 36 16 L 36 20 L 34 20 M 36 20 L 36 24 L 34 24",
  circuitPattern3: "M 18 10 L 20 10 L 20 12 M 28 10 L 30 10 L 30 12",
  circuitPattern4: "M 20 36 L 20 38 L 22 38 M 26 38 L 28 38 L 28 36",
  
  // Neural network pathways
  neuralPath1: "M 14 26 Q 24 28 34 26",
  neuralPath2: "M 16 30 Q 24 32 32 30",
  neuralPath3: "M 18 32 Q 24 34 30 32",
  
  // Central processing core with cross pattern - larger
  cpuCore: "M 20 23 L 28 23 L 28 29 L 20 29 Z",
  cpuCross1: "M 24 23 L 24 29",
  cpuCross2: "M 20 26 L 28 26",
  
  // Tech ports and connectors
  portLeft1: "M 8 18 L 10 18 L 10 20 L 8 20 Z",
  portLeft2: "M 8 22 L 10 22 L 10 24 L 8 24 Z",
  portRight1: "M 38 18 L 40 18 L 40 20 L 38 20 Z",
  portRight2: "M 38 22 L 40 22 L 40 24 L 38 24 Z",
  
  // Additional circuit traces for complexity
  trace1: "M 24 12 L 24 16",
  trace2: "M 24 32 L 24 36",
  trace3: "M 16 26 L 20 26",
  trace4: "M 28 26 L 32 26",
  trace5: "M 14 14 L 16 16",
  trace6: "M 34 14 L 32 16",
  trace7: "M 14 34 L 16 32",
  trace8: "M 34 34 L 32 32",
  
  // Antenna arrays for communication
  antenna1: "M 18 6 L 18 4 M 16 4 L 20 4",
  antenna2: "M 30 6 L 30 4 M 28 4 L 32 4",
  antennaWave1: "M 16 2 Q 18 1 20 2",
  antennaWave2: "M 28 2 Q 30 1 32 2",
  
  // Chin/jaw structure
  jawLine: "M 20 34 L 24 38 L 28 34",
  
  // Side panels
  leftPanel: "M 10 14 L 10 26 L 12 28 L 12 14 Z",
  rightPanel: "M 38 14 L 38 26 L 36 28 L 36 14 Z",
}

// Define connection nodes for particle effects
export const AI_HEAD_NODES = [
  // Core nodes
  { x: 24, y: 24, r: 2 }, // Center CPU
  { x: 18, y: 20, r: 1.5 }, // Left eye center
  { x: 30, y: 20, r: 1.5 }, // Right eye center
  { x: 24, y: 26, r: 1.5 }, // CPU center
  
  // Circuit junction nodes
  { x: 14, y: 14, r: 1 }, // Top left
  { x: 34, y: 14, r: 1 }, // Top right
  { x: 14, y: 34, r: 1 }, // Bottom left
  { x: 34, y: 34, r: 1 }, // Bottom right
  
  // Neural pathway nodes
  { x: 24, y: 10, r: 1.2 }, // Top center
  { x: 24, y: 38, r: 1.2 }, // Bottom center
  { x: 10, y: 20, r: 1 }, // Left side
  { x: 38, y: 20, r: 1 }, // Right side
  
  // Additional nodes for density
  { x: 20, y: 16, r: 0.8 },
  { x: 28, y: 16, r: 0.8 },
  { x: 20, y: 30, r: 0.8 },
  { x: 28, y: 30, r: 0.8 },
  { x: 16, y: 26, r: 0.8 },
  { x: 32, y: 26, r: 0.8 },
  
  // Antenna nodes
  { x: 18, y: 4, r: 0.6 },
  { x: 30, y: 4, r: 0.6 },
]

// Combined path for easier rendering
export const AI_HEAD_COMBINED_PATH = Object.values(AI_HEAD_CIRCUIT_PATHS).join(' ')

// Color scheme for AI head
export const AI_HEAD_COLORS = {
  primary: '#00C9FF', // Cyan
  secondary: '#00FFFF', // Bright cyan
  accent: '#00FF88', // Green for circuits
  glow: '#FFFFFF', // White glow
  dark: '#004466', // Dark blue
}