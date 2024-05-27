import {
  Modal,
  Button,
  Group,
  TextInput,
  Checkbox,
  NumberInput,
  Table,
} from "@mantine/core";
import { CostType, MatterType } from "@/app/types/types";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

type Props = {
  matterInfo: MatterType;
  costInfoList: CostType[];
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export function MatterCardDetailModal(props: Props) {
  const { matterInfo, costInfoList, opened } = props;
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
      costInfoList: [] as CostType[],
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
      costInfoList: costInfoList,
    });
  }, [matterInfo, costInfoList]);

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
          label="分類"
          placeholder="案件の分類をご記入ください。"
          {...form.getInputProps("classification")}
        />
        <NumberInput
          label="金額"
          placeholder="金額をご記入ください。"
          min={0}
          {...form.getInputProps("billing_amount")}
        />
        {/* <Group flex={3}>{cost.name}</Group> */}

        <Checkbox
          mt="md"
          label="確定"
          {...form.getInputProps("isFixed", { type: "checkbox" })}
        />
        <div className="border-spacing-3 h-6"></div>

        <Table>
          <thead>
            <tr>
              <th>コスト名</th>
              <th>項目</th>
              <th>金額</th>
            </tr>
          </thead>
          <tbody>
            {form.values.costInfoList.map((costInfo, index) => (
              <tr key={costInfo.id}>
                <td>{costInfo.name}</td>
                <td>
                  <TextInput
                    value={costInfo.item ? costInfo.item : ""}
                    onChange={(event) =>
                      form.setFieldValue(
                        `costInfoList.${index}.item`,
                        event.currentTarget.value,
                      )
                    }
                  />
                </td>
                <td>
                  <NumberInput
                    value={costInfo.price ? costInfo.price : 0}
                    onChange={(value) =>
                      form.setFieldValue(
                        `costInfoList.${index}.price`,
                        value || 0,
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Group justify="flex-end" mt="md">
          <Button type="submit" color="pink">
            キャンセル
          </Button>
          <Button type="submit" color="green">
            更新
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
