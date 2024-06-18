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
  deleteCostInfoInSupabase,
  deleteMatterInfoInSupabase,
  fetchCostInfoById,
  updateCostInfo,
  updateMatterInfo,
} from "../utils/supabase/supabase";

type Props = {
  matterInfo: MatterType;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

type SubmissionType = {
  id: number;
  title: string | null;
  created_at: string;
  classification: string | null;
  completed: boolean;
  billing_amount: number | null;
  isFixed: boolean;
  user_id: number | null;
  costInfoList: CostType[];
};

export function MatterCardDetailModal(props: Props) {
  const { matterInfo, opened, setOpened } = props;
  const [costInfoList, setCostInfoList] = useState<CostType[]>([]);
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
    if (opened) {
      const getCostInfo = async () => {
        const { costInfoList, error } = await fetchCostInfoById(matterInfo.id);

        if (error) {
          console.error("Error fetching additional data:", error);
        } else {
          setCostInfoList(costInfoList || []);
        }
      };
      getCostInfo();
    }
  }, [matterInfo.id, opened]);

  useEffect(() => {
    if (opened) {
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
    }
  }, [costInfoList, opened]);

  const closeModal = () => {
    setOpened(false);
    setCostInfoList([]);
    form.reset();
  };

  const updateInfoInSupabase = async (submittedInfo: SubmissionType) => {
    const matterInfoToUpdate: MatterType = {
      id: matterInfo.id,
      title: submittedInfo.title,
      classification: submittedInfo.classification,
      billing_amount: submittedInfo.billing_amount,
      isFixed: submittedInfo.isFixed,
      completed: false,
      created_at: "",
      user_id: matterInfo.user_id,
    };
    await updateMatterInfo(matterInfoToUpdate);

    for (const costInfo of submittedInfo.costInfoList) {
      const costInfoToUpdate: CostType = {
        id: costInfo.id,
        name: costInfo.name,
        item: costInfo.item,
        price: costInfo.price,
        matter_id: matterInfo.id,
        created_at: "",
      };
      await updateCostInfo(costInfoToUpdate);
    }
    closeModal();
  };

  const deleteMatterInfo = async () => {
    if (matterInfo.isFixed) {
      alert("確定済みの案件は削除できません。");
      closeModal();
      return;
    }

    if (costInfoList) {
      for (const costInfo of costInfoList) {
        await deleteCostInfoInSupabase(costInfo.id);
      }
    }

    await deleteMatterInfoInSupabase(matterInfo.id);
    closeModal();
  };

  return (
    <Modal opened={opened} onClose={closeModal} title={matterInfo.title}>
      <form
        onSubmit={form.onSubmit((submittedInfo) => {
          console.log(submittedInfo);

          updateInfoInSupabase(submittedInfo);
        })}
      >
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
          prefix="¥"
          allowNegative={false}
          allowDecimal={false}
          thousandSeparator=","
          {...form.getInputProps("billing_amount")}
        />

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
                <td>
                  <TextInput
                    value={costInfo.name ? costInfo.name : ""}
                    onChange={(event) =>
                      form.setFieldValue(
                        `costInfoList.${index}.name`,
                        event.currentTarget.value,
                      )
                    }
                  />
                </td>
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
                    prefix="¥"
                    allowNegative={false}
                    allowDecimal={false}
                    thousandSeparator=","
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
            <Button type="button" color="gray" onClick={deleteMatterInfo}>
              削除
            </Button>
          </Group>
          <Group justify="flex-end" mt="md">
            <Button type="button" color="pink" onClick={closeModal}>
              キャンセル
            </Button>
            <Button type="submit" color="green">
              更新
            </Button>
          </Group>
        </div>
      </form>
    </Modal>
  );
}
