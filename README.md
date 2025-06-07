# React Router v7 Pet Shop Demo

A modern pet shop application built with React Router v7, showcasing server-side rendering, data loading patterns, and full-stack React capabilities.

## 🚀 Features

- **Pet Catalog**: Browse available pets with detailed information cards
- **Shopping Cart**: Global cart management with localStorage persistence  
- **Interactive UI**: Modal dialogs, real-time updates, and responsive design
- **Server-Side Rendering**: Full SSR support for SEO and performance
- **Type Safety**: Complete TypeScript integration with route type generation
- **Modern Stack**: React 18, Tailwind CSS, Radix UI components

## 📋 Requirements

- Node.js >= 22.12.0
- pnpm 9.15.0 (automatically enforced)

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/horsewin/react-router-v7-playground.git
cd react-router-v7-playground

# Install dependencies (uses pnpm)
pnpm install
```

## 🚦 Development

```bash
# Start development server
pnpm dev

# Type checking
pnpm typecheck

# Generate route types
pnpm typegen

# Linting and formatting
pnpm check
pnpm fix
```

## 🏗️ Build & Production

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 🐳 Docker

The project includes Docker support with multi-stage builds:

```bash
# Build and run with Docker
docker build -t react-router-pet-shop .
docker run -p 3000:3000 react-router-pet-shop

# Using docker-compose (if available)
docker-compose up
```

## 🗂️ Project Structure

```
app/
├── components/        # Reusable UI components
│   ├── ui/           # Base UI components (shadcn/ui)
│   └── *.tsx         # Feature components
├── contexts/         # React Context providers
├── lib/             # Utility functions
├── routes/          # Route components
├── types/           # TypeScript type definitions
├── app.css          # Global styles
├── root.tsx         # Root layout component
└── routes.ts        # Route configuration

public/              # Static assets
react-router.config.ts  # React Router configuration
```

## 🌟 Key Technologies

- **[React Router v7](https://reactrouter.com/)** - Full-stack React framework
- **[React 18](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI components
- **[Vite](https://vitejs.dev/)** - Build tool
- **[Biome](https://biomejs.dev/)** - Linting and formatting

## 🔧 Configuration

### Environment Variables

- `BACKEND_URL` - Backend API URL (optional, uses mock data if not set)

### React Router Config

The application uses React Router v7 with SSR enabled. Configuration can be found in `react-router.config.ts`.

## 📱 Routes

- `/` - Home page with welcome screen
- `/pets` - Pet catalog with filtering and search
- `/healthcheck` - Application health status

## 🤝 Contributing

This is a personal playground project for exploring React Router v7 features. Feel free to fork and experiment!

## 📄 License

This project is open source and available for educational purposes.