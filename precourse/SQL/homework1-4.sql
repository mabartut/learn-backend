-- Домашка 1 ⬇️
-- 1. Создать таблицу time_portals (временные порталы).
CREATE TABLE time_portals (id serial PRIMARY KEY, location TEXT, era TEXT, is_operational BOOLEAN, created_at TIMESTAMP);

-- 2. Проверить, что таблица создалась и соответствует требованиям, приведенным выше.
SELECT
	*
FROM
	time_portals;

-- 3. Удалить таблицу time_portals (временные порталы).
DROP TABLE time_portals;

-- ====================================================================================================================
-- Домашка 2 ⬇️
-- 1. Использовать таблицу time_portals из предыдущего тз или создать таблицу, если ее нет
CREATE TABLE time_portals (id serial PRIMARY KEY, location TEXT, era TEXT, is_operational BOOLEAN, created_at TIMESTAMP);

-- 2. Проверить, что таблица создалась и соответствует требованиям, приведенным выше.
SELECT
	*
FROM
	time_portals;

-- 3. Добавить новый столбец security_level типа INT (уровень безопасности портала).
ALTER TABLE time_portals
ADD COLUMN security_level INT;

-- 4. Переименовать столбец is_operational в is_active.
ALTER TABLE time_portals
RENAME COLUMN is_operational TO is_active;

-- 5. Изменить тип столбца location на VARCHAR(200).
ALTER TABLE time_portals
ALTER COLUMN location type VARCHAR(200);

-- 6. Добавить 3 записи в таблицу:
-- Порталы:
-- "Пещера горного духа" → эпоха "Мезозой", уровень безопасности 5
-- "Зеркало в спальне" → эпоха "Викторианская Англия", уровень безопасности 3 (не работает)
-- "Подвал старого дома" → эпоха "СССР, 1985 год", уровень безопасности 7
INSERT INTO
	time_portals (location, era, security_level)
VALUES
	('Пещера горного духа', 'Мезозой', 5),
	('Зеркало в спальне', 'Викторианская Англия', 3),
	('Подвал старого дома', 'СССР, 1985 год', 7);

-- 7. Обновить данные:
-- Для портала "Зеркало в спальне" установите is_active = true.
UPDATE time_portals
SET
	is_active=TRUE
WHERE
	location='Зеркало в спальне';

-- Увеличьте уровень безопасности всех порталов на 2.
UPDATE time_portals
SET
	security_level=security_level+2;

-- Для всех порталов с уровнем безопасности < 5 установите эпоху "Каменный век".
UPDATE time_portals
SET
	era='Каменный век'
WHERE
	security_level<5;

-- 8. Удалить все порталы, которые:
-- Ведут в эпоху "Каменный век" ИЛИ неактивны (is_active = false)
DELETE FROM time_portals
WHERE
	era='Каменный век'
	OR is_active=FALSE;

-- 9. Полностью очистить таблицу time_portals
TRUNCATE TABLE time_portals restart identity;

-- ====================================================================================================================
-- Домашка 3 ⬇️
-- 1. Использовать таблицу time_portals из предыдущего тз или создать таблицу, если ее нет
-- Поля:
-- id - идентификатор записи в таблице
-- location - это строка, обозначающая, где находится портал(например, "Старый дуб в парке")
-- era - это строка, обозначающая в какую эпоху ведёт ("Древний Рим", "3024 год")
-- is_active - булево значение, обозначающее можно ли пройти через портал?
-- security_level - число, обозначающее уровень безопасности портала
-- created_at - дата создания портала
CREATE TABLE time_portals (
	id serial PRIMARY KEY,
	location TEXT,
	era TEXT,
	is_active BOOLEAN,
	security_level INT,
	created_at TIMESTAMP
);

-- 2. Проверить, что таблица создалась и соответствует требованиям, приведенным выше.
SELECT
	*
FROM
	time_portals;

-- 3. Добавить записи в таблицу:
-- ('Старый дуб в парке', 'Эпоха динозавров', TRUE, 7),
-- ('Зеркало в заброшенном доме', '1920-е годы', TRUE, 3),
-- ('Лужа у подъезда №7', '3024 год', FALSE, 9),
-- ('Камин в библиотеке', 'Древний Египет', TRUE, 5),
-- ('Лифт в бизнес-центре', 'Параллельная Москва', TRUE, 6),
-- ('Грот на озере', 'Атлантида', TRUE, 2),
-- ('Старый телевизор', '1984 год', TRUE, 1),
-- ('Туннель метро между станциями', 'Пост-апокалипсис 2150', FALSE, 8),
-- ('Фонтан на площади', 'Римская империя', TRUE, 6),
-- ('Чердак бабушкиного дома', 'Детство', FALSE, 3),
-- ('Разбитый телефон-бокс', 'Викторианская Англия', TRUE, 7),
-- ('Пещера в горах', 'Каменный век', TRUE, 5),
-- ('Задняя дверь кинотеатра', 'Золотой век Голливуда', TRUE, 9),
-- ('Заброшенная лодка', 'Эпоха великих географических открытий', FALSE, 2),
-- ('Секретный бункер', 'Холодная война 1962', FALSE, 3);
INSERT INTO
	time_portals (location, era, is_active, security_level)
