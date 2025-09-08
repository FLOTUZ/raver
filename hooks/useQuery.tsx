"use client";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseQueryConfig<T> {
  url: string;
  isLazy?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
}

export function useQuery<InputInterface, ResponseInterface>(
  config: UseQueryConfig<ResponseInterface>
) {
  const { url, isLazy = false, onSuccess, onError } = config;

  const [data, setData] = useState<ResponseInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(!isLazy);
  const [error, setError] = useState<AxiosError | null>(null);

  const didRun = useRef(false);

  const fetchData = useCallback(
    async (newData?: InputInterface): Promise<ResponseInterface | null> => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const axiosConfig: AxiosRequestConfig = {
        method: "GET",
        url: url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: newData,
      };

      try {
        const response = await axios.request<ResponseInterface>(axiosConfig);

        setData(response.data);
        if (onSuccess) onSuccess(response.data);

        return response.data;
      } catch (err) {
        const axiosError = err as AxiosError;

        setError(axiosError);
        if (onError) onError(axiosError);

        return null;
      } finally {
        setLoading(false);
      }
    },
    [url, onSuccess, onError]
  );

  useEffect(() => {
    if (!isLazy && !didRun.current) {
      didRun.current = true;
      fetchData();
    }
  }, [fetchData, isLazy]);

  const refetch = (newData?: InputInterface) => {
    // Si la petición ya corrió una vez, permite que refetch la corra de nuevo
    if (didRun.current) {
      fetchData(newData);
    }
  };

  return { data, loading, error, refetch };
}
