import { _q, addClass, removeClass } from '../utils/utils';
import { UTIL_CLASS } from '../utils/constants';
import htmlElements from '../utils/htmlElement';
import { columnElement, cardWrapElement, addNewCard } from './column';

export const INPUT_FORM_CLASS = {
  inputForm: 'todo-input-wrap',
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
  textarea: htmlElements.textarea({ id: INPUT_FORM_CLASS.textarea, maxLength: TEXTAREA_MAX_LENGTH, placeholder: TEXTAREA_PLACEHOLDER, value: '' }),
  buttons: htmlElements.div(
    INPUT_FORM_CLASS.inputButtonWrap,
    htmlElements.button(`${INPUT_FORM_CLASS.addButton} ${UTIL_CLASS.disabled}`, PRIMARY_BUTTON_TEXT),
    htmlElements.button(INPUT_FORM_CLASS.cancelButton, CANCEL_BUTTON_TEXT),
  ),
};

export const inputFormElement = (parentElement: HTMLElement): HTMLElement | null => parentElement.querySelector(`.${INPUT_FORM_CLASS.inputForm}`);

export const textareaElement = (parentElement: HTMLElement): HTMLTextAreaElement | null => parentElement.querySelector(`#${INPUT_FORM_CLASS.textarea}`);

export const templateInputFormElement = (): string => {
  return `<div class="${INPUT_FORM_CLASS.inputForm} ${UTIL_CLASS.hidden}">
    ${INPUT_FORM_ATOM.textarea}
    ${INPUT_FORM_ATOM.buttons}</div>`;
};

const hideInputForm = (targetColumn: HTMLDivElement): void => {
  addClass(UTIL_CLASS.hidden, inputFormElement(targetColumn));
};

const clickInputFormAddButton = async ({ target }: Event): Promise<void> => {
  if (target.className !== INPUT_FORM_CLASS.addButton) return;
  const targetColumn: HTMLElement = columnElement(target);
  addClass(UTIL_CLASS.disabled, target);
  addNewCard(targetColumn, cardWrapElement(targetColumn), textareaElement(targetColumn));
};

const clickInputFormCancelButton = ({ target }: Event): void => {
  if (target.className !== INPUT_FORM_CLASS.cancelButton) return;
  const targetColumn: HTMLElement = columnElement(target);
  hideInputForm(targetColumn);
};

interface ClassNameObj {
  textAreaClass: string;
  targetClass: string;
  buttonClass: string;
}

export const toogleButtonActiveState = ({ target }: Event, className: ClassNameObj): void => {
  if (target.id !== className.textAreaClass) return;
  const targetElement: HTMLElement = target.closest(`.${className.targetClass}`);
  const toggleButton: HTMLButtonElement = targetElement.querySelector(`.${className.buttonClass}`);
  target.value ? removeClass(UTIL_CLASS.disabled, toggleButton) : addClass(UTIL_CLASS.disabled, toggleButton);
};

export const inputFormClickHandler = (event: MouseEvent): void => {
  clickInputFormAddButton(event);
  clickInputFormCancelButton(event);
};

export const inputFormInputHandler = (event: InputEvent): void => {
  toogleButtonActiveState(event, {
    textAreaClass: INPUT_FORM_CLASS.textarea,
    targetClass: INPUT_FORM_CLASS.inputForm,
    buttonClass: INPUT_FORM_CLASS.addButton,
  });
};