VALUES
	('Старый дуб в парке', 'Эпоха динозавров', TRUE, 7),
	('Зеркало в заброшенном доме', '1920-е годы', TRUE, 3),
	('Лужа у подъезда №7', '3024 год', FALSE, 9),
	('Камин в библиотеке', 'Древний Египет', TRUE, 5),
	('Лифт в бизнес-центре', 'Параллельная Москва', TRUE, 6),
	('Грот на озере', 'Атлантида', TRUE, 2),
	('Старый телевизор', '1984 год', TRUE, 1),
	('Туннель метро между станциями', 'Пост-апокалипсис 2150', FALSE, 8),
	('Фонтан на площади', 'Римская империя', TRUE, 6),
	('Чердак бабушкиного дома', 'Детство', FALSE, 3),
	('Разбитый телефон-бокс', 'Викторианская Англия', TRUE, 7),
	('Пещера в горах', 'Каменный век', TRUE, 5),
	('Задняя дверь кинотеатра', 'Золотой век Голливуда', TRUE, 9),
	('Заброшенная лодка', 'Эпоха великих географических открытий', FALSE, 2),
	('Секретный бункер', 'Холодная война 1962', FALSE, 3);

-- 4. Вывести все данные о порталах
SELECT
	*
FROM
	time_portals;

-- 5. Показать только местоположение и эпоху порталов
SELECT
	location,
	era
FROM
	time_portals;

-- 6. Вывести ID и уровень безопасности дляактивных порталов
SELECT
	id,
	security_level
FROM
	time_portals
WHERE
	is_active;

-- 7. Найти порталы с уровнем безопасности ≥ 6
SELECT
	*
FROM
	time_portals
WHERE
	security_level>=6;

-- 8. Найти неактивные порталы
SELECT
	*
FROM
	time_portals
WHERE
	NOT is_active;

-- 9. Найти активные порталы с уровнем безопасности < 5
SELECT
	*
FROM
	time_portals
WHERE
	is_active
	AND security_level<5;

-- 10. Найти порталы, содержащие "Старый" в названии ИЛИ с уровнем безопасности = 2
SELECT
	*
FROM
	time_portals
WHERE
	location LIKE '%Старый%'
	OR security_level=2;

-- 11. Найти порталы с уровнем безопасности между 4 и 7 (включительно)
SELECT
	*
FROM
	time_portals
WHERE
	security_level BETWEEN 4 AND 7;

-- 12. Отсортировать порталы по уровню безопасности (от высокого к низкому)
SELECT
	*
FROM
	time_portals
ORDER BY
	security_level DESC;

-- 13. Отсортировать по названию локации (А-Я), затем по эпохе (Я-А)
SELECT
	*
FROM
	time_portals
ORDER BY
	location,
	era DESC;

-- 14. Вывести 3 самых безопасных активных портала
SELECT
	*
FROM
	time_portals
WHERE
	is_active
ORDER BY
	security_level DESC
LIMIT
	3;

-- 15. Найти порталы (одним запросом), которые:
-- Активны-- Содержат "а" в названии локации
-- Отсортировать по уровню безопасности (по возрастанию)
-- Показать записи 2-ой страницы - 4 записи
SELECT
	*
FROM
	time_portals
WHERE
	is_active
	AND location LIKE '%а%'
ORDER BY
	security_level
LIMIT
	4
OFFSET
	4;

-- ====================================================================================================================
-- Домашка 4 ⬇️
-- 1. Использовать таблицу time_portals из предыдущего тз или создать таблицу, если ее нет
CREATE TABLE time_portals (
	id serial PRIMARY KEY,
	location TEXT,
	era TEXT,
	is_active BOOLEAN,
	security_level INT,
	created_at TIMESTAMP
);

-- и заполнить ее, если не была заполнена на предыдущем уровне:
INSERT INTO
	time_portals (location, era, is_active, security_level)
VALUES
	('Старый дуб в парке', 'Эпоха динозавров', TRUE, 7),
	('Зеркало в заброшенном доме', '1920-е годы', TRUE, 3),
	('Лужа у подъезда №7', '3024 год', FALSE, 9),
	('Камин в библиотеке', 'Древний Египет', TRUE, 5),
	('Лифт в бизнес-центре', 'Параллельная Москва', TRUE, 6),
	('Грот на озере', 'Атлантида', TRUE, 2),
	('Старый телевизор', '1984 год', TRUE, 1),
	('Туннель метро между станциями', 'Пост-апокалипсис 2150', FALSE, 8),
	('Фонтан на площади', 'Римская империя', TRUE, 6),
	('Чердак бабушкиного дома', 'Детство', FALSE, 3),
	('Разбитый телефон-бокс', 'Викторианская Англия', TRUE, 7),
	('Пещера в горах', 'Каменный век', TRUE, 5),
	('Задняя дверь кинотеатра', 'Золотой век Голливуда', TRUE, 9),
	('Заброшенная лодка', 'Эпоха великих географических открытий', FALSE, 2),
	('Секретный бункер', 'Холодная война 1962', FALSE, 3);

