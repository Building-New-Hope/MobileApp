// enum constants
// maybe should make a fetch request to an endpoint with the type of options that could happen.
// TODO: generate labels + values for drop down dynamically

export default {
       grinds: [
        { label: "Whole Bean", value: "WHOLE", selected: true, },
        { label: "Drip", value: "Drip" },
        { label: "Coarse for French Press", value: "FRENCHPRESS" },
        { label: "Coarse for Cold Brew", value: "COLDBREW" },
        { label: "Espresso Grind", value: "ESPRESSO" },
      ],
        sizes: [
        { label: "12 oz", value: 12, selected: true },
        { label: "16 oz", value: 16 },
        { label: "5 lbs", value: 80 },
      ]
      
}

