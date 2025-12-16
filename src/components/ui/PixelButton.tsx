import React from 'react';
import { cn } from '../../utils';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
}

export const PixelButton: React.FC<PixelButtonProps> = ({
    className,
    variant = 'primary',
    children,
    ...props
}) => {
    const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 font-pixel text-sm uppercase tracking-widest transition-transform active:translate-y-1 active:shadow-none border-4 border-black focus:outline-none";

    // Pixel shadow effect (hardcoded box-shadow or border tricks)
    // Simple: border-b-8 border-r-8 for depth
    const variants = {
        primary: "bg-blue-500 text-white hover:bg-blue-400 border-b-8 border-r-8 border-blue-900",
        secondary: "bg-yellow-400 text-black hover:bg-yellow-300 border-b-8 border-r-8 border-yellow-700",
        danger: "bg-red-500 text-white hover:bg-red-400 border-b-8 border-r-8 border-red-900",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};
