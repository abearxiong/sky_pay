// import { nanoid } from 'nanoid';
import { RefObject, SyntheticEvent } from 'react';
const randomId = () => {
  return crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
};
const loadChidren = (element: any, children: any[]) => {
  children.forEach((child) => {
    if (typeof child === 'boolean') {
      return;
    }
    if (typeof child === 'function') {
      // console.log('child', child);
      return;
    }
    if (typeof child === 'undefined') {
      return;
    }
    // console.log('child', child);
    element.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  });
};
// 在项目中定义 h 函数
export function h(type: string | Function, props: any, ...children: any[]): HTMLElement {
  if (typeof type === 'function') {
    const element = type(props);
    loadChidren(element, children);
    return element;
  }
  const element = document.createElement(type);
  const filterKeys = ['onLoad', 'onUnload', 'key'];
  const key = props?.key || randomId();
  Object.entries(props || {}).forEach(([key, value]) => {
    if (filterKeys.includes(key)) {
      return;
    }
    if (key === 'className') {
      element.setAttribute('class', value as string);
      return;
    }
    if (key.startsWith('on')) {
      element.addEventListener(key.slice(2).toLowerCase(), value as EventListener);
      return;
    }
    if (key === 'ref' && value) {
      (value as any).current = element;
      return;
    }
    if (typeof value === 'object') {
      console.log('error', element, type, value);
    } else {
      element.setAttribute(key, value as string);
    }
  });
  const onLoad = props?.onLoad;
  const checkConnect = () => {
    if (element.isConnected) {
      onLoad?.({ el: element, key, _props: props });
      // console.log('onLoad', element, key);
      return true;
    }
    return false;
  };
  setTimeout(() => {
    const res = checkConnect();
    if (!res) {
      setTimeout(() => {}, 1000);
    }
  }, 20);

  loadChidren(element, children);
  return element;
}

declare global {
  namespace JSX {
    // type Element = HTMLElement; // 将 JSX.Element 设置为 HTMLElement
    interface Element extends HTMLElement {
      class?: string;
    }
  }
  namespace React {
    interface FormEvent<T = Element> extends SyntheticEvent<T> {
      target: EventTarget & (T extends HTMLInputElement ? HTMLInputElement : T);
    }
  }
}

export const useRef = <T = HTMLDivElement>(initialValue: T | null = null): RefObject<T | null> => {
  return { current: initialValue };
};

export const useEffect = (callback: () => void) => {
  setTimeout(callback, 0);
};
