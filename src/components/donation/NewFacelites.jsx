import React from 'react';

const cardClasses = "bg-blue-100 mx-auto bg-card text-card-foreground rounded-lg shadow-md p-10";
const titleClasses = "text-3xl font-bold";
const subtitleClasses = "text-lg font-semibold mt-2";
const textClasses = "text-muted-foreground mt-4";

const CardComponent = () => {
    return (
        <div className={cardClasses}>
            <h2 className={titleClasses}>5</h2>
            <h3 className={subtitleClasses}>New Campus Facilities</h3>
            <p className={textClasses}>
                Your support has helped build new labs, libraries, and student centers.
            </p>
        </div>
    );
};

export default CardComponent;