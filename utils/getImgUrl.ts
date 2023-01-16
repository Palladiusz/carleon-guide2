interface IGetImgUrlProps {
  name: string;
  tier: number;
  enchant: number;
}

export function convertTierToName(tier: number) {
  switch (tier) {
    case 2:
      return "novice's";
    case 3:
      return "journeyman's";
    case 4:
      return "adept's";
    case 5:
      return "expert's";
    case 6:
      return "master's";
    case 7:
      return "grandmaster's";
    case 8:
      return "elder's";
    default:
      return "adept's";
  }
}

export const getImgUrl = (props: IGetImgUrlProps) => {
  const { name, tier, enchant } = props;
  const numberTier = Number(tier);

  const basicUrl = "https://render.albiononline.com/v1/item/";

  const fullUrl = `${basicUrl}${convertTierToName(
    numberTier
  )} ${name}@${enchant}?&quality=2`;

  return fullUrl;
};
