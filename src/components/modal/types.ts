import type { ColorType, DBPropertiesType } from "db/types";

type ModalProps = {
  emoji: DBPropertiesType | undefined;
  folderName: string;
  isModalOpen: boolean;
  color: ColorType;
  isLargerThanSM: boolean;
  handleModalClose: () => void;
};

export type ModalType = (props: ModalProps) => JSX.Element;
