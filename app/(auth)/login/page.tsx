"use client";

import PageTitle from "@/app/components/pageTitle/pageTitle";
import { Button, Container, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { login } from "../confirm/actions";

export default function LoginPage() {
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

  const handleSignUpClick = () => {
    router.push("/signup");
  };

  return (
    <div>
      <PageTitle title="ログイン" />
      <form
        className="p-4 lg:p-16 w-auto"
        // onSubmit={form.onSubmit((values) => login(values))}
        action={login}
      >
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
        <Container className="p-4">
          <Button
            type="submit"
            justify="center"
            size="md"
            fullWidth
            my={16}
            color="blue"
          >
            ログイン
          </Button>
          <Button
            type="button"
            justify="center"
            size="md"
            fullWidth
            my={16}
            color="pink"
            onClick={handleSignUpClick}
          >
            新規会員登録はこちら
          </Button>
        </Container>
      </form>
    </div>
  );
}
