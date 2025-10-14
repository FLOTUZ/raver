"use client";

import { Button, Slider } from "@heroui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";

import { useQuery } from "@/hooks";
import { Event, PreRegister } from "@/interfaces";

export const ShowRegisteredComponent = () => {
  const router = useRouter();
  const params = useParams();
  const { registered_id } = params;

  const { data: registered, loading } = useQuery<{}, PreRegister>({
    url: `/api/pre-register/${registered_id}`,
  });

  const {
    data: event,
    loading: eventLoading,
    refetch: GET_EVENT,
  } = useQuery<{}, Event>({
    url: `/api/events/${registered?.event_id}`,
    isLazy: true,
  });

  useEffect(() => {
    if (registered) {
      GET_EVENT();
    }
  }, [registered]);

  if (loading || eventLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="flex items-center gap-4">
        <Button isIconOnly onPress={() => router.back()}>
          <IoIosArrowBack />
        </Button>
        <h1 className="text-3xl font-bold">Cobrar ticket</h1>
      </div>

      <div className="flex flex-col">
        <div>
          <div className="font-bold">Cobrar a:</div> {registered?.name}
        </div>
        <div className="mt-2">
          <div className="font-bold">La cantidad de:</div> ${event?.price}
        </div>
      </div>

      <div className="text-center">Deslize para cobrar</div>

      <Slider
        aria-label="Deslize para cobrar"
        className="w-full"
        color="success"
        defaultValue={0}
        maxValue={100}
        minValue={0}
        size="lg"
        step={5}
        onChange={(value) => console.log(`Deslize del ${value}%`)}
      />
    </div>
  );
};
