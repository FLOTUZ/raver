import { Event } from "@/interfaces";
import { Button, Card, CardFooter, CardHeader, Image } from "@heroui/react";
import { format, parseISO, startOfDay } from "date-fns";
import { HiOutlineShare } from "react-icons/hi";
import { HeartFilledIcon } from "../core/icons";

interface EventCardComponentProps {
  event: Event;
}
export const EventCardComponent = (props: EventCardComponentProps) => {
  return (
    <Card
      isFooterBlurred
      className="w-full min-w-[300px] h-[500px] col-span-12 sm:col-span-5 cursor-pointer"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <div className="flex items-center gap-2">
          <Button isIconOnly aria-label="Like" variant="light" color="danger">
            <HeartFilledIcon />
          </Button>
          <Button color="primary" size="sm" variant="light" isIconOnly>
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
        className="z-0 w-full h-full -translate-y-6 object-cover hover:scale-125 transition duration-300 ease-in-out"
        src={props.event.image}
      />
      <CardFooter className="absolute bg-black/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-black text-tiny text-white">
            {props.event.location}
          </p>
          <div className="flex flex-row gap-1">
            <p className="text-black text-tiny text-white/60">Hosted by</p>
            <p className="text-tiny text-white/60">{props.event.host}</p>
          </div>
        </div>
        <Button className="text-tiny" size="sm">
          Comprar Tickets
        </Button>
      </CardFooter>
    </Card>
  );
};
