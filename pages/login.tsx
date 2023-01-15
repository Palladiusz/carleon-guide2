import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Anchor,
  Stack,
  Container,
} from "@mantine/core";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../server";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"]);
  const router = useRouter();
  const form = useForm<{
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
  }>({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      confirmPassword: (val) => validateConfirmPassword(val),
    },
  });

  function validateConfirmPassword(val: string): string | undefined | null {
    if (type === "register") {
      return val !== form.values.password
        ? "Confirm password must be same as password"
        : null;
    }
  }

  function handleLogin() {
    signInWithEmailAndPassword(auth, form.values.email, form.values.password)
      .then((userCredential) => {
        router.push("/");
        showNotification({
          title: "Successfully logged in!",
          message: "Welcome in Carleon Guide 2",
          icon: <FontAwesomeIcon icon={faCheck} />,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;

        showNotification({
          title: "Login error",
          message: errorMessage,
          color: "red",
        });
      });
  }

  function handleRegister() {
    createUserWithEmailAndPassword(
      auth,
      form.values.email,
      form.values.password
    )
      .then((userCredential) => {
        toggle();
        showNotification({
          title: "Successfully created account!",
          message: "Go ahead and log in!",
          icon: <FontAwesomeIcon icon={faCheck} />,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;

        showNotification({
          title: "Login error",
          message: errorMessage,
          color: "red",
        });
      });
  }

  return (
    <Container size="xs" px="xs">
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to Carleon Guide 2, {type}
        </Text>

        <form
          onSubmit={form.onSubmit(() => {
            if (type === "register") {
              handleRegister();
              form.reset();
            } else {
              handleLogin();
              form.reset();
            }
          })}
        >
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
            />
            {type === "register" && (
              <PasswordInput
                required
                label="Confirm password"
                placeholder="Your password"
                value={form.values.confirmPassword}
                onChange={(event) =>
                  form.setFieldValue(
                    "confirmPassword",
                    event.currentTarget.value
                  )
                }
                error={
                  form.errors.confirmPassword &&
                  "Confirm password must be same as password"
                }
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit">{upperFirst(type)}</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