-- 2. Создать таблицу portal_keepers
-- Поля:
-- portal_id - идентификатор записи в таблице time_portals
-- name - имя хранителя
-- secret_word - слово для активации портала
CREATE TABLE portal_keepers (
	portal_id INT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	secret_word VARCHAR(50) NOT NULL,
	FOREIGN key (portal_id) REFERENCES time_portals (id)
);

-- и заполнить ее:
INSERT INTO
	portal_keepers (portal_id, name, secret_word)
VALUES
	(1, 'Элрик Белый', 'Лунный свет'),
	(2, 'Мадам Ленуар', 'Отражение'),
	(4, 'Жрец Анубис', 'Песок времени'),
	(5, 'Инженер Петров', 'Квант'),
	(6, 'Нептун', 'Трезубец'),
	(7, 'Старый телевизионщик', 'Снег'),
	(9, 'Сенатор Марк', 'SPQR'),
	(11, 'Шерлок Холмс', 'Элементарно'),
	(12, 'Шаман Уг-Лак', 'Огонь'),
	(13, 'Мэрилин Монро', 'Бриллианты');

-- 3. Создать таблицу parallel_worlds
-- Поля:
-- id - идентификатор записи в таблице
-- portal_id - идентификатор записи в таблице time_portals, может быть NULL
-- name - имя параллельного мира
-- physics_rules - особенности физики ("Гравитация обратная")
CREATE TABLE parallel_worlds (
	id serial PRIMARY KEY,
	portal_id INT NULL,
	name VARCHAR(100),
	physics_rules VARCHAR(100),
	FOREIGN key (portal_id) REFERENCES time_portals (id)
);

-- и заполнить ее:
INSERT INTO
	parallel_worlds (portal_id, name, physics_rules)
VALUES
	(2, 'Зеркальный', 'Все объекты имеют двойников'),
	(5, 'Техномагический', 'Магия работает как код'),
	(8, 'Антиматерия', 'Частицы с обратным зарядом'),
	(8, 'Стеклянный', 'Все предметы прозрачные'),
	(9, 'Бесконечная библиотека', 'Книги появляются по желанию'),
	(11, 'Мир-калейдоскоп', 'Реальность меняется каждые 7 минут'),
	(12, 'Пустошь', 'Нет законов физики'),
	(13, 'Цифровой рай', 'Все состоит из кода'),
	(13, 'Мир сновидений', 'Законы определяются подсознанием');

-- 4. Создать таблицу anomalies
-- Поля:
-- id - идентификатор записи в таблице
-- portal_id - идентификатор записи в таблице time_portals, может быть NULL
-- description - описание, например: "Вызывает дежавю"
-- danger_level - уровень опасности (1-10)
CREATE TABLE anomalies (
	id serial PRIMARY KEY,
	portal_id INT NULL,
	description VARCHAR(200),
	danger_level INT,
	FOREIGN key (portal_id) REFERENCES time_portals (id)
);

-- и заполнить ее:
INSERT INTO
	anomalies (portal_id, description, danger_level)
VALUES
	(2, 'Вызывает дежавю у проходящих', 3),
	(5, 'Иногда исчезает на 13 минут', 7),
	(1, 'Притягивает молнии', 9),
	(3, 'Излучает радиацию', 8),
	(NULL, 'Меняет цвет воды', 2),
	(8, 'Создает голографические проекции', 4),
	(NULL, 'Изменяет акцент у проходящих', 1),
	(14, 'Генерирует статические разряды', 5);

-- 5. Проверить, соответствуют все таблицы требованиям, приведенным выше.
-- -- --клик пкм по бд "my_precourse"->"ERD For Database" или SELECT * FROM имя_таблицы;
-- 6. Найти все порталы(id и location) и их хранителей(только имя) как keeper (даже если хранителя нет)
SELECT
	tp.id,
	tp.location,
	pk.name AS keeper
FROM
	time_portals tp
	LEFT JOIN portal_keepers pk ON tp.id=pk.portal_id;

-- 7. Найти все порталы и их параллельные миры
SELECT
	tp.location,
	pw.name
FROM
	time_portals tp
	LEFT JOIN parallel_worlds pw ON tp.id=pw.portal_id;

-- 8. Найти только порталы(id и location) с аномалиями и уровень их опасности(description, danger_level)
SELECT
	tp.id,
	tp.location,
	a.description,
	a.danger_level
FROM
	time_portals tp
	JOIN anomalies a ON tp.id=a.portal_id;

-- 9. Найти все аномалии(id и description) и все порталы(location)
SELECT
	a.id,
	a.description,
	tp.location
FROM
	anomalies a
	FULL JOIN time_portals tp ON tp.id=a.portal_id;