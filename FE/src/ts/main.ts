import { _q } from './utils/utils';
import { initialRenderTodoList, columnWrapElement } from './components/columnWrap';
import { initialRenderActivityList } from './components/sidemenu';
import { addAllEventListener, addDragAndDropEvent } from './components/eventManager';

const CONTAINER_CLASS = 'container';
const containerElement = _q(`.${CONTAINER_CLASS}`);

initialRenderTodoList();
initialRenderActivityList();
addAllEventListener(columnWrapElement);
addDragAndDropEvent(containerElement);
