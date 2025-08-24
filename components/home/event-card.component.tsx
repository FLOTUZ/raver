import { Event } from "@/interfaces";
import { Button, Card, CardFooter, CardHeader, Image } from "@heroui/react";
import { format, parseISO, startOfDay } from "date-fns";
import { useState } from "react";
import { HiOutlineShare } from "react-icons/hi";
import { HeartFilledIcon, HeartIcon } from "../core/icons";

interface EventCardComponentProps {
  event: Event;
  onClick: (event: Event) => void;
  onLike: (event: Event) => void;
}
export const EventCardComponent = (props: EventCardComponentProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  return (
    <div onClick={() => props.onClick(props.event)}>
      <Card
        isFooterBlurred
        className="w-full min-w-[300px] h-[500px] col-span-12 sm:col-span-5 cursor-pointer"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <div className="flex items-center gap-1">
            <Button
              isIconOnly
              aria-label="Like"
              variant="light"
              color="danger"
              onPress={() => {
                setIsLiked(!isLiked);
              }}
            >
              {isLiked ? (
                <HeartFilledIcon />
              ) : (
                <HeartIcon filled fill="white" />
              )}
            </Button>
            <Button
              isIconOnly
              aria-label="Take a photo"
              variant="light"
              onPress={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            >
              <HiOutlineShare
                size={20}
                style={{ color: "white", opacity: 0.7 }}
              />
            </Button>
          </div>
          <p className="text-tiny text-white/60 uppercase font-bold">
            {startOfDay(parseISO(props.event.created_at)) ==
            startOfDay(new Date())
              ? "Nuevo"
              : format(parseISO(props.event.init_date), "dd.MM.yyyy - HH:mm")}
          </p>
          <h4 className="text-black font-medium text-2xl dark:text-white">
            {props.event.name}
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full  object-cover hover:scale-125 transition duration-300 ease-in-out"
          src={props.event.image}
        />
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-0 px-0 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <div>
            <p className="text-black text-tiny text-white">
              {props.event.location}
            </p>
            <div className="flex flex-row gap-1">
              <p className="text-black text-tiny text-white/60">Hosted by</p>
              <p className="text-tiny text-white/60">{props.event.host}</p>
            </div>
          </div>
          <Button
            className="text-tiny text-white bg-black/20"
            color="default"
            radius="lg"
            size="md"
            variant="flat"
            onPress={() => {
              props.onClick(props.event);
            }}
          >
            Comprar Entradas
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
