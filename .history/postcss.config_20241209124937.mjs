/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    'postcss-import': {}, // Hỗ trợ import file
    'tailwindcss/nesting': {}, // Hỗ trợ lồng CSS (CSS Nesting)
    autoprefixer: {}, // Tự động thêm vendor prefix
  },
};

export default config;
