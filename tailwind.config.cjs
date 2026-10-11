@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: #2e3d32;
  background: #faf7f2;
  line-height: 1.5;
  font-weight: 400;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background: #faf7f2;
}

* {
  box-sizing: border-box;
}

button,
input {
  font: inherit;
}

img {
  display: block;
  max-width: 100%;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(45, 90, 39, 0.22);
  border-radius: 999px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.2);
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

