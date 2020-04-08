import { ColumnSetModel } from '../model/columnSetModel';
import { ColumnSetView } from '../view/columnSetView';

const c = new ColumnSetModel();
const v = new ColumnSetView();

const addColumn = (str: string) => {
  c.addColumn(str);
  v.addColumn(str);
  v.render();
};

addColumn('해야 할 일');
addColumn('하는 중');
addColumn('다 한 일');
