import { toast } from "sonner";
import { useCallback, useState } from "react";

export const useFetch = (callbackFunction: any, options = {}) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(false);
  const [isError, setIsError] = useState<string | null | any>(null);

  const fn = useCallback(async (...args: any): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await callbackFunction(options, ...args);
      setData(response);
      return response;
    } catch (error: any) {
      toast.error(error.message);
      setIsError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, isError, fn };
};
