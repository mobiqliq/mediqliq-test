const net = require('net');

const labDeviceIntegrator = {
    /**
     * Requirement: Listen for HL7/ASTM data from Lab Machines
     */
    startListener(port = 6000) {
        const server = net.createServer((socket) => {
            console.log('🧪 Lab Device Connected.');

            socket.on('data', async (data) => {
                const hl7Message = data.toString();
                console.log('📥 Raw Data Received:', hl7Message);

                // Parse the HL7 message (Segment 'OBX' contains results)
                const result = this.parseHL7(hl7Message);
                
                // Automatically push to Patient Timeline
                await this.pushToTimeline(result);
            });
        });

        server.listen(port, '0.0.0.0');
    },

    parseHL7(msg) {
        // Simplified Logic: Extracting Patient ID and Value
        const segments = msg.split('\r');
        const obx = segments.find(s => s.startsWith('OBX'));
        const pid = segments.find(s => s.startsWith('PID'));
        
        return {
            patientId: pid.split('|')[3],
            testName: obx.split('|')[3],
            value: obx.split('|')[5],
            unit: obx.split('|')[6]
        };
    }
};
