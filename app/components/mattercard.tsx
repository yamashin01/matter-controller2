import { MatterType } from "@/types/types";
import { SimpleGrid, Card, Text, Container, Badge, Group } from "@mantine/core";

type Props = {
  matterList: MatterType[];
};

export function MatterCardsGrid(props: Props) {
  console.log(props.matterList);
  const cards = props.matterList.map((matter) => (
    <Card
      key={matter.title}
      p="md"
      radius="md"
      component="a"
      href="#"
      className="hover:bg-transparent border transition"
    >
      <Group justify="space-between" align="flex-start">
        <Text className="font-bold" mt={5}>
          {matter.title}
        </Text>
        <Badge color="blue">{matter.completed ? "完了" : "未完了"}</Badge>
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
    </Container>
  );
}
