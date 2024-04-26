import { useState } from "react";
import Header from "./components/Header"
import ResultsTable from "./components/ResultsTable";
import UserInput from "./components/UserInput";

function App() {

  const [data, setData] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  const isInputValid = data.duration >= 1;

  const handleChange = (e) => {
    const { name, value } = e.target

    const newData = {
      ...data,
      [name]: Number(value)
    };
    setData(newData);
  };

  return (
    <>
      <Header />

      <UserInput data={data} onChange={handleChange} />
      {!isInputValid && <p className="center">Please enter a duration greater than 0</p>}
      {isInputValid && <ResultsTable data={data} />}

    </>
  )
}

export default App