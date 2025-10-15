"use client";

import { addToast, Button, Slider, useDisclosure } from "@heroui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

import { ModalComponent } from "../common/modal.component";

import { useMutation, useQuery } from "@/hooks";
import { Event, PreRegister } from "@/interfaces";

export const ShowRegisteredComponent = () => {
  const router = useRouter();
  const params = useParams();
  const { registered_id } = params;
  const { isOpen, onOpenChange } = useDisclosure();

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

  const {
    error: ticketBuyError,
    loading: ticketBuyLoading,
    mutate: BUY_TICKET,
  } = useMutation({
    url: `/api/tickets`,
    method: "POST",
    onSuccess: async (_) => {
      onOpenChange();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.back();
      router.refresh();
    },
    onError: (error: any) => {
      addToast({
        title: error.response?.data.error,
        variant: "solid",
        color: "danger",
      });
    },
  });

  useEffect(() => {
    if (registered) {
      GET_EVENT();
    }
  }, [registered]);

  if (loading || eventLoading) {
    return <div>Loading...</div>;
  }

  if (ticketBuyLoading) {
    return (
      <div className="flex flex-col gap-4 m-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Cobrando ticket...</h1>
        </div>
      </div>
    );
  }

  return (
    <>
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
          onChange={async (value) => {
            if (value !== 100) return;

            await BUY_TICKET({
              event_id: event?.id,
              pre_register_id: registered?.id,
              amount: value,
            });
          }}
        />
      </div>

      <ModalComponent
        body={
          <div className="flex flex-col">
            <div>Se ha cobrado el ticket</div>
            <FaCheck className="text-4xl text-green-500" />
          </div>
        }
        header={<div> Ticket cobrado con exito </div>}
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
      />
    </>
  );
};
