import htmlElements from '../utils/htmlElement';

export interface Activity {
  id: number;
  action: string;
  source: string;
  destination: string;
  card: string;
  createdAt: string;
  userId: string;
}

const ACTIVITY_CLASS = {
  list: 'activity-list',
  text: 'activity-text',
  bold: 'activity-todo',
  time: 'activity-time small-text',
};

const calculateCreatedTime = (createdTime: string): string => {
  const time = createdTime.replace(' ', 'T').concat('Z');
  const seconds = Math.floor((Date.now() - Date.parse(time)) / 1000);
  console.log(Date.now(), time, Date.parse(time));
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return interval + '년';
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return interval + '달';
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return interval + '일';
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return interval + '시간';
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return interval + '분';
  if (Math.floor(seconds) < 10) return '방금';
  return Math.floor(seconds) + '초';
};

const getActivityString = (activity: Activity): string => {
  let action;
  const userId = htmlElements.strong(`@${activity.userId}: `);
  const createdTime = htmlElements.span(ACTIVITY_CLASS.time, `${calculateCreatedTime(activity.createdAt)} 전`);
  switch (activity.action) {
    case 'ADD':
      action = `${htmlElements.strong(activity.card, ACTIVITY_CLASS.bold)} 을(를) ${htmlElements.strong(activity.source)} 에 추가했습니다.`;
      break;
    case 'UPDATE':
      action = `${htmlElements.strong(activity.card, ACTIVITY_CLASS.bold)} 을(를) 수정했습니다.`;
      break;
    case 'DELETE':
      action = `${htmlElements.strong(activity.card, ACTIVITY_CLASS.bold)} 을(를) 삭제했습니다.`;
      break;
    case 'MOVE':
      if (activity.source !== activity.destination) {
        action = `${htmlElements.strong(activity.card, ACTIVITY_CLASS.bold)} 을(를) ${htmlElements.strong(activity.source)} 에서 ${htmlElements.strong(activity.destination)} 으로 이동했습니다.`;
      } else action = `${htmlElements.strong(activity.card, ACTIVITY_CLASS.bold)} 의 순서를 변경했습니다.`;
      break;
    default:
      return '';
  }
  return `${userId}${action}${createdTime}`;
};

export const templateActivityElement = (activity: Activity): string => {
  return htmlElements.li(ACTIVITY_CLASS.list, getActivityString(activity));
};

export const templateAllActivityElement = (activityList: Array<Activity>): string => {
  return activityList.reduce((allactivityElement: string, eachActivity: Activity): string => {
    allactivityElement += templateActivityElement(eachActivity);
    return allactivityElement;
  }, '');
};
