import { _q, toggleClass } from '../utils/utils';
import { UTIL_CLASS } from '../utils/constants';
import { COLUMN_CLASS } from './column';
import { INPUT_FORM_CLASS } from './inputForm';

const WRAPPER_CLASS: string = 'column-wrap';
const columnWrapElement: HTMLElement = _q(`.${WRAPPER_CLASS}`);

const render = (elementStr: string): void => {
  columnWrapElement.innerHTML = elementStr;
};

const clickHandler = (event: any) => {
  clickColumnAddButton(event);
};

const clickColumnAddButton = (event: any) => {
  if (event.target.className !== COLUMN_CLASS.addButton) return;
  const targetColumn = event.target.closest(`.${COLUMN_CLASS.column}`);
  const inputForm = targetColumn.querySelector(`.${INPUT_FORM_CLASS.inputWrap}`);
  const textarea = inputForm.querySelector(`#${INPUT_FORM_CLASS.textarea}`);
  toggleClass(UTIL_CLASS.hidden, inputForm);
  textarea.focus();
};

columnWrapElement.addEventListener('click', clickHandler);

export default render;
