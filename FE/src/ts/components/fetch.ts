import { Card, templateCardElement } from './card';
import { Activity } from './activity';

const API_URL = {
  BASE_URL: 'http://15.165.109.219:8080',
  todoList(): string {
    return `${this.BASE_URL}/api/todo`;
  },
  activityList(): string {
    return `${this.BASE_URL}/api/activity`;
  },
  addCard(columnId: number): string {
    return `${this.BASE_URL}/api/column/${columnId}/card`;
  },
  deleteCard(columnId: number, cardId: number): string {
    return `${this.BASE_URL}/api/column/${columnId}/card/${cardId}`;
  },
  editCard(columnId: number, cardId: number): string {
    return `${this.BASE_URL}/api/column/${columnId}/card/${cardId}`;
  },
  moveCard(sourceColumnId: number, destinationColumnId: number, dragCardIndex: number, dropCardIndex: number): string {
    return `${this.BASE_URL}/api/column/${sourceColumnId}/card/${dragCardIndex}?destination=${destinationColumnId}&position=${dropCardIndex}`;
  },
};

const JWT_TOKEN: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcklkIjoibHlubiIsImV4cCI6MTQ4NTI3MDAwMDAwMH0.LGcj3yDql6M-9s21JXgDw4kYokbQ1t919FdjVkai7bE';

export interface Sections {
  id: number;
  name: string;
  card: Array<Card>;
}

interface ApiParameter {
  columnId?: number;
  cardId?: number;
  title?: string;
  contents?: string | null;
  sourceColumnId?: number;
  destinationColumnId?: number;
  dragCardIndex?: number;
  dropCardIndex?: number;
}

const myHeaders: Headers = new Headers({
  Authorization: JWT_TOKEN,
  'Content-Type': 'application/json',
});

export const fetchTodoList = async (): Promise<Array<Sections>> => {
  const response: Response = await fetch(API_URL.todoList(), { method: 'GET', headers: myHeaders });
  const todoList = await response.json();
  const { data } = todoList;
  return data;
};

export const fetchActivityList = async (): Promise<Array<Activity>> => {
  const response: Response = await fetch(API_URL.activityList(), { method: 'GET', headers: myHeaders });
  const activityList = await response.json();
  const { data } = activityList;
  return data;
};

export const fetchAddedCard = async ({ columnId, title, contents }: ApiParameter): Promise<string> => {
  const response: Response = await fetch(API_URL.addCard(columnId), {
    method: 'POST',
    body: JSON.stringify({ title: title, contents: contents }),
    headers: myHeaders,
  });
  const addedCard = await response.json();
  const { data } = addedCard;
  return data;
};

export const isCardDeleted = async ({ columnId, cardId }: ApiParameter): Promise<boolean> => {
  const response: Response = await fetch(API_URL.deleteCard(columnId, cardId), {
    method: 'DELETE',
    headers: myHeaders,
  });
  return response.ok;
};

export const isCardEdited = async ({ columnId, cardId, title, contents }: ApiParameter): Promise<boolean> => {
  const response: Response = await fetch(API_URL.editCard(columnId, cardId), { method: 'PUT', body: JSON.stringify({ title: title, contents: contents }), headers: myHeaders });
  return response.ok;
};

export const isCardMoved = async ({ sourceColumnId, destinationColumnId, dragCardIndex, dropCardIndex }: ApiParameter): Promise<boolean> => {
  const response: Response = await fetch(API_URL.moveCard(sourceColumnId, destinationColumnId, dragCardIndex, dropCardIndex), { method: 'PATCH', headers: myHeaders });
  return response.ok;
};
