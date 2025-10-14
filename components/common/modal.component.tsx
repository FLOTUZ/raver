import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

interface ModalComponentProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  header: React.ReactNode | React.ReactNode[];
  body: React.ReactNode | React.ReactNode[];
  footer?: React.ReactNode | React.ReactNode[];
  placement?:
    | "auto"
    | "top"
    | "bottom"
    | "center"
    | "top-center"
    | "bottom-center";
}
export const ModalComponent = ({
  isOpen,
  onOpenChange,
  header,
  body,
  footer,
  placement,
}: ModalComponentProps) => {
  return (
    <Modal
      isOpen={isOpen}
      placement={placement}
      size="5xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
          <ModalBody>{body}</ModalBody>
          <ModalFooter>{footer}</ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};
