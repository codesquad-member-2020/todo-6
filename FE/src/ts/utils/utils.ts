export const _q = (str: string): HTMLElement => document.querySelector(str);

export const _qa = (str: string): NodeListOf<HTMLElement> => document.querySelectorAll<HTMLElement>(str);

export const pipe = (...fns: Array<Function>) => (value: any) => fns.reduce((acc, fn) => fn(acc), value);

export const addClass = (className: string, target: HTMLElement): void => target.classList.add(className);

export const removeClass = (className: string, target: HTMLElement): void => target.classList.remove(className);

export const addMultipleClass = (classNames: Array<string>, target: HTMLElement): void => classNames.forEach(className => target.classList.add(className));

export const removeMultipleClass = (classNames: Array<string>, target: HTMLElement): void => classNames.forEach(className => target.classList.remove(className));

export const hasClass = (className: string, target: HTMLElement): boolean => target.classList.contains(className);

export const toggleClass = (className: string, target: HTMLElement): void => {
  if (hasClass(className, target)) removeClass(className, target);
  else addClass(className, target);
};

export const reverseClass = (className: string, addTarget: HTMLElement, removeTarget: HTMLElement): void => {
  addClass(className, addTarget);
  removeClass(className, removeTarget);
};

export const clearClass = (classes: Array<string>, target: HTMLElement): void => target.classList.remove(...classes);

export const addMultipleEventListener = (target: HTMLElement, callback: Function, ...event: Array<string>) => event.forEach(eachEvent => target.addEventListener(eachEvent, e => callback(e)));
