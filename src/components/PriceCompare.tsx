import { useState } from "react";
import { PriceRow, type UnitType } from "./PriceRow";

function changeUnit(currentUnit: UnitType) {
  if (currentUnit === "volume") {
    return "weight";
  }

  return "volume";
}

export function PriceCompare() {
  const [unit, setUnit] = useState<UnitType>("weight");
  const [rowAmount, setRowAmount] = useState(1);

  return (
    <div>
      <div className="mb-4 flex items-center gap-6">
        <h2 className="text-lg">{unit}</h2>
        <button
          className="bg-neutral-200 rounded-md px-2 py-1 text-sm"
          onClick={() => {
            setUnit(changeUnit(unit));
          }}
        >
          Mudar para litro/ml
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {Array(rowAmount)
          .fill("")
          .map(() => {
            return <PriceRow unitType={unit} />;
          })}
      </div>

      <div className="mt-4">
        <button
          className="bg-neutral-200 rounded-md px-2 py-1 text-sm"
          onClick={() => setRowAmount((v) => v + 1)}
        >
          Add
        </button>
      </div>
    </div>
  );
}
