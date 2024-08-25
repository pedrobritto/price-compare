import { useState } from "react";
import { PriceRow, type UnitType } from "./PriceRow";
import {
  CircleMinusIcon,
  CirclePlusIcon,
  RotateCcw,
  ShuffleIcon,
} from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { cn } from "../utils/cn";

function getProportionalPrice(
  price: string,
  amount: string,
  isSmallUnit: boolean,
) {
  const numberPrice = Number(price?.replace(",", ".") || 0);
  const numberAmount = Number(amount?.replace(",", ".") || 0);

  if (!numberPrice || !numberAmount) {
    return 0;
  }

  const proportionalPrice = numberPrice / numberAmount;

  if (isSmallUnit) {
    return Number((proportionalPrice * 1000).toFixed(2));
  }

  return Number(proportionalPrice.toFixed(2));
}

/** The data of a single row. */
type IRow = {
  price: string;
  amount: string;
};

/**
 * Calculates and returns the lowest proportional price inside the list.
 *
 * @param rows The item rows
 * @param isSmallUnit Whether the smallUnit is toggled.
 * @returns The lowest price in the rows
 */
function getLowestProportionalPrice(rows: IRow[], isSmallUnit: boolean) {
  let lowestPrice = Number.MAX_VALUE;

  rows.forEach((item) => {
    const proportionalPrice = getProportionalPrice(
      item.price,
      item.amount,
      isSmallUnit,
    );

    if (proportionalPrice < lowestPrice && proportionalPrice !== 0) {
      lowestPrice = proportionalPrice;
    }
  });

  return lowestPrice;
}

const emptyRow = { amount: "", price: "" };

export function PriceCompareApp() {
  const [unit, setUnit] = useState<UnitType>("weight");
  const [isSmallUnit, setIsSmallUnit] = useState(false);
  const [rows, setRows] = useState<IRow[]>([{ ...emptyRow }, { ...emptyRow }]);

  const [parent] = useAutoAnimate();

  const lowestPrice = getLowestProportionalPrice(rows, isSmallUnit);

  /** Get the label for the toggle small unit button. */
  function getSmallUnitButtonToggleLabel() {
    if (unit === "volume") {
      return isSmallUnit ? "Litros (L)" : "Mililitros (ml)";
    }

    return isSmallUnit ? "Quilos (Kg)" : "Gramas (g)";
  }

  return (
    <div>
      <div className="mb-6 border-b border-b-neutral-100 pb-6 dark:border-b-neutral-700">
        <div className="mb-4 flex items-center justify-between">
          <div className="inline-flex items-center rounded-full bg-neutral-50 dark:bg-neutral-800 ">
            <button
              className={cn(
                "rounded-full px-4 py-2 text-lg font-bold text-neutral-700 transition dark:text-neutral-200",
                unit === "weight" &&
                  "bg-sky-100 text-sky-800 dark:bg-sky-800 dark:text-sky-100",
              )}
              onClick={() => setUnit("weight")}
            >
              Peso
            </button>
            <button
              className={cn(
                "rounded-full px-4 py-2 text-lg font-bold text-neutral-700 transition dark:text-neutral-200",
                unit === "volume" &&
                  "bg-sky-100 text-sky-800 dark:bg-sky-800 dark:text-sky-100",
              )}
              onClick={() => setUnit("volume")}
            >
              Volume
            </button>
          </div>

          <button
            className="rounded-full bg-neutral-100 px-3 py-1 text-sm dark:bg-neutral-700 flex gap-2 items-center"
            onClick={() => {
              setRows((v) => {
                const copy = [...v];

                copy.forEach((item) => {
                  item.amount = "";
                  item.price = "";
                });

                return copy;
              });
            }}
          >
            <RotateCcw size={16} />
            Limpar valores
          </button>
        </div>

        <div>
          <button
            className="rounded-full bg-neutral-100 px-3 py-1 text-sm dark:bg-neutral-700 flex gap-2 items-center"
            onClick={() => {
              setIsSmallUnit((v) => !v);
            }}
          >
            <ShuffleIcon size={16} className="-rotate-90" />
            Mudar para {getSmallUnitButtonToggleLabel()}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2" ref={parent}>
        {rows.map((item, index) => {
          const proportionalPrice = getProportionalPrice(
            item.price,
            item.amount,
            isSmallUnit,
          );

          return (
            <PriceRow
              key={index}
              price={item.price}
              setPrice={(price: string) => {
                setRows((v) => {
                  const copy = [...v];
                  const row = copy[index];

                  row.price = price;
                  copy[index] = row;

                  return copy;
                });
              }}
              amount={item.amount}
              setAmount={(amount: string) => {
                setRows((v) => {
                  const copy = [...v];
                  const row = copy[index];

                  row.amount = amount;
                  copy[index] = row;

                  return copy;
                });
              }}
              result={proportionalPrice}
              unitType={unit}
              isSmallUnit={isSmallUnit}
              isCheapest={proportionalPrice === lowestPrice}
            />
          );
        })}
      </div>

      <div className="mt-6 flex gap-4 border-t border-t-neutral-100 pt-6 dark:border-t-neutral-700">
        <button
          className="flex items-center gap-2 rounded-full bg-sky-100 py-2 pl-2 pr-3 text-sm text-sky-800 transition active:bg-sky-200 dark:bg-sky-800 dark:text-sky-100"
          onClick={() =>
            setRows((v) => {
              return [...v, { ...emptyRow }];
            })
          }
        >
          <CirclePlusIcon size={20} />
          <div>Adicionar linha</div>
        </button>

        <button
          className="flex items-center gap-2 rounded-full bg-orange-100 py-2 pl-2 pr-3 text-sm text-orange-800 transition active:bg-orange-200 disabled:bg-neutral-100 disabled:text-neutral-800 disabled:opacity-70 dark:bg-orange-800 dark:text-orange-100"
          disabled={rows.length <= 1}
          onClick={() =>
            setRows((v) => {
              if (v.length >= 1) {
                return v.slice(0, v.length - 1);
              }

              return v;
            })
          }
        >
          <CircleMinusIcon size={20} />
          <div>Remover linha</div>
        </button>
      </div>
    </div>
  );
}
