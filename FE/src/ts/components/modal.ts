import { _q } from '../utils/utils';
import { ICON_TYPE } from '../utils/constants';
import htmlElements from '../utils/htmlElement';
import { fetchDeletedCard } from './fetch';
import { changeCardCount } from './column';
import { getCardId } from './card';

export const MODAL_CLASS = {
  dimmedLayer: 'dimmed-layer',
  modal: 'modal',
  edit: 'modal edit',
  delete: 'modal delete',
  header: 'header-wrap modal-header',
  closeBtn: 'delete-btn icon-secondary-btn material-icons icon-primary-btn',
  title: 'modal-title',
  content: 'modal-content',
  label: 'modal-label',
  textarea: 'edit-textarea',
  text: 'modal-text',
  deleteBtn: 'modal-btn primary-btn delete-card',
  editBtn: `modal-btn primary-btn edit-card`,
  cancelBtn: 'modal-btn cancel-btn',
};

const MODAL_STRING = {
  editTitle: '할 일 수정',
  editBtn: '수정하기',
  editLabel: '할 일',
  deleteTitle: '할 일 삭제',
  deleteText: '선택한 할 일 카드를 삭제하시겠어요?',
  deleteBtn: '삭제하기',
  cancelBtn: '취소',
};

const TEXTAREA_MAX_LENGTH: number = 500;

const MODAL_ATOM = {
  dimmedLayer: htmlElements.div(MODAL_CLASS.dimmedLayer),
  header: (atoms: string): string => htmlElements.div(MODAL_CLASS.header, atoms),
  content: (atoms: string): string => htmlElements.div(MODAL_CLASS.content, atoms),
  editTitle: htmlElements.h2(MODAL_CLASS.title, MODAL_STRING.editTitle),
  deleteTitle: htmlElements.h2(MODAL_CLASS.title, MODAL_STRING.deleteTitle),
  deleteText: htmlElements.span(MODAL_CLASS.text, MODAL_STRING.deleteText),
  editLabel: htmlElements.label(MODAL_CLASS.label, MODAL_CLASS.textarea, MODAL_STRING.editLabel),
  editTextarea: (value: string): string =>
    htmlElements.textarea({
      id: MODAL_CLASS.textarea,
      maxLength: TEXTAREA_MAX_LENGTH,
      placeholder: '',
      value: value,
    }),
  closeBtn: htmlElements.button(MODAL_CLASS.closeBtn, ICON_TYPE.delete),
  deleteBtn: htmlElements.button(MODAL_CLASS.deleteBtn, MODAL_STRING.deleteBtn),
  editBtn: htmlElements.button(MODAL_CLASS.editBtn, MODAL_STRING.editBtn),
  cancelBtn: htmlElements.button(MODAL_CLASS.cancelBtn, MODAL_STRING.cancelBtn),
};

export const modalElement: any = {
  targetCard: null,
  targetColumn: null,
  targetCardContent: null,
  modal: null,
  dimmedLayer: null,
};

export const templateEditModalElement = (textAreaValue: string): string => {
  return `${MODAL_ATOM.dimmedLayer}<div class="${MODAL_CLASS.edit}">
  ${MODAL_ATOM.header(`${MODAL_ATOM.closeBtn}${MODAL_ATOM.editTitle}`)}
  ${MODAL_ATOM.content(`${MODAL_ATOM.editLabel}${MODAL_ATOM.editTextarea(textAreaValue)}${MODAL_ATOM.editBtn}`)}
  </div>`;
};

export const templateDeleteModalElement = (): string => {
  return `${MODAL_ATOM.dimmedLayer}<div class="${MODAL_CLASS.delete}">
  ${MODAL_ATOM.header(`${MODAL_ATOM.closeBtn}${MODAL_ATOM.deleteTitle}`)}
  ${MODAL_ATOM.content(`${MODAL_ATOM.deleteText}${MODAL_ATOM.deleteBtn}${MODAL_ATOM.cancelBtn}`)}
  </div>`;
};

export const setModalElement = (): void => {
  modalElement.dimmedLayer = _q(`.${MODAL_CLASS.dimmedLayer}`);
  modalElement.modal = _q(`.${MODAL_CLASS.modal}`);
  modalElement.modal.addEventListener('click', modalClickHandler);
};

const removeModalElement = (): void => {
  modalElement.modal.removeEventListener('click', modalClickHandler);
  modalElement.dimmedLayer.remove();
  modalElement.modal.remove();
};

const clickModalCardDeleteButton = async (event: any): void => {
  if (event.target.className !== MODAL_CLASS.deleteBtn) return;
  const isDeleted = await fetchDeletedCard(getCardId(modalElement.targetCard));
  if (isDeleted) {
    modalElement.targetCard.remove();
    changeCardCount(modalElement.targetColumn);
  } else console.error('Delete Error');
  removeModalElement();
};

const clickModalCloseButton = (event: any): void => {
  if (event.target.className !== MODAL_CLASS.closeBtn && event.target.className !== MODAL_CLASS.cancelBtn) return;
  removeModalElement();
};

const modalClickHandler = (event: any): void => {
  clickModalCardDeleteButton(event);
  clickModalCloseButton(event);
};
