import { Sections } from './fetch';
import { createColumnElement } from './column';
import { columnWrapElement } from './eventManager';

export const initialRender = (sections: Array<Sections>, userName: string): void => {
  const elementStr = sections.reduce((allElements: string, eachSection: Sections) => {
    allElements += createColumnElement(eachSection, userName);
    return allElements;
  }, '');
  columnWrapElement.innerHTML = elementStr;
};
