"use client";

import {
  Button,
  Checkbox,
  Group,
  NumberInput,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";

const NewMatterForm = () => {
  const [inputCountOfCostInfo, setInputCountOfCostInfo] = useState<number>();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      classification: "",
      billing_amount: 0,
      isFixed: false,
    },
  });
  return (
    <form
      className="p-4 lg:p-16 w-auto"
      onSubmit={form.onSubmit((values) => console.log(values))}
    >
      <TextInput
        withAsterisk
        required
        placeholder="例）新潟県版ボードゲーム制作"
        label="案件名"
        key={form.key("title")}
        {...form.getInputProps("title")}
      />

      <Select
        withAsterisk
        className="pt-4"
        placeholder="案件に適した分類を選択して下さい。"
        label="分類"
        data={["会員費", "受託案件", "ボードゲーム制作", "イベント"]}
      />

      <NumberInput
        withAsterisk
        className="pt-4"
        label="金額"
        key={form.key("billing_amount")}
        {...form.getInputProps("billing_amount")}
      />

      <Checkbox
        mt="md"
        className="pt-4"
        label="確定"
        key={form.key("isFixed")}
        {...form.getInputProps("isFixed", { type: "checkbox" })}
      />

      <h1 className="pt-8 text-xl text-gray-700 font-bold">コスト</h1>
      <div className="pt-4">
        <div className="flex items-center">
          <h2 className="flex-grow text-center">コスト名</h2>
          <h2 className="flex-grow text-center">品目</h2>
          <h2 className="flex-grow text-center">価格</h2>
          <div className="w-10"></div>
        </div>
        <div className="flex items-center pb-2">
          <Group gap="sm" className="flex-grow" grow>
            <TextInput
              placeholder="品名をご記入ください。"
              className="flex-grow"
            />
            <Select
              className="flex-grow"
              placeholder="品目を選択ください。"
              data={["システム料", "外注費", "備品購入"]}
            />
            <NumberInput placeholder="¥0" className="flex-grow" />
          </Group>
          <div className="h-full px-2 text-lg hover:cursor-pointer ml-auto flex items-center justify-center">
            <FaRegTrashAlt />
          </div>
        </div>
        <div className="flex items-center pb-2">
          <Group gap="sm" className="flex-grow" grow>
            <TextInput
              placeholder="品名をご記入ください。"
              className="flex-grow"
            />
            <Select
              className="flex-grow"
              placeholder="品目を選択ください。"
              data={["システム料", "外注費", "備品購入"]}
            />
            <NumberInput placeholder="¥0" className="flex-grow" />
          </Group>
          <div className="h-full px-2 text-lg hover:cursor-pointer ml-auto flex items-center justify-center">
            <FaRegTrashAlt />
          </div>
        </div>
        <Button
          type="button"
          fullWidth
          color="dark"
          variant="outline"
          rightSection={<CiSquarePlus />}
        >
          コスト追加
        </Button>
      </div>

      <Group className="pt-8" justify="flex-end" mt="md">
        <Button type="submit">作成</Button>
      </Group>
    </form>
  );
};

export default NewMatterForm;
