import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
} from "@heroui/react";
import { IconType } from "react-icons";

import { Logo } from "./icons";
import { ThemeSwitch } from "./theme-switch";

interface ProfileDrawerComponentProps {
  drawerItems: { label: string; href: string; icon: IconType }[];
  children: React.ReactNode;
}
export const ProfileDrawerComponent = (props: ProfileDrawerComponentProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button isIconOnly variant="light" onPress={onOpen}>
        {props.children}
      </Button>

      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(_) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 flex-direction-row items-center">
                <Logo />
                <h4 className="font-bold">RAVR</h4>
              </DrawerHeader>
              <DrawerBody>
                {props.drawerItems.map((item, index) => (
                  <Button
                    key={index}
                    className="w-full flex justify-start items-center gap-2 hover:bg-default-100 hover:text-default-600"
                    startContent={
                      <item.icon className="text-default-400" size={20} />
                    }
                  >
                    <p className="text-sm color-red font-semibold">
                      {item.label}
                    </p>
                  </Button>
                ))}
              </DrawerBody>
              <DrawerFooter>
                <ThemeSwitch />
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
