import { fetchTodoList } from './components/fetch';
import { clickHandler, inputHandler } from './components/eventManager';
import { containerElement } from './components/container';

fetchTodoList();
containerElement.addEventListener('click', clickHandler);
containerElement.addEventListener('input', inputHandler);
