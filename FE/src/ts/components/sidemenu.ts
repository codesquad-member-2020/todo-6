import { _q, addClass, removeClass, hasClass, toggleClass } from '../utils/utils';
import { UTIL_CLASS } from '../utils/constants';
import { Activity, templateAllActivityElement } from './activity';
import { fetchActivityList } from './fetch';

const SIDE_MENU_CLASS = {
  sidemenu: 'sidemenu',
  headerButton: 'material-icons sidemenu-btn icon-primary-btn',
  activityList: 'activity-container',
};

export const sideMenuElement: HTMLElement = _q(`.${SIDE_MENU_CLASS.sidemenu}`);

export const activityListElement: HTMLElement = sideMenuElement.querySelector(`.${SIDE_MENU_CLASS.activityList}`);

let activityList: Array<Activity> = [];

const clickSideMenuButton = ({ target }: Event): void => {
  if (target.className !== SIDE_MENU_CLASS.headerButton) return;
  removeClass(UTIL_CLASS.slideIn, sideMenuElement);
  addClass(UTIL_CLASS.slideOut, sideMenuElement);
};

const animationEndHandler = ({ target }: Event): void => {
  if (hasClass(UTIL_CLASS.slideIn, target)) return;
  toggleClass(UTIL_CLASS.hidden, sideMenuElement);
};

export const sideMenuEventListener = (): void => {
  sideMenuElement.addEventListener('click', clickSideMenuButton);
  sideMenuElement.addEventListener('animationend', animationEndHandler);
};

export const initialRenderActivityList = async (): Promise<void> => {
  activityList = await fetchActivityList();
  activityListElement.innerHTML = templateAllActivityElement(activityList);
};

export const updateActivityList = async (): Promise<void> => {
  const updatedList: Array<Activity> = await fetchActivityList();
  const changedListLength: number = updatedList.length - activityList.length;
  const changedList: Array<Activity> = [];
  for (let index = 0; index < changedListLength; index++) {
    changedList.push(updatedList[index]);
  }
  activityListElement.insertAdjacentHTML('afterbegin', templateAllActivityElement(changedList));
  activityList = updatedList;
};
