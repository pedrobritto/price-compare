import React, { useState, type Dispatch, type SetStateAction } from "react";
import { cn } from "../utils/cn";
import { CoinsIcon } from "lucide-react";

const unitTypeMap = {
  weight: {
    default: "Kg",
    small: "g",
  },
  volume: {
    default: "L",
    small: "ml",
  },
};

/** The type for unit types. */
export type UnitType = "weight" | "volume";

type PriceRowProps = {
  /** The price. */
  price: string;
  /** The function to update the price. */
  setPrice: (value: string) => void;
  /** The amount. */
  amount: string;
  /** The function to update the amount. */
  setAmount: (value: string) => void;
  /** The proportional price. */
  result: number;
  /** The unit type. */
  unitType: UnitType;
  /** Whether the small unit mode is toggled. */
  isSmallUnit: boolean;
  /** Whether this is the row with the cheapest proportional price. */
  isCheapest?: boolean;
};

/** The component for a single price row. */
export function PriceRow({
  price,
  setPrice,
  amount,
  setAmount,
  unitType,
  isSmallUnit,
  result,
  isCheapest,
}: PriceRowProps) {
  const selectedUnit = unitTypeMap[unitType][isSmallUnit ? "small" : "default"];
  const unitTypeSymbol = unitTypeMap[unitType].default;

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
          "flex h-10 gap-1 flex-none items-center rounded-lg px-2 text-right transition justify-between",
          isCheapest && "bg-emerald-100 text-emerald-800",
        )}
      >
        <div>{isCheapest && <CoinsIcon size={20} strokeWidth={1.5} />}</div>
        <div>
          R$ {result}/{unitTypeSymbol}
        </div>
      </div>
    </div>
  );
}

/** The Input component props */
type IInputProps = {
  onChange: Dispatch<SetStateAction<string>>;
  value: string;
  symbol: string;
  symbolPosition?: "before" | "after";
};

/** The input component. */
function Input({
  onChange,
  value,
  symbol,
  symbolPosition = "after",
}: IInputProps) {
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

/** The symbol box to be used with the Input component.
 *
 * @param position The position of the input symbol in reference to the input.
 * @param children The contents iof the InputSymbol
 */
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
