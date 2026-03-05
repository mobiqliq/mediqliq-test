import React, { useState } from 'react';

const AdminPolicyDashboard = () => {
  const [activeTab, setActiveTab] = useState('PRICING');
  
  // Example State for the 'Business Rules'
  const [rules, setRules] = useState({
    followUpDays: 7,
    dormantMonths: 12,
    taxRate: 18,
    currency: 'INR'
  });

  return (
    <div className="p-10 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Clinic Control Center</h1>
          <p className="text-slate-500 font-medium">Define business logic and monitor financial integrity</p>
        </header>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          {['PRICING', 'BUSINESS_RULES', 'AUDIT_LOGS'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                activeTab === tab ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-500 border border-slate-200'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 p-10">
          {activeTab === 'PRICING' && <PricingPanel />}
          {activeTab === 'BUSINESS_RULES' && <RulesPanel rules={rules} setRules={setRules} />}
          {activeTab === 'AUDIT_LOGS' && <AuditPanel />}
        </div>
      </div>
    </div>
  );
};

const RulesPanel = ({ rules, setRules }) => (
  <div className="grid grid-cols-2 gap-12">
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-800">Operational Logic</h3>
      <div>
        <label className="text-[10px] font-black text-slate-400 uppercase">Follow-up Window (Days)</label>
        <input type="number" value={rules.followUpDays} className="w-full mt-2 p-4 bg-slate-50 rounded-2xl border-none font-bold"
          onChange={(e) => setRules({...rules, followUpDays: e.target.value})} />
        <p className="text-[10px] text-slate-400 mt-2 italic">Patients visiting within this window are not charged consultation.</p>
      </div>
      <div>
        <label className="text-[10px] font-black text-slate-400 uppercase">Dormancy Period (Months)</label>
        <input type="number" value={rules.dormantMonths} className="w-full mt-2 p-4 bg-slate-50 rounded-2xl border-none font-bold"
          onChange={(e) => setRules({...rules, dormantMonths: e.target.value})} />
      </div>
    </div>
    <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 h-fit">
      <h4 className="font-bold text-blue-800 mb-2">Policy Impact</h4>
      <p className="text-sm text-blue-600 leading-relaxed">
        Setting a <strong>{rules.followUpDays}-day</strong> follow-up window will automatically flag any consultation 
        on the <strong>{parseInt(rules.followUpDays) + 1}th day</strong> as a "New Paid Consultation" at the billing desk.
      </p>
    </div>
  </div>
);

// Simplified sub-components for structure
const PricingPanel = () => <div className="text-slate-500">Master Price List Component Loading...</div>;
const AuditPanel = () => <div className="text-slate-500">Real-time Financial Audit Logs Loading...</div>;

export default AdminPolicyDashboard;
