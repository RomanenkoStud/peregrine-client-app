interface CategoryModalProps {
  type?: "create" | "edit";
  isModalOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import { CreateCategoryForm } from "../forms/CreateCategoryForm";

export const CategoryModal = ({
  type = "create",
  isModalOpen = false,
  onOpenChange,
}: CategoryModalProps) => {
  return (
    <>
      <Modal isOpen={isModalOpen} onOpenChange={onOpenChange}>
        <ModalContent className="text-black">
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-xl">
                Add Category
              </ModalHeader>
              <ModalBody className="py-2">
                <CreateCategoryForm />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
