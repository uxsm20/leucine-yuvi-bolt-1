import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StageProgress from '../components/StageProgress';
import DescriptionStage from '../components/application/DescriptionStage';
import ResearchStage from '../components/application/ResearchStage';
import VisualPRDStage from '../components/application/VisualPRDStage';
import ProjectPlanStage from '../components/application/ProjectPlanStage';
import { ResearchPhase, VisualPRD, ProjectTask } from '../types/application';

type Stage = 'description' | 'research' | 'visual-prd' | 'project-plan';

export default function CreateApplicationPage() {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState<Stage>('description');
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [research, setResearch] = useState<ResearchPhase | null>(null);
  const [visualPRD, setVisualPRD] = useState<VisualPRD | null>(null);
  const [projectTasks, setProjectTasks] = useState<ProjectTask[]>([]);

  const handleDescriptionSubmit = async () => {
    setIsAnalyzing(true);
    // Simulate LLM analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    setResearch({
      description,
      analysis: {
        features: [
          "User authentication and authorization",
          "Role-based access control",
          "Real-time data synchronization",
          "Automated workflow management"
        ],
        entities: [
          "Users",
          "Roles",
          "Permissions",
          "Documents"
        ],
        workflows: [
          "User onboarding process",
          "Document approval workflow",
          "Role assignment workflow"
        ],
        metrics: [
          "User adoption rate",
          "Document processing time",
          "Workflow completion rate"
        ]
      }
    });
    setIsAnalyzing(false);
    setCurrentStage('research');
  };

  const handleResearchComplete = async () => {
    setIsAnalyzing(true);
    // Simulate generating Visual PRD
    await new Promise(resolve => setTimeout(resolve, 2000));
    setVisualPRD({
      workflows: [],
      entities: [],
      metrics: []
    });
    setIsAnalyzing(false);
    setCurrentStage('visual-prd');
  };

  const handleVisualPRDComplete = async () => {
    setIsAnalyzing(true);
    // Simulate generating project plan
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProjectTasks([
      {
        id: '1',
        name: 'Initialize Project Structure',
        description: 'Set up the basic project structure and configuration',
        type: 'development',
        status: 'pending',
        assignedTo: 'Setup Droid',
        priority: 'high',
        dependencies: [],
        progress: 0,
        events: []
      },
      {
        id: '2',
        name: 'Generate Database Schema',
        description: 'Create database schema based on entity definitions',
        type: 'development',
        status: 'pending',
        assignedTo: 'Database Droid',
        priority: 'high',
        dependencies: ['1'],
        progress: 0,
        events: []
      }
    ]);
    setIsAnalyzing(false);
    setCurrentStage('project-plan');
  };

  const handleProjectPlanComplete = () => {
    // Navigate to the project plan page
    navigate('/companies/1/applications/1/project-plan');
  };

  return (
    <div className="w-full">
      <StageProgress currentStage={currentStage} />
      
      <div className="w-full pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentStage === 'description' && (
            <DescriptionStage
              description={description}
              isAnalyzing={isAnalyzing}
              onSubmit={handleDescriptionSubmit}
            />
          )}

          {currentStage === 'research' && research && (
            <ResearchStage
              analysis={research.analysis}
              onContinue={handleResearchComplete}
            />
          )}

          {currentStage === 'visual-prd' && visualPRD && (
            <VisualPRDStage
              prd={visualPRD}
              onComplete={handleVisualPRDComplete}
            />
          )}

          {currentStage === 'project-plan' && (
            <ProjectPlanStage
              tasks={projectTasks}
              onComplete={handleProjectPlanComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
}