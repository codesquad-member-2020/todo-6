import { Card } from './card';
import { templateCardElement } from './card';
import { initialRender } from './columnWrap';

const API_URL = {
  BASE_URL: 'http://15.165.109.219:8080',
  todoList(): string {
    return `${this.BASE_URL}/api/todo`;
  },
  addCard(columnId: number): string {
    return `${this.BASE_URL}/api/column/${columnId}/card`;
  },
  deleteCard(columnId: number, cardId: number): string {
    return `${this.BASE_URL}/api/column/${columnId}/card/${cardId}`;
  },
  editCard(cardId: number): string {
    return `${this.BASE_URL}/api/card/${cardId}`;
  },
  moveCard(sourceColumnId: number, destinationColumnId: number, cardId: number, cardPosition: number): string {
    return `${this.BASE_URL}/api/column/${sourceColumnId}/card/${cardId}?destination=${destinationColumnId}&position=${cardPosition}`;
  },
};

const JWT_TOKEN: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcklkIjoibHlubiIsImV4cCI6MTQ4NTI3MDAwMDAwMH0.LGcj3yDql6M-9s21JXgDw4kYokbQ1t919FdjVkai7bE';

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
  // const response: Response = await fetch(API_URL.todoList(), { method: 'GET' }, headers: { Authorization: JWT_TOKEN });
  // const todoList = await response.json();
  const todoList = todo;
  const {
    data: { sections },
  } = todoList;
  initialRender(sections);
};

export const createCard = async (columnId: number, title: string, contents: string): Promise<string> => {
  const response: Response = await fetch(API_URL.addCard(columnId), {
    method: 'POST',
    body: JSON.stringify({ title: title, contents: contents }),
    headers: { Authorization: JWT_TOKEN },
  });
  const addedCard = await response.json();
  console.log(addedCard);
  const { data } = addedCard;
  return templateCardElement(columnId, data);
};

export const isCardDeleted = async (columnId: number, cardId: number): Promise<boolean> => {
  const response: Response = await fetch(API_URL.deleteCard(columnId, cardId), { method: 'DELETE', headers: { Authorization: JWT_TOKEN } });
  console.log(response);
  return response.ok;
};

export const isCardEdited = async (cardId: number, title: string, contents: string): Promise<boolean> => {
  const response: Response = await fetch(API_URL.editCard(cardId), { method: 'PUT', body: JSON.stringify({ title: title, contents: contents }), headers: { Authorization: JWT_TOKEN } });
  console.log(response);
  return response.ok;
};

export const isCardMoved = async (sourceColumnId: number, destinationColumnId: number, cardId: number, cardPosition: number): Promise<boolean> => {
  const response: Response = await fetch(API_URL.moveCard(sourceColumnId, destinationColumnId, cardId, cardPosition), { method: 'GET', headers: { Authorization: JWT_TOKEN } });
  console.log(response);
  return response.ok;
};
