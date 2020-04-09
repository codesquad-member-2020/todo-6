import { Card } from './card';
import { createColumnElement } from './column';
import render from './eventManager';

const BASE_URL = 'https://576272fa-2ef9-48d0-a2c7-8ff6e25f9352.mock.pstmn.io';

const API_URL = {
  todoList: (): string => `${BASE_URL}/api/todo`,
};

export interface Sections {
  id: number;
  name: string;
  cards: Array<Card>;
}

export const fetchTodoList = async (): Promise<void> => {
  const response = await fetch(API_URL.todoList());
  const todoList = await response.json();
  const { users, sections } = todoList.data;
  const userName: string = users[0].name;
  let initColumnElement: string = '';

  initColumnElement = sections.reduce((allElements: string, eachSection: Sections) => {
    allElements += createColumnElement(eachSection, userName);
    return allElements;
  }, '');

  render(initColumnElement);
};

fetchTodoList();
