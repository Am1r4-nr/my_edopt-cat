import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
                display: ['Outfit', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    base: '#FDFBF7',
                    surface: '#FFFFFF',
                    dark: '#2D241C',
                    primary: '#DE7B1F', // Main orange button tint
                    secondary: '#885025', // Darker brown
                    input: '#F0ECE4', // Input fields background
                    accent: '#116b73', // Teal from info cards
                },
            },
            backgroundImage: {
                'boho-pattern': "url('/images/bg-pattern.png')",
            },
        },
    },

    plugins: [forms, typography],
};
