INSERT
INTO project (id, title)
VALUES (1, 'todo');

INSERT
INTO user (id, user_id, name, project, project_key)
VALUES (1, 'john01', 'John Smith', 1, 0);

INSERT
INTO section (id, name, project, project_key)
VALUES (1, '해야할일', 1, 0);

INSERT
INTO section (id, name, project, project_key)
VALUES (2, '하는중', 1, 1);

INSERT
INTO section (id, name, project, project_key)
VALUES (3, '다했다', 1, 2);

