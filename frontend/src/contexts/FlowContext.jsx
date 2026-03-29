import { createContext, useContext, useState } from "react";
import { askAI, saveAIData } from "../api/aiApi";

const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("Result will appear here");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Run Flow
  const runFlow = async () => {
    if (!input.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await askAI({
        prompt: input,
        model: "meta-llama/llama-3-8b-instruct",
      });

      const answer = res.data?.answer || "No response";
      setResult(answer);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch response.");
      setResult("Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Save Data
  const saveData = async () => {
    if (!input || !result) {
      setError("Nothing to save.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await saveAIData({
        prompt: input,
        response: result,
      });

      alert("Saved!");
    } catch (err) {
      console.error(err);
      setError("Failed to save data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlowContext.Provider
      value={{
        input,
        setInput,
        result,
        loading,
        error,
        setError,
        runFlow,
        saveData,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = () => useContext(FlowContext);