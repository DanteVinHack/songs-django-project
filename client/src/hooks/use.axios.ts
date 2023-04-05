import axios from "axios";
import { useEffect, useState } from "react";
import { IUseAxios, IUseAxiosOptions } from "../types/auth";

export const useAxios = <T>(url: string, method: Method = 'get', {
  body,
  headers
}: IUseAxiosOptions): IUseAxios<T> => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetching = async (url: string) => {
    setIsLoading(true);
    try {
      const response = await axios[method]<T>(url, {
        headers,
        body: body || {}
      });

      setData(response.data);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetching(url);
  }, [data, error]);

  return {
    data,
    error,
    isLoading,
  };
};
