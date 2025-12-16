import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-neutral-900 text-neutral-100 font-pixel selection:bg-green-400 selection:text-black overflow-hidden relative">

            {/* CRT Scanline Effect Overlay */}
            <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden h-full w-full">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_50%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
            </div>

            <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
                <div className="w-full max-w-2xl animate-fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
};
