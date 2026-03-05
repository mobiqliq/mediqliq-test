-- 1. Global Entity Configuration
CREATE TABLE IF NOT EXISTS country_config (
    id SERIAL PRIMARY KEY,
    country_code VARCHAR(5) UNIQUE, -- 'IN', 'US', 'AE', 'UK'
    base_currency VARCHAR(3) DEFAULT 'USD',
    tax_label VARCHAR(20) DEFAULT 'VAT', -- GST, VAT, IVA
    tax_rate DECIMAL(5, 2),
    date_format VARCHAR(20) DEFAULT 'DD/MM/YYYY',
    privacy_standard VARCHAR(20) DEFAULT 'GDPR'
);

-- 2. Multi-Currency Ledger
ALTER TABLE unified_invoices ADD COLUMN IF NOT EXISTS currency_code VARCHAR(3) DEFAULT 'USD';
ALTER TABLE unified_invoices ADD COLUMN IF NOT EXISTS exchange_rate DECIMAL(15, 6) DEFAULT 1.0;
