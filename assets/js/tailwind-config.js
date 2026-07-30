tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        darkBg: "#0A0A0A",
        darkSurface: "#111111",
      },
      fontSize: {
        // Cấu hình Fluid Typography tự động co giãn theo khung hình (laptop và điện thoại)
        'fluid-xs': 'clamp(0.75rem, 0.70rem + 0.28vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 0.82rem + 0.39vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.94rem + 0.50vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1.05rem + 0.61vw, 1.313rem)',
        'fluid-xl': 'clamp(1.25rem, 1.15rem + 0.78vw, 1.563rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.35rem + 1.11vw, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.65rem + 1.67vw, 2.625rem)',
        'fluid-4xl': 'clamp(2.25rem, 1.90rem + 2.22vw, 3.375rem)',
        'fluid-5xl': 'clamp(2.75rem, 2.20rem + 3.33vw, 4.5rem)',
        'fluid-hero': 'clamp(2.25rem, 1.25rem + 4.2vw, 4.5rem)', // 36px di động -> 72px laptop
      }
    },
  },
};
