import React from 'react';

// Shared Tailwind CSS classes
const primaryButtonClasses = 'mt-6 bg-blue-600 text-primary-foreground hover:bg-primary/80 py-2 px-4 rounded-lg';

const SupportAlmaMater = () => {
  return (
    <div className="bg-blue-200 p-8 text-center">
      <h1 className="text-3xl font-bold text-black">Support Your Alma Mater</h1>
      <p className="mt-4 text-lg text-zinc-700">Your donation helps shape the future of our university and its students.</p>
      <button className={primaryButtonClasses}>
        Donate Now ❤
      </button>
    </div>
  );
};

export default SupportAlmaMater;