import React from 'react';
import { Handle, Position } from 'reactflow';

interface SourceNodeProps {
  data: {
    name: string;
    type: string;
  };
}

export default function SourceNode({ data }: SourceNodeProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 min-w-[200px]">
      <div className="mb-2">
        <h3 className="text-sm font-medium text-white">{data.name}</h3>
        <p className="text-xs text-gray-400">{data.type}</p>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </div>
  );
}