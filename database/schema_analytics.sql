-- 1. Revenue Velocity & Predictive Table
CREATE MATERIALIZED VIEW IF NOT EXISTS revenue_velocity AS
SELECT 
    date_trunc('day', created_at) as day,
    SUM(total_amount) as daily_revenue,
    AVG(SUM(total_amount)) OVER (ORDER BY date_trunc('day', created_at) ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) as moving_avg_7d
FROM unified_invoices
GROUP BY 1;

-- 2. Disease Burden Analytics (Based on ICD-11 codes we've been storing)
CREATE VIEW disease_demographics AS
SELECT 
    icd_code,
    COUNT(*) as case_count,
    AVG(EXTRACT(YEAR FROM age(p.date_of_birth))) as avg_patient_age
FROM prescriptions rx
JOIN patients p ON rx.patient_id = p.id
GROUP BY icd_code;
