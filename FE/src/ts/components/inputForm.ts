import { _q, addClass } from '../utils/utils';
import { UTIL_CLASS } from '../utils/constants';

export const INPUT_FORM_CLASS = {
  inputWrap: 'todo-input-wrap',
  textarea: 'todo-textarea',
  inputButtonWrap: 'input-btn-wrap',
  addButton: 'primary-btn',
  cancelButton: 'cancel-btn',
};

const TEXTAREA_MAX_LENGTH: number = 500;
const TEXTAREA_PLACEHOLDER: string = '할 일을 입력하세요';
const PRIMARY_BUTTON_TEXT: string = '할 일 추가';
const CANCEL_BUTTON_TEXT: string = '취소';

const INPUT_FORM_ATOM = {
  textarea: `<textarea name="${INPUT_FORM_CLASS.textarea}" id="${INPUT_FORM_CLASS.textarea}" maxlength="${TEXTAREA_MAX_LENGTH}" placeholder="${TEXTAREA_PLACEHOLDER}"></textarea>`,
  buttons: `<div class="${INPUT_FORM_CLASS.inputButtonWrap}"><button class="${INPUT_FORM_CLASS.addButton} ${UTIL_CLASS.disabled}">${PRIMARY_BUTTON_TEXT}</button><button class="${INPUT_FORM_CLASS.cancelButton}">${CANCEL_BUTTON_TEXT}</button></div>`,
};

export const createTextareaElement = (): string => {
  return `<div class="${INPUT_FORM_CLASS.inputWrap} ${UTIL_CLASS.hidden}">
    ${INPUT_FORM_ATOM.textarea}
    ${INPUT_FORM_ATOM.buttons}</div>`;
};

export const hiddenInputForm = (targetColumn: HTMLDivElement): void => {
  const inputForm = targetColumn.querySelector(`.${INPUT_FORM_CLASS.inputWrap}`);
  addClass(UTIL_CLASS.hidden, inputForm);
};
