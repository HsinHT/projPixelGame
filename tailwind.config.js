/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'pixel': ['"DotGothic16"', 'sans-serif'],
            },
            colors: {
                'pixel-bg': '#f0f0f0', // Placeholder
                'pixel-dark': '#202020',
            },
        },
    },
    plugins: [],
}
