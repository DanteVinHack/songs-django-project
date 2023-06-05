import { useEffect, useState } from "react";

const getItemByKey = (key: string) => JSON.parse(localStorage.getItem(key));

export const useStorage = <T>(key: string): [T | null, Function] => {
  const [item, setItem] = useState<T | null>(() => getItemByKey(key));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(item));
  }, [item]);

  return [item, setItem];
};
