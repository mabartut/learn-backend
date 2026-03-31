CREATE TABLE IF NOT EXISTS users (

id SERIAL PRIMARY KEY,

username VARCHAR(50) NOT NULL,

email VARCHAR(100) UNIQUE,

age INT,

created_at DATE DEFAULT CURRENT_DATE

);

-- Очисщает таблицу перед вставкой новых данных

TRUNCATE TABLE users RESTART IDENTITY;

-- Добавить тестовые данные

INSERT INTO users (username, email, age, created_at) VALUES

('anna', 'anna@gmail.com', 22, '2023-05-01'),

('alex', 'alex@mail.ru', 35, '2023-05-03'),

('maria', 'maria@yandex.ru', 19, '2023-06-01'),

('ivan', 'ivan@gmail.com', 28, '2023-07-10'),

('olga', 'olga@mail.ru', 45, '2023-08-12'),

('john', 'john@outlook.com', 31, '2023-09-15'),

('kate', 'kate@mail.ru', 25, '2023-10-01'),

('bob', 'bob@gmail.com', 41, '2023-11-20'),

('andrew', 'andrew@mail.ru', 27, '2023-12-05'),

('anastasia', 'anastasia@gmail.com', 18, '2024-01-01'),

('zoya', 'zoya@protonmail.com', 33, '2024-02-14'),

('dmitry', 'dima@mail.ru', 29, '2024-03-20');




select * from users;

SELECT * 
FROM users 
where username = 'anna';