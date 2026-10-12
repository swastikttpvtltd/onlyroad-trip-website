-- Staging only. Existing travellers remain adults; no identity is required.
ALTER TABLE portal_customers ADD COLUMN identity_type TEXT;
ALTER TABLE portal_customers ADD COLUMN identity_mask TEXT;
ALTER TABLE portal_customers ADD COLUMN identity_ciphertext TEXT;
ALTER TABLE portal_travellers ADD COLUMN category TEXT NOT NULL DEFAULT 'adult' CHECK(category IN ('adult','child','infant'));
ALTER TABLE portal_travellers ADD COLUMN identity_type TEXT;
ALTER TABLE portal_travellers ADD COLUMN identity_mask TEXT;
ALTER TABLE portal_travellers ADD COLUMN identity_ciphertext TEXT;
