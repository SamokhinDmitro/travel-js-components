-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Авг 23 2019 г., 13:16
-- Версия сервера: 5.7.25
-- Версия PHP: 7.1.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `bd_petrichenko`
--

-- --------------------------------------------------------

--
-- Структура таблицы `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `exp` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `photos`
--

INSERT INTO `photos` (`id`, `path`, `exp`) VALUES
(1, 'yoga', 'jpg'),
(2, 'sunset', 'jpg'),
(3, 'sunrise', 'jpg'),
(4, 'massage', 'jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `tabs`
--

CREATE TABLE `tabs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `photo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tabs`
--

INSERT INTO `tabs` (`id`, `title`, `subtitle`, `text`, `photo_id`) VALUES
(1, 'Лечение', 'Здоровый позвоночник', 'Йога, массажи и плавание в море - помогут уставшей спине! Индийские йоги считали, что здоровье человека можно определить по тому, насколько здоров и гибок у него позвоночник.\r\nИнтересно, что бы древние йоги сказали, глядя на современного человека, который уже со школьного возраста мучается болями в спине, работает подолгу в неудобных сидячих позах и не умеет расслабляться, имеет искривление, которое в итоге приведет к болезням других органов? Йоги сказали бы – займись собой и срочно!', 4),
(2, 'Отдых', 'Антистресс', 'Аюрведа и йога утверждают, что главным источником здоровья нашего организма является здоровый ум. Программа «Антистресс» сначала убирает последствия стресса на физическом уровне, потом помогает избавиться от негативных и навязчивых мыслей, затем повышает общий уровень энергии.\r\nВы наконец вспомните ощущение \"свободной головы\", ощутите прилив физических сил и вспомните, что такое счастье.', 2),
(3, 'Природа', 'Восстановление', 'Стрессы, жизнь в условиях города, плохая экология, загрязненные продукты и вода, напряженный ритм жизни - все это день ото дня отбирает у нас молодость и хорошее здоровье.\r\nОдним кремом для лица не решить проблему омоложения организма, когда тебе за 40. Согласны?', 3),
(4, 'Йога', 'Йога и аюрведа', 'Несколько лет назад мы разработали специальные программы по йоге и аюрведе - и мы поняли, что они отлично работают - на опыте 530 наших туристов! В каждой из этих программ есть одна цель, на достижение которой будут направлены и асаны, и дыхательные практики, и медитации, и аюрведические процедуры, будут читаться лекции по этой теме. \r\nЙога и аюрведа - два сильных война, которые сообща будут бороться с проблемами и болезнями.', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `usersinfo`
--

CREATE TABLE `usersinfo` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contacts` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `usersinfo`
--

INSERT INTO `usersinfo` (`id`, `email`, `contacts`) VALUES
(2, 'eee@rr.rty', '2345'),
(3, 'test@test.rt', '2134567');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tabs`
--
ALTER TABLE `tabs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `photos_fk` (`photo_id`);

--
-- Индексы таблицы `usersinfo`
--
ALTER TABLE `usersinfo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `tabs`
--
ALTER TABLE `tabs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `usersinfo`
--
ALTER TABLE `usersinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `tabs`
--
ALTER TABLE `tabs`
  ADD CONSTRAINT `photos_fk` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
