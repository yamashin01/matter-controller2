"use client";

import { MatterType } from "@/app/types/types";
import { SimpleGrid, Card, Text, Container, Badge, Group } from "@mantine/core";
import { useState } from "react";
import { MatterCardDetailModal } from "../modal/mattercardDetail";

type Props = {
  matterList: MatterType[] | null;
};

const defaultMatter: MatterType = {
  id: 0,
  title: "デフォルト案件",
  created_at: "1900/1/1",
  classification: "default分類",
  completed: false,
  billing_amount: 0,
  isFixed: false,
  user_id: 0,
};

export function MatterCardsGrid(props: Props) {
  const [opened, setOpened] = useState(false);
  const [matterInfo, setMatterInfo] = useState(defaultMatter);

  const openCard = (matter: MatterType) => {
    setMatterInfo(matter);
    setOpened(true);
  };
  const cards = props.matterList?.map((matter) => (
    <Card
      key={matter.title}
      p="md"
      radius="md"
      component="a"
      className="hover:bg-transparent hover:cursor-pointer hover:bg-gray-100 border transition"
      shadow="sm"
      onClick={() => openCard(matter)}
    >
      <Group justify="space-between" align="flex-start">
        <Text fw={700} size="lg" mt={5}>
          {matter.title}
        </Text>
        {matter.isFixed ? (
          <Badge color="blue">確定</Badge>
        ) : (
          <Badge color="red">未確定</Badge>
        )}
      </Group>
      <Text className="">分類：{matter.classification}</Text>
      <Text className="">金額：{matter.billing_amount}円</Text>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        {matter.created_at}
      </Text>
    </Card>
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
      <MatterCardDetailModal
        opened={opened}
        setOpened={setOpened}
        matterInfo={matterInfo}
      />
    </Container>
  );
}
