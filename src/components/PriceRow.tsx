import { useState } from "react";

function calculate(price, amount) {
  if (!price || !amount) {
    return 0;
  }

  return price / amount;
}

export type UnitType = "weight" | "volume";

type PriceRowProps = {
  unitType: UnitType;
};

const unitTypeMap = {
  weight: "Kg",
  volume: "L",
};

export function PriceRow({ unitType }: PriceRowProps) {
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);

  const result = calculate(price, amount).toFixed(2);

  const unit = unitTypeMap[unitType];

  return (
    <div>
      <div className="flex items-center gap-4">
        <Input value={amount} update={setAmount} symbol={unit} />

        <Input
          value={price}
          update={setPrice}
          symbol="R$"
          symbolPosition="before"
        />

        <div className="flex-none">
          <div>
            R$ {result}/{unit}
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ update, value, symbol, symbolPosition = "after" }) {

  // const positionClasses = cn

  return (
    <div className="flex">
      {symbolPosition === "before" && <InputSymbol>{symbol}</InputSymbol>}
      <input
        type="text"
        value={value}
        className="h-10 w-full rounded-lg rounded-r-none border border-r-0 px-2"
        onChange={(e) => update(Number(e.target.value))}
      />
      {symbolPosition === "after" && <InputSymbol>{symbol}</InputSymbol>}
    </div>
  );
}

function InputSymbol({ children }) {
  return (
    <div className="flex items-center rounded-lg rounded-l-none border bg-neutral-100 px-2 text-sm w-9 h-10">
      {children}
    </div>
  );
}
