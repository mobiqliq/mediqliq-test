const surgeryService = {
    /**
     * Requirement: Coordinate Surgeon, Anaesthetist, and OT Availability
     */
    async scheduleSurgery(admissionId, procedureCode, team) {
        // 1. Check OT Availability (Slot Management)
        const isAvailable = await checkOTSlot(team.startTime, team.endTime, team.otId);
        if (!isAvailable) throw new Error("OT Slot Conflict detected.");

        // 2. Create Surgical Record with Pre-Op Checklist
        const surgery = await db.insert('surgeries', {
            admission_id: admissionId,
            procedure_code: procedureCode, // SNOMED-CT mapped
            surgeon_id: team.surgeonId,
            anaesthetist_id: team.anaesthetistId,
            status: 'SCHEDULED',
            checklist_status: 'PENDING' // WHO Safety Checklist
        });

        // 3. Auto-reserve required consumables from Pharmacy
        await inventoryService.reserveSurgicalKit(procedureCode);
        return surgery;
    }
};
