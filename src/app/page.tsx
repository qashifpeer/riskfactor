"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaRegSave } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { MdClear } from "react-icons/md";
// Define an interface for stock data
interface StockDataInterface {
  stockId: string;
  stockName: string;
  maxCapital: number;
  riskPercent: number;
  amountRisked: number;
  entry: number;
  stopLoss: number;
  stopLossPoints: number;
  quantity: number;
  capital: number;
  targetPrice: number;
}

export default function Home() {
  const [stockName, setStockName] = useState<string>("");
  const [maxCapital, setMaxCapital] = useState<number>(600000);
  const [riskPercent, setRiskPercent] = useState<number>(0.25);
  const [amountRisked, setAmountRisked] = useState<number>(0);
  const [entry, setEntry] = useState<number>(0);
  const [stopLoss, setStopLoss] = useState<number>(0);
  const [stopLossPoints, setStopLossPoints] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [capital, setCapital] = useState<number>(0);
  const [targetPrice, setTargetPrice] = useState<number>(0);

  // State to hold stock list
  const [stockList, setStockList] = useState<StockDataInterface[]>([]);

  useEffect(() => {
    const entryPrice = entry || 0;
    const stopLossPrice = stopLoss || 0;
    
    const amountRisked = (maxCapital * riskPercent) / 100;
    const calculateSLPoints = Math.round(entryPrice - stopLossPrice);
    const calculateQty = Math.round(amountRisked / stopLossPoints);
    const calculateMaxCapital = Math.round(entryPrice * calculateQty);

    setAmountRisked(amountRisked);
    setStopLossPoints(calculateSLPoints);
    setQuantity(calculateQty);
    setCapital(calculateMaxCapital);
  }, [maxCapital, riskPercent, entry, stopLoss, stopLossPoints]); // Dependency array: recalculate when maxCapital or riskPercent changes

  // Function to save or update stock data
  const saveStockData = () => {
    const stockId = uuidv4();

    const data: StockDataInterface = {
      stockId,
      stockName,
      maxCapital,
      riskPercent,
      amountRisked,
      entry,
      stopLoss,
      stopLossPoints,
      quantity,
      capital,
      targetPrice,
    };

    // Retrieve current list of stocks from localStorage or initialize an empty array
    const storedStocks: StockDataInterface[] = JSON.parse(
      localStorage.getItem("stocks") || "[]"
    );

    // Check if the stock already exists in the list
    const existingStockIndex = storedStocks.findIndex(
      (stock) => stock.stockName === stockName
    );

    if (existingStockIndex > -1) {
      // Update existing stock
      storedStocks[existingStockIndex] = data;
    } else {
      // Add new stock
      storedStocks.push(data);
    }
    // Save the updated stock list to localStorage
    localStorage.setItem("stocks", JSON.stringify(storedStocks));

    // Update the stock list in state
    fetchStockList();

    // Clear form inputs after saving
    clearForm();
  };

  // Function to fetch the list of all stocks from localStorage
  const fetchStockList = () => {
    const storedStocks: StockDataInterface[] = JSON.parse(
      localStorage.getItem("stocks") || "[]"
    );
    setStockList(storedStocks);
  };

  // Function to load selected stock data into the input fields
  const loadStockData = (stockName: string) => {
    const storedStocks: StockDataInterface[] = JSON.parse(
      localStorage.getItem("stocks") || "[]"
    );
    const selectedStock = storedStocks.find(
      (stock) => stock.stockName === stockName
    );

    if (selectedStock) {
      setStockName(selectedStock.stockName);
      setMaxCapital(selectedStock.maxCapital);
      setRiskPercent(selectedStock.riskPercent);
      setAmountRisked(selectedStock.amountRisked);
      setEntry(selectedStock.entry);
      setStopLoss(selectedStock.stopLoss);
      setStopLossPoints(selectedStock.stopLossPoints);
      setQuantity(selectedStock.quantity);
      setCapital(selectedStock.capital);
      setTargetPrice(selectedStock.targetPrice);
    }
  };

  // Function to delete a stock
  const deleteStock = (stockName: string) => {
    const storedStocks: StockDataInterface[] = JSON.parse(
      localStorage.getItem("stocks") || "[]"
    );
    const updatedStocks = storedStocks.filter(
      (stock) => stock.stockName !== stockName
    );

    // Save the updated list to localStorage
    localStorage.setItem("stocks", JSON.stringify(updatedStocks));

    // Update the stock list in state
    fetchStockList();
  };

  // Function to clear the form inputs after saving or updating
  const clearForm = () => {
    setStockName("");
    // setMaxCapital(0);
    setRiskPercent(0);
    setAmountRisked(0);
    setEntry(0);
    setStopLoss(0);
    setStopLossPoints(0);
    setQuantity(0);
    setCapital(0);
    setTargetPrice(0);
  };

  // Fetch the stock list when the component mounts
  useEffect(() => {
    fetchStockList();
  }, [maxCapital, riskPercent, entry, stopLoss, stopLossPoints]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col   items-center  md:p-2 w-[90%] md:w-1/2">
      <h1 className="font-extrabold py-2 uppercase">Riskometer By Qashif <a href="https://x.com/QashifPeer" target="blank"><BsInfoCircle className="inline-block text-sky-500 cursor-pointer" /></a>  </h1>
      <div className="border bottom-1 border-sky-500 px-4 py-6 w-full mx-2">
       
        {/* Stock */}
        <div className="flex">
          <p className="w-1/2">Stock</p>
          <div className="w-1/2">
            <input
              type="text"
              className="text-black bg-slate-200 w-32 pl-1"
              placeholder="Stock Name"
              value={stockName}
              onChange={(e) => {
                setStockName(e.target.value);
              }}
            />
          </div>
        </div>

        {/* Max Capital */}
        <div className="flex mt-1">
          <p className="w-1/2">Max Capital</p>
          <div className="w-1/2">
            <input
              type="number"
              id="maxCapital"
              name="maxCapital"
              value={maxCapital}
              onChange={(e) => {
                setMaxCapital(Number(e.target.value));
              }}
              className="text-black bg-slate-200 px-1 w-32"
            />
          </div>
        </div>

        {/* Risk Percent */}
        <div className="flex mt-1 ">
          <p className="w-1/2">Risk Percent</p>
          <div className="w-1/2">
            <select
              name="riskPercent"
              id="riskPercent"
              
              className="riskPercent text-black bg-slate-200 px-1 py-1 w-32"
              onChange={(e) => {
                setRiskPercent(Number(e.target.value));
              }}
            >
              <option value={0.25}>0.25%</option>
              <option value={0.5}>0.50%</option>
              <option value={1}>1%</option>
              <option value={2}>2%</option>
            </select>
          </div>
        </div>

        {/* Amount Risked */}
        <div className="flex mt-1">
          <p className="w-1/2">Amount Risked</p>
          <div className="w-1/2">
            <p className="w-32">{amountRisked}</p>
          </div>
        </div>

        {/* Entry*/}
        <div className="flex mt-1">
          <p className="w-1/2">Entry</p>
          <div className="w-1/2">
            <input
              type="number"
              className="text-black bg-sky-400 font-bold px-1 w-32"
              id="entry"
              name="entry"
              value={entry}
              onChange={(e) => {
                setEntry(Number(e.target.value));
              }}
            />
          </div>
        </div>

        {/* Stop Loss */}
        <div className="flex mt-1">
          <p className="w-1/2">Stop Loss</p>
          <div className="w-1/2">
            <input
              type="number"
              className="text-black font-bold bg-red-300 px-1 w-32"
              id="stopLoss"
              name="stopLoss"
              value={stopLoss}
              onChange={(e) => {
                setStopLoss(Number(e.target.value));
              }}
            />
          </div>
        </div>

        {/* SL Points */}
        <div className="flex mt-1">
          <p className="w-1/2 ">SL Points</p>
          <div className="w-1/2">
            <p className="text-slate-400 text-sm w-32">{stopLossPoints}</p>
          </div>
        </div>

        {/* Quantity */}
        <div className="flex mt-1">
          <p className="w-1/2">Quantity</p>
          <div className="w-1/2">
            <p className="bg-slate-200 text-red-500 font-bold px-1 text-center w-32">
              {quantity || 0}
            </p>
          </div>
        </div>

        {/* Capital */}
        <div className="flex mt-1">
          <p className="w-1/2">Capital</p>
          <div className="w-1/2">
            <p className="w-32">{capital || 0}</p>
          </div>
        </div>

        {/* Target */}
        <div className="flex">
          <p className="w-1/2">Target</p>
          <div className="w-1/2">
            <input
              type="number"
              className="text-black w-32 bg-slate-200 pl-1"
              placeholder="Stock Name"
              value={targetPrice}
              onChange={(e) => {
                setTargetPrice(Number(e.target.value));
              }}
            />
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 mt-2">
          <button
            onClick={saveStockData}
            className="border border-sky-500 px-4 py-1 rounded-md hover:bg-sky-200 transition-all duration-150"
          >
            <FaRegSave className="text-sky-500 text-xl" />
          </button>
          <button
            onClick={clearForm}
            className="border border-sky-500 px-4 py-1 rounded-md hover:bg-sky-200 transition-all duration-200"
          >
            <MdClear className="text-red-500 text-xl" />
          </button>
        </div>
        <div className="mt-2">
          <h3 className="underline text-sm bg-sky-200 text-black text-center">Saved Stocks</h3>
          <ul>
            {stockList.map((stock) => (
              <li key={stock.stockId} className="">
                <div className="flex w-64 justify-start items-center">
                  <button
                    onClick={() => loadStockData(stock.stockName)}
                    className="text-start w-3/4 uppercase text text-sm hover:underline transition-all duration-300"
                  >
                    {stock.stockName}
                  </button>
                  <button
                    onClick={() => deleteStock(stock.stockName)}
                    className="text-center items-center hover:translate-x-1 duration-100"
                  >
                    <MdDeleteOutline className="text-red-500 text-lg " />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Target */}
        {/* <p>{riskPercent}</p> */}
      </div>
      </div>
    </div>
  );
}
