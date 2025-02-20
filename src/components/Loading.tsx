import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-10">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 className="text-center text-gray-600 text-xl font-semibold">Loading...</h2>
            <p className="w-1/3 text-center text-gray-500">Please wait while we load the content for you.</p>
        </div>
    );
};

export default Loading;
