import { Chip, ColorSwatch, Container, useMantineTheme } from "@mantine/core";
import { Fraction, useUserFormContext } from "../store/formContext";

function FractionInput() {
  const form = useUserFormContext();
  const theme = useMantineTheme();
  const fraction = form.values.fraction;

  function handleFractionChange(newFraction: Fraction) {
    form.setFieldValue("fraction", newFraction);
  }
  return (
    <div className="p-1">
      <button
        onClick={() => handleFractionChange(Fraction.TF)}
        className={`hover:p-1 w-5 h-5 rounded-full bg-purple-600 ${
          fraction === Fraction.TF && " border-2 border-yellow-400 p-3"
        }`}
      ></button>
      <button
        onClick={() => handleFractionChange(Fraction.BW)}
        className={`hover:p-1 w-5 h-5 rounded-full bg-orange-600 ${
          fraction === Fraction.BW && " border-2 border-yellow-400 p-3"
        }`}
      >
        <ColorSwatch
          color={theme.colors.grape[3]}
          onClick={() => console.log("lel")}
        />
      </button>
      <Chip defaultChecked color={theme.colors.orange[6]}>
        Awesome chip
      </Chip>
      <Container>
        {" "}
        <ColorSwatch
          color={theme.colors.grape[3]}
          onClick={() => console.log("lel")}
          style={{ cursor: "pointer" }}
        />
      </Container>

      <button
        onClick={() => handleFractionChange(Fraction.FS)}
        className={`hover:p-1 w-5 h-5 rounded-full bg-gray-200 ${
          fraction === Fraction.FS && " border-2 border-yellow-400 p-3"
        }`}
      ></button>
      <button
        onClick={() => handleFractionChange(Fraction.LYM)}
        className={`hover:p-1 w-5 h-5 rounded-full bg-green-600 ${
          fraction === Fraction.LYM && " border-2 border-yellow-400 p-3"
        }`}
      ></button>
      <button
        onClick={() => handleFractionChange(Fraction.ML)}
        className={`hover:p-1 w-5 h-5 rounded-full bg-blue-600 ${
          fraction === Fraction.ML && " border-2 border-yellow-400 p-3"
        }`}
      ></button>
    </div>
  );
}

export default FractionInput;
