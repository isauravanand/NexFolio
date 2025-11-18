import React from 'react';

const Background = ({ children }) => {
    return (
        <div className="relative w-full min-h-screen overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-black z-0"></div>
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-700 opacity-30 rounded-full blur-3xl animate-pulse z-0"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600 opacity-30 rounded-full blur-3xl animate-pulse delay-1500 z-0"></div>

            <div className="relative z-10">
                {children}
            </div>

        </div>
    );
};

export default Background;
