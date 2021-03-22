/*
CREATE DATABASE wcs WITH
  ENCODING 'UTF8'
  OWNER wcs_client
  LC_COLLATE 'ru_RU.UTF-8'
  LC_CTYPE 'ru_RU.UTF-8'
CONNECTION LIMIT -1;

\c wcs;
CREATE SCHEMA IF NOT EXISTS wcs AUTHORIZATION wcs_client;
*/

DROP INDEX session_idx_user_uuid;
DROP INDEX body_mass_idx_user;
DROP INDEX body_mass_idx_date;
DROP INDEX user_idx_email;
DROP TABLE IF EXISTS wcs.session;
DROP TABLE IF EXISTS wcs.body_mass;
DROP TABLE IF EXISTS wcs.user;

CREATE TABLE IF NOT EXISTS wcs.user (
  uuid UUID NOT NULL PRIMARY KEY,
  email VARCHAR(1024) UNIQUE NOT NULL,
  password VARCHAR(1024) NOT NULL,
  name VARCHAR(1024) NOT NULL DEFAULT ''
);

CREATE UNIQUE INDEX user_idx_email ON wcs.user(email);

CREATE TABLE IF NOT EXISTS wcs.body_mass (
  user_uuid UUID NOT NULL,
  mass REAL NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  PRIMARY KEY(user_uuid, date),
  FOREIGN KEY(user_uuid) REFERENCES wcs.user(uuid) ON DELETE CASCADE
);

CREATE INDEX body_mass_idx_user ON wcs.body_mass(user_uuid);
CREATE INDEX body_mass_idx_date ON wcs.body_mass(date);


CREATE TABLE IF NOT EXISTS wcs.session (
  uuid UUID NOT NULL PRIMARY KEY,
  user_uuid UUID NOT NULL,
  token TEXT NOT NULL UNIQUE,
  creation_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_uuid) REFERENCES wcs.user(uuid) ON DELETE CASCADE
);

CREATE INDEX session_idx_user_uuid ON wcs.session(user_uuid);
CREATE INDEX session_idx_crt_uuid ON wcs.session(creation_time);
CREATE INDEX session_idx_ut_uuid ON wcs.session(update_time);
