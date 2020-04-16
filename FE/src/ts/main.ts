import { _q } from './utils/utils';
import { fetchTodoList, fetchActivityList } from './components/fetch';
import { activityListElement } from './components/sidemenu';
import { columnWrapElement } from './components/columnWrap';
import addAllEventListener from './components/eventManager';
import applyDragAndDrop from './components/dragAndDrop';

const CONTAINER_CLASS = 'container';
const containerElement = _q(`.${CONTAINER_CLASS}`);

fetchTodoList();
fetchActivityList(activityListElement);
addAllEventListener(columnWrapElement);
applyDragAndDrop(containerElement);
