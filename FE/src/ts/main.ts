import { fetchTodoList } from './components/fetch';
import { columnWrapElement } from './components/columnWrap';
import addAllEventListener from './components/eventManager';
import applyDragAndDrop from './components/dragAndDrop';

fetchTodoList();
addAllEventListener(columnWrapElement);
applyDragAndDrop(columnWrapElement);
