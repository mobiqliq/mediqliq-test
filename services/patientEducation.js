const patientEducation = {
    /**
     * Requirement: Send diagnosis-specific education via WhatsApp
     */
    async triggerEducation(patientId, icdCode) {
        // 1. Fetch Education Material based on ICD-11
        const material = await db.query(
            "SELECT video_url, pdf_guide FROM education_library WHERE icd_code = $1", 
            [icdCode]
        );

        if (material.rows.length > 0) {
            const { video_url, pdf_guide } = material.rows[0];
            const message = `Hello, here is a guide to help you manage your condition: ${pdf_guide}. You can also watch this video: ${video_url}`;
            
            // Dispatch via our existing WhatsApp Bridge
            await whatsappService.sendMessage(patientId, message);
        }
    }
};
