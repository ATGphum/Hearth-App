import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint"; //https://www.npmjs.com/package/vite-plugin-eslint, used this to see the errors and warning in the terminal
import tsconfigPaths from "vite-tsconfig-paths"; //https://github.com/aleclarson/vite-tsconfig-paths#readme, used to map typescript path -> convenience for development in the frontend

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    {
      // default settings on build (i.e. fail on error)
      ...eslint(),
      apply: "build",
    },
    {
      // do not fail on serve (i.e. local development)
      ...eslint({
        failOnWarning: false,
        failOnError: false,
      }),
      apply: "serve",
      enforce: "post",
    },
  ],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 5173, // replace this port with any number you want
  },
});
