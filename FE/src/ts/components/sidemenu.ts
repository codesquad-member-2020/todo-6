import { _q } from '../utils/utils';
import { ICON_TYPE } from '../utils/constants';
import htmlElements from '../utils/htmlElement';
import { Activity, templateActivityElement, templateAllActivityElement } from './activity';

export const SIDE_MENU_CLASS = {
  sidemenu: 'sidemenu',
  header: 'header-wrap sidemenu-header',
  headerButton: 'material-icons sidemenu-btn icon-primary-btn',
  title: 'sidemenu-title',
  activityList: 'activity-container',
};

const SIDE_MENU_TITLE = 'Activity';

const SIDE_MENU_ATOM = {
  header: htmlElements.div(SIDE_MENU_CLASS.header, htmlElements.button(SIDE_MENU_CLASS.headerButton, ICON_TYPE.menu), htmlElements.h2(SIDE_MENU_CLASS.title, SIDE_MENU_TITLE)),
  activityList: (activityList: Array<Activity>): string => htmlElements.ul(SIDE_MENU_CLASS.activityList, templateAllActivityElement(activityList)),
};

export const sideMenuElement = (): HTMLElement => _q(`.${SIDE_MENU_CLASS.sidemenu}`);

export const activityListElement = (): HTMLElement => _q(`.${SIDE_MENU_CLASS.activityList}`);

export const templateSideMenuElement = (activityList: Array<Activity>): string => {
  return `<div class="${SIDE_MENU_CLASS.sidemenu}">
  ${SIDE_MENU_ATOM.header}
  ${SIDE_MENU_ATOM.activityList(activityList)}
  </div>`;
};
