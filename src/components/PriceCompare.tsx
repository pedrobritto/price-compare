import { useEffect, useRef, useState } from "react";
import { PriceRow, type UnitType } from "./PriceRow";
import { PlusIcon } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

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
      <div className="mb-4 flex items-center gap-6">
        <h2 className="text-lg font-bold text-neutral-700">
          {unit === "volume" ? "Volume" : "Peso"}
        </h2>
        <button
          className="rounded-lg border border-sky-600 bg-sky-100 px-2.5 py-1 text-sm text-sky-800 active:bg-sky-200"
          onClick={() => {
            setUnit(changeUnit(unit));
          }}
        >
          Mudar para {changeUnit(unit) === "weight" ? "Peso" : "Volume"}
        </button>
      </div>

      <div className="flex flex-col gap-4" ref={parent}>
        {Array(rowAmount)
          .fill("")
          .map((_, index) => {
            return <PriceRow unitType={unit} key={index} />;
          })}
      </div>

      <div className="mt-4">
        <button
          className="flex items-center gap-2 rounded-lg border border-sky-600 bg-sky-100 py-2 pl-2 pr-3 text-sm text-sky-800 active:bg-sky-200"
          onClick={() => setRowAmount((v) => v + 1)}
        >
          <PlusIcon />
          <div>Adicionar outra linha</div>
        </button>
      </div>
    </div>
  );
}
