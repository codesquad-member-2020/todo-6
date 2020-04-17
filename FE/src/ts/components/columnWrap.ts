import { _q } from '../utils/utils';
import { ICON_TYPE } from '../utils/constants';
import { templateColumnElement } from './column';
import { templateDeleteModalElement, templateEditModalElement } from './modal';
import { Sections, fetchTodoList } from './fetch';
import htmlElements from '../utils/htmlElement';

const COLUMN_WRAP_CLASS = {
  columnWrap: 'column-wrap',
  addButton: 'column-add-button',
  icon: 'material-icons',
};
const COLUMN_ADD_BUTTON_TEXT: stirng = '컬럼 추가';

export const columnWrapElement: HTMLElement = _q(`.${COLUMN_WRAP_CLASS.columnWrap}`);

const columnButton: string = htmlElements.div(COLUMN_WRAP_CLASS.addButton, htmlElements.icon(COLUMN_WRAP_CLASS.icon, ICON_TYPE.add), COLUMN_ADD_BUTTON_TEXT);

export const initialRenderTodoList = async (): Promise<void> => {
  const sections = await fetchTodoList();
  const elementStr: string = sections.reduce((allElements: string, eachSection: Sections) => {
    allElements += templateColumnElement(eachSection);
    return allElements;
  }, '');
  columnWrapElement.innerHTML = elementStr + columnButton;
};

export const renderDeleteModal = (): void => {
  columnWrapElement.insertAdjacentHTML('beforebegin', templateDeleteModalElement());
};

export const renderEditModal = (value: string): void => {
  columnWrapElement.insertAdjacentHTML('beforebegin', templateEditModalElement(value));
};
