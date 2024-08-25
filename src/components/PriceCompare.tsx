import { useEffect, useRef, useState } from "react";
import { PriceRow, type UnitType } from "./PriceRow";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { cn } from "../utils/cn";

function getProportionalPrice(price: string, amount: string) {
  const numberPrice = Number(price?.replace(",", ".") || 0);
  const numberAmount = Number(amount?.replace(",", ".") || 0);

  if (!numberPrice || !numberAmount) {
    return 0;
  }

  return Number((numberPrice / numberAmount).toFixed(2));
}

type IRow = {
  price: string;
  amount: string;
};

export function PriceCompare() {
  const [unit, setUnit] = useState<UnitType>("weight");
  const [rows, setRows] = useState<IRow[]>([
    { amount: "", price: "" },
    { amount: "", price: "" },
  ]);

  const [parent] = useAutoAnimate();

  let lowestPrice = Number.MAX_VALUE;

  rows.forEach((item) => {
    const proportionalPrice = getProportionalPrice(item.price, item.amount);

    if (proportionalPrice < lowestPrice && proportionalPrice !== 0) {
      lowestPrice = proportionalPrice;
    }
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between border-b border-b-neutral-100 pb-6">
        <div className="inline-flex items-center rounded-full bg-neutral-50">
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

        <div>
          <button
            className="rounded-full bg-neutral-100 px-3 py-1 text-sm"
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
            Limpar tudo
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2" ref={parent}>
        {rows.map((item, index) => {
          const proportionalPrice = getProportionalPrice(
            item.price,
            item.amount,
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
              isCheapest={proportionalPrice === lowestPrice}
            />
          );
        })}
      </div>

      <div className="mt-6 flex gap-4 border-t border-t-neutral-100 pt-6">
        <button
          className="flex items-center gap-2 rounded-full bg-sky-100 py-2 pl-2 pr-3 text-sm text-sky-800 transition active:bg-sky-200"
          onClick={() =>
            setRows((v) => {
              return [...v, { amount: "", price: "" }];
            })
          }
        >
          <PlusIcon />
          <div>Adicionar linha</div>
        </button>

        <button
          className="flex items-center gap-2 rounded-full bg-orange-100 py-2 pl-2 pr-3 text-sm text-orange-800 transition active:bg-orange-200 disabled:bg-neutral-100 disabled:text-neutral-800 disabled:opacity-70"
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
          <MinusIcon />
          <div>Remover linha</div>
        </button>
      </div>
    </div>
  );
}
