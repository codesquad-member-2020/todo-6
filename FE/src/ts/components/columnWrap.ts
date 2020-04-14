import { _q } from '../utils/utils';
import { templateColumnElement } from './column';
import { templateDeleteModalElement, templateEditModalElement } from './modal';
import { Sections } from './fetch';

const COLUMN_WRAP_CLASS: string = 'column-wrap';

export const columnWrapElement: HTMLElement = _q(`.${COLUMN_WRAP_CLASS}`);

export const initialRender = (sections: Array<Sections>, userName: string): void => {
  const elementStr = sections.reduce((allElements: string, eachSection: Sections) => {
    allElements += templateColumnElement(eachSection, userName);
    return allElements;
  }, '');
  columnWrapElement.innerHTML = elementStr;
};

export const renderDeleteModal = (): void => {
  columnWrapElement.insertAdjacentHTML('beforebegin', templateDeleteModalElement());
};

export const renderEditModal = (value: string): void => {
  columnWrapElement.insertAdjacentHTML('beforebegin', templateEditModalElement(value));
};
