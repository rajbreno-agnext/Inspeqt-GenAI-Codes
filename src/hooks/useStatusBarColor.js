import { useEffect } from 'react';

export const useStatusBarColor = (color = '#ffffff') => {
  useEffect(() => {
    // Get both meta tags (light and dark mode)
    const lightModeTag = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]');
    const darkModeTag = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]');
    
    // Store original colors
    const originalLight = lightModeTag.getAttribute('content');
    const originalDark = darkModeTag.getAttribute('content');

    // Update colors - if no color is provided, default to white
    const statusBarColor = color || '#ffffff';
    lightModeTag.setAttribute('content', statusBarColor);
    darkModeTag.setAttribute('content', statusBarColor);

    // Cleanup function to restore original colors when component unmounts
    return () => {
      lightModeTag.setAttribute('content', originalLight);
      darkModeTag.setAttribute('content', originalDark);
    };
  }, [color]);
}; 