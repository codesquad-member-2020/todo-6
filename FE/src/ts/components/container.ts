import { _q } from '../utils/utils';
import { createColumnElement } from './column';
import { createDeleteModalElement, createEditModalElement } from './modal';
import { Sections } from './fetch';

const WRAPPER_CLASS: string = 'column-wrap';

export const columnWrapElement: HTMLElement = _q(`.${WRAPPER_CLASS}`);

export const initialRender = (sections: Array<Sections>, userName: string): void => {
  const elementStr = sections.reduce((allElements: string, eachSection: Sections) => {
    allElements += createColumnElement(eachSection, userName);
    return allElements;
  }, '');
  columnWrapElement.innerHTML = elementStr;
};

export const renderDeleteModal = (): void => {
  columnWrapElement.insertAdjacentHTML('beforebegin', createDeleteModalElement());
};
