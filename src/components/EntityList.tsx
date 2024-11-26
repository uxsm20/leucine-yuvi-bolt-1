import { useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MarkerType,
} from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';

interface Action {
  name: string;
  description: string;
}

interface Entity {
  id: string;
  name: string;
  description: string;
  actions: Action[];
}

const initialEntities: Entity[] = [
  {
    id: "1",
    name: "Clinical Trial",
    description: "Represents a medical research study",
    actions: [
      { name: "initiate", description: "Start a new clinical trial" },
      { name: "pause", description: "Temporarily halt trial activities" },
      { name: "resume", description: "Resume paused trial" },
      { name: "complete", description: "Mark trial as completed" }
    ]
  },
  {
    id: "2",
    name: "Patient",
    description: "Represents a trial participant",
    actions: [
      { name: "enroll", description: "Enroll patient in trial" },
      { name: "withdraw", description: "Withdraw patient from trial" },
      { name: "update", description: "Update patient information" }
    ]
  },
  {
    id: "3",
    name: "Site",
    description: "Represents a trial location",
    actions: [
      { name: "activate", description: "Activate trial site" },
      { name: "deactivate", description: "Deactivate trial site" },
      { name: "update", description: "Update site information" }
    ]
  }
];

const EntityNode = ({ data }: { data: Entity }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 min-w-[300px] border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-2">{data.name}</h3>
      <p className="text-sm text-gray-400 mb-4">{data.description}</p>
      <div className="space-y-2">
        {data.actions.map((action) => (
          <div key={action.name} className="bg-gray-700 p-2 rounded">
            <div className="text-sm font-medium text-white">{action.name}</div>
            <div className="text-xs text-gray-400">{action.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'LR' });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 300, height: 200 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - 150,
        y: nodeWithPosition.y - 100,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

export default function EntityList() {
  const initialNodes: Node[] = initialEntities.map((entity) => ({
    id: entity.id,
    type: 'custom',
    data: entity,
    position: { x: 0, y: 0 },
  }));

  const initialEdges: Edge[] = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      label: 'manages',
      type: 'smoothstep',
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e1-3',
      source: '1',
      target: '3',
      label: 'conducted at',
      type: 'smoothstep',
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e3-2',
      source: '3',
      target: '2',
      label: 'treats',
      type: 'smoothstep',
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
    }
  ];

  const { nodes, edges } = getLayoutedElements(initialNodes, initialEdges);

  return (
    <div className="h-[600px] bg-gray-900 rounded-xl border border-gray-700">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={{ custom: EntityNode }}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Background color="#374151" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
}