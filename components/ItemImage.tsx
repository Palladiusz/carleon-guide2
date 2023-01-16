import { Select } from "@mantine/core";
import { useUserFormContext } from "../store/formContext";
import Image from "next/image";
import { getImgUrl } from "../utils/getImgUrl";
import { useState } from "react";

interface ImgProps {
  name: string;
  tier: number;
  enchant: number;
}

function ItemImage(props: ImgProps) {
  const { name, tier, enchant } = props;
  const [src, setSrc] = useState(getImgUrl({ name, tier, enchant }));

  return (
    <Image
      src={src}
      alt=""
      width={100}
      height={100}
      onError={() => setSrc("/imgNotFound.png")}
    />
  );
}

export default ItemImage;
