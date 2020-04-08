import { ColumnModel } from './columnModel';
import { CardModel } from './cardModel';

interface IColumnSetModel {
  columns: Array<ColumnModel>;
}

interface IbeforeMoveData {
  beforeColumnIndex: number;
  targetCard: CardModel;
}

interface IafterMoveData {
  afterColumnIndex: number;
  targetIndex: number;
}

export class ColumnSetModel implements IColumnSetModel {
  columns: Array<ColumnModel>;
  constructor() {
    this.columns = [];
  }

  getColumn(index: number): ColumnModel {
    return this.columns[index];
  }

  addColumn(title: string): void {
    this.columns.push(new ColumnModel(title));
  }

  insertColumn(index: number, column: ColumnModel): void {
    const { title, cards } = column;
    this.columns.splice(index, 0, new ColumnModel(title, cards));
  }

  removeColumn(index: number): void {
    this.columns.splice(index, 1);
  }

  moveCardModel(before: IbeforeMoveData, after: IafterMoveData): void {
    const { beforeColumnIndex, targetCard } = before;
    const { afterColumnIndex = beforeColumnIndex, targetIndex } = after;
    const beforeColumn = this.getColumn(beforeColumnIndex);
    const afterColumn = this.getColumn(afterColumnIndex);
    afterColumn.insertCardModel(targetIndex, targetCard);
    beforeColumn.removeCardModel(beforeColumn.getCardModelIndex(targetCard));
  }
}
