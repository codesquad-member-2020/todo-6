import { ColumnView } from './columnView';
import { _q } from '../utils/utils';

const COLUMN_WRAP_CLASS_NAME = 'column-wrap';

interface IColumnSetView {
  columns: Array<ColumnView>;
  element: any;
}

export class ColumnSetView implements IColumnSetView {
  columns: Array<ColumnView>;
  element: any;
  constructor() {
    this.columns = [];
    this.element = _q(`.${COLUMN_WRAP_CLASS_NAME}`);
  }

  addColumn(title: string): void {
    this.columns.push(new ColumnView(title));
  }

  render(): void {
    const columnHTML = this.columns.reduce((allColumnComponent, column) => {
      allColumnComponent += column.generateColumnComponent();
      return allColumnComponent;
    }, '');
    this.element.innerHTML = columnHTML;
  }
}
