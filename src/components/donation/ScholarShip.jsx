import React from 'react';

const cardClasses = "bg-blue-100 p-6 rounded-lg shadow-md";
const titleClasses = "text-2xl font-bold text-zinc-800";
const subtitleClasses = "text-xl font-semibold text-zinc-700 mt-2";
const textClasses = "text-zinc-600 mt-4";

const ImpactCard = () => {
    return (
        <div className={cardClasses}>
            <h1 className={titleClasses}>The Impact of Your Generosity</h1>
            <h2 className={subtitleClasses}>200+</h2>
            <p className={textClasses}>Your donations have helped over 200 students achieve their academic dreams.</p>
        </div>
    );
};

export default ImpactCard;