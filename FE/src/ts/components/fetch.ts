import { _q } from '../utils/utils';
import { Card } from './card';
import createColumnElement from './column';

const BASE_URL = 'https://576272fa-2ef9-48d0-a2c7-8ff6e25f9352.mock.pstmn.io';

export interface Sections {
  id: number;
  name: string;
  cards: Array<Card>;
}

const render = (columnElements: string): void => {
  _q('.column-wrap').innerHTML = columnElements;
};

const fetchTodoList = async (): Promise<void> => {
  const response = await fetch(`${BASE_URL}/api/todo`);
  const todoList = await response.json();
  const { id, title, users, sections } = todoList.data;
  const userName = users[0].name;
  let initColumnElement = '';

  initColumnElement = sections.reduce((allElements: string, eachSection: Sections) => {
    allElements += createColumnElement(eachSection, userName);
    return allElements;
  }, '');

  render(initColumnElement);
  console.log(id, title, name, sections);
};

fetchTodoList();
