import { AppProps } from "next/app";
import Head from "next/head";
import { AppShell, MantineProvider } from "@mantine/core";
import { HeaderSearch } from "../components/CustomHeader";
import { Fraction, UserFormProvider, useUserForm } from "../store/formContext";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const form = useUserForm({
    initialValues: {
      name: "",
      buy: 0,
      sell: 0,
      enchantment: 0,
      fraction: Fraction.TF,
    },
  });

  return (
    <>
      <Head>
        <title>Page title</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
        }}
      >
        <AppShell
          padding="md"
          header={
            <HeaderSearch
              links={[
                { link: "/", label: "Main" },
                { link: "about", label: "About" },
                { link: "", label: "About2" },
                { link: "", label: "About3" },
              ]}
            />
          }
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
        >
          <UserFormProvider form={form}>
            <Component {...pageProps} />
          </UserFormProvider>
        </AppShell>
      </MantineProvider>
    </>
  );
}
