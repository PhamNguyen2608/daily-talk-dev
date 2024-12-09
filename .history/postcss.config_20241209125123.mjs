/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
   'postcss-import': {}, // Hỗ trợ import file
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {}, // Tailwind CSS plugin
    autoprefixer: {}, // Tự động thêm vendor prefix
  },
};

export default config;
