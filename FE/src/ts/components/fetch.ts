import { Card } from './card';
import { templateCardElement } from './card';
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

const todo = {
  status: 'SUCCESS',
  data: {
    id: 1,
    name: 'todo',
    sections: [
      {
        id: 1,
        name: '해야할일',
        cards: [
          {
            id: 3,
            title: '제목3333',
            contents: '내용3333',
            user: '에드',
          },
          {
            id: 2,
            title: '제목2222',
            contents: '내용2222',
            user: '다이앤',
          },
          {
            id: 1,
            title: '제목1111',
            contents: '내용1111',
            user: '모스',
          },
        ],
      },
      {
        id: 2,
        name: '하는중',
        cards: [
          {
            id: 4,
            title: '하는중제목4444',
            contents: '하는중내용4444',
            user: '에드',
          },
        ],
      },
      {
        id: 3,
        name: '다했다',
        cards: [],
      },
    ],
    activities: [],
  },
};

export const fetchTodoList = async (): Promise<void> => {
  // const response: Response = await fetch(API_URL.todoList(), { method: 'GET' });
  // const todoList = await response.json();
  const todoList = todo;
  const {
    data: { sections },
  } = todoList;
  initialRender(sections);
};

export const createCard = async (columnId: number, title: string, contents: string): Promise<string> => {
  const response: Response = await fetch(API_URL.addCard(columnId), { method: 'POST', body: JSON.stringify({ title: title, contents: contents }) });
  const addedCard = await response.json();
  const { data } = addedCard;
  return templateCardElement(columnId, data);
};

export const isCardDeleted = async (cardId: number): Promise<boolean> => {
  const response: Response = await fetch(API_URL.deleteCard(cardId), { method: 'DELETE' });
  console.log(response);
  return response.ok;
};

export const isCardEdited = async (cardId: number, title: string, contents: string): Promise<boolean> => {
  const response: Response = await fetch(API_URL.editCard(cardId), { method: 'PUT', body: JSON.stringify({ title: title, contents: contents }) });
  console.log(response);
  return response.ok;
};
