# 1. Цель проекта

Цель проекта - разработать систему прослушивания музыки для рядовых пользователей.
Пользователи смогут прослушивать в системе разные по жанру песни, добавлять их в избранные,
а так же подписываться на любимых авторов песен.

# 2. Описание системы

Система состоит из следующих функциональных блоков:

- Регистрация, аунтефикация и авторизация
- Функции для пользователей
- Функции доната создателю
- Функции интеграции для Telegram

## 2.1 Типы пользователей

Система будет предусматривать два типа пользователей системы: гость, пользователь и администратор.
Гость сможет прослушивать и скачивать любую песню на сайте или в боте телеграмм.
Пользователь сможет пользоваться теми же функциями, что и гость, но с учетом добавления любимых песен в избранное.
Администратору будет доступна админ панель, а так же добавление новых песен и авторов в базу данных.

## 2.2 Регистрация

В своей первой версии система будет иметь возможность регистрировать сразу же множество пользователей.
И так же большое количество авторов и песен.

Процесс заведения нового аккаунта для администратора, может быть инсталлирован в Системе,
и должен будет принимать на входе следующие данные:

- email - обязательное поле
- пароль - обязательное поле

Процесс заведения же нового аккаунта для пользователя должен будет принимать на вход следующие:

- username - обязательное поле
- пароль - обязательное поле

Все инсталяции административных аккаунтов проведенных в Системе должено быть записано в документации.

## 2.3 Аутефикация администратора и подписчиков

Аутефикация администратора осуществляется с помощью email и пароля, для возможности замены пароля через email
при случае взлома администратора.

Рядовой пользователь же такой возможности не будет иметь, по крайней мере в первой версии Системы.

## 2.4 Функционал для администратора

Администратор после аутентификации получает доступ к админ панели и будет иметь следующую возможности:

- Смена пароля (использую письмо на email адресс)
- Редактирование данных при помощи админ панели

## 2.5 Функционал для пользователь

Пользователь после аутентификации получает права следующие права:

- Прослушивать любую музыку на сайте и в телеграмм боте
- Добавлять любимую музыку в избранное

## 2.6 Функционал для гостя

Пользователь после аутентификации получает права следующие права:

- Прослушивать любую музыку на сайте и в телеграмм боте

# 3. Предлагаемый стэк технологий

Для реализации Системы предлагается следующий стэк технологий:

- Бэкенд:

  - Язык Python
  - Фреймворк Django
  - БД MySQL

- Фронтэнд:
  - Язык TypeScript
  - Фреймворк React

Для донатов автору рассматривается Qiwi и YandexMoney.
