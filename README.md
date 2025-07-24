# Intel-CS Website Implementation Guide

## Overview
This is a modern Next.js website for Intel Cloud Solutions (Intel-CS) featuring an immersive 3D particle animation experience with smooth scroll-based transitions.

## Architecture

### Main Components

#### 1. Home Page (`app/page.tsx`)
The main landing page that orchestrates the entire experience:
- Uses React Three Fiber for 3D rendering
- Implements scroll-based navigation with 6 sections
- Responsive design with different scroll pages for mobile/desktop

#### 2. 3D Scene (`components/scene.tsx`)
The core 3D animation engine that:
- Manages particle animations that morph between different logo shapes
- Handles mouse interactions and hover effects
- Synchronizes animations with scroll position
- Features 5 distinct logo animations + footer state

### Section Components

All sections are modularized in `components/home/`:

1. **HeroSection** - Advanced Cloud & AI Solutions intro
2. **GpuStreamingSection** - GPU streaming capabilities
3. **CloudExcellenceSection** - Cloud management services
4. **SystemModernizationSection** - System modernization offerings
5. **ProvenExecutionSection** - Track record and expertise
6. **FooterSection** - Contact and company information

### 3D Logo Generators

Located in `components/scene/logo-generators/`:

1. **ai-skull-logo.ts** - AI-themed skull logo with "AI" text cutout
2. **earth-logo.ts** - Globe visualization with continent outlines
3. **cloud-migration-logo.ts** - Cloud with migration arrows
4. **server-logo.ts** - Server infrastructure icon
5. **aws-intel-logo.ts** - Combined AWS and Intel-CS logos

Each generator uses canvas-based rendering to create particle point clouds.

### Helper Components

1. **BackgroundDots** (`components/scene/background-dots.tsx`)
   - Floating ambient particles in the background
   - Adds depth and atmosphere to the scene

2. **Particle Helpers** (`components/scene/particle-helpers.ts`)
   - Utility functions for particle optimization
   - Responsive particle count based on device capabilities
   - Circular texture generation for smooth particles

## Technical Implementation

### Particle System
- **Dynamic Particle Count**: 10,000-20,000 particles based on device
- **Canvas-Based Generation**: Logos are rendered to canvas then sampled
- **Morphing Animation**: Smooth transitions between logo shapes
- **Mouse Interaction**: Particles react to cursor hover with:
  - Size increase
  - Color brightening
  - Attraction effect

### Performance Optimizations
1. **Responsive Particle Counts**: Lower counts on mobile/low-end devices
2. **Frustum Culling**: Disabled for background dots to prevent pop-in
3. **Additive Blending**: Creates glow effects efficiently
4. **Texture Atlasing**: Single circular texture reused for all particles

### Scroll Synchronization
- 6 sections mapped to scroll positions
- Alternating left/right positioning for visual variety
- Smooth transitions using lerp functions
- Section-specific animations and color schemes

## Color Scheme
- Primary: Intel CS Blue (`#006398`)
- Accent: Bright Cyan (`#00A8E0`)
- AWS Orange: `#FF9900` (for AWS logo only)
- Background: Pure Black (`#000000`)
- Text: White with gray variations

## Animation Timeline

1. **Section 1**: AI Skull logo (right side)
2. **Section 2**: Earth/Globe logo (left side)
3. **Section 3**: Cloud Migration logo (right side)
4. **Section 4**: Server Infrastructure (left side)
5. **Section 5**: AWS + Intel-CS logos (right side)
6. **Section 6**: Hidden particles (footer only)

## Responsive Design
- Mobile: 8.5 scroll pages for better pacing
- Desktop: 5.9 scroll pages for smoother experience
- Particle counts adjust based on device capabilities
- Text/3D split: 35% content, 65% visualization

## Key Features
- Immersive 3D particle animations
- Smooth scroll-based transitions
- Interactive mouse effects
- Fully responsive design
- Optimized performance
- Modular component architecture
- Clean, maintainable code structure
