import { Column } from './columnModel';
import { Card } from './cardModel';

interface IColumnSet {
  columns: Array<Column>;
}

interface IbeforeMoveData {
  beforeColumnIndex: number;
  targetCard: Card;
}

interface IafterMoveData {
  afterColumnIndex: number;
  targetIndex: number;
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
    const { title, cards } = column;
    this.columns.splice(index, 0, new Column(title, cards));
  }

  removeColumn(index: number): void {
    this.columns.splice(index, 1);
  }

  moveCard(before: IbeforeMoveData, after: IafterMoveData): void {
    const { beforeColumnIndex, targetCard } = before;
    const { afterColumnIndex = beforeColumnIndex, targetIndex } = after;
    const beforeColumn = this.getColumn(beforeColumnIndex);
    const afterColumn = this.getColumn(afterColumnIndex);
    afterColumn.insertCard(targetIndex, targetCard);
    beforeColumn.removeCard(beforeColumn.getCardIndex(targetCard));
  }
}

const c = new ColumnSet();

c.addColumn('해야할 일');
c.addColumn('하는 중');
console.log(c);

c.columns[0].addCard('낚시', '성익');
c.columns[1].addCard('쇼핑', '희수');
console.log(c.columns);

const be = {
  beforeColumnIndex: 0,
  targetCard: { content: '낚시', author: '성익' },
};
const af = { afterColumnIndex: 1, targetIndex: 2 };

c.moveCard(be, af);
console.log(c.columns[0].cards);
console.log(c.columns[1].cards);
