import React from 'react';

const cardStyles = "bg-card p-6 rounded-lg shadow-md";
const titleStyles = "text-3xl font-bold text-primary";
const subtitleStyles = "text-lg font-semibold text-secondary";
const textStyles = "text-muted-foreground mt-2";

const Card = () => {
    return (
        <div className={cardStyles}>
            <h2 className={titleStyles}>$2M+</h2>
            <h3 className={subtitleStyles}>Research Funded</h3>
            <p className={textStyles}>Alumni donations have contributed to groundbreaking research across various fields.</p>
        </div>
    );
};

export default Card;