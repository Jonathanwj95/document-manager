module.exports = {
  // Habilita dark mode vía clase
  darkMode: "class",

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
    
      colors: {
        primary: {
          light: "#6366F1",
          DEFAULT: "#4F46E5",
          dark: "#4338CA",
        },
        secondary: {
          light: "#FBBF24",
          DEFAULT: "#F59E0B",
          dark: "#B45309",
        },
        accent: {
          light: "#6EE7B7",
          DEFAULT: "#10B981",
          dark: "#059669",
        },
       
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },

      
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },

      spacing: {
        128: "32rem",
        144: "36rem",
      },
    },
  },

  plugins: [
   
    require("@tailwindcss/forms"),
    
  ],
};
