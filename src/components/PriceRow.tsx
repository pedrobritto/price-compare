import React, { useState, type Dispatch, type SetStateAction } from "react";
import { cn } from "../utils/cn";

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
  const [price, setPrice] = useState<string>(undefined);
  const [amount, setAmount] = useState<string>(undefined);

  const result = calculate(price, amount).toFixed(2);

  const selectedUnit = unitTypeMap[unitType];

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] items-center gap-2">
      <Input value={amount} update={setAmount} symbol={selectedUnit} />

      <Input
        value={price}
        update={setPrice}
        symbol="R$"
        symbolPosition="before"
      />

      <div className="flex h-10 flex-none items-center justify-center rounded-lg bg-neutral-50 px-2 text-right">
        <div>
          R$ {result}/{selectedUnit}
        </div>
      </div>
    </div>
  );
}

type IInput = {
  update: Dispatch<SetStateAction<string>>;
  value: string;
  symbol: string;
  symbolPosition?: "before" | "after";
};
function Input({ update, value, symbol, symbolPosition = "after" }: IInput) {
  const positionClasses = cn(
    symbolPosition === "after" && "rounded-r-none border-r-0",
    symbolPosition === "before" && "rounded-l-none border-l-0",
  );

  return (
    <div className="flex">
      {symbolPosition === "before" && (
        <InputSymbol position={symbolPosition}>{symbol}</InputSymbol>
      )}
      <input
        type="text"
        value={value}
        className={cn("h-10 w-full rounded-lg border px-2", positionClasses)}
        onChange={(e) => update(e.target.value)}
        placeholder="0.00"
        inputMode="decimal"
      />
      {symbolPosition === "after" && (
        <InputSymbol position={symbolPosition}>{symbol}</InputSymbol>
      )}
    </div>
  );
}

type IInputSymbol = {
  position: "before" | "after";
  children: React.ReactNode;
};

function InputSymbol({ position, children }: IInputSymbol) {
  const positionClasses = cn(
    position === "after" && "rounded-l-none",
    position === "before" && "rounded-r-none",
  );

  return (
    <div
      className={cn(
        "flex h-10 w-8 flex-none items-center justify-center rounded-lg border bg-neutral-100 px-1 text-sm",
        positionClasses,
      )}
    >
      {children}
    </div>
  );
}
