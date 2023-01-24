import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  Title,
  MediaQuery,
  Burger,
  Menu,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SearchContext } from "../store/searchContext";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

interface HeaderSearchProps {
  links: { link: string; label: string; additionalFunction?: Function }[];
}

export function HeaderSearch({ links }: HeaderSearchProps) {
  const { classes } = useStyles();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const { setSearchTerm } = useContext(SearchContext);
  const [opened, setOpened] = useState(false);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => {
        event.preventDefault();
        if (link.additionalFunction) link.additionalFunction();
        router.push(link.link);
        setOpened(false);
      }}
    >
      {link.label}
    </a>
  ));

  function handleSearch(e: string) {
    setSearchValue(e);
    setSearchTerm(e);
  }

  return (
    <Header height={65} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          <Title order={2}>Carleon guide 2</Title>
        </Group>

        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
            {items}
          </Group>
          <Autocomplete
            placeholder="Search"
            icon={<FontAwesomeIcon icon={faSearch} />}
            data={["bow", "cowl", "jacket", "shoes"]}
            value={searchValue}
            onChange={handleSearch}
          />
        </Group>
        <MediaQuery largerThan="md" styles={{ display: "none" }}>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
            </Menu.Target>

            <Menu.Dropdown>
              {items.map((e) => (
                <Menu.Item>{e}</Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </MediaQuery>
      </div>
    </Header>
  );
}
