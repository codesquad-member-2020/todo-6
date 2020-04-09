import { ICON_TYPE } from '../utils/constants';
import { _q } from '../utils/utils';
import { columnWrapElement } from './eventManager';
import { createTextareaElement } from './inputForm';
import { createAllCardElement } from './card';
import { Sections } from './fetch';

export const COLUMN_CLASS = {
  id: (idNum: number): string => {
    return `${idNum}c`;
  },
  column: 'column',
  titleWrap: 'column-title-wrap',
  cardSize: 'column-number',
  title: 'column-title',
  buttonWrap: 'column-button-wrap',
  addButton: 'edit-btn icon-secondary-btn material-icons',
  deleteButton: 'delete-btn icon-secondary-btn material-icons',
  cardWrap: 'card-wrap',
};

const COLUMN_ATOM = {
  titleAtoms: (atoms: string): string => `<div class="${COLUMN_CLASS.titleWrap}">${atoms}</div>`,
  cardCount: (count: number): string => `<div class="${COLUMN_CLASS.cardSize}">${count}</div>`,
  title: (name: string): string => `<h2 class="${COLUMN_CLASS.title}">${name}</h2>`,
  buttons: `<div class="${COLUMN_CLASS.buttonWrap}"><button class="${COLUMN_CLASS.addButton}">${ICON_TYPE.add}</button><button class="${COLUMN_CLASS.deleteButton}">${ICON_TYPE.delete}</button></div>`,
  textarea: createTextareaElement(),
  cards: (id: number, userName: string, cards: Array<any>): string => `<div class="${COLUMN_CLASS.cardWrap}">${createAllCardElement(COLUMN_CLASS.id(id), cards, userName)}</div>`,
};

export const createColumnElement = ({ id, name, cards }: Sections, userName: string): string => {
  const cardSize = Object.keys(cards).length;
  return `<div id="${COLUMN_CLASS.id(id)}" class="${COLUMN_CLASS.column}">
  ${COLUMN_ATOM.titleAtoms(`${COLUMN_ATOM.cardCount(cardSize)}${COLUMN_ATOM.title(name)}${COLUMN_ATOM.buttons}`)}
  ${COLUMN_ATOM.textarea}
  ${COLUMN_ATOM.cards(id, userName, cards)}</div>`;
};

export const initialRender = (sections: Array<Sections>, userName: string): void => {
  const elementStr = sections.reduce((allElements: string, eachSection: Sections) => {
    allElements += createColumnElement(eachSection, userName);
    return allElements;
  }, '');
  columnWrapElement.innerHTML = elementStr;
};
