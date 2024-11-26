import React from 'react';
import { ShieldCheckIcon, LockClosedIcon, DocumentCheckIcon, ServerIcon, KeyIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';

const securityFeatures = [
  {
    icon: ShieldCheckIcon,
    title: 'Compliance Standards',
    description: 'Meeting industry-leading security standards and certifications',
    features: [
      'SOC 2 Type II Certified',
      'GDPR Compliant',
      'ISO 27001 Certified',
      'HIPAA Compliant',
      'CCPA Compliant'
    ]
  },
  {
    icon: LockClosedIcon,
    title: 'Data Protection',
    description: 'Enterprise-grade encryption and data security measures',
    features: [
      'AES-256 encryption at rest',
      'TLS 1.3 encryption in transit',
      'Regular security audits',
      'Secure key management',
      'Data backup and recovery'
    ]
  },
  {
    icon: DocumentCheckIcon,
    title: 'Access Control',
    description: 'Granular access management and authentication',
    features: [
      'Role-based access control',
      'Multi-factor authentication',
      'Single sign-on (SSO)',
      'API key management',
      'Session monitoring'
    ]
  },
  {
    icon: ServerIcon,
    title: 'Infrastructure Security',
    description: 'Secure and monitored infrastructure',
    features: [
      'DDoS protection',
      'WAF implementation',
      'Regular penetration testing',
      'Vulnerability scanning',
      'Real-time monitoring'
    ]
  },
  {
    icon: KeyIcon,
    title: 'Code Security',
    description: 'Secure development practices and code protection',
    features: [
      'Automated security scanning',
      'Dependency vulnerability checks',
      'Secure code reviews',
      'Container security',
      'Secret management'
    ]
  },
  {
    icon: ShieldExclamationIcon,
    title: 'Incident Response',
    description: 'Proactive security monitoring and response',
    features: [
      '24/7 security monitoring',
      'Incident response team',
      'Automated threat detection',
      'Security alerting',
      'Audit logging'
    ]
  }
];

const SecurityPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Enterprise-Grade Security</h1>
          <p className="text-xl text-gray-400">Your data and intellectual property protected by industry-leading security measures</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityFeatures.map((feature) => (
            <div key={feature.title} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-shrink-0 p-3 bg-indigo-500/10 rounded-lg">
                  <feature.icon className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </div>

              <ul className="space-y-3">
                {feature.features.map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 bg-gray-800 rounded-xl border border-gray-700">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Security Certifications</h2>
            <p className="text-gray-400">Yuvi Platform maintains the highest security standards with industry certifications</p>
          </div>
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
            {['SOC 2', 'GDPR', 'ISO 27001', 'HIPAA', 'CCPA'].map((cert) => (
              <div key={cert} className="flex items-center justify-center p-4 bg-gray-900 rounded-lg border border-gray-700">
                <span className="text-white font-semibold">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;