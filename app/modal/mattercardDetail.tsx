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
import { useEffect, useState } from "react";
import {
  fetchCostInfoById,
  updateMatterInfo,
} from "../utils/supabase/supabase";

type Props = {
  matterInfo: MatterType;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export function MatterCardDetailModal(props: Props) {
  const { matterInfo, opened } = props;
  const [costInfoList, setCostInfoList] = useState<CostType[]>();
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
    // クライアントサイドで追加データを取得する例
    const getCostInfo = async () => {
      const { costInfoList, error } = await fetchCostInfoById(matterInfo.id);

      if (error) {
        console.error("Error fetching additional data:", error);
      } else if (!costInfoList) {
        console.log(`costInfo of matter[ID:${matterInfo.id}] is empty.`);
      } else {
        setCostInfoList(costInfoList); // 取得したデータで状態を更新
      }
    };

    getCostInfo();
  }, [matterInfo.id]);

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
      costInfoList: costInfoList || [],
    });
  }, [matterInfo]);

  const closeModal = () => {
    props.setOpened(false);
  };

  const updateInfoInSupabase = (matterInfo: MatterType) => {
    updateMatterInfo(matterInfo);
    closeModal();
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

        <div className="flex justify-between">
          <Group justify="flex-end" mt="md">
            <Button type="submit" color="gray" onClick={closeModal}>
              削除
            </Button>
          </Group>
          <Group justify="flex-end" mt="md">
            <Button type="submit" color="pink" onClick={closeModal}>
              キャンセル
            </Button>
            <Button
              type="submit"
              color="green"
              onClick={() => updateInfoInSupabase(matterInfo)}
            >
              更新
            </Button>
          </Group>
        </div>
      </form>
    </Modal>
  );
}
