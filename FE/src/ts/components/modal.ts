import { _q } from '../utils/utils';
import { ICON_TYPE } from '../utils/constants';

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
  dimmedLayer: `<div class="${MODAL_CLASS.dimmedLayer}"></div>`,
  header: (atoms: string): string => `<div class="${MODAL_CLASS.header}">${atoms}</div>`,
  content: (atoms: string): string => `<div class="${MODAL_CLASS.content}">${atoms}</div>`,
  editTitle: `<h2 class="${MODAL_CLASS.title}">${MODAL_STRING.editTitle}</h2>`,
  deleteTitle: `<h2 class="${MODAL_CLASS.title}">${MODAL_STRING.deleteTitle}</h2>`,
  deleteText: `<span class="${MODAL_CLASS.text}">${MODAL_STRING.deleteText}</span>`,
  editLabel: `<label class="${MODAL_CLASS.label}" for="${MODAL_CLASS.textarea}">${MODAL_STRING.editLabel}</label>`,
  editTextarea: (value: string): string => `<textarea name="${MODAL_CLASS.textarea}" id="${MODAL_CLASS.textarea}" maxlength="${TEXTAREA_MAX_LENGTH}">${value}</textarea>`,
  closeBtn: `<button class="${MODAL_CLASS.closeBtn}">${ICON_TYPE.delete}</button>`,
  deleteBtn: `<button class="${MODAL_CLASS.deleteBtn}">${MODAL_STRING.deleteBtn}</button>`,
  editBtn: `<button class="${MODAL_CLASS.editBtn}">${MODAL_STRING.editBtn}</button>`,
  cancelBtn: `<button class="${MODAL_CLASS.cancelBtn}">${MODAL_STRING.cancelBtn}</button>`,
};

export const createEditModalElement = (textAreaValue: string): string => {
  return `${MODAL_ATOM.dimmedLayer}<div class="${MODAL_CLASS.edit}">
  ${MODAL_ATOM.header(`${MODAL_ATOM.closeBtn}${MODAL_ATOM.editTitle}`)}
  ${MODAL_ATOM.content(`${MODAL_ATOM.editLabel}${MODAL_ATOM.editTextarea(textAreaValue)}${MODAL_ATOM.editBtn}`)}
  </div>`;
};

export const createDeleteModalElement = (): string => {
  return `${MODAL_ATOM.dimmedLayer}<div class="${MODAL_CLASS.delete}">
  ${MODAL_ATOM.header(`${MODAL_ATOM.closeBtn}${MODAL_ATOM.deleteTitle}`)}
  ${MODAL_ATOM.content(`${MODAL_ATOM.deleteText}${MODAL_ATOM.deleteBtn}${MODAL_ATOM.cancelBtn}`)}
  </div>`;
};
