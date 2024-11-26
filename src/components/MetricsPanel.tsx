import { useState } from 'react';
import { InformationCircleIcon, ArrowUpIcon, ArrowDownIcon, MinusIcon } from '@heroicons/react/24/outline';
import { Card, Title, AreaChart } from '@tremor/react';

interface MetricHistory {
  date: string;
  value: number;
}

interface Metric {
  id: string;
  name: string;
  description: string;
  calculation: string;
  importance: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  category: 'performance' | 'quality' | 'compliance' | 'efficiency';
  source: 'workflow' | 'application';
  history: MetricHistory[];
}

const metrics: Metric[] = [
  {
    id: '1',
    name: 'Trial Completion Rate',
    description: 'Percentage of trials completed successfully',
    calculation: '(Completed Trials / Total Trials) × 100',
    importance: 'Indicates overall trial success and efficiency of the process',
    value: '85%',
    trend: 'up',
    category: 'performance',
    source: 'workflow',
    history: [
      { date: '2023-01', value: 75 },
      { date: '2023-02', value: 78 },
      { date: '2023-03', value: 80 },
      { date: '2023-04', value: 82 },
      { date: '2023-05', value: 85 }
    ]
  },
  {
    id: '2',
    name: 'Patient Retention',
    description: 'Rate of patients remaining in trials',
    calculation: '(Active Patients / Total Enrolled) × 100',
    importance: 'Critical for trial validity and data quality',
    value: '92%',
    trend: 'up',
    category: 'quality',
    source: 'application',
    history: [
      { date: '2023-01', value: 88 },
      { date: '2023-02', value: 89 },
      { date: '2023-03', value: 90 },
      { date: '2023-04', value: 91 },
      { date: '2023-05', value: 92 }
    ]
  },
  {
    id: '3',
    name: 'Data Compliance Score',
    description: 'Adherence to regulatory requirements',
    calculation: 'Weighted average of compliance checks',
    importance: 'Ensures regulatory compliance and data integrity',
    value: '98%',
    trend: 'neutral',
    category: 'compliance',
    source: 'application',
    history: [
      { date: '2023-01', value: 97 },
      { date: '2023-02', value: 98 },
      { date: '2023-03', value: 98 },
      { date: '2023-04', value: 97 },
      { date: '2023-05', value: 98 }
    ]
  },
  {
    id: '4',
    name: 'Protocol Deviation Rate',
    description: 'Frequency of protocol violations',
    calculation: '(Protocol Deviations / Total Procedures) × 100',
    importance: 'Measures adherence to trial protocols',
    value: '2.3%',
    trend: 'down',
    category: 'quality',
    source: 'workflow',
    history: [
      { date: '2023-01', value: 3.5 },
      { date: '2023-02', value: 3.2 },
      { date: '2023-03', value: 2.8 },
      { date: '2023-04', value: 2.5 },
      { date: '2023-05', value: 2.3 }
    ]
  },
  {
    id: '5',
    name: 'Site Efficiency Score',
    description: 'Overall performance of trial sites',
    calculation: 'Composite of enrollment rate, data quality, and timeline adherence',
    importance: 'Identifies high-performing sites and areas for improvement',
    value: '87%',
    trend: 'up',
    category: 'efficiency',
    source: 'application',
    history: [
      { date: '2023-01', value: 82 },
      { date: '2023-02', value: 83 },
      { date: '2023-03', value: 85 },
      { date: '2023-04', value: 86 },
      { date: '2023-05', value: 87 }
    ]
  }
];

const categoryColors = {
  performance: 'bg-blue-500/10 text-blue-400',
  quality: 'bg-green-500/10 text-green-400',
  compliance: 'bg-purple-500/10 text-purple-400',
  efficiency: 'bg-orange-500/10 text-orange-400'
};

const sourceColors = {
  workflow: 'bg-indigo-500/10 text-indigo-400',
  application: 'bg-pink-500/10 text-pink-400'
};

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'neutral' }) => {
  switch (trend) {
    case 'up':
      return <ArrowUpIcon className="h-5 w-5 text-green-400" />;
    case 'down':
      return <ArrowDownIcon className="h-5 w-5 text-red-400" />;
    case 'neutral':
      return <MinusIcon className="h-5 w-5 text-gray-400" />;
  }
};

export default function MetricsPanel() {
  const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              onClick={() => setSelectedMetric(metric)}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{metric.name}</h3>
                  <p className="text-sm text-gray-400">{metric.description}</p>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[metric.category]}`}>
                    {metric.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${sourceColors[metric.source]}`}>
                    {metric.source}
                  </span>
                </div>
              </div>
              
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <TrendIcon trend={metric.trend} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        {selectedMetric ? (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-4 space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">{selectedMetric.name}</h3>
            
            <Card className="bg-gray-900 border-gray-700">
              <Title className="text-white">Trend Analysis</Title>
              <AreaChart
                className="h-32 mt-4"
                data={selectedMetric.history}
                index="date"
                categories={["value"]}
                colors={["indigo"]}
                showLegend={false}
                showGridLines={false}
                showAnimation={true}
                valueFormatter={(value) => `${value}%`}
              />
            </Card>

            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Calculation Method</h4>
              <div className="bg-gray-900 p-4 rounded-lg">
                <code className="text-indigo-400">{selectedMetric.calculation}</code>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Business Importance</h4>
              <p className="text-gray-300">{selectedMetric.importance}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Source</h4>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${sourceColors[selectedMetric.source]}`}>
                {selectedMetric.source === 'workflow' ? 'Derived from Workflow' : 'Application Generated'}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 flex items-center justify-center">
            <div className="text-center">
              <InformationCircleIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Select a metric to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}