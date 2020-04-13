import { Card } from './card';
import { createCardElement } from './card';
import { initialRender } from './container';

const BASE_URL: string = 'http://15.165.109.219:8080';

const API_URL = {
  todoList: (): string => `${BASE_URL}/api/todo`,
  addedCard: (columnId: number): string => `${BASE_URL}/api/column/${columnId}/card`,
  deletedCard: (cardId: number): string => `${BASE_URL}/api/card/${cardId}`,
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
  const { userId, project } = todoList.data;
  const { sections } = project[0];
  author = userId;
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

export const fetchdeletedCard = async (cardId: string): Promise<boolean> => {
  const extractIdRegex: RegExp = /(?![0-9]+[^0-9])[0-9]+/;
  const filteredCardId: number = parseInt(extractIdRegex.exec(cardId), 10);
  const response = await fetch(API_URL.deletedCard(filteredCardId), { method: 'DELETE', redirect: 'follow' });
  return response.ok;
};
