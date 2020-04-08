import { ICON_TYPE } from '../utils/constants';
import { CardView } from './cardView';

interface IColumnView {
  cards: Array<CardView>;
  title: string;
  cardSize: number;
}

const CLASS_NAME = {
  column: 'column',
  titleWrap: 'column-title-wrap',
  cardSize: 'column-number',
  title: 'column-title',
  buttonWrap: 'column-button-wrap',
  addButton: 'edit-btn icon-secondary-btn material-icons',
  deleteButton: 'delete-btn icon-secondary-btn material-icons',
  inputWrap: 'todo-input-wrap hidden',
  textarea: 'todo-textarea',
  inputButtonWrap: 'input-btn-wrap',
  primaryButton: 'primary-btn',
  cancelButton: 'cancel-btn',
  cardWrap: 'card-wrap',
};

const TEXTAREA_MAX_LENGTH: number = 500;
const TEXTAREA_PLACEHOLDER: string = '할 일을 입력하세요';
const PRIMARY_BUTTON_TEXT: string = '할 일 추가';
const CANCEL_BUTTON_TEXT: string = '취소';

export class ColumnView implements IColumnView {
  constructor(
    public cards: Array<CardView>,
    public title: string,
    public cardSize: number,
  ) {}

  generateCardsComponent(): string {
    return this.cards.reduce((cardsComponent, card) => {
      cardsComponent += card.generateCardComponent();
      return cardsComponent;
    }, '');
  }

  generateColumnComponent(): string {
    return `<div class="${CLASS_NAME.column}"><div class="${
      CLASS_NAME.titleWrap
    }"><div class="${CLASS_NAME.cardSize}">${this.cardSize}</div>
    <h2 class="${CLASS_NAME.title}">${this.title}</h2><div class="${
      CLASS_NAME.buttonWrap
    }">
    <button class="${CLASS_NAME.addButton}">${ICON_TYPE.add}</button>
    <button class="${CLASS_NAME.deleteButton}">${ICON_TYPE.delete}</button>
    </div></div>${this.generateInputComponent()}<div class="${
      CLASS_NAME.cardWrap
    }"></div></div>`;
  }

  generateInputComponent(): string {
    return `<div class="${CLASS_NAME.inputWrap}">
    <textarea name="${CLASS_NAME.textarea}" id = "${CLASS_NAME.textarea}" maxlength = "${TEXTAREA_MAX_LENGTH}" placeholder = "${TEXTAREA_PLACEHOLDER}"></textarea>
    <div class="${CLASS_NAME.inputButtonWrap}"><button class="${CLASS_NAME.primaryButton}">${PRIMARY_BUTTON_TEXT}</button>
    <button class="${CLASS_NAME.cancelButton}">${CANCEL_BUTTON_TEXT}</button></div></div>`;
  }
}
