const dischargeService = {
    async generateFinalClearance(folioId) {
        // 1. Final Audit of all unbilled items
        const pendingItems = await db.query('SELECT * FROM unbilled_items WHERE folio_id = $1', [folioId]);
        if (pendingItems.length > 0) return { canDischarge: false, reason: "Unbilled consumables found" };

        // 2. Generate ICD-11 Coded Discharge Summary
        const summary = await clinicalService.generateSummary(folioId);
        
        // 3. Close the Financial Folio
        await db.query('UPDATE ipd_folios SET status = "SETTLED" WHERE id = $1', [folioId]);
        
        return { canDischarge: true, summary: summary };
    }
};
