CREATE TABLE users (
	id serial PRIMARY KEY,
	username VARCHAR(100) NOT NULL UNIQUE,
	email VARCHAR(100) UNIQUE,
	age BIGINT,
	created_at TIMESTAMP,
	phone VARCHAR(20) DEFAULT NULL,
	is_banned BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE profiles (
	user_id INT PRIMARY KEY,
	avatar_url VARCHAR(255),
	bio TEXT,
	city VARCHAR(100),
	FOREIGN key (user_id) REFERENCES users (id) --вот тут и формируется ссылка на таблицу users - FOREIGN KEY
);

-- CREATE TABLE profiles (
-- 	id serial PRIMARY KEY,
-- 	avatar_url VARCHAR(255),
-- 	bio TEXT,
-- 	city VARCHAR(100),
-- 	user_id INTEGER NOT NULL UNIQUE,
-- 	CONSTRAINT fk_profiles_users FOREIGN key (user_id) REFERENCES users (id)
-- );
DROP TABLE users;

DROP TABLE profiles;

DROP TABLE contacts;

DROP TABLE lottery_tickets;

CREATE TABLE contacts (
	id serial PRIMARY KEY,
	user_id INT,
	platform VARCHAR(50) NOT NULL,
	value VARCHAR(255) NOT NULL,
	FOREIGN key (user_id) REFERENCES users (id)
);

CREATE TABLE lottery_tickets (
	ticket_id serial PRIMARY KEY,
	ticket_number VARCHAR(20) NOT NULL UNIQUE,
	price DECIMAL(10, 2) DEFAULT 5.00,
	draw_date date NOT NULL,
	user_id INT NULL, -- Может быть пустым (nullable)
	FOREIGN key (user_id) REFERENCES users (id) -- Связь с таблицей users
);

INSERT INTO
	users (username, email, age, created_at, phone, is_banned)
VALUES
	('anna', 'anna@example.com', 25, NOW(), '+375291234567', FALSE),
	('boris', 'boris@mail.ru', 32, NOW()+INTERVAL '10 minutes', NULL, TRUE),
	('sveta', 'sveta@gmail.com', 19, NOW()+INTERVAL '20 minutes', '+375336543210', FALSE),
	('dmitry', 'dmitry@yandex.ru', 41, NOW()+INTERVAL '30 minutes', '+375257894561', FALSE),
	('olga', 'olga@example.com', 28, NOW()+INTERVAL '40 minutes', NULL, FALSE),
	('ivan', 'ivan@mail.ru', 22, NOW()+INTERVAL '50 minutes', '+375296789123', FALSE),
	('maria', 'maria@gmail.com', 35, NOW()+INTERVAL '60 minutes', '+375447654321', FALSE),
	('alex', 'alex@yandex.ru', 30, NOW()+INTERVAL '70 minutes', NULL, TRUE);

INSERT INTO
	profiles (user_id, avatar_url, bio, city)
VALUES
	(1, 'anna.jpg', 'Hello, I''m Anna', 'Hlybokaye'),
	(3, 'sveta.png', 'Hi, it''s Sveta', 'Byerazino'),
	(5, 'olga.jpeg', 'Olga here', 'Zhabinka'),
	(7, 'maria.jpg', 'Maria''s bio', 'Krychaw');

INSERT INTO
	contacts (user_id, platform, value)
VALUES
	(1, 'telegram', '@anna_dev'),
	(1, 'github', 'github.com/annacoder'),
	(2, 'twitter', '@boris_tech'),
	(4, 'linkedin', 'linkedin.com/in/dmitry'),
	(4, 'vk', 'vk.com/dmitry'),
	(7, 'telegram', '@maria_official'),
	(8, 'twitter', '@alex_ceo');

INSERT INTO
	lottery_tickets (ticket_number, draw_date, user_id)
VALUES
	('LT-0001', '2025-12-01', 1),
	('LT-0002', '2025-12-01', NULL),
	('LT-0003', '2025-12-01', 3),
	('LT-0004', '2025-12-08', 5),
	('LT-0005', '2025-12-08', NULL),
	('LT-0006', '2025-12-15', 6),
	('LT-0007', '2025-12-15', 6),
	('LT-0008', '2025-12-22', 7),
	('LT-0009', '2025-12-22', NULL),
	('LT-0010', '2025-12-29', 8);

SELECT
	*
FROM
	users;

SELECT
	*
FROM
	contacts;

SELECT
	*
FROM
	profiles;

SELECT
	*
FROM
	lottery_tickets;

SELECT
	u.username,
	p.city
FROM
	users u
	LEFT JOIN profiles p ON u.id=p.user_id
ORDER BY
	u.username;

SELECT
	u.username,
	c.platform,
	c.value
FROM
	contacts c
	LEFT JOIN users u ON u.id=c.user_id
ORDER BY
	u.username;

SELECT
	u.username,
	c.platform,
	c.value
FROM
	users u
	LEFT JOIN contacts c ON u.id=c.user_id
ORDER BY
	u.username;

SELECT
	u.username,
	lt.ticket_number
FROM
	users u
	LEFT JOIN lottery_tickets lt ON u.id=lt.user_id
ORDER BY
	u.username;

SELECT
	u.username,
	c.platform,
	c.value
FROM
	users u
	RIGHT JOIN contacts c ON u.id=c.user_id
ORDER BY
	u.username;

SELECT
	u.username,
	c.platform,
	c.value
FROM
	contacts c
	RIGHT JOIN users u ON u.id=c.user_id
ORDER BY
	u.username;

SELECT
	u.username,
	p.city
FROM
	users u
	RIGHT JOIN profiles p ON u.id=p.user_id
ORDER BY
	u.username;

SELECT
	u.username,
	p.city
FROM
	profiles p
	RIGHT JOIN users u ON u.id=p.user_id
ORDER BY
	u.username;

SELECT
	u.username,
	lt.ticket_number
FROM
	lottery_tickets lt
	RIGHT JOIN users u ON u.id=lt.user_id
ORDER BY
	u.username;

SELECT
	u.username,
	lt.ticket_number
FROM
	RIGHT JOIN lottery_tickets ltusers u ON u.id=lt.user_id
ORDER BY
	u.username;

SELECT
	u.username,
	lt.ticket_number
FROM
	users u
	FULL JOIN lottery_tickets lt ON u.id=lt.user_id;

SELECT
	u.username,
	lt.ticket_number
FROM
	lottery_tickets lt
	FULL JOIN users u ON u.id=lt.user_id;

SELECT
	u.username,
	c.platform,
	c.value
FROM
	users u
	FULL JOIN contacts c ON u.id=c.user_id
ORDER BY
	u.username;

SELECT
	u.username,
	c.platform,
	c.value
FROM
	contacts c
	FULL JOIN users u ON u.id=c.user_id
ORDER BY
	u.username;

SELECT
	u.username,
	p.city
FROM
	users u
	FULL JOIN profiles p ON u.id=p.user_id
ORDER BY
	u.username;

SELECT
	u.username,
	p.city
FROM
	profiles p
	FULL JOIN users u ON u.id=p.user_id
ORDER BY
	u.username;

SELECT
	u.username,
	lt.ticket_number
FROM
	lottery_tickets lt
	JOIN users u ON u.id=lt.user_id;

SELECT
	u.username,
	lt.ticket_number
FROM
	users u
	JOIN lottery_tickets lt ON u.id=lt.user_id;

SELECT
	u.username,
	c.platform,
	c.value
FROM
	contacts c
	JOIN users u ON u.id=c.user_id;

SELECT
	u.username,
	c.platform,
	c.value
FROM
	users u
	JOIN contacts c ON u.id=c.user_id;

SELECT
	u.username,
	p.city
FROM
	users u
	JOIN profiles p ON u.id=p.user_id;

SELECT
	u.username,
	p.city
FROM
	profiles p
	JOIN users u ON u.id=p.user_id;