import { ColumnSetModel } from '../model/columnSetModel';
import { ColumnView } from '../view/columnView';

const c = new ColumnSetModel();

c.addColumn('해야할 일');
c.addColumn('하는 중');
console.log(c);

c.columns[0].addCardModel('낚시', '성익');
c.columns[1].addCardModel('쇼핑', '희수');
console.log(c.columns);

const be = {
  beforeColumnIndex: 0,
  targetCard: { content: '낚시', author: '성익' },
};
const af = { afterColumnIndex: 1, targetIndex: 2 };

c.moveCardModel(be, af);
console.log(c.columns[0].cards);
console.log(c.columns[1].cards);
