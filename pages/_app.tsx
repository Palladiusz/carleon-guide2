import { AppProps } from "next/app";
import Head from "next/head";
import { AppShell, MantineProvider } from "@mantine/core";
import { HeaderSearch } from "../components/CustomHeader";
import { Fraction, UserFormProvider, useUserForm } from "../store/formContext";
import {
  NotificationsProvider,
  showNotification,
} from "@mantine/notifications";
import { auth } from "../server";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { AuthProvider } from "../store/authContext";
import { ItemsProvider } from "../store/itemsContext";
import { SearchProvider } from "../store/searchContext";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const form = useUserForm({
    initialValues: {
      name: "",
      buy: 0,
      sell: 0,
      enchant: 0,
      tier: 2,
      fraction: Fraction.TF,
    },
  });
  const [isUserLogged, setIsUserLogged] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setIsUserLogged(true);
      } else {
        setIsUserLogged(false);
      }
    });
  }, []);

  return (
    <>
      {" "}
      <AuthProvider>
        <Head>
          <title>Carleon guide 2</title>
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
          {" "}
          <NotificationsProvider>
            <SearchProvider>
              <AppShell
                padding="md"
                header={
                  <HeaderSearch
                    links={[
                      { link: "/", label: "Main" },
                      { link: "about", label: "About" },
                      { link: "tutorial", label: "Tutorial" },
                      {
                        link: "login",
                        label: isUserLogged ? "Logout" : "Login",
                        additionalFunction: () => {
                          if (isUserLogged)
                            signOut(auth).then(() =>
                              showNotification({
                                title: "Logged out",
                                message: "",
                              })
                            );
                        },
                      },
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
                <ItemsProvider>
                  <UserFormProvider form={form}>
                    <Component {...pageProps} />
                  </UserFormProvider>
                </ItemsProvider>
              </AppShell>
            </SearchProvider>
          </NotificationsProvider>
        </MantineProvider>
      </AuthProvider>
    </>
  );
}
