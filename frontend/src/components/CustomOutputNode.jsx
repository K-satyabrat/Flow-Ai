import { Handle, Position } from "@xyflow/react";
// Output Node
const CustomOutputNode = ({ data }) => {
  return (
    <div className="w-[70vw] sm:w-[400px] max-w-[400px] h-[140px] sm:h-[160px] border-2 border-green-500 rounded-xl bg-white shadow-md flex flex-col">
      <Handle type="target" position={Position.Left} />

      <div className="flex-1 overflow-y-auto p-3 text-sm text-gray-700">
        {data.result}
      </div>
    </div>
  );
};

export { CustomOutputNode };
