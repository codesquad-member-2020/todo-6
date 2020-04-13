import { fetchTodoList } from './components/fetch';
import { clickHandler, doubleClickHandler, inputHandler } from './components/eventManager';
import { containerElement } from './components/container';

fetchTodoList();
containerElement.addEventListener('click', clickHandler);
containerElement.addEventListener('dblclick', doubleClickHandler);
containerElement.addEventListener('input', inputHandler);
