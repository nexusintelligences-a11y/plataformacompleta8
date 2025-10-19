import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  define: {
    'import.meta.env.REACT_APP_SUPABASE_URL': JSON.stringify(process.env.REACT_APP_SUPABASE_URL || ''),
    'import.meta.env.REACT_APP_SUPABASE_ANON_KEY': JSON.stringify(process.env.REACT_APP_SUPABASE_ANON_KEY || ''),
  },
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT || '5000', 10),
    allowedHosts: true,
    hmr: {
      protocol: 'wss',
      host: process.env.REPLIT_DEV_DOMAIN,
      clientPort: 443,
    },
  },
  build: {
    // Otimizações de build para performance
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: mode === 'development',
    rollupOptions: {
      output: {
        // Code splitting para melhor cache
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select'],
          // Removido platform chunks - React.lazy() já faz o code splitting automaticamente
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    force: false,
    include: [
      'react',
      'react-dom',
      'react-router-dom',
    ],
  },
  plugins: [tsconfigPaths(), react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./attached_assets"),
    },
  },
}));
