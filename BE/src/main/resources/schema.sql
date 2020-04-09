
CREATE TABLE IF NOT EXISTS column (
    id int primary key auto_increment,
    name varchar (255)
);

CREATE TABLE IF NOT EXISTS card (
    id int primary key auto_increment,
    content varchar (255),
    user varchar (64),
    deleted boolean default false,
    column int references column(id),
    column_key int
);

CREATE TABLE IF NOT EXISTS activity (
    id int primary key auto_increment,
    action varchar (255),
    source varchar (255),
    destination varchar (255),
    card int references card(id),
    created_at timestamp
);
