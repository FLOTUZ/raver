"use client";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseQueryConfig<T> {
  url: string;
  isLazy?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
  keepData?: boolean;
}

export function useQuery<InputInterface, ResponseInterface>(
  config: UseQueryConfig<ResponseInterface>
) {
  const { url, isLazy = false, onSuccess, onError, keepData = false } = config;

  const [data, setData] = useState<ResponseInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(!isLazy);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

  const didRun = useRef(false);

  const fetchData = useCallback(
    async (newData?: InputInterface): Promise<ResponseInterface | null> => {
      // Si ya hay datos y `keepData` es true, usamos `isFetchingMore`
      if (keepData && data) {
        setIsFetchingMore(true);
      } else {
        // En cualquier otro caso, usamos el `loading` principal
        setLoading(true);
      }
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

        // Concatenar datos si keepData es true y los datos son arrays
        if (keepData && Array.isArray(data) && Array.isArray(response.data)) {
          setData([...data, ...response.data] as unknown as ResponseInterface);
        } else {
          setData(response.data);
        }

        if (onSuccess) onSuccess(response.data);

        return response.data;
      } catch (err) {
        const axiosError = err as AxiosError;

        setError(axiosError);
        if (onError) onError(axiosError);

        return null;
      } finally {
        // Al terminar, siempre restablecemos ambos estados de carga a false
        setLoading(false);
        setIsFetchingMore(false);
      }
    },
    [url, onSuccess, onError, data, keepData]
  );

  useEffect(() => {
    if (!isLazy && !didRun.current) {
      didRun.current = true;
      fetchData();
    }
  }, [fetchData, isLazy]);

  const refetch = (newData?: InputInterface) => {
    if (didRun.current) {
      fetchData(newData);
    }
  };

  return { data, loading, error, refetch, isFetchingMore };
}
