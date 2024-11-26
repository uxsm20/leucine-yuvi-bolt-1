import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ChartBarIcon, TableCellsIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface Table {
  name: string;
  schema: string;
  columns: Column[];
  relationships: Relationship[];
  metadata: TableMetadata;
}

interface Column {
  name: string;
  type: string;
  nullable: boolean;
  metadata: ColumnMetadata;
}

interface Relationship {
  fromColumn: string;
  toTable: string;
  toColumn: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many';
}

interface TableMetadata {
  description: string;
  businessDefinition: string;
  domain: string;
  quality: {
    completeness: number;
    accuracy: number;
    consistency: number;
  };
  statistics: {
    rowCount: number;
    lastUpdated: string;
    updateFrequency: string;
  };
}

interface ColumnMetadata {
  description: string;
  businessDefinition: string;
  dataCategory: string;
  sensitivity: 'high' | 'medium' | 'low';
  quality: {
    completeness: number;
    uniqueness: number;
    validity: number;
  };
  statistics: {
    min?: string | number;
    max?: string | number;
    mean?: number;
    median?: number;
    mode?: string | number;
    distinctValues: number;
    nullCount: number;
    patterns?: string[];
  };
}

interface EDAStageProps {
  isOpen: boolean;
  onClose: () => void;
  sourceId: string;
  onComplete: (metadata: any) => void;
}

export default function EDAStage({
  isOpen,
  onClose,
  sourceId,
  onComplete
}: EDAStageProps) {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tables, setTables] = useState<Table[]>([]);

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate API call to analyze data
    await new Promise(resolve => setTimeout(resolve, 3000));
    // Mock data analysis results
    setTables([
      {
        name: 'sales_orders',
        schema: 'public',
        columns: [
          {
            name: 'order_id',
            type: 'varchar',
            nullable: false,
            metadata: {
              description: 'Unique identifier for sales orders',
              businessDefinition: 'Primary key for sales orders',
              dataCategory: 'identifier',
              sensitivity: 'low',
              quality: {
                completeness: 100,
                uniqueness: 100,
                validity: 100
              },
              statistics: {
                distinctValues: 10000,
                nullCount: 0,
                patterns: ['SO-\\d{6}']
              }
            }
          },
          // Add more columns...
        ],
        relationships: [
          {
            fromColumn: 'customer_id',
            toTable: 'customers',
            toColumn: 'id',
            type: 'many-to-one'
          }
        ],
        metadata: {
          description: 'Contains all sales order information',
          businessDefinition: 'Record of all customer orders and their details',
          domain: 'Sales',
          quality: {
            completeness: 98,
            accuracy: 99,
            consistency: 97
          },
          statistics: {
            rowCount: 10000,
            lastUpdated: '2024-01-20T10:00:00Z',
            updateFrequency: 'real-time'
          }
        }
      }
    ]);
    setIsAnalyzing(false);
  };

  const updateTableMetadata = (tableName: string, metadata: Partial<TableMetadata>) => {
    setTables(tables.map(table => 
      table.name === tableName
        ? { ...table, metadata: { ...table.metadata, ...metadata } }
        : table
    ));
  };

  const updateColumnMetadata = (tableName: string, columnName: string, metadata: Partial<ColumnMetadata>) => {
    setTables(tables.map(table => 
      table.name === tableName
        ? {
            ...table,
            columns: table.columns.map(column =>
              column.name === columnName
                ? { ...column, metadata: { ...column.metadata, ...metadata } }
                : column
            )
          }
        : table
    ));
  };

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      open={isOpen}
      onClose={onClose}
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="inline-block w-full max-w-7xl my-8 text-left align-middle transition-all transform bg-gray-800 shadow-xl rounded-2xl">
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <div>
              <Dialog.Title className="text-lg font-medium text-white">
                Exploratory Data Analysis
              </Dialog.Title>
              <p className="mt-1 text-sm text-gray-400">
                Analyze and enrich your data source metadata
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            {isAnalyzing ? (
              <div className="text-center py-12">
                <ArrowPathIcon className="h-12 w-12 text-indigo-400 animate-spin mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  Analyzing Your Data
                </h3>
                <p className="text-gray-400">
                  This may take a few minutes...
                </p>
              </div>
            ) : tables.length === 0 ? (
              <div className="text-center py-12">
                <button
                  onClick={startAnalysis}
                  className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  <ChartBarIcon className="h-5 w-5 mr-2" />
                  Start Analysis
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-12 gap-6">
                {/* Tables List */}
                <div className="col-span-3 bg-gray-900 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-300 mb-4">Tables</h3>
                  <div className="space-y-2">
                    {tables.map((table) => (
                      <button
                        key={table.name}
                        onClick={() => setSelectedTable(table.name)}
                        className={`w-full text-left px-3 py-2 rounded-lg ${
                          selectedTable === table.name
                            ? 'bg-indigo-500/10 text-indigo-400'
                            : 'text-gray-300 hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center">
                          <TableCellsIcon className="h-4 w-4 mr-2" />
                          <span>{table.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table Details */}
                {selectedTable && (
                  <div className="col-span-9 space-y-6">
                    <div className="bg-gray-900 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-white mb-4">
                        Table: {selectedTable}
                      </h3>
                      
                      {/* Table Metadata */}
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Business Definition
                          </label>
                          <textarea
                            className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                            value={tables.find(t => t.name === selectedTable)?.metadata.businessDefinition}
                            onChange={(e) => updateTableMetadata(selectedTable, {
                              businessDefinition: e.target.value
                            })}
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Domain
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                            value={tables.find(t => t.name === selectedTable)?.metadata.domain}
                            onChange={(e) => updateTableMetadata(selectedTable, {
                              domain: e.target.value
                            })}
                          />
                        </div>
                      </div>

                      {/* Columns */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-4">Columns</h4>
                        <div className="space-y-4">
                          {tables
                            .find(t => t.name === selectedTable)
                            ?.columns.map((column) => (
                              <div
                                key={column.name}
                                className="bg-gray-800 p-4 rounded-lg"
                              >
                                <div className="flex justify-between items-start mb-4">
                                  <div>
                                    <h5 className="text-white font-medium">
                                      {column.name}
                                    </h5>
                                    <span className="text-sm text-gray-400">
                                      {column.type}
                                      {column.nullable ? ' (nullable)' : ''}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    <div className="text-sm">
                                      <span className="text-gray-400">Completeness:</span>
                                      <span className="text-white ml-1">
                                        {column.metadata.quality.completeness}%
                                      </span>
                                    </div>
                                    <div className="text-sm">
                                      <span className="text-gray-400">Uniqueness:</span>
                                      <span className="text-white ml-1">
                                        {column.metadata.quality.uniqueness}%
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                      Business Definition
                                    </label>
                                    <input
                                      type="text"
                                      className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                                      value={column.metadata.businessDefinition}
                                      onChange={(e) => updateColumnMetadata(
                                        selectedTable,
                                        column.name,
                                        { businessDefinition: e.target.value }
                                      )}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                      Data Category
                                    </label>
                                    <input
                                      type="text"
                                      className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                                      value={column.metadata.dataCategory}
                                      onChange={(e) => updateColumnMetadata(
                                        selectedTable,
                                        column.name,
                                        { dataCategory: e.target.value }
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end px-6 py-4 border-t border-gray-700">
            <button
              onClick={() => {
                onComplete(tables);
                onClose();
              }}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
              disabled={isAnalyzing || tables.length === 0}
            >
              Continue to Transformation
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}