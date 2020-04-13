use todo;

insert into project (id, name) values (1, '아닌데');
insert into user (id, user_id, project, project_key) values (1, '그래 그렇게 살아.....', 1, 0);
insert into section  (id, name, project, project_key) values (1, 'TODO', 1, 0);
insert into section  (id, name, project, project_key) values (2, 'DOING', 1, 0);
insert into section  (id, name, project, project_key) values (3, 'DONE', 1, 0);
insert into card (id, title, contents, section, section_key, user) values (1,'배고프다', '배가 고파', 1,0,1);
insert into card (id, title, contents, section, section_key, user) values (2,'배고픈가', '닭갈비 먹고싶어', 1,1,1);
insert into card (id, title, contents, section, section_key, user) values (3,'배고픈듯', '뭐먹지', 1,2,1);
insert into card (id, title, contents, section, section_key, user) values (4,'닭갈비도', '철판으로', 2,0,1);
insert into card (id, title, contents, section, section_key, user) values (5,'먹고싶은걸', '어떡해 힝', 2,1,1);
insert into card (id, title, contents, section, section_key, user) values (6,'이제', '슬 것도 없다', 3,0,1);
insert into card (id, title, contents, section, section_key, user) values (7,'졸려', '다얜바부', 3,1,1);
