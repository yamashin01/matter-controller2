"use client";

import PageTitle from "@/app/components/pageTitle/pageTitle";
import { Button, Container, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { signup } from "../login/actions";

export default function SignUpPage() {
  const router = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 8 ? null : "パスワードは8文字以上にして下さい。",
    },
  });

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div>
      <PageTitle title="新規登録" />
      <form className="p-4 lg:p-16 w-auto" action={signup}>
        <TextInput
          withAsterisk
          label="Email"
          size="sm"
          className="p-4"
          placeholder="your@email.com"
          name="email"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <PasswordInput
          withAsterisk
          label="Password"
          size="md"
          className="p-4"
          placeholder="8文字以上のパスワードをご記入ください。"
          name="password"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />
        <PasswordInput
          withAsterisk
          label="Password"
          size="md"
          className="p-4"
          placeholder="念の為、もう一度パスワードをご記入ください。"
          name="password"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />

        <Container className="p-4">
          <Button
            type="submit"
            justify="center"
            size="md"
            fullWidth
            my={16}
            color="pink"
          >
            新規登録
          </Button>
          <Button
            type="button"
            justify="center"
            size="md"
            fullWidth
            my={16}
            color="blue"
            onClick={handleLoginClick}
          >
            ログインはこちら
          </Button>
        </Container>
      </form>
    </div>
  );
}
