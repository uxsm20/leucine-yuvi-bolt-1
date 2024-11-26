import { CheckIcon } from '@heroicons/react/24/solid';

interface Step {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: string;
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => {
          const isCurrent = step.id === currentStep;
          const isComplete = steps.findIndex(s => s.id === currentStep) > stepIdx;

          return (
            <li key={step.name} className={stepIdx !== 0 ? 'flex-auto pl-6' : ''}>
              <div className="flex items-center">
                <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center">
                  <div className="h-full w-full rounded-full border-2 border-indigo-500" />
                  <div
                    className={`absolute inset-0 rounded-full ${
                      isComplete ? 'bg-indigo-500' : isCurrent ? 'bg-indigo-500/20' : 'bg-gray-800'
                    }`}
                  >
                    {isComplete ? (
                      <CheckIcon className="h-6 w-6 text-white" />
                    ) : (
                      <step.icon className={`h-6 w-6 ${isCurrent ? 'text-indigo-500' : 'text-gray-500'}`} />
                    )}
                  </div>
                </div>
                {stepIdx !== steps.length - 1 && (
                  <div className="absolute top-0 right-0 hidden h-full w-5 md:block">
                    <div className="h-full w-full border-t-2 border-indigo-500" />
                  </div>
                )}
                <div className="ml-4">
                  <p className={`text-sm font-medium ${isCurrent ? 'text-indigo-500' : 'text-gray-500'}`}>
                    {step.name}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}