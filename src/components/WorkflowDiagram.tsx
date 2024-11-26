import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MarkerType,
  Handle,
  Position
} from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';

interface WorkflowStep {
  id: string;
  label: string;
  description: string;
  inputs?: string[];
  outputs?: string[];
  page: {
    id: string;
    name: string;
    sections: {
      id: string;
      type: 'form' | 'table' | 'chart';
      title: string;
      description: string;
    }[];
  };
}

const steps: WorkflowStep[] = [
  {
    id: '1',
    label: 'Create Trial',
    description: 'Initialize a new clinical trial',
    inputs: ['Protocol Document'],
    outputs: ['Trial Record'],
    page: {
      id: 'p1',
      name: 'Create Trial',
      sections: [
        {
          id: 's1',
          type: 'form',
          title: 'Trial Details',
          description: 'Basic trial information'
        }
      ]
    }
  },
  {
    id: '2',
    label: 'Patient Enrollment',
    description: 'Enroll patients in the trial',
    inputs: ['Patient Data', 'Trial Record'],
    outputs: ['Enrollment Record'],
    page: {
      id: 'p2',
      name: 'Patient Enrollment',
      sections: [
        {
          id: 's2',
          type: 'form',
          title: 'Patient Information',
          description: 'Patient enrollment form'
        }
      ]
    }
  },
  {
    id: '3',
    label: 'Data Collection',
    description: 'Collect trial data',
    inputs: ['Enrollment Record'],
    outputs: ['Trial Data'],
    page: {
      id: 'p3',
      name: 'Data Collection',
      sections: [
        {
          id: 's3',
          type: 'form',
          title: 'Data Entry',
          description: 'Trial data collection form'
        }
      ]
    }
  },
  {
    id: '4',
    label: 'Analysis',
    description: 'Analyze trial results',
    inputs: ['Trial Data'],
    outputs: ['Analysis Report'],
    page: {
      id: 'p4',
      name: 'Analysis Dashboard',
      sections: [
        {
          id: 's4',
          type: 'chart',
          title: 'Results Analysis',
          description: 'Visual analysis of trial data'
        }
      ]
    }
  }
];

const WorkflowNode = ({ data }: { data: WorkflowStep }) => {
  const navigate = useNavigate();

  const handleViewPageDetails = () => {
    navigate(`/companies/1/applications/1/pages/${data.page.id}`);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-indigo-500 transition-all duration-300 min-w-[300px]">
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-semibold text-white mb-2">{data.label}</h3>
        <p className="text-sm text-gray-400 mb-4 flex-grow">{data.description}</p>
        
        {(data.inputs?.length > 0 || data.outputs?.length > 0) && (
          <div className="text-xs space-y-2">
            {data.inputs?.length > 0 && (
              <div className="flex items-center text-blue-400">
                <span className="mr-2">Inputs:</span>
                <span>{data.inputs.join(', ')}</span>
              </div>
            )}
            {data.outputs?.length > 0 && (
              <div className="flex items-center text-green-400">
                <span className="mr-2">Outputs:</span>
                <span>{data.outputs.join(', ')}</span>
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleViewPageDetails}
          className="text-xs text-indigo-400 flex items-center mt-4 hover:text-indigo-300 transition-colors"
        >
          <span className="mr-2">View page details</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </div>
  );
};

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'LR', ranksep: 200 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 300, height: 150 });
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
        y: nodeWithPosition.y - 75,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

const WorkflowDiagram: React.FC = () => {
  const initialNodes: Node[] = steps.map((step) => ({
    id: step.id,
    type: 'custom',
    data: step,
    position: { x: 0, y: 0 },
  }));

  const initialEdges: Edge[] = steps.slice(0, -1).map((step, index) => ({
    id: `e${step.id}-${steps[index + 1].id}`,
    source: step.id,
    target: steps[index + 1].id,
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#6366F1' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#6366F1' },
  }));

  const { nodes, edges } = getLayoutedElements(initialNodes, initialEdges);
  const nodeTypes = { custom: WorkflowNode };

  return (
    <div className="h-[600px] bg-gray-900 rounded-xl border border-gray-700">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Background color="#374151" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default WorkflowDiagram;