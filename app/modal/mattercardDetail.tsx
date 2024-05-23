import { Modal, Button, Text } from "@mantine/core";
import { MatterType } from "@/types/types";

type Props = {
  opened: boolean;
  setOpened: any;
  matterInfo: MatterType;
};

export function MatterCardDetailModal(props: Props) {
  const matter = props.matterInfo;

  const closeModal = () => {
    props.setOpened(false);
  };
  return (
    <>
      <Modal opened={props.opened} onClose={closeModal} title="案件の詳細">
        <Text>{matter.title}</Text>
      </Modal>

      {/* <Button onClick={open}>Open modal</Button> */}
    </>
  );
}
