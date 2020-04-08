import { Column } from './columnModel';

interface IColumnSet {
  columns: Array<Column>;
}

export class ColumnSet implements IColumnSet {
  columns: Array<Column>;
  constructor() {
    this.columns = [];
  }

  getColumn(index: number): Column {
    return this.columns[index];
  }

  addColumn(title: string): void {
    this.columns.push(new Column(title));
  }

  insertColumn(index: number, column: Column): void {
    this.columns.splice(index, 0, column);
  }

  removeColumn(index: number): void {
    this.columns.splice(index, 1);
  }

  moveCard(before: object, after: object): void {
    const { beforeColumnIndex, targetCard } = before;
    const { afterColumnIndex, targetIndex } = after;
    const beforeColumn = this.getColumn(beforeColumnIndex);
    const afterColumn = this.getColumn(afterColumnIndex);
    afterColumn.insertCard(targetIndex, targetCard);
    beforeColumn.removeCard(beforeColumn.getCardIndex(targetCard));
  }
}
