export default (grind) => {
  switch (grind) {
    case "WHOLE":
      return "Whole Bean";
    case "COLDBREW":
      return "Coarse for Cold Brew";
    case "FRENCHPRESS":
      return "Coarse for French Press";
    case "ESPRESSO":
      return "Espresso Grind";
    case "Drip":
      return "Drip";
    default:
      return "Upsupported Grind";
  }
};
