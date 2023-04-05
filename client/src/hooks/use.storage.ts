import { useEffect, useState } from "react";

const getItemByKey = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);

  return JSON.parse(item || "null");
};

export const useStorage = <T>(key: string): [T | null, Function] => {
  const [item, setItem] = useState<T | null>(getItemByKey<T>(key));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(item));
  }, [item]);

  return [item, setItem];
};
