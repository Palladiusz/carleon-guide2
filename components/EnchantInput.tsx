import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { useUserFormContext } from "../store/formContext";
import { Text, Center } from "@mantine/core";

function EnchantInput() {
  const form = useUserFormContext();
  const starCount = form.values.enchantment;

  function handleStarClick(starValue: number) {
    if (starCount === 1 && starValue === 1) {
      form.setFieldValue("enchantment", 0);
    } else {
      form.setFieldValue("enchantment", starValue);
    }
  }

  return (
    <>
      <Text fw={500}>Enchantment</Text>
      <Center>
        <button onClick={() => handleStarClick(1)}>
          <FontAwesomeIcon
            icon={faStar}
            color={starCount >= 1 ? "yellow" : "gray"}
          />
        </button>
        <button onClick={() => handleStarClick(2)}>
          <FontAwesomeIcon
            icon={faStar}
            color={starCount >= 2 ? "yellow" : "gray"}
          />
        </button>
        <button onClick={() => handleStarClick(3)}>
          <FontAwesomeIcon
            icon={faStar}
            color={starCount >= 3 ? "yellow" : "gray"}
          />
        </button>
        <button onClick={() => handleStarClick(4)}>
          <FontAwesomeIcon
            icon={faStar}
            color={starCount === 4 ? "yellow" : "gray"}
          />
        </button>
      </Center>
    </>
  );
}
export default EnchantInput;
