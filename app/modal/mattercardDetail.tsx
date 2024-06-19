import {
  Modal,
  Button,
  Group,
  TextInput,
  Checkbox,
  NumberInput,
  Select,
} from "@mantine/core";
import { CostType, MatterType } from "@/app/types/types";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import {
  deleteCostInfoInSupabase,
  deleteMatterInfoInSupabase,
  fetchCostInfoById,
  insertCostInfo,
  updateCostInfo,
  updateMatterInfo,
} from "../utils/supabase/supabase";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";

type Props = {
  matterInfo: MatterType;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

type CostInfoInCardType = {
  id: number;
  num: number;
  name: string;
  item: string;
  price: number;
  isNew: boolean;
  isRemoved: boolean;
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
  costInfoInCardList: CostInfoInCardType[];
};

export function MatterCardDetailModal(props: Props) {
  const { matterInfo, opened, setOpened } = props;
  const [costInfoInCardList, setCostInfoInCardList] = useState<
    CostInfoInCardType[]
  >([]);
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
      costInfoInCardList: [] as CostInfoInCardType[],
    },
  });

  useEffect(() => {
    if (opened) {
      const getCostInfo = async () => {
        const { costInfoList, error } = await fetchCostInfoById(matterInfo.id);

        if (error) {
          console.error("Error fetching costInfoList:", error);
        } else {
          if (costInfoList) {
            const newCostInfoInCardList = costInfoList.map(
              (costInfo, index) => ({
                id: costInfo.id,
                num: index,
                name: costInfo.name,
                item: costInfo.item,
                price: costInfo.price,
                isNew: false,
                isRemoved: false,
              }),
            );
            setCostInfoInCardList(newCostInfoInCardList);
          }
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
        costInfoInCardList: costInfoInCardList,
      });
    }
  }, [costInfoInCardList, opened]);

  const closeModal = () => {
    setOpened(false);
    setCostInfoInCardList([]);
    form.reset();
  };

  const handleUpdateInfo = async (submittedInfo: SubmissionType) => {
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

    for (const costInfo of costInfoInCardList) {
      const costInfoToUpdate: CostType = {
        id: costInfo.id,
        name: costInfo.name,
        item: costInfo.item,
        price: costInfo.price,
        matter_id: matterInfo.id,
        created_at: "",
      };
      if (costInfo.isRemoved) {
        if (costInfo.id > 0) {
          await deleteCostInfoInSupabase(costInfo.id);
        }
      } else {
        if (costInfo.isNew) {
          await insertCostInfo(costInfoToUpdate);
        } else {
          await updateCostInfo(costInfoToUpdate);
        }
      }
    }
    closeModal();
  };

  const handleDeleteMatterInfo = async () => {
    if (matterInfo.isFixed) {
      alert("確定済みの案件は削除できません。");
      closeModal();
      return;
    }

    if (costInfoInCardList) {
      for (const costInfo of costInfoInCardList) {
        await deleteCostInfoInSupabase(costInfo.id);
      }
    }

    await deleteMatterInfoInSupabase(matterInfo.id);
    closeModal();
  };

  const addCost = () => {
    setCostInfoInCardList([
      ...costInfoInCardList,
      {
        id: 0,
        num: costInfoInCardList.length,
        name: "",
        item: "",
        price: 0,
        isNew: true,
        isRemoved: false,
      },
    ]);
  };

  const removeCost = (id: number) => {
    setCostInfoInCardList(
      costInfoInCardList.map((costInfo) => {
        if (costInfo.id === id) costInfo.isRemoved = true;
        return costInfo;
      }),
    );
  };

  return (
    <Modal opened={opened} onClose={closeModal} title={matterInfo.title}>
      <form
        onSubmit={form.onSubmit((submittedInfo) => {
          handleUpdateInfo(submittedInfo);
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

        <div className="pt-4">
          {costInfoInCardList.length > 0 ? (
            <div className="flex items-center">
              <h2 className="flex-grow text-center">コスト名</h2>
              <h2 className="flex-grow text-center">品目</h2>
              <h2 className="flex-grow text-center">価格</h2>
              <div className="w-10"></div>
            </div>
          ) : (
            ""
          )}

          {costInfoInCardList.map((cost) =>
            cost.isRemoved ? (
              ""
            ) : (
              <div className="flex items-center pb-2" key={cost.id}>
                <Group gap="sm" className="flex-grow" grow>
                  <TextInput
                    placeholder="品名をご記入ください。"
                    className="flex-grow"
                    value={cost.name as string}
                    onChange={(event) =>
                      setCostInfoInCardList(
                        costInfoInCardList.map((costInfo) =>
                          costInfo.id === cost.id
                            ? { ...costInfo, name: event.target.value }
                            : costInfo,
                        ),
                      )
                    }
                  />
                  <Select
                    className="flex-grow"
                    placeholder="品目を選択ください。"
                    data={["システム料", "外注費", "備品購入"]}
                    required
                    value={cost.item}
                    onChange={(value) =>
                      setCostInfoInCardList(
                        costInfoInCardList.map((costInfo) =>
                          costInfo.id === cost.id
                            ? { ...costInfo, item: value || "" }
                            : costInfo,
                        ),
                      )
                    }
                  />
                  <NumberInput
                    placeholder="¥0"
                    className="flex-grow"
                    value={cost.price as number}
                    prefix="¥"
                    allowNegative={false}
                    allowDecimal={false}
                    thousandSeparator=","
                    onChange={(value) =>
                      setCostInfoInCardList(
                        costInfoInCardList.map((costInfo) =>
                          costInfo.id === cost.id
                            ? { ...costInfo, price: Number(value) }
                            : costInfo,
                        ),
                      )
                    }
                  />
                </Group>
                <div
                  className="h-full px-2 text-lg hover:cursor-pointer ml-auto flex items-center justify-center"
                  onClick={() => removeCost(cost.id)}
                >
                  <FaRegTrashAlt />
                </div>
              </div>
            ),
          )}

          <Button
            type="button"
            fullWidth
            color="dark"
            variant="outline"
            rightSection={<CiSquarePlus />}
            onClick={addCost}
          >
            コスト追加
          </Button>
        </div>
        <div className="flex justify-between">
          <Group justify="flex-end" mt="md">
            <Button type="button" color="gray" onClick={handleDeleteMatterInfo}>
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
