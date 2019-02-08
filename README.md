# JustDo - registration and authentication with Symfony 4 and React 

Check demo [here](https://xid-justdo.herokuapp.com/).

## Installation

* Install API application dependencies:
	```bash
	composer install
	```
* Copy `.env` to `.env.local` and configure `DATABASE_URL`, `CORS_ALLOW_ORIGIN`, `JWT_PASSPHRASE`, `MAILER_PASSWORD` and `MAILER_SENDER`.
* Configure `config/packages/swiftmailer.yaml`.

* Use `open-ssl` to create secret keys for JWT (passphrase should be the same as `JWT_PASSPHRASE`):
	```bash
	openssl genrsa -out config/jwt/private.pem -aes256 4096
	openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
	```
* Create the database and it's sctructure:
	```bash
	php bin/console doctrine:database:create
	php bin/console doctrine:migrations:diff
	php bin/console doctrine:migrations:migrate
	```
* Install frontend application dependencies:
	```bash
	npm install
	```
* Run dev server:
	```bash
	npm run dev-server
	```
