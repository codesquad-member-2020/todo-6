import { fetchTodoList } from './components/fetch';
import { clickHandler, doubleClickHandler, inputHandler } from './components/eventManager';
import { columnWrapElement } from './components/columnWrap';

fetchTodoList();
columnWrapElement.addEventListener('click', clickHandler);
columnWrapElement.addEventListener('dblclick', doubleClickHandler);
columnWrapElement.addEventListener('input', inputHandler);
