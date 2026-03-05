-- Ensure no Admission exists without an active Folio
ALTER TABLE ipd_admissions ADD CONSTRAINT fk_folio_mandatory 
FOREIGN KEY (folio_id) REFERENCES ipd_folios(id) ON DELETE RESTRICT;

-- Ensure every Outward Referral has a valid Partner ID
ALTER TABLE outward_referrals ADD CONSTRAINT fk_partner_mandatory 
FOREIGN KEY (partner_id) REFERENCES external_partners(id);
