import { MatterType } from "@/app/types/types";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

type Props = {
  matterInfo: MatterType;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export function MatterCardDetailModal(props: Props) {
  const { matterInfo, opened } = props;
  const form = useForm({
    initialValues: {
      id: 0,
      title: "" as string | null,
      created_at: "",
      classification: "" as string | null,
      completed: false,
      billing_amount: null as number | null,
      isFixed: false,
      user_id: null as number | null,
    },
  });

  useEffect(() => {
    form.setValues({
      id: matterInfo.id,
      title: matterInfo.title,
      created_at: matterInfo.created_at,
      classification: matterInfo.classification,
      completed: matterInfo.completed,
      billing_amount: matterInfo.billing_amount,
      isFixed: matterInfo.isFixed,
      user_id: matterInfo.user_id,
    });
  }, [matterInfo]);

  const closeModal = () => {
    props.setOpened(false);
  };

  return (
    <Modal opened={opened} onClose={closeModal} title={matterInfo.title}>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="案件名"
          placeholder="案件名をご記入ください。"
          {...form.getInputProps("title")}
        />
        <TextInput
          withAsterisk
          label="分類"
          placeholder="案件の分類をご記入ください。"
          {...form.getInputProps("classification")}
        />

        <Checkbox
          mt="md"
          label="確定"
          {...form.getInputProps("isFixed", { type: "checkbox" })}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Modal>
  );
}
