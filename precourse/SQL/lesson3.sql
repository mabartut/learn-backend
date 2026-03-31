CREATE TABLE users (
	id serial PRIMARY KEY,
	username VARCHAR(100) NOT NULL UNIQUE,
	email VARCHAR(100) UNIQUE,
	age BIGINT,
	created_at TIMESTAMP,
	phone VARCHAR(20) DEFAULT NULL,
	is_banned BOOLEAN NOT NULL DEFAULT FALSE
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

SELECT
	*
FROM
	users;

SELECT
	username,
	email
FROM
	users;

SELECT
	id,
	username,
	email,
	age
FROM
	users
WHERE
	username='sveta';

SELECT
	*
FROM
	users;

SELECT
	id,
	username,
	email,
	age,
	is_banned
FROM
	users
WHERE
	age BETWEEN 25 AND 30;

SELECT
	id,
	username,
	email,
	age,
	is_banned
FROM
	users
WHERE
	NOT age<30;

SELECT
	id,
	username,
	email,
	age,
	is_banned
FROM
	users
WHERE
	username LIKE 'a___'
	AND age>27;

SELECT
	id,
	username,
	email,
	age,
	is_banned
FROM
	users
WHERE
	email NOT LIKE '%gmail.com';

SELECT
	id,
	username,
	phone
FROM
	users
WHERE
	phone IS NOT NULL;

SELECT
	id,
	username,
	email
FROM
	users
WHERE
	username NOT IN ('anna', 'sveta', 'ivan');

SELECT
	username,
	age,
	is_banned
FROM
	users
WHERE
	is_banned=FALSE
ORDER BY
	username DESC;

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

SELECT
	id,
	username,
	age,
	is_banned
FROM
	users
ORDER BY
	id
LIMIT
	3
OFFSET
	3;