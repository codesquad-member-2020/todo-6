//     <!-- < div class="dimmed-layer" > </div> -->
//       < !--
//       < div class="modal edit" >
//   <div class="header-wrap modal-header" >
//     <button class="delete-btn icon-secondary-btn material-icons icon-primary-btn" >
//       close
//       < /button>
//       < h2 class="modal-title" > 할 일 수정 < /h2>
//         < /div>
//         < div class="modal-content" >
//           <label class="modal-label" for= "edit-textarea" > 할 일 < /label>
//             < textarea
//             name = "edit-textarea"
//             id = "edit-textarea"
// maxlength = "500"
//   > </textarea>
//   < button class="modal-btn primary-btn" > 수정하기 < /button>
//     < /div>
//     < /div> -->
//     < !-- delete modal-- >
//       <!-- < div class="modal delete" >
//         <div class="header-wrap modal-header" >
//           <button class="delete-btn icon-secondary-btn material-icons icon-primary-btn" >
//             close
//             < /button>
//             < h2 class="modal-title" > 할 일 삭제 < /h2>
//               < /div>
//               < div class="modal-content" >
//                 <span class="modal-text" > 선택한 할 일 카드를 삭제하시겠어요 ? </span>
//                   < button class="modal-btn primary-btn" > 삭제하기 < /button>
//                     < button class="modal-btn cancel-btn" > 취소 < /button>
//                       < /div>
//                       < /div> -->

import { ICON_TYPE } from '../utils/constants';

export const MODAL_CLASS = {
  dimmedLayer: 'dimmed-layer',
  edit: 'modal edit',
  delete: 'modal delete',
  header: 'header-wrap modal-header',
  closeBtn: 'delete-btn icon-secondary-btn material-icons icon-primary-btn',
  title: 'modal-title',
  content: 'modal-content',
  label: 'modal-label',
  textarea: 'edit-textarea',
  text: 'modal-text',
  primaryBtn: 'modal-btn primary-btn',
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
  editTextarea: `<textarea name="${MODAL_CLASS.textarea}" id="${MODAL_CLASS.textarea}" maxlength="${TEXTAREA_MAX_LENGTH}"></textarea>`,
  closeBtn: `<button class="${MODAL_CLASS.closeBtn}">${ICON_TYPE.delete}</button>`,
  deleteBtn: `<button class="${MODAL_CLASS.primaryBtn}">${MODAL_STRING.deleteBtn}</button>`,
  editBtn: `<button class="${MODAL_CLASS.primaryBtn}">${MODAL_STRING.editBtn}</button>`,
  cancelBtn: `<button class="${MODAL_CLASS.cancelBtn}">${MODAL_STRING.cancelBtn}</button>`,
};

export const createEditModalComponent = () => {};

export const createDeleteModalComponent = (): string => {
  return `${MODAL_ATOM.dimmedLayer}<div class="${MODAL_CLASS.delete}">
  ${MODAL_ATOM.header(`${MODAL_ATOM.closeBtn}${MODAL_ATOM.deleteTitle}`)}
  ${MODAL_ATOM.content(`${MODAL_ATOM.deleteText}${MODAL_ATOM.deleteBtn}${MODAL_ATOM.cancelBtn}`)}
  </div>`;
};
