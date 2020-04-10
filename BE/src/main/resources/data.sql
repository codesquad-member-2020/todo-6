use todo;

INSERT
INTO user (id, user_id, name)
VALUES (1, 'john01', 'John Smith');

INSERT
INTO project (id, title, user, user_key)
VALUES (1, 'todo', 1, 0);

INSERT
INTO section (id, name, project, project_key)
VALUES (1, '해야할일', 1, 0);

INSERT
INTO section (id, name, project, project_key)
VALUES (2, '하는중', 1, 1);

INSERT
INTO section (id, name, project, project_key)
VALUES (3, '다했다', 1, 2);

INSERT
INTO card (contents, section, section_key)
VALUES ('컬럼1 내용1', 1, 0);

INSERT
INTO card (contents, section, section_key)
VALUES ('컬럼1 내용2', 1, 1);

INSERT
INTO card (contents, section, section_key)
VALUES ('컬럼1 내용3', 1, 2);

INSERT
INTO card (contents, section, section_key)
VALUES ('컬럼2 내용1', 2, 0);

INSERT
INTO card (contents, section, section_key)
VALUES ('컬럼2 내용2', 2, 1);

INSERT
INTO card (contents, section, section_key)
VALUES ('컬럼3 내용1', 3, 0);
