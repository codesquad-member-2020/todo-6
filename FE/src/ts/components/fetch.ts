import { Card } from './card';
import { templateCardElement, author } from './card';
import { initialRender } from './columnWrap';

const BASE_URL: string = 'http://15.165.109.219:8080';

const API_URL = {
  todoList: (): string => `${BASE_URL}/api/todo`,
  addCard: (columnId: number): string => `${BASE_URL}/api/column/${columnId}/card`,
  deleteCard: (cardId: number): string => `${BASE_URL}/api/card/${cardId}`,
  editCard: (cardId: number): string => `${BASE_URL}/api/card/${cardId}`,
};

export interface Sections {
  id: number;
  name: string;
  cards: Array<Card>;
}

export const fetchTodoList = async (): Promise<void> => {
  const response = await fetch(API_URL.todoList(), { method: 'GET' });
  const todoList = await response.json();
  const {
    data: { userId, project },
  } = todoList;
  const { sections } = project[0];
  author.userId = userId;
  initialRender(sections, author.userId);
};

export const createCard = async (columnId: number, contents: string): Promise<string> => {
  const response = await fetch(API_URL.addCard(columnId), { method: 'POST', body: JSON.stringify({ contents: contents }), redirect: 'follow' });
  const addedCard = await response.json();
  const { data } = addedCard;
  return templateCardElement(columnId, data, author.userId);
};

export const isCardDeleted = async (cardId: number): Promise<boolean> => {
  const response = await fetch(API_URL.deleteCard(cardId), { method: 'DELETE', redirect: 'follow' });
  console.log(response);
  return response.ok;
};

export const isCardEdited = async (cardId: number, contents: string): Promise<boolean> => {
  const response = await fetch(API_URL.editCard(cardId), { method: 'PUT', body: JSON.stringify({ contents: contents }), redirect: 'follow' });
  console.log(response);
  return response.ok;
};
