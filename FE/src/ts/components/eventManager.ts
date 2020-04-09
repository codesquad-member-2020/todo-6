import { _q, removeClass } from '../utils/utils';
import { UTIL_CLASS } from '../utils/constants';
import { COLUMN_CLASS } from './column';

const WRAPPER_CLASS: string = 'column-wrap';
const columnWrapElement: HTMLElement = _q(`.${WRAPPER_CLASS}`);

const render = (elementStr: string): void => {
  columnWrapElement.innerHTML = elementStr;
};

const clickHandler = (event: any) => {
  console.log(event.target.closest('.column'));
  removeClass(UTIL_CLASS.hidden, event.target.closest('.column').children[1]);
};

// const clickColumnAddButton = (event: any) => {
//   if(event.target === )
// }

columnWrapElement.addEventListener('click', clickHandler);

export default render;
