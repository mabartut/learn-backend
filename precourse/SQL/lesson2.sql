CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(100) UNIQUE,
	age INT,
	created_at TIMESTAMP
);


DROP TABLE users;

ALTER TABLE users ADD COLUMN phone VARCHAR(20) DEFAULT NULL;

ALTER TABLE users
	ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT TRUE,
	ADD COLUMN birth_date DATE,
	ADD COLUMN country VARCHAR(50);

ALTER TABLE users DROP COLUMN country;

ALTER TABLE users DROP COLUMN IF EXISTS birth_date;

ALTER TABLE users ALTER COLUMN username TYPE VARCHAR(100);

ALTER TABLE users ALTER COLUMN age TYPE BIGINT;

ALTER TABLE users RENAME COLUMN is_active TO is_banned;

ALTER TABLE users ALTER COLUMN is_banned SET DEFAULT FALSE;

INSERT INTO users (username, email, age, created_at, is_banned)
VALUES ('ivan', 'ivan@example.com', 25, '2023-01-15', false);

INSERT INTO users (username, email, age, created_at)
VALUES ('anna', 'anna@example.com', 30, NOW());

INSERT INTO users (username, email, age, phone, created_at)
VALUES 
('alex', 'alex@example.com', 28, '+37544', NOW()),
('maria', 'maria@example.com', '22', '+37529', NOW());

INSERT INTO users (username, email, is_banned, created_at)
VALUES ('test_user', 'test@example.com', true, NOW());

INSERT INTO users (username, email, age, is_banned, created_at)
VALUES ('test_user2', 'test2@example.com', DEFAULT, true, NOW());

INSERT INTO users (username, email, created_at, is_banned, phone)
VALUES ('demo_user', 'demo@example.com', NOW(), DEFAULT, DEFAULT);

INSERT INTO users (username, created_at, is_banned, phone)
VALUES ('demo_user2', NOW(), DEFAULT, DEFAULT);

UPDATE users
SET age = 222, email = 'newivan@'
WHERE id = 1;

UPDATE users
SET age = 18
WHERE username = 'alex' or username = 'maria';

UPDATE users
SET is_banned = true
WHERE age < 21;

UPDATE users
SET age = age + 1
WHERE age < 100;

UPDATE users
SET age = 30,
is_banned = false
WHERE email LIKE '%example.com' AND created_at < '2026-03-16 22:15:00';

UPDATE users
SET age = 27
WHERE id = 1
RETURNING *;

UPDATE users
SET is_banned = true
WHERE id = 9 or id = 8;

DELETE FROM users
WHERE id = 2
RETURNING *;

DELETE FROM users
WHERE is_banned = true;

TRUNCATE TABLE users RESTART IDENTITY;

SELECT * FROM users;