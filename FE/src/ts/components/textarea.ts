import { _q } from '../utils/utils';

const CLASS_NAME = {
  inputWrap: 'todo-input-wrap hidden',
  textarea: 'todo-textarea',
  inputButtonWrap: 'input-btn-wrap',
  primaryButton: 'primary-btn',
  cancelButton: 'cancel-btn',
};

const TEXTAREA_MAX_LENGTH: number = 500;
const TEXTAREA_PLACEHOLDER: string = '할 일을 입력하세요';
const PRIMARY_BUTTON_TEXT: string = '할 일 추가';
const CANCEL_BUTTON_TEXT: string = '취소';

const createTextareaElement = (): string => {
  return `<div class="${CLASS_NAME.inputWrap}">
    <textarea name="${CLASS_NAME.textarea}" id = "${CLASS_NAME.textarea}" maxlength = "${TEXTAREA_MAX_LENGTH}" placeholder = "${TEXTAREA_PLACEHOLDER}"></textarea>
    <div class="${CLASS_NAME.inputButtonWrap}"><button class="${CLASS_NAME.primaryButton}">${PRIMARY_BUTTON_TEXT}</button>
    <button class="${CLASS_NAME.cancelButton}">${CANCEL_BUTTON_TEXT}</button></div></div>`;
};

export default createTextareaElement;
