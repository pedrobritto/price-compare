import { useEffect, useRef, useState } from "react";
import { PriceRow, type UnitType } from "./PriceRow";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { cn } from "../utils/cn";

function changeUnit(currentUnit: UnitType) {
  if (currentUnit === "volume") {
    return "weight";
  }

  return "volume";
}

export function PriceCompare() {
  const [unit, setUnit] = useState<UnitType>("weight");
  const [rowAmount, setRowAmount] = useState(2);

  const [parent] = useAutoAnimate();

  return (
    <div>
      <div className="mb-6 inline-flex items-center rounded-full bg-neutral-50">
        <button
          className={cn(
            "rounded-full px-4 py-2 text-lg font-bold text-neutral-700 transition",
            unit === "weight" && "bg-sky-100 text-sky-800",
          )}
          onClick={() => setUnit("weight")}
        >
          Peso
        </button>

        <button
          className={cn(
            "rounded-full px-4 py-2 text-lg font-bold text-neutral-700 transition",
            unit === "volume" && "bg-sky-100 text-sky-800",
          )}
          onClick={() => setUnit("volume")}
        >
          Volume
        </button>
      </div>

      <div className="flex flex-col gap-2" ref={parent}>
        {Array(rowAmount)
          .fill("")
          .map((_, index) => {
            return <PriceRow unitType={unit} key={index} />;
          })}
      </div>

      <div className="mt-6 flex gap-4 border-t pt-6">
        <button
          className="flex items-center gap-2 rounded-full bg-sky-100 py-2 pl-2 pr-3 text-sm text-sky-800 transition active:bg-sky-200"
          onClick={() => setRowAmount((v) => v + 1)}
        >
          <PlusIcon />
          <div>Adicionar linha</div>
        </button>

        <button
          className="flex items-center gap-2 rounded-full bg-orange-100 py-2 pl-2 pr-3 text-sm text-orange-800 transition active:bg-orange-200 disabled:bg-neutral-100 disabled:text-neutral-800 disabled:opacity-70"
          disabled={rowAmount <= 1}
          onClick={() =>
            setRowAmount((v) => {
              if (v > 1) {
                return v - 1;
              }

              return v;
            })
          }
        >
          <MinusIcon />
          <div>Remover linha</div>
        </button>
      </div>
    </div>
  );
}
