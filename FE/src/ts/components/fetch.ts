import { Card } from './card';
import { initialRender } from './renderManager';

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

  initialRender(sections, userName);
};

fetchTodoList();
