import { useEffect, useRef } from 'react';

export const usePortal = (id: string) => {
  const rootElemRef = useRef(document.createElement('div'));
  useEffect(() => {
    const parentElem = document.querySelector(`#${id}`);
    if (parentElem) {
      parentElem.appendChild(rootElemRef.current);
    } else {
      console.error(`usePortal id ${id} not found`);
    }

    return function removeElement() {
      rootElemRef.current.remove();
    };
  }, []);

  return rootElemRef.current;
};
