import React, { useState, useEffect } from 'react';

const Subscription = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    window.electron.invoke('hospital:get-profile').then(res => {
      if (res.success) setProfile(res.data[0]);
    });
  }, []);

  const handlePay = async () => {
    // 1. Get the Order from our backend
    const orderRes = await window.electron.invoke('payment:create-order', 4999);
    
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_YOUR_KEY_HERE", // USE YOUR TEST KEY FROM RAZORPAY DASHBOARD
      amount: 499900, 
      currency: "INR",
      name: "Mediqliq",
      description: "Hospital Subscription",
      order_id: orderRes.order_id,
      handler: async function (response) {
        // This only runs IF payment is successful
        const verify = await window.electron.invoke('payment:verify', {
          hospitalId: profile.hospital_id,
          transactionId: response.razorpay_payment_id,
          status: 'SUCCESS'
        });
        if (verify.success) {
          alert("Payment Successful!");
          window.location.reload();
        }
      },
      prefill: {
        name: profile?.owner_name || "",
        email: profile?.email || "",
        contact: profile?.phone || ""
      },
      theme: { color: "#2563eb" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-black text-slate-800 uppercase mb-8 tracking-tighter">Subscription Center</h1>
      <div className="bg-white rounded-[2rem] p-10 shadow-xl border border-slate-100 flex flex-col items-center">
        <div className="text-4xl mb-4">💳</div>
        <h2 className="text-2xl font-black text-slate-800 uppercase">Mediqliq Premium</h2>
        <p className="text-slate-500 font-bold mb-6">Expiry: {profile ? new Date(profile.subscription_expiry).toLocaleDateString() : '...'}</p>
        <button onClick={handlePay} className="w-full max-w-sm bg-blue-600 text-white py-4 rounded-xl font-black text-lg shadow-lg">
          OPEN RAZORPAY CHECKOUT
        </button>
      </div>
    </div>
  );
};
export default Subscription;
