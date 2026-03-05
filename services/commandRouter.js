const commandRouter = {
    handleAction(item, userRole) {
        // Double-check permission before navigation
        if (!item.roles.includes(userRole)) {
            return { error: "Access Denied: Security Violation Logged." };
        }

        switch(item.type) {
            case 'PATIENT': return `/clinical/timeline/${item.id}`;
            case 'MEDICINE': return `/pharmacy/inventory/${item.id}`;
            case 'FINANCE': return `/admin/revenue`;
            default: return '/dashboard';
        }
    }
};
module.exports = commandRouter;
