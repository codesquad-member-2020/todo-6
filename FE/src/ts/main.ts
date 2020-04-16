import { _q } from './utils/utils';
import { fetchTodoList, fetchActivityList } from './components/fetch';
import { columnWrapElement } from './components/columnWrap';
import addAllEventListener from './components/eventManager';
import applyDragAndDrop from './components/dragAndDrop';
import './components/activity';

const CONTAINER_CLASS = 'container';
const containerElement = _q(`.${CONTAINER_CLASS}`);

fetchTodoList();
fetchActivityList(containerElement);
addAllEventListener(columnWrapElement);
applyDragAndDrop(containerElement);
