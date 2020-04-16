import { _q, addClass, removeClass, toggleClass } from '../utils/utils';
import { UTIL_CLASS } from '../utils/constants';
import { sideMenuElement } from './sidemenu';

const HEADER_CLASS = {
  header: 'main-header',
  headerButton: 'menu-btn',
};

const headerElement: HTMLElement = _q(`.${HEADER_CLASS.header}`);

const clickHeaderButton = ({ target }: Event): void => {
  if (!target.classList.contains(HEADER_CLASS.headerButton)) return;
  toggleClass(UTIL_CLASS.hidden, sideMenuElement);
  addClass(UTIL_CLASS.slideIn, sideMenuElement);
  removeClass(UTIL_CLASS.slideOut, sideMenuElement);
};

const headerEventListener = (): void => {
  headerElement.addEventListener('click', clickHeaderButton);
};

export default headerEventListener;
