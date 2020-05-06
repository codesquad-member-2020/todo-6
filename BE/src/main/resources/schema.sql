CREATE DATABASE IF NOT EXISTS todo;

SET character_set_client = utf8;
SET character_set_results = utf8;
SET character_set_connection = utf8;
ALTER DATABASE todo DEFAULT CHARACTER SET utf8;
commit;

USE todo;

DROP TABLE IF EXISTS card;
DROP TABLE IF EXISTS activity;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS section;
DROP TABLE IF EXISTS project;

CREATE TABLE project (
    id int primary key auto_increment,
    name varchar(64)
);

CREATE TABLE section (
    id int primary key auto_increment,
    name varchar(64),
    project int references project(id),
    project_key int
);

CREATE TABLE user (
    id int primary key auto_increment,
    user_id varchar(64),
    project int references project(id),
    project_key int
);

CREATE TABLE card (
    id int primary key auto_increment,
    title varchar(500),
    contents varchar(500),
    section int references section(id),
    section_key int,
    user int
);

CREATE TABLE activity (
    id int primary key auto_increment,
    action varchar(64),
    source varchar(64),
    destination varchar(64),
    created_at datetime,
    card varchar(500),
    user int,
    project int references project(id),
    project_key int
);
