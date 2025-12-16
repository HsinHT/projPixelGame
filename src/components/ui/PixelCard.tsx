import React from 'react';
import { cn } from '../../utils';

interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
}

export const PixelCard: React.FC<PixelCardProps> = ({
    className,
    title,
    children,
    ...props
}) => {
    return (
        <div className={cn("relative bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]", className)} {...props}>
            {title && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white border-4 border-black px-4 py-1">
                    <h3 className="font-pixel text-xs font-bold uppercase">{title}</h3>
                </div>
            )}
            {children}
        </div>
    );
};
