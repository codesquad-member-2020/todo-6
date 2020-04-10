import { fetchTodoList } from './components/fetch';
import { clickHandler, inputHandler } from './components/eventManager';
import { columnWrapElement } from './components/container';

fetchTodoList();
columnWrapElement.addEventListener('click', clickHandler);
columnWrapElement.addEventListener('input', inputHandler);
