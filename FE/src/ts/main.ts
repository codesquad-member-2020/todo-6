import { _q } from './utils/utils';
import { fetchTodoList } from './components/fetch';
import { columnWrapElement } from './components/columnWrap';
import addAllEventListener from './components/eventManager';
import applyDragAndDrop from './components/dragAndDrop';

const CONTAINER_CLASS = 'container';
const containerElement = _q(`.${CONTAINER_CLASS}`);

fetchTodoList();
addAllEventListener(columnWrapElement);
applyDragAndDrop(containerElement);
