import { _q } from '../utils/utils';
import { ICON_TYPE } from '../utils/constants';
import htmlElements from '../utils/htmlElement';
import { isCardDeleted, isCardEdited } from './fetch';
import { changeCardCount } from './column';
import { toogleButtonActiveState } from './inputForm';
import { getCardId } from './card';

export const MODAL_CLASS = {
  dimmedLayer: 'dimmed-layer',
  modal: 'modal',
  edit: 'modal edit',
  delete: 'modal delete',
  header: 'header-wrap modal-header',
  closeButton: 'delete-btn icon-secondary-btn material-icons icon-primary-btn',
  title: 'modal-title',
  content: 'modal-content',
  label: 'modal-label',
  textarea: 'edit-textarea',
  text: 'modal-text',
  primaryButton: 'primary-btn',
  deleteButton: 'modal-btn primary-btn delete-card',
  editButton: `modal-btn primary-btn edit-card`,
  cancelButton: 'modal-btn cancel-btn',
};

const MODAL_STRING = {
  editTitle: '할 일 수정',
  editButton: '수정하기',
  editLabel: '할 일',
  deleteTitle: '할 일 삭제',
  deleteText: '선택한 할 일 카드를 삭제하시겠어요?',
  deleteButton: '삭제하기',
  cancelButton: '취소',
};

export const DELETE_MODAL: string = 'DELETE';
export const EDIT_MODAL: string = 'EDIT';

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
  closeButton: htmlElements.button(MODAL_CLASS.closeButton, ICON_TYPE.delete),
  deleteButton: htmlElements.button(MODAL_CLASS.deleteButton, MODAL_STRING.deleteButton),
  editButton: htmlElements.button(MODAL_CLASS.editButton, MODAL_STRING.editButton),
  cancelButton: htmlElements.button(MODAL_CLASS.cancelButton, MODAL_STRING.cancelButton),
};

export const modalElement: any = {
  targetCard: null,
  targetColumn: null,
  targetCardContent: null,
  modal: null,
  dimmedLayer: null,
  textarea: null,
};

export const templateEditModalElement = (textAreaValue: string): string => {
  return `${MODAL_ATOM.dimmedLayer}<div class="${MODAL_CLASS.edit}">
  ${MODAL_ATOM.header(`${MODAL_ATOM.closeButton}${MODAL_ATOM.editTitle}`)}
  ${MODAL_ATOM.content(`${MODAL_ATOM.editLabel}${MODAL_ATOM.editTextarea(textAreaValue)}${MODAL_ATOM.editButton}`)}
  </div>`;
};

export const templateDeleteModalElement = (): string => {
  return `${MODAL_ATOM.dimmedLayer}<div class="${MODAL_CLASS.delete}">
  ${MODAL_ATOM.header(`${MODAL_ATOM.closeButton}${MODAL_ATOM.deleteTitle}`)}
  ${MODAL_ATOM.content(`${MODAL_ATOM.deleteText}${MODAL_ATOM.deleteButton}${MODAL_ATOM.cancelButton}`)}
  </div>`;
};

export const setModalElement = (type: string = ''): void => {
  modalElement.dimmedLayer = _q(`.${MODAL_CLASS.dimmedLayer}`);
  modalElement.modal = _q(`.${MODAL_CLASS.modal}`);
  modalElement.dimmedLayer.addEventListener('click', removeModalElement);
  modalElement.modal.addEventListener('click', modalClickHandler);
  if (type === EDIT_MODAL) {
    modalElement.textarea = _q(`#${MODAL_CLASS.textarea}`);
    modalElement.modal.addEventListener('input', modalInputHandler);
  }
};

const removeModalElement = (type: string = ''): void => {
  modalElement.dimmedLayer.removeEventListener('click', removeModalElement);
  modalElement.modal.removeEventListener('click', modalClickHandler);
  if (type === EDIT_MODAL) {
    modalElement.modal.removeEventListener('input', modalInputHandler);
  }
  modalElement.dimmedLayer.remove();
  modalElement.modal.remove();
};

const clickModalCardDeleteButton = async ({ target }: Event): Promise<void> => {
  if (target.className !== MODAL_CLASS.deleteButton) return;
  const isDeleted: boolean = await isCardDeleted(getCardId(modalElement.targetCard));
  if (isDeleted) {
    modalElement.targetCard.remove();
    changeCardCount(modalElement.targetColumn);
  } else console.error('Delete Error');
  removeModalElement(DELETE_MODAL);
};

const clickModalCardEditButton = async ({ target }: Event): Promise<void> => {
  if (target.className !== MODAL_CLASS.editButton) return;
  const isEdited: boolean = await isCardEdited(getCardId(modalElement.targetCard), modalElement.targetCardContent.innerHTML);
  if (isEdited) {
    modalElement.targetCardContent.innerHTML = modalElement.textarea.value;
  } else console.error('Edit Error');
  removeModalElement(EDIT_MODAL);
};

const clickModalCloseButton = ({ target }: any): void => {
  const closeElementClassName: Array<string> = [MODAL_CLASS.closeButton, MODAL_CLASS.cancelButton];
  if (!closeElementClassName.includes(target.className)) return;
  removeModalElement();
};

const modalInputHandler = (event: any): void => {
  toogleButtonActiveState(event, {
    textAreaClass: MODAL_CLASS.textarea,
    targetClass: MODAL_CLASS.modal,
    buttonClass: MODAL_CLASS.primaryButton,
  });
};

const modalClickHandler = (event: any): void => {
  clickModalCardDeleteButton(event);
  clickModalCardEditButton(event);
  clickModalCloseButton(event);
};
