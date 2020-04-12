import { _q, toggleClass, addClass, removeClass } from '../utils/utils';
import { UTIL_CLASS } from '../utils/constants';
import { fetchAddedCard, fetchdeletedCard } from './fetch';
import { COLUMN_CLASS, changeCardCount } from './column';
import { INPUT_FORM_CLASS, hideInputForm } from './inputForm';
import { CARD_CLASS, createCardElement } from './card';
import { renderDeleteModal } from './container';
import { MODAL_CLASS } from './modal';

const addNewCard = async (targetColumn: HTMLDivElement, cardWrap: HTMLDivElement, textarea: HTMLTextAreaElement): void => {
  textarea.setAttribute('disabled', true);
  cardWrap.insertAdjacentHTML('afterbegin', await fetchAddedCard(targetColumn.id, textarea.value));
  // cardWrap.insertAdjacentHTML('afterbegin', createCardElement(targetColumn.id, { id: 999, contents: textarea.value }, '도널드 트럼프'));
  textarea.value = '';
  textarea.removeAttribute('disabled');
  changeCardCount(targetColumn);
};

const clickColumnAddButton = (event: any): void => {
  if (event.target.className !== COLUMN_CLASS.addButton) return;
  const targetColumn = event.target.closest(`.${COLUMN_CLASS.column}`);
  const inputForm = targetColumn.querySelector(`.${INPUT_FORM_CLASS.inputWrap}`);
  const textarea: HTMLTextAreaElement = inputForm.querySelector(`#${INPUT_FORM_CLASS.textarea}`);
  toggleClass(UTIL_CLASS.hidden, inputForm);
  textarea.focus();
};

const clickInputFormCancelButton = (event: any): void => {
  if (event.target.className !== INPUT_FORM_CLASS.cancelButton) return;
  const targetColumn = event.target.closest(`.${COLUMN_CLASS.column}`);
  hideInputForm(targetColumn);
};

const clickInputFormAddButton = async (event: any): void => {
  if (event.target.className !== INPUT_FORM_CLASS.addButton) return;
  const targetColumn = event.target.closest(`.${COLUMN_CLASS.column}`);
  const cardWrap = targetColumn.querySelector(`.${COLUMN_CLASS.cardWrap}`);
  const textarea: HTMLTextAreaElement = targetColumn.querySelector(`#${INPUT_FORM_CLASS.textarea}`);
  addClass(UTIL_CLASS.disabled, event.target);
  addNewCard(targetColumn, cardWrap, textarea);
};

let deleteTargetColumn: any = null;
let deleteTargetCard: any = null;
let modalElement: any = null;
let dimmedLayerElement: any = null;

const clickCardDeleteButton = (event: any): void => {
  if (event.target.className !== CARD_CLASS.deleteBtn) return;
  deleteTargetColumn = event.target.closest(`.${COLUMN_CLASS.column}`);
  deleteTargetCard = event.target.closest(`.${CARD_CLASS.card}`);
  renderDeleteModal();
  dimmedLayerElement = _q(`.${MODAL_CLASS.dimmedLayer}`);
  modalElement = _q(`.${MODAL_CLASS.modal}`);
  console.log(modalElement);
  modalElement.addEventListener('click', clickModalCardDeleteButton);
};

const clickModalCardDeleteButton = async (event: any): void => {
  if (event.target.className !== MODAL_CLASS.deleteBtn) return;
  const isDeleted = await fetchdeletedCard(deleteTargetCard.id);
  // const isDeleted = true;
  isDeleted ? deleteTargetCard.remove() : console.error();
  changeCardCount(deleteTargetColumn);
  dimmedLayerElement.remove();
  modalElement.remove();
};

const toogleActivateAddButton = (event: any): void => {
  if (event.target.id !== INPUT_FORM_CLASS.textarea) return;
  const targetInputForm = event.target.closest(`.${INPUT_FORM_CLASS.inputWrap}`);
  const addButton: HTMLButtonElement = targetInputForm.querySelector(`.${INPUT_FORM_CLASS.addButton}`);
  event.target.value ? removeClass(UTIL_CLASS.disabled, addButton) : addClass(UTIL_CLASS.disabled, addButton);
};

export const clickHandler = (event: Event): void => {
  clickColumnAddButton(event);
  clickInputFormAddButton(event);
  clickInputFormCancelButton(event);
  clickCardDeleteButton(event);
};

export const inputHandler = (event: Event): void => {
  toogleActivateAddButton(event);
};

const modalClickHandler = (event: Event): void => {
  clickModalCardDeleteButton(event);
};
