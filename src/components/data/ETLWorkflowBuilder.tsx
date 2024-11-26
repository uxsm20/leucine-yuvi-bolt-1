import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection
} from 'reactflow';
import 'reactflow/dist/style.css';

import SourceNode from './nodes/SourceNode';
import TransformationNode from './nodes/TransformationNode';
import DestinationNode from './nodes/DestinationNode';
import TransformationEditor from './TransformationEditor';

interface ETLWorkflowBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  sourceId: string;
}

const nodeTypes = {
  source: SourceNode,
  transformation: TransformationNode,
  destination: DestinationNode
};

// Mock initial workflow
const initialNodes: Node[] = [
  {
    id: 'source-1',
    type: 'source',
    position: { x: 0, y: 100 },
    data: { name: 'SAP Production', type: 'SAP ECC' }
  },
  {
    id: 'transform-1',
    type: 'transformation',
    position: { x: 300, y: 0 },
    data: { 
      label: 'Data Cleaning',
      operations: [
        { type: 'filter', config: { condition: 'status != null' } },
        { type: 'map', config: { expression: 'UPPER(name)' } }
      ]
    }
  },
  {
    id: 'transform-2',
    type: 'transformation',
    position: { x: 300, y: 200 },
    data: { 
      label: 'Aggregation',
      operations: [
        { type: 'aggregate', config: { group: ['department'], metrics: ['COUNT(*)'] } }
      ]
    }
  },
  {
    id: 'destination-1',
    type: 'destination',
    position: { x: 600, y: 100 },
    data: { name: 'Data Warehouse', type: 'Snowflake' }
  }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'source-1', target: 'transform-1' },
  { id: 'e1-3', source: 'source-1', target: 'transform-2' },
  { id: 'e2-4', source: 'transform-1', target: 'destination-1' },
  { id: 'e3-4', source: 'transform-2', target: 'destination-1' }
];

export default function ETLWorkflowBuilder({ isOpen, onClose, sourceId }: ETLWorkflowBuilderProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    if (node.type === 'transformation') {
      setSelectedNode(node);
      setIsEditorOpen(true);
    }
  };

  const handleSaveTransformation = (operations: any[]) => {
    if (!selectedNode) return;

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: {
              ...node.data,
              operations
            }
          };
        }
        return node;
      })
    );
    setIsEditorOpen(false);
    setSelectedNode(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900">
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">ETL Workflow Builder</h2>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>

        <div className="flex-1 h-[calc(100vh-4rem)]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>

      {selectedNode && (
        <TransformationEditor
          isOpen={isEditorOpen}
          onClose={() => {
            setIsEditorOpen(false);
            setSelectedNode(null);
          }}
          onSave={handleSaveTransformation}
          initialOperations={selectedNode.data.operations}
        />
      )}
    </div>
  );
}