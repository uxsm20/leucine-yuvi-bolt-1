import React from 'react';
import {
  ClockIcon,
  PlayIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  CpuChipIcon,
  DocumentMagnifyingGlassIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';

interface TimelineEvent {
  id: string;
  type: 'created' | 'started' | 'processing' | 'validation' | 'completed' | 'error' | 'retry' | 'system_check' | 'optimization';
  timestamp: string;
  description: string;
  details?: string;
}

interface TaskTimelineProps {
  events: TimelineEvent[];
}

const eventIcons = {
  created: ClockIcon,
  started: PlayIcon,
  processing: CpuChipIcon,
  validation: DocumentMagnifyingGlassIcon,
  completed: CheckCircleIcon,
  error: ExclamationCircleIcon,
  retry: ArrowPathIcon,
  system_check: ShieldCheckIcon,
  optimization: BoltIcon,
};

const eventColors = {
  created: 'bg-gray-500/10 text-gray-400',
  started: 'bg-blue-500/10 text-blue-400',
  processing: 'bg-indigo-500/10 text-indigo-400',
  validation: 'bg-purple-500/10 text-purple-400',
  completed: 'bg-green-500/10 text-green-400',
  error: 'bg-red-500/10 text-red-400',
  retry: 'bg-yellow-500/10 text-yellow-400',
  system_check: 'bg-cyan-500/10 text-cyan-400',
  optimization: 'bg-orange-500/10 text-orange-400',
};

const TaskTimeline: React.FC<TaskTimelineProps> = ({ events }) => {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {events.map((event, eventIdx) => {
          const Icon = eventIcons[event.type];
          return (
            <li key={event.id}>
              <div className="relative pb-8">
                {eventIdx !== events.length - 1 ? (
                  <span
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-700"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-gray-900 ${eventColors[event.type]}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4">
                    <div className="pt-1.5">
                      <p className="text-sm text-white">{event.description}</p>
                      {event.details && (
                        <p className="text-sm text-gray-400 mt-1">{event.details}</p>
                      )}
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-400 pt-1.5">
                      {new Date(event.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskTimeline;