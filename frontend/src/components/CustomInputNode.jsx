import {
  Handle,
  Position,
} from "@xyflow/react";

const CustomInputNode = ({ id, data }) => {
  return (
    <div className="w-[60vw] sm:w-[300px] max-w-[300px] h-[140px] sm:h-[160px] border-2 border-blue-500 rounded-xl bg-white shadow-md overflow-hidden">
      <Handle type="source" position={Position.Right} />

      <textarea
        placeholder="Type your prompt..."
        value={data.input || ""}
        onChange={(e) => data.onChange(id, e.target.value)}
        className="w-full h-full resize-none outline-none p-3 text-sm text-gray-800 caret-blue-600"
      />
    </div>
  );
};

export { CustomInputNode };
