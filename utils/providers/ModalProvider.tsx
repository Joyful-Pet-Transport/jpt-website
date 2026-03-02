import { View } from "lucide-react";
import { FC, PropsWithChildren, ReactNode, useState } from "react";
import ModalContext, { ModalOptions } from "../contexts/modal-context";
import DynamicModal from "@/components/elements/modal/DynamicModal";

const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [shown, setShown] = useState<boolean>(false);
  const [modalComponent, setModalComponent] = useState<ReactNode>(
    <View></View>,
  );
  const [modalOptions, setModalOptions] = useState<ModalOptions>({
    size: "medium",
  });

  const showModal = (show: boolean) => {
    setShown(show);
  };

  const setComponent = (
    component: ReactNode,
    size: "normal" | "medium" | "large" | "full",
    className?: string,
    childClass?: string,
  ) => {
    setModalOptions({
      size: size,
      className: className,
      childClass: childClass,
    });
    setModalComponent(component);
  };
  return (
    <ModalContext.Provider
      value={{
        modalOptions: modalOptions,
        shown: shown,
        component: modalComponent,
        setShown: showModal,
        setModalComponent: setComponent,
      }}
    >
      {children}
      <DynamicModal
        childClass={modalOptions.childClass}
        size={modalOptions.size}
        className={modalOptions.className}
        onClose={() => setShown(false)}
        visible={shown}
      >
        {modalComponent}
      </DynamicModal>
    </ModalContext.Provider>
  );
};

export default ModalProvider;
