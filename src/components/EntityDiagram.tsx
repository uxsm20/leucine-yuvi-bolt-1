import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MarkerType,
  Position,
} from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';

interface Action {
  name: string;
  description: string;
}

interface EntityNode {
  name: string;
  actions: Action[];
}

const entities: EntityNode[] = [
  {
    name: 'Clinical Trial',
    actions: [
      { name: 'Create Trial', description: 'Initialize a new clinical trial' },
      { name: 'Update Status', description: 'Modify trial status' },
      { name: 'Add Patient', description: 'Enroll a patient in the trial' },
      { name: 'Generate Report', description: 'Create trial progress report' }
    ]
  },
  {
    name: 'Patient',
    actions: [
      { name: 'Enroll', description: 'Register patient in system' },
      { name: 'Schedule Visit', description: 'Book patient appointment' },
      { name: 'Record Data', description: 'Log patient information' },
      { name: 'Update Status', description: 'Modify patient status' }
    ]
  },
  {
    name: 'Site',
    actions: [
      { name: 'Register', description: 'Add new trial site' },
      { name: 'Assign Staff', description: 'Add staff to site' },
      { name: 'Update Capacity', description: 'Modify site capacity' },
      { name: 'Generate Report', description: 'Create site status report' }
    ]
  }
];

const EntityNode = ({ data }: { data: EntityNode }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg min-w-[300px]">
      <div className="bg-indigo-500 text-white px-4 py-2 rounded-t-lg font-medium">
        {data.name}
      </div>
      <div className="p-4 space-y-3">
        {data.actions.map((action) => (
          <div key={action.name} className="bg-gray-50 p-3 rounded-lg">
            <div className="font-medium text-gray-900">{action.name}</div>
            <div className="text-sm text-gray-500">{action.description}</div>
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

const nodeTypes = {
  entity: EntityNode,
};

export default function EntityDiagram() {
  const initialNodes: Node[] = entities.map((entity) => ({
    id: entity.name,
    type: 'entity',
    data: entity,
    position: { x: 0, y: 0 },
  }));

  const initialEdges: Edge[] = [
    {
      id: 'trial-patient',
      source: 'Clinical Trial',
      target: 'Patient',
      label: 'manages',
      type: 'smoothstep',
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'trial-site',
      source: 'Clinical Trial',
      target: 'Site',
      label: 'conducted at',
      type: 'smoothstep',
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'site-patient',
      source: 'Site',
      target: 'Patient',
      label: 'treats',
      type: 'smoothstep',
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
    }
  ];

  const { nodes, edges } = getLayoutedElements(initialNodes, initialEdges);

  return (
    <div className="h-[600px] bg-gray-50 rounded-xl border border-gray-200">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}