import React, { useState, type Dispatch, type SetStateAction } from "react";
import { cn } from "../utils/cn";

export type UnitType = "weight" | "volume";

type PriceRowProps = {
  price: string;
  setPrice: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  result: number;
  unitType: UnitType;
  isCheapest?: boolean;
};

const unitTypeMap = {
  weight: "Kg",
  volume: "L",
};

export function PriceRow({
  price,
  setPrice,
  amount,
  setAmount,
  unitType,
  result,
  isCheapest,
}: PriceRowProps) {
  const selectedUnit = unitTypeMap[unitType];

  return (
    <div className="grid grid-cols-[100px_100px_1fr] items-center gap-2">
      <Input value={amount} onChange={setAmount} symbol={selectedUnit} />

      <Input
        value={price}
        onChange={setPrice}
        symbol="R$"
        symbolPosition="before"
      />

      <div
        className={cn(
          "flex h-10 flex-none items-center justify-end rounded-lg px-2 text-right transition",
          isCheapest && "bg-emerald-100",
        )}
      >
        <div>
          R$ {result}/{selectedUnit}
        </div>
      </div>
    </div>
  );
}

type IInput = {
  onChange: Dispatch<SetStateAction<string>>;
  value: string;
  symbol: string;
  symbolPosition?: "before" | "after";
};
function Input({ onChange, value, symbol, symbolPosition = "after" }: IInput) {
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
        className={cn(
          "h-10 w-full rounded-lg border px-2 z-10",
          positionClasses,
        )}
        onChange={(e) => onChange(e.target.value)}
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
