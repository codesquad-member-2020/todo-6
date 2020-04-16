import { _q, addClass, removeClass, hasClass, toggleClass } from '../utils/utils';
import { ICON_TYPE, UTIL_CLASS } from '../utils/constants';
import htmlElements from '../utils/htmlElement';
import { Activity, templateActivityElement, templateAllActivityElement } from './activity';

export const SIDE_MENU_CLASS = {
  sidemenu: 'sidemenu',
  headerButton: 'material-icons sidemenu-btn icon-primary-btn',
  activityList: 'activity-container',
};

const SIDE_MENU_ATOM = {
  activityList: (activityList: Array<Activity>): string => templateAllActivityElement(activityList),
};

export const sideMenuElement: HTMLElement = _q(`.${SIDE_MENU_CLASS.sidemenu}`);

export const activityListElement: HTMLElement = sideMenuElement.querySelector(`.${SIDE_MENU_CLASS.activityList}`);

export const updateActivityListElement = (activityList: Array<Activity>): void => {
  const updatedActivityList = [];
  activityListElement.insertAdjacentHTML('afterbegin', templateAllActivityElement(updatedActivityList));
};

export const clickSideMenuButton = ({ target }: Event): void => {
  if (target.className !== SIDE_MENU_CLASS.headerButton) return;
  removeClass(UTIL_CLASS.slideIn, sideMenuElement);
  addClass(UTIL_CLASS.slideOut, sideMenuElement);
};

const animationEndHandler = ({ target }: Event): void => {
  if (hasClass(UTIL_CLASS.slideIn, target)) return;
  toggleClass(UTIL_CLASS.hidden, sideMenuElement);
};

export const templateSideMenuElement = (activityList: Array<Activity>): string => {
  return SIDE_MENU_ATOM.activityList(activityList);
};

export const sideMenuEventListener = (): void => {
  sideMenuElement.addEventListener('click', clickSideMenuButton);
  sideMenuElement.addEventListener('animationend', animationEndHandler);
};
