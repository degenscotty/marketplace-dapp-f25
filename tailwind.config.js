/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                accent: {
                    DEFAULT: "currentColor",
                },
                backgroundSecondary: "currentColor",
            },
        },
    },
    plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
}
