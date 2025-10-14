"use client";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useCallback, useState } from "react";

interface UseMutationConfig<O> {
  url: string;
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  onSuccess?: (data: O) => void;
  onError?: (error: AxiosError) => void;
}

export function useMutation<I, O>(config: UseMutationConfig<O>) {
  const { url, onSuccess, onError } = config;

  const [data, setData] = useState<O | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const mutate = useCallback(
    async (body: I): Promise<O | null> => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const axiosConfig: AxiosRequestConfig = {
        method: config.method,
        url,
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "application/json",
        },
        data: body,
      };

      try {
        const response = await axios.request<O>(axiosConfig);

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

  return {
    data,
    loading,
    error,
    mutate,
  };
}
