set client_encoding = 'UTF8';

create table items(
    id serial primary key,
    name varchar not null,
    price integer not null
);
insert into items values (1, 'ティッシュ', 100);
insert into items values (2, 'ウェットティッシュ', 200);
insert into items values (3, '除菌シート', 300);