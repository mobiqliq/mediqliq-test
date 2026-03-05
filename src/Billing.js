import { logAudit } from '../utils/audit';
await logAudit(
  'REFUND_INVOICE',
  'BILLING',
  invoiceId,
  'Invoice refunded'
);
await logAudit(
  'VOID_INVOICE',
  'BILLING',
  invoiceId,
  'Invoice voided'
);
