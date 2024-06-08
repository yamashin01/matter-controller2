import { Title } from "@mantine/core";

type PageTitleProps = {
  title: string;
};
const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <Title order={3} size="h1" className="flex justify-center py-4">
      {title}
    </Title>
  );
};

export default PageTitle;
