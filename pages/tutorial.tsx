import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

interface CardProps {
  image: string;
  title: string;
  category: string;
}

function Card({ image, title, category }: CardProps) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        Read article
      </Button>
    </Paper>
  );
}

const data = [
  {
    image: "https://i.ibb.co/56BJTsz/ss1.png",
    title: "Create account!",
    category: "Step 1",
  },
  {
    image: "https://i.ibb.co/8dw1xTm/ss2.png",
    title: "Find items which You want to transport from royal city to Carleon",
    category: "Step 2",
  },
  {
    image: "https://i.ibb.co/8dYLbKx/ss3.png",
    title: "Research in Black Market.",
    category: "Step 3",
  },
  {
    image: "https://i.ibb.co/f08mLFc/ss4.png",
    title: "Start input some data into the app!",
    category: "Step 4",
  },
  {
    image: "https://i.ibb.co/1KHJjPq/ss5.png",
    title: "Shopping time!",
    category: "Step 5",
  },
  {
    image: "https://i.ibb.co/vdy8zpQ/ss6.png",
    title: "Search and store data",
    category: "Step 6",
  },
];

export default function CardsCarousel() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="50%"
      breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: 2 }]}
      slideGap="md"
      align="start"
      slidesToScroll={mobile ? 1 : 2}
    >
      {slides}
    </Carousel>
  );
}
