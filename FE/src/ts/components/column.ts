import { ICON_TYPE } from '../utils/constants';
import { _q } from '../utils/utils';
import createTextareaElement from './textarea';
import { createCardElement } from './card';
import { Sections } from './fetch';

const CLASS_NAME = {
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

const createColumnElement = ({ id, name, cards }: Sections, userName: string): string => {
  const cardSize = Object.keys(cards).length;
  return `<div id="${CLASS_NAME.id(id)}" class="${CLASS_NAME.column}"><div class="${CLASS_NAME.titleWrap}"><div class="${CLASS_NAME.cardSize}">${cardSize}</div>
    <h2 class="${CLASS_NAME.title}">${name}</h2><div class="${CLASS_NAME.buttonWrap}">
    <button class="${CLASS_NAME.addButton}">${ICON_TYPE.add}</button>
    <button class="${CLASS_NAME.deleteButton}">${ICON_TYPE.delete}</button>
    </div></div>${createTextareaElement()}<div class="${CLASS_NAME.cardWrap}">${createCardElement(CLASS_NAME.id(id), cards, userName)}</div></div>`;
};

export default createColumnElement;
