import React from 'react';
import { Handle, Position } from 'reactflow';

interface DestinationNodeProps {
  data: {
    name: string;
    type: string;
  };
}

export default function DestinationNode({ data }: DestinationNodeProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 min-w-[200px]">
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      
      <div className="mb-2">
        <h3 className="text-sm font-medium text-white">{data.name}</h3>
        <p className="text-xs text-gray-400">{data.type}</p>
      </div>
    </div>
  );
}