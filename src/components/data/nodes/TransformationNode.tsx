import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

interface Operation {
  type: 'filter' | 'map' | 'aggregate' | 'join';
  config: Record<string, any>;
}

interface TransformationNodeProps {
  data: {
    label: string;
    operations: Operation[];
  };
}

export default function TransformationNode({ data }: TransformationNodeProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 min-w-[200px]">
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      
      <div className="mb-2">
        <h3 className="text-sm font-medium text-white">{data.label}</h3>
      </div>

      <div className="space-y-2">
        {data.operations.map((op, index) => (
          <div key={index} className="bg-gray-900 px-3 py-2 rounded-lg text-xs text-gray-300">
            {op.type}
          </div>
        ))}

        {data.operations.length === 0 && (
          <div className="text-xs text-gray-400">
            No operations configured
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </div>
  );
}