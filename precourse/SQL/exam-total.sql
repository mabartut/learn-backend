-- exam SQL total
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name TEXT
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT,
  author_id INTEGER,
  FOREIGN key (author_id) REFERENCES authors (id)
);



INSERT INTO authors (name) VALUES
('Leo Tolstoy'),
('Fyodor Dostoevsky');

INSERT INTO books (title, author_id) VALUES
('War and Peace', 1),
('Anna Karenina', 1),
('Crime and Punishment', 2);

DELETE FROM authors WHERE id = 1;

drop table books;








-- ================================
CREATE TABLE users (
id SERIAL PRIMARY KEY,
name TEXT
);

CREATE TABLE wallets (
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
currency TEXT,
status TEXT
);

INSERT INTO users (name) VALUES
('Alice'),
('Bob'),
('Charlie');

INSERT INTO wallets (user_id, currency, status) VALUES
(1, 'USD', 'active'),
(1, 'BYN', 'active'),
(2, 'EUR', 'inactive');

SELECT users.name, wallets.currency, wallets.status
FROM users
LEFT JOIN wallets ON users.id = wallets.user_id;

DELETE FROM time_portals
WHERE
	era='Каменный век'
	OR is_active=FALSE;

DELETE FROM orders WHERE status='canceled';

LIMIT
	4
OFFSET
	4;



-- 4Вопрос:

-- Можно ли откатить TRUNCATE? (Для большинства БД)

-- Ответ одним словом: да / нет


-- Твой ответ:
-- да

-- 5Вопрос:

-- Подставь такое условие, которое выберет пользователей с id 1, 3 и 7.

-- В качестве ответа дай пропущеный фрагмент.



-- SELECT * FROM users 
-- WHERE xxx;
-- Твой ответ:
-- id=1 OR id=3 OR id=7



-- 6Вопрос:

-- Что быстрее выполняется: DELETE FROM table или TRUNCATE table, если нужно удалить все строки без условий?

-- Ответ одним словом: DELETE / TRUNCATE

-- Твой ответ:
-- DELETE	
