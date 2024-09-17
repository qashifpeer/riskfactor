'use client'
import { useEffect, useState } from "react";



export default function Home() {
  const [maxCapital, setMaxCapital] =useState<number>(600000);
  const [riskPercent, setRiskPercent] =useState<number>(0.025);
  const [amountRisked, setAmountRisked] =useState<number>(0);
  const [entry, setEntry] =useState<number>(0);
  const [stopLoss, setStopLoss] =useState<number>(0);
  const [stopLossPoints, setStopLossPoints] =useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [capital,setCapital] = useState<number>(0);
  // let riskedCapital = maxCapital * 


  useEffect(() => {
    const capital= maxCapital;
    const risk = (riskPercent);
    const entryPrice = (entry) || 0;
    const stopLossPrice = (stopLoss) || 0;
    // const capitalDeploy = (maxCapital) || 0;
    
    
    // Calculate qtys
    const calculatedQty = (capital * risk);  
    const calculateSLPoints = Math.round(entryPrice-stopLossPrice);
    const calculateQty = Math.round(amountRisked/calculateSLPoints);
    const calculateMaxCapital =  Math.round(entryPrice * calculateQty);

    setAmountRisked(calculatedQty);
    setStopLossPoints(calculateSLPoints);
    setQuantity(calculateQty);
    setCapital(calculateMaxCapital);
    
      }, [maxCapital, riskPercent,entry,stopLoss]); // Dependency array: recalculate when maxCapital or riskPercent changes

 


  return (
    <div className="flex flex-col justify-center h-screen items-center">
      <h1 className="font-extrabold py-2 uppercase">Riskometer By Qashif</h1>
      <div className="border bottom-1 border-sky-500 mx-2 px-4 py-6">
        {/* Stock */}
        <div className="flex">
         <p className="w-32">Stock</p> 
          <div>
            <input type="text" className="text-black" />
          </div>
        </div>
       
        {/* Max Capital */}
        <div className="flex mt-1">
          <p className="w-32">Max Capital</p>
          <div>
            <input type="number" 
            id="maxCapital"
            name="maxCapital"
            onChange={(e)=>{
              setMaxCapital(Number(e.target.value))
              
            }}
            value={maxCapital}
            className="text-black px-2" />
          </div>
        </div>

        {/* Risk Percent */}
        <div className="flex mt-1">
          <p className="w-32">Risk Percent</p>
          <div>
            <select name="riskPercent" id="riskPercent" className="riskPercent text-black px-2 py-1"  onChange={(e)=>{
              setRiskPercent(Number(e.target.value))
              
            }}>
              <option value={0.25/100}>0.25%</option>
              <option value={0.50/100}>0.50%</option>
              <option value={1/100}>1%</option>
             
            </select>
          </div>
        </div>
        
        {/* Amount Risked */}
        <div className="flex mt-1">
          <p className="w-32">Amount Risked</p>
          <div>
            {/* <input type="number"  className="text-black" onChange={handleAmountRisked}  /> */}
            <p>{amountRisked}</p>
          </div>
        </div>
        
        {/* Entry*/}
        <div className="flex mt-1">
          <p className="w-32">Entry</p>
          <div>
            <input type="number" 
            className="text-black bg-sky-400 font-bold px-2"
            id="entry" 
            name="entry"
            onChange={(e)=>{setEntry(Number(e.target.value))}}/>
          </div>
        </div>
        
        {/* Stop Loss */}
        <div className="flex mt-1">
          <p className="w-32">Stop Loss</p>
          <div>
            <input type="number"  className="text-black font-bold bg-red-300 px-2 "
            id="stopLoss" 
            name="stopLoss"
            onChange={(e)=>{setStopLoss(Number(e.target.value))}}  />
          </div>
        </div>
       
        {/* SL Points */}
        <div className="flex mt-1">
         <p className="w-32 ">SL Points</p> 
          <div>
            <p>{stopLossPoints}</p>
          </div>
        </div>
       
        {/* Quantity */}
        <div className="flex mt-1">
          <p className="w-32">Quantity</p>
          <div>
            <p className="bg-white text-black font-bold px-4 text-center">{quantity}</p>
          </div>
        </div>
        
        {/* Capital */}
        <div className="flex mt-1">
          <p className="w-32">Capital</p>
          <div className="">
            <p>{capital}</p>
          </div>
        </div>
        {/* Target */}
        
        
      </div>
    </div>
  );
}
