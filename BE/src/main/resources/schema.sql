CREATE DATABASE IF NOT EXISTS todo;

SET character_set_client = utf8;
SET character_set_results = utf8;
SET character_set_connection = utf8;
ALTER DATABASE todo DEFAULT CHARACTER SET utf8;
commit;

USE todo;

CREATE TABLE IF NOT EXISTS project (
    id int primary key auto_increment,
    title varchar(255)
);

CREATE TABLE IF NOT EXISTS user (
    id int primary key auto_increment,
    user_id varchar (64),
    name varchar(64),
    project int references project(id)
);

CREATE TABLE IF NOT EXISTS section (
    id int primary key auto_increment,
    name varchar (255),
    project int references project(id),
    project_key int
);

CREATE TABLE IF NOT EXISTS card (
    id int primary key auto_increment,
    contents varchar (500),
    deleted boolean default false,
    section int references section(id),
    section_key int,
    user int references user(id),
    user_key int
);

CREATE TABLE IF NOT EXISTS activity (
    id int primary key auto_increment,
    action varchar (255),
    source varchar (255),
    destination varchar (255),
    card int references card(id),
    user int references user(id),
    created_at timestamp,
    project int references project(id),
    project_key int
);


