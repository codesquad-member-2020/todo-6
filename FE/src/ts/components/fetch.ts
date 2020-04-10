import { Card } from './card';
import { createCardElement } from './card';
import { initialRender } from './container';

const BASE_URL: string = 'https://576272fa-2ef9-48d0-a2c7-8ff6e25f9352.mock.pstmn.io';

const API_URL = {
  todoList: (): string => `${BASE_URL}/api/todo`,
  addedCard: (columnId: number): string => `${BASE_URL}/api/column/${columnId}/card`,
};

let author: string = '';

export interface Sections {
  id: number;
  name: string;
  cards: Array<Card>;
}

export const fetchTodoList = async (): Promise<void> => {
  const response = await fetch(API_URL.todoList(), { method: 'GET' });
  const todoList = await response.json();
  const { users, sections } = todoList.data;
  const userName: string = users[0].name;
  author = userName;
  initialRender(sections, author);
};

export const fetchAddedCard = async (columnId: string, contents: string): Promise<string> => {
  const extractIdRegex: RegExp = /^[0-9]+/;
  const filteredColumnId: number = parseInt(extractIdRegex.exec(columnId), 10);
  const response = await fetch(API_URL.addedCard(filteredColumnId), { method: 'POST', body: JSON.stringify({ contents: contents }), redirect: 'follow' });
  const addedCard = await response.json();
  const { data } = addedCard;
  return createCardElement(columnId, data, author);
};
