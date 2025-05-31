module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['"Fredoka"', 'sans-serif'],
      },
      colors: {
        'baby-blue': '#d0f0fd',
        'light-yellow': '#fffde1',
        'header-blue': '#dbeafe',
        'header-yellow': '#fef9c3',
        'primary-blue': '#2563eb',
        'border-blue': '#93c5fd',
        'accent-orange': '#f59e0b',
        'text-gray': '#374151',
        'text-dark': '#333',
        'input-blue': '#f0f9ff',
        'input-border': '#cbd5e1',
        'result-bg': '#fef3c7',
      },
      boxShadow: {
        'header': '0 6px 12px rgba(0, 0, 0, 0.08)',
        'card': '0 6px 14px rgba(0, 0, 0, 0.08)',
        'button': '0 5px 8px rgba(0, 0, 0, 0.1)',
        'image': '0 8px 20px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'gradient-body': 'linear-gradient(to right, #d0f0fd, #fffde1)',
        'gradient-header': 'linear-gradient(to right, #dbeafe, #fef9c3)',
      },
    },
  },
  plugins: [],
}