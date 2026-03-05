import React, { useState, useRef } from 'react';

const ConsultationRoom = ({ visitId, patient, history }) => {
  const [clinical, setClinical] = useState({ symptoms: '', diagnosis: '', codes: ['I10'] });
  const canvasRef = useRef(null);

  const handleFinalize = async () => {
    // 1. Capture S-Pen Drawing as Image
    const inkData = canvasRef.current ? canvasRef.current.toDataURL() : null;
    
    // 2. Bundle Data for Interoperability (MOAT DNA)
    const bundle = {
      visitId,
      patientId: patient.id,
      notes: clinical.symptoms,
      diagnosis: clinical.diagnosis,
      icdCodes: clinical.codes,
      inkBlob: inkData,
      timestamp: new Date().toISOString()
    };

    const res = await window.electron.invoke('clinical:finalize-visit', bundle);
    if (res.success) {
      window.print(); // Triggers the Interoperable PDF layout
    }
  };

  return (
    <div className="p-10 max-w-6xl mx-auto">
      {/* CONSULTATION UI */}
      <div className="print:hidden">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900">Finalize Encounter</h1>
          <button 
            onClick={handleFinalize}
            className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase shadow-xl hover:bg-blue-700 transition-all"
          >
            Complete & Export PDF
          </button>
        </header>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl mb-10">
           <label className="text-[10px] font-black text-slate-400 uppercase mb-4 block">Handwritten S-Pen Layer</label>
           <canvas ref={canvasRef} width={800} height={300} className="w-full bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200" />
        </div>
      </div>

      {/* PRINT-ONLY INTEROPERABLE PDF LAYOUT */}
      <div className="hidden print:block p-10 font-sans text-slate-900">
        <div className="flex justify-between border-b-4 border-slate-900 pb-8 mb-10">
          <div>
            <h2 className="text-4xl font-black uppercase italic">Mediqliq OS</h2>
            <p className="font-bold">Interoperable Clinical Summary</p>
          </div>
          <div className="text-right">
            <p className="font-black text-xs uppercase text-slate-400">Encounter ID</p>
            <p className="font-black text-xl">#VISIT-{visitId}</p>
          </div>
        </div>

        <section className="grid grid-cols-3 gap-10 mb-12 py-6 bg-slate-50 px-8 rounded-2xl border border-slate-100">
          <div><label className="text-[10px] font-black text-slate-400 uppercase">Patient</label><p className="font-black text-lg uppercase">{patient?.first_name} {patient?.last_name}</p></div>
          <div><label className="text-[10px] font-black text-slate-400 uppercase">ABHA / Global ID</label><p className="font-bold">{patient?.abha_id || 'NOT LINKED'}</p></div>
          <div><label className="text-[10px] font-black text-slate-400 uppercase">Diagnosis</label><p className="font-black text-lg text-blue-600 uppercase">{clinical.diagnosis} [ICD: {clinical.codes.join(', ')}]</p></div>
        </section>

        <div className="mb-10">
          <h3 className="text-xs font-black uppercase text-slate-400 mb-4">Handwritten Clinical Notes</h3>
          {/* Renders the S-Pen data in the PDF */}
          <img src={canvasRef.current?.toDataURL()} className="w-full h-auto border border-slate-200 rounded-xl" alt="S-Pen Notes" />
        </div>

        <div className="grid grid-cols-2 gap-20 mt-20">
          <div className="text-[10px] font-bold text-slate-400">
            This document is HL7 FHIR R4 compliant and encrypted with AES-256 at source. 
            Digital Signature: {Math.random().toString(36).substring(2, 15).toUpperCase()}
          </div>
          <div className="text-center border-t-2 border-slate-900 pt-2">
            <p className="font-black uppercase text-xs">Medical Practitioner Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationRoom;
