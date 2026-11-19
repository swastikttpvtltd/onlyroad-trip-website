-- Apply ONLY to a new staging D1 database. Never run against production automatically.
PRAGMA foreign_keys = ON;
CREATE TABLE portal_customers (id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, name TEXT NOT NULL DEFAULT '', phone TEXT NOT NULL DEFAULT '', role TEXT NOT NULL DEFAULT 'customer' CHECK(role IN ('customer','admin')), created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE portal_sessions (token_hash TEXT PRIMARY KEY, customer_id TEXT NOT NULL REFERENCES portal_customers(id), expires_at INTEGER NOT NULL);
CREATE TABLE portal_challenges (id TEXT PRIMARY KEY, email TEXT NOT NULL, code_hash TEXT NOT NULL, expires_at INTEGER NOT NULL, attempts INTEGER NOT NULL DEFAULT 0, consumed INTEGER NOT NULL DEFAULT 0);
CREATE TABLE portal_rate_limits (bucket TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at INTEGER NOT NULL);
CREATE TABLE portal_travellers (id TEXT PRIMARY KEY, customer_id TEXT NOT NULL REFERENCES portal_customers(id), name TEXT NOT NULL, relation TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE portal_policies (version TEXT PRIMARY KEY, approved INTEGER NOT NULL DEFAULT 0 CHECK(approved IN (0,1)), snapshot_json TEXT NOT NULL, source_url TEXT NOT NULL, approved_at TEXT);
CREATE TABLE portal_bookings (id TEXT PRIMARY KEY, customer_id TEXT NOT NULL REFERENCES portal_customers(id), title TEXT NOT NULL, departure TEXT NOT NULL, return_date TEXT NOT NULL, status TEXT NOT NULL, total_paise INTEGER NOT NULL CHECK(total_paise >= 0), paid_paise INTEGER NOT NULL CHECK(paid_paise >= 0 AND paid_paise <= total_paise), supplier_paise INTEGER CHECK(supplier_paise >= 0), policy_version TEXT REFERENCES portal_policies(version));
CREATE TABLE portal_payments (id TEXT PRIMARY KEY, booking_id TEXT NOT NULL REFERENCES portal_bookings(id), gateway_order_id TEXT UNIQUE, gateway_payment_id TEXT UNIQUE, amount_paise INTEGER NOT NULL, status TEXT NOT NULL, verified_at TEXT);
CREATE TABLE portal_documents (id TEXT PRIMARY KEY, booking_id TEXT NOT NULL REFERENCES portal_bookings(id), name TEXT NOT NULL, kind TEXT NOT NULL, object_key TEXT NOT NULL, content_type TEXT NOT NULL, released_at TEXT);
CREATE TABLE portal_cancellations (id TEXT PRIMARY KEY, booking_id TEXT UNIQUE NOT NULL REFERENCES portal_bookings(id), customer_id TEXT NOT NULL REFERENCES portal_customers(id), reason TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'requested' CHECK(status IN ('requested','acknowledged','approved','rejected')), requested_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, acknowledged_at TEXT, quote_json TEXT, reviewed_by TEXT REFERENCES portal_customers(id), review_note TEXT, reviewed_at TEXT);
CREATE TABLE portal_audit (id TEXT PRIMARY KEY, actor_id TEXT NOT NULL, action TEXT NOT NULL, resource_id TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE INDEX portal_booking_owner ON portal_bookings(customer_id);
CREATE INDEX portal_traveller_owner ON portal_travellers(customer_id);
CREATE INDEX portal_session_expiry ON portal_sessions(expires_at);
-- Approved policy snapshots are immutable: create a new version for revisions.
CREATE TRIGGER portal_policy_immutable_update BEFORE UPDATE ON portal_policies WHEN OLD.approved=1 BEGIN SELECT RAISE(ABORT,'Approved policy snapshots are immutable'); END;
CREATE TRIGGER portal_policy_immutable_delete BEFORE DELETE ON portal_policies WHEN OLD.approved=1 BEGIN SELECT RAISE(ABORT,'Approved policy snapshots are immutable'); END;
CREATE TRIGGER portal_booking_policy_immutable BEFORE UPDATE OF policy_version ON portal_bookings WHEN OLD.policy_version IS NOT NULL AND OLD.policy_version IS NOT NEW.policy_version BEGIN SELECT RAISE(ABORT,'Booking policy snapshot cannot be replaced'); END;
