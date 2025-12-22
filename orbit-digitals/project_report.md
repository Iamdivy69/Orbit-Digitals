# Orbit Digitals - Project Report

## 1. Project Overview
**Orbit Digitals** is a modern, high-performance digital agency website designed to showcase services, portfolio projects, and pricing plans. The application features a "cosmic" aesthetic with dark themes, neon accents, and fluid animations. It is built as a Single Page Application (SPA) where navigation scrolls to specific sections (Services, Pricing, Contact), supplemented by rich interactive modals for details.

## 2. Technology Stack
The project leverages a modern React-based stack optimized for performance and visual impact:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Integration**: Google Generative AI (likely for the Chat Widget)
- **UI Components**: Custom components including Shadcn/ui primitives and Aceternity UI-style effects (e.g., `BackgroundGradientAnimation`, `HoverBorderGradient`, `FlipWords`).

## 3. Application Structure
    
### Core Directories
- **`app/`**: Contains the main application logic using Next.js App Router.
  - `page.tsx`: The primary landing page containing all major sections.
  - `layout.tsx`: Defines the global structure, including font loading (Space Grotesk, Orbitron, Inter), global background animations, and the Chat Widget loader.
  - `globals.css`: Global styles and Tailwind directives.
- **`components/`**: Reusable UI components.
  - **Feature Components**: `Navbar`, `Footer`, `ContactForm`, `ChatWidget`, `ServiceModal`.
  - **Visual/Effects**: `ParticleBackground`, `BackgroundGradientAnimation`, `RevealOnScroll`, `Typewriter`.
  - **`ui/`**: specialized micro-components like `hover-border-gradient.tsx`, `flip-words.tsx`, `spotlight-text.tsx`.
- **`lib/`**: Utility functions and static data configuration (likely `data.ts`).

## 4. Key Features & Components

### 4.1. Global Layout
- **Theme**: Dark mode dominated by black (`#02060C`) and deep blues, with bright cyan/blue (`#3CB7FF`) accents.
- **Background**: Layered standard particles (`ParticleBackground`) over a fluid gradient animation (`BackgroundGradientAnimation`) to create depth.
- **Navigation**: Sticky `Navbar` and comprehensive `Footer`.

### 4.2. Hero Section
- **Visuals**: Large typography using the "Orbitron" font, animated headlines using `FlipWords`.
- **Interactivity**: Calls-to-Action (CTAs) using `HoverBorderGradient` buttons.

### 4.3. Services Section
- **Grid Layout**: Displays services in a responsive grid.
- **Modal Interaction**: Clicking a service opens a detailed `ServiceModal` (overlay).
  - **Details**: "Includes" lists, full descriptions.
  - **Portfolio Integration**: Embedded projects grid showing images or videos.
  - **Project Lightbox**: Clicking a project media item opens a full-screen lightbox player/viewer.
  - **Downloads**: Option to download service brochures.

### 4.4. Pricing Section
- **Plans**: Three tiers (Starter, Medium, Custom).
- **Functionality**: "Get Quote" buttons open a specialized `BookingModal`/`QuoteModal` pre-filled with the selected plan.
  - **Dynamic Styling**: Cards highlight on hover with glowing border effects.

### 4.5. Contact & Support
- **Forms**: Integrated `ContactForm` in the main footer area and inside modals.
- **AI Chat**: A `ChatWidget` (loaded via `ChatLoader`) provides an AI assistant for visitor queries, powered by Google Generative AI.
- **Admin Panel**: A secure `/admin/services` dashboard for managing service content.
  - **Authentication**: Protected via Supabase Auth (Email/Password), with a custom login page (`/login`).
  - **Functionality**: Create, Read, Update, and Delete (CRUD) services.
  - **Media Management**: Upload cover images and multiple project gallery images directly to Supabase Storage.

## 5. UI/UX Design
- **Glassmorphism**: Extensive use of semi-transparent backgrounds with blur (`backdrop-blur`) for cards and modals.
- **Micro-interactions**: Hover effects on cards (scale, border glow), buttons (gradient shifts), and text.
- **Typography**:
  - **Headings**: *Orbitron* (Hero) and *Space Grotesk* (Section headers).
  - **Body**: *Inter* for readability.
- **Responsiveness**: Fully responsive layout adapting from mobile (stacked grids) to desktop (multi-column layouts).
