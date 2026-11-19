-- Staging only. A request is a preference, not a confirmed service.
ALTER TABLE portal_customers ADD COLUMN support_request TEXT NOT NULL DEFAULT 'none' CHECK(support_request IN ('none','wheelchair','assistance','both'));
ALTER TABLE portal_travellers ADD COLUMN support_request TEXT NOT NULL DEFAULT 'none' CHECK(support_request IN ('none','wheelchair','assistance','both'));
