import React from 'react';

const SubscriptionBanner = ({ daysLeft }) => {
  if (daysLeft > 15) return null;

  return (
    <div className={`w-full py-2 px-6 flex justify-between items-center text-xs font-bold ${
      daysLeft <= 3 ? 'bg-red-600 text-white animate-pulse' : 'bg-amber-100 text-amber-800'
    }`}>
      <span>🚀 MEDIQLIQ UPDATE: Your {daysLeft <= 3 ? 'Critical' : 'Annual'} Subscription expires in {daysLeft} days.</span>
      <button className="bg-white px-3 py-1 rounded-full shadow-sm text-black">Renew Now</button>
    </div>
  );
};

export default SubscriptionBanner;
