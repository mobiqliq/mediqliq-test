import { logAudit } from '../utils/audit';
await logAudit(
  'SELL_MEDICINE',
  'PHARMACY',
  invoiceId,
  medicine.name + ' x ' + sale.quantity
);
