import React from 'react';

const Loading = () => {
    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="border-dotted border-amber-500 animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>
    );
};

export default Loading;