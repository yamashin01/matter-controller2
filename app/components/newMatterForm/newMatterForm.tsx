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

const NewMatterForm = () => {
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
        <Group gap="sm" grow>
          <h2 className="text-center">コスト名</h2>
          <h2 className="text-center">品目</h2>
          <h2 className="text-center">価格</h2>
        </Group>
        <Group gap="sm" grow>
          <TextInput />
          <TextInput />
          <NumberInput />
        </Group>
      </div>

      <Group className="pt-8" justify="flex-end" mt="md">
        <Button type="submit">作成</Button>
      </Group>
    </form>
  );
};

export default NewMatterForm;
