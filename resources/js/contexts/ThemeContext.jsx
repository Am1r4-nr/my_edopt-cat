import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeProviderContext = createContext();

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
}) {
    const [theme, setThemeState] = useState(
        () => localStorage.getItem(storageKey) || defaultTheme
    );

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }
    }, [theme]);

    // Fetch user theme on mount
    useEffect(() => {
        const fetchUserTheme = async () => {
            try {
                const response = await window.axios.get('/api/user');
                if (response.data.theme) {
                    setThemeState(response.data.theme);
                    localStorage.setItem(storageKey, response.data.theme);
                }
            } catch (error) {
                // Not logged in or error, fall back to local storage
            }
        };
        fetchUserTheme();
    }, []);

    const value = {
        theme,
        setTheme: async (newTheme) => {
            localStorage.setItem(storageKey, newTheme);
            setThemeState(newTheme);

            // Persist to database
            try {
                await window.axios.put('/api/user/theme', { theme: newTheme });
            } catch (error) {
                console.error('Failed to save theme preference:', error);
            }
        },
    };

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};
