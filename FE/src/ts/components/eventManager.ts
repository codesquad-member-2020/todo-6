import { _q, toggleClass, addClass, removeClass } from '../utils/utils';
import { UTIL_CLASS } from '../utils/constants';
import { COLUMN_CLASS, createColumnElement } from './column';
import { INPUT_FORM_CLASS } from './inputForm';
import { Sections } from './fetch';

const WRAPPER_CLASS: string = 'column-wrap';
const columnWrapElement: HTMLElement = _q(`.${WRAPPER_CLASS}`);

export const initialRender = (sections: Array<Sections>, userName: string): void => {
  const elementStr = sections.reduce((allElements: string, eachSection: Sections) => {
    allElements += createColumnElement(eachSection, userName);
    return allElements;
  }, '');
  columnWrapElement.innerHTML = elementStr;
};

const clickColumnAddButton = (event: any): void => {
  if (event.target.className !== COLUMN_CLASS.addButton) return;
  const targetColumn = event.target.closest(`.${COLUMN_CLASS.column}`);
  const inputForm = targetColumn.querySelector(`.${INPUT_FORM_CLASS.inputWrap}`);
  const textarea = inputForm.querySelector(`#${INPUT_FORM_CLASS.textarea}`);
  toggleClass(UTIL_CLASS.hidden, inputForm);
  textarea.focus();
};

const toogleActivateAddButton = (event: any): void => {
  if (event.target.id !== INPUT_FORM_CLASS.textarea) return;
  const targetInputForm = event.target.closest(`.${INPUT_FORM_CLASS.inputWrap}`);
  const addButton = targetInputForm.querySelector(`.${INPUT_FORM_CLASS.addButton}`);
  event.target.value ? removeClass(UTIL_CLASS.disabled, addButton) : addClass(UTIL_CLASS.disabled, addButton);
};

const clickHandler = (event: any): void => {
  clickColumnAddButton(event);
};

const inputHandler = (event: any): void => {
  toogleActivateAddButton(event);
};

columnWrapElement.addEventListener('click', clickHandler);
columnWrapElement.addEventListener('input', inputHandler);
