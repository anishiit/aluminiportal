import React from 'react';

const cardClass = "bg-card p-6 rounded-lg shadow-md flex justify-around p-10 ";
const titleClass = "text-2xl font-bold text-foreground mb-4";
const listItemClass = "flex items-center";
const iconClass = "mr-2";
const textClass = "text-muted-foreground";



const DonationCard = () => {
    const DonationItem = ({  text }) => {
    return (
        <li className={listItemClass}>
           
            <span className={textClass}>{text}</span>
        </li>
    );
};
    return (
        <div className={cardClass}>
            <h2 className={titleClass}>Why Your Donation Matters</h2>
            <ul className="space-y-2">
                <DonationItem  text="Support scholarships for deserving students" />
                <DonationItem  text="Fund research and academic programs" />
                <DonationItem  text="Enhance campus facilities and student experiences" />
            </ul>
        </div>
    );
};



export default DonationCard;