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
  card: Array<Card>;
}

const todo = {
  status: 'SUCCESS',
  data: [
    {
      id: 1,
      name: 'TODO',
      card: [
        {
          id: 13,
          title: '제곧내',
          contents: null,
          user: 'lynn',
        },
        {
          id: 12,
          title: '제곧내',
          contents: null,
          user: 'lynn',
        },
        {
          id: 11,
          title: '제곧내',
          contents: null,
          user: 'lynn',
        },
        {
          id: 10,
          title: '제곧내',
          contents: null,
          user: 'lynn',
        },
        {
          id: 9,
          title: '제곧내',
          contents: null,
          user: 'lynn',
        },
        {
          id: 8,
          title: '제곧내',
          contents: null,
          user: 'lynn',
        },
        {
          id: 1,
          title: '배고프다',
          contents: '배가 고파',
          user: 'lynn',
        },
        {
          id: 2,
          title: '배고픈가',
          contents: '닭갈비 먹고싶어',
          user: 'lynn',
        },
        {
          id: 3,
          title: '배고픈듯',
          contents: '뭐먹지',
          user: 'lynn',
        },
      ],
    },
    {
      id: 2,
      name: 'DOING',
      card: [
        {
          id: 4,
          title: '닭갈비도',
          contents: '철판으로',
          user: 'lynn',
        },
        {
          id: 5,
          title: '먹고싶은걸',
          contents: '어떡해 힝',
          user: 'lynn',
        },
      ],
    },
    {
      id: 3,
      name: 'DONE',
      card: [
        {
          id: 6,
          title: '이제',
          contents: '슬 것도 없다',
          user: 'lynn',
        },
        {
          id: 7,
          title: '졸려',
          contents: '다얜바부',
          user: 'lynn',
        },
      ],
    },
  ],
};

export const fetchTodoList = async (): Promise<void> => {
  // const response: Response = await fetch(API_URL.todoList(), { method: 'GET' }, headers: { Authorization: JWT_TOKEN });
  // const todoList = await response.json();
  const { data } = todo;
  console.log(data);
  initialRender(data);
};

export const createCard = async (columnId: number, title: string, contents: null): Promise<string> => {
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
