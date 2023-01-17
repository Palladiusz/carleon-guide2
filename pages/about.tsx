import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
} from "@mantine/core";
import image from "../public/image.jpg";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));

export default function AboutPage() {
  const { classes } = useStyles();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A <span className={classes.highlight}>better</span> Next.JS <br />{" "}
              Carleon Guide 2
            </Title>
            <Text color="dimmed" mt="md">
              Have You ever played Albion Online? No? Then recommend to give it
              a try! Yes? Then probably You can consider lucrative way to make
              silver. Carleon transports! With this app You can easy track
              profitable items by yourself. Interested? More in Tutorial
              section. And some informations about project itself:
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <FontAwesomeIcon icon={faCheck} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>TypeScript based</b> – built type safe application, many
                hooks and readable code inside
              </List.Item>
              <List.Item>
                <b>Free and open source</b> – all project is free, You can check
                it in link below.
              </List.Item>
              <List.Item>
                <b>Mantine included</b> – most app components are predefined by
                Mantine component library
              </List.Item>
            </List>

            <Group mt={30}>
              <Button
                component="a"
                href="/login"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Get started
              </Button>
              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
                component="a"
                href="https://github.com/Palladiusz/carleon-guide2?fbclid=IwAR3_x9stRSoY6-xMKVv_HhxgYSwU8QhMJ4-1QYGQ1551aI_WGhIDU8bo8jg"
              >
                Source code
              </Button>
            </Group>
          </div>
          <Image src={image.src} className={classes.image} />
        </div>
      </Container>
    </div>
  );
}
