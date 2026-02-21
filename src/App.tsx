import { useMemo, useState } from "react";

function App() {
  const [currentPrice, setCurrentPrice] = useState<number | "">(0);
  const [profitMargin, setProfitMargin] = useState<number | "">(0);
  const [extraAmount, setExtraAmount] = useState<number | "">(0);

  const finalTotal = useMemo(() => {
    const price = currentPrice === "" ? 0 : currentPrice;
    const margin = profitMargin === "" ? 0 : profitMargin;
    const extra = extraAmount === "" ? 0 : extraAmount;

    return price * (1 + margin / 100) + extra;
  }, [currentPrice, profitMargin, extraAmount]);

  return (
    <main className="container">
      <h1>Calculadora de precio final</h1>

      <label htmlFor="precio-actual">Precio actual del producto</label>
      <input
        id="precio-actual"
        type="number"
        min="0"
        step="0.01"
        value={currentPrice}
        onFocus={() => {
          if (currentPrice === 0) setCurrentPrice("");
        }}
        onChange={(event) =>
          setCurrentPrice(event.target.value === "" ? "" : Number(event.target.value))
        }
      />

      <label htmlFor="margen-ganancia">Margen de ganancia (%)</label>
      <input
        id="margen-ganancia"
        type="number"
        step="0.01"
        value={profitMargin}
        onFocus={() => {
          if (profitMargin === 0) setProfitMargin("");
        }}
        onChange={(event) =>
          setProfitMargin(event.target.value === "" ? "" : Number(event.target.value))
        }
      />

      <label htmlFor="cantidad-extra">Cantidad extra</label>
      <input
        id="cantidad-extra"
        type="number"
        step="0.01"
        value={extraAmount}
        onFocus={() => {
          if (extraAmount === 0) setExtraAmount("");
        }}
        onChange={(event) =>
          setExtraAmount(event.target.value === "" ? "" : Number(event.target.value))
        }
      />

      <button
        type="button"
        onClick={() => {
          setCurrentPrice("");
          setProfitMargin("");
          setExtraAmount("");
        }}
      >
        Limpiar
      </button>

      <article>
        <strong>Total final: ${finalTotal.toFixed(2)}</strong>
      </article>
    </main>
  );
}

export default App;
