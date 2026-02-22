import { useMemo, useState } from "react";

function App() {
  const [currentPrice, setCurrentPrice] = useState<string>("0");
  const [profitMargin, setProfitMargin] = useState<string>("0");
  const [extraAmount, setExtraAmount] = useState<string>("0");

  const parseInputValue = (value: string) => {
    if (value.trim() === "") return 0;

    const normalizedValue = value.replace(",", ".");
    const parsedNumber = Number(normalizedValue);

    return Number.isFinite(parsedNumber) ? parsedNumber : 0;
  };

  const finalTotal = useMemo(() => {
    const price = parseInputValue(currentPrice);
    const margin = parseInputValue(profitMargin);
    const extra = parseInputValue(extraAmount);

    return price * (1 + margin / 100) + extra;
  }, [currentPrice, profitMargin, extraAmount]);

  return (
    <main className="container">
      <h1>Calculadora de precio</h1>

      <label htmlFor="precio-actual">Precio actual del producto</label>
      <input
        id="precio-actual"
        type="text"
        inputMode="decimal"
        value={currentPrice}
        onFocus={() => {
          if (currentPrice === "0") setCurrentPrice("");
        }}
        onChange={(event) => setCurrentPrice(event.target.value)}
      />

      <label htmlFor="margen-ganancia">Margen de ganancia (%)</label>
      <input
        id="margen-ganancia"
        type="text"
        inputMode="decimal"
        value={profitMargin}
        onFocus={() => {
          if (profitMargin === "0") setProfitMargin("");
        }}
        onChange={(event) => setProfitMargin(event.target.value)}
      />

      <label htmlFor="cantidad-extra">Cantidad extra</label>
      <input
        id="cantidad-extra"
        type="text"
        inputMode="decimal"
        value={extraAmount}
        onFocus={() => {
          if (extraAmount === "0") setExtraAmount("");
        }}
        onChange={(event) => setExtraAmount(event.target.value)}
      />
      <article>
        <strong>Calculo final: ${finalTotal.toFixed(2)}</strong>
      </article>
      <button
        type="button"
        style={{ display: "block", marginLeft: "auto" }}
        onClick={() => {
          setCurrentPrice("");
          setProfitMargin("");
          setExtraAmount("");
        }}
      >
        Limpiar
      </button>
    </main>
  );
}

export default App;
