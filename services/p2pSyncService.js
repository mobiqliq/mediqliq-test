const axios = require('axios');
const os = require('os');

const p2pSyncService = {
    /**
     * Requirement: Sync with other laptops on the same WiFi
     */
    async findPeersAndSync() {
        const localSubnet = '192.168.1'; // Example subnet
        console.log("🔍 Scanning Local Network for Mediqliq Peers...");

        for (let i = 1; i < 255; i++) {
            const peerIp = `${localSubnet}.${i}`;
            try {
                // Heartbeat check to see if another Mediqliq instance is alive
                const response = await axios.get(`http://${peerIp}:5001/heartbeat`, { timeout: 200 });
                if (response.data.status === 'ALIVE') {
                    console.log(`🤝 Peer found at ${peerIp}. Exchanging Deltas...`);
                    await this.exchangeData(peerIp);
                }
            } catch (err) { /* No peer at this IP */ }
        }
    },

    async exchangeData(peerIp) {
        const lastSync = await db.get('last_p2p_sync_timestamp');
        const localChanges = await db.query('SELECT * FROM audit_logs WHERE created_at > $1', [lastSync]);
        
        // Push local updates to the Peer
        await axios.post(`http://${peerIp}:5001/sync-push`, { data: localChanges.rows });
    }
};
module.exports = p2pSyncService;
