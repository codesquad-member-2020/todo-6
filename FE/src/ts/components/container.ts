import { _q } from '../utils/utils';
import { templateColumnElement } from './column';
import { templateDeleteModalElement, templateEditModalElement } from './modal';
import { Sections } from './fetch';

const CONTAINER_CLASS: string = 'column-wrap';

export const containerElement: HTMLElement = _q(`.${CONTAINER_CLASS}`);

export const initialRender = (sections: Array<Sections>, userName: string): void => {
  const elementStr = sections.reduce((allElements: string, eachSection: Sections) => {
    allElements += templateColumnElement(eachSection, userName);
    return allElements;
  }, '');
  containerElement.innerHTML = elementStr;
};

export const renderDeleteModal = (): void => {
  containerElement.insertAdjacentHTML('beforebegin', templateDeleteModalElement());
};

export const renderEditModal = (value: string): void => {
  containerElement.insertAdjacentHTML('beforebegin', templateEditModalElement(value));
};
