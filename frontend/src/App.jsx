import {
  ReactFlow,
  Controls,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect } from "react";
import { CustomInputNode } from "./components/CustomInputNode";
import { CustomOutputNode } from "./components/CustomOutputNode";
import { useFlow } from "./contexts/FlowContext";

function App() {
  const { input, setInput, result, loading, error, runFlow, saveData } =
    useFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const nodeTypes = {
    inputNode: CustomInputNode,
    outputNode: CustomOutputNode,
  };

  //Initialize nodes & edges
  useEffect(() => {
    const isMobile = window.innerWidth < 640;

    const initialNodes = [
      {
        id: "1",
        type: "inputNode",
        position: { x: 50, y: 100 },
        data: {
          input,
          onChange: (id, value) => {
            setInput(value);

            setNodes((nds) =>
              nds.map((node) =>
                node.id === id
                  ? { ...node, data: { ...node.data, input: value } }
                  : node,
              ),
            );
          },
        },
      },
      {
        id: "2",
        type: "outputNode",
        position: isMobile ? { x: 50, y: 300 } : { x: 500, y: 100 },
        data: { result },
      },
    ];

    const initialEdges = [
      {
        id: "e1-2",
        source: "1",
        target: "2",
        type: "smoothstep",
        animated: true,
        style: { stroke: "#6366f1", strokeWidth: 2 },
      },
    ];

    setNodes(initialNodes);
    setEdges(initialEdges);
  }, []);

  //handle input change
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === "1" ? { ...node, data: { ...node.data, input } } : node,
      ),
    );
  }, [input]);

  // output change
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === "2" ? { ...node, data: { ...node.data, result } } : node,
      ),
    );
  }, [result]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-300 to-green-400 flex flex-col">
      {/* Buttons */}
      <div className="w-full flex flex-col items-center px-4 py-3 z-50">
        <div className="flex gap-3 bg-white/70 backdrop-blur-md px-4 py-2 rounded-xl shadow-md">
          <button
            onClick={runFlow}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow disabled:opacity-50"
          >
            {loading ? "Running..." : "Run Flow"}
          </button>

          <button
            onClick={saveData}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow disabled:opacity-50"
          >
            Save
          </button>
        </div>

        {error && (
          <div className="mt-2 text-red-600 text-sm font-medium">{error}</div>
        )}
      </div>

      {/* React Flow */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Controls position="top-right" />
          {/* <MiniMap zoomable pannable /> */}
          <Background gap={20} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;
