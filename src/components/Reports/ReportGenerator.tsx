import React, { useState } from 'react';
import { Download, FileText, Mail, Calendar, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

interface ReportConfig {
  type: 'harvest' | 'environmental' | 'drone' | 'security';
  format: 'pdf' | 'excel';
  dateRange: {
    start: string;
    end: string;
  };
  includeCharts: boolean;
  emailRecipients: string[];
}

const ReportGenerator: React.FC = () => {
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    type: 'harvest',
    format: 'pdf',
    dateRange: {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
    },
    includeCharts: true,
    emailRecipients: [],
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const reportTypes = [
    { value: 'harvest', label: 'Daily Harvest Summary', icon: '🌾' },
    { value: 'environmental', label: 'Environmental Logs', icon: '🌡️' },
    { value: 'drone', label: 'Drone Activity Logs', icon: '🚁' },
    { value: 'security', label: 'Intrusion Reports', icon: '🔒' },
  ];

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create mock download
      const reportData = generateMockReportData();
      const blob = new Blob([reportData], { 
        type: reportConfig.format === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportConfig.type}-report-${Date.now()}.${reportConfig.format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Report generated successfully!');
      
      // Send emails if recipients are specified
      if (reportConfig.emailRecipients.length > 0) {
        await sendEmailReport();
      }
    } catch (error) {
      toast.error('Failed to generate report');
    } finally {
      setIsGenerating(false);
    }
  };

  const sendEmailReport = async () => {
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(`Report emailed to ${reportConfig.emailRecipients.length} recipients`);
  };

  const generateMockReportData = () => {
    const reportContent = {
      harvest: `HARVEST SUMMARY REPORT
Generated: ${new Date().toLocaleString()}
Date Range: ${reportConfig.dateRange.start} to ${reportConfig.dateRange.end}

SUMMARY:
- Total Leaves Detected: 2,847
- Total Harvest Yield: 1,284 kg
- Average Confidence: 91.3%
- Fields Covered: 4

DAILY BREAKDOWN:
${Array.from({ length: 7 }, (_, i) => {
  const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
  return `${date.toDateString()}: ${Math.floor(Math.random() * 500 + 200)} leaves, ${Math.floor(Math.random() * 200 + 100)} kg`;
}).join('\n')}

FIELD PERFORMANCE:
- Field A: 85% efficiency, 450 kg yield
- Field B: 78% efficiency, 320 kg yield
- Field C: 92% efficiency, 514 kg yield`,
      
      environmental: `ENVIRONMENTAL MONITORING REPORT
Generated: ${new Date().toLocaleString()}

SENSOR READINGS SUMMARY:
- Average Temperature: 24.5°C
- Average Humidity: 68%
- Average Soil Moisture: 42%

ALERTS TRIGGERED: 3
- Low soil moisture in Field B (2 times)
- High temperature alert (1 time)`,
      
      drone: `DRONE ACTIVITY REPORT
Generated: ${new Date().toLocaleString()}

FLEET STATUS:
- Total Drones: 12
- Active Missions: 7
- Completed Tasks: 23
- Success Rate: 96.8%

MISSION BREAKDOWN:
- Harvest Tasks: 15 completed
- Survey Tasks: 6 completed
- Maintenance Tasks: 2 completed`,
      
      security: `SECURITY MONITORING REPORT
Generated: ${new Date().toLocaleString()}

ALERT SUMMARY:
- Total Alerts: 8
- Motion Detections: 5
- Intrusion Attempts: 2
- Equipment Issues: 1

CAMERA STATUS:
- Online Cameras: 8/10
- Offline Cameras: 2/10
- Detection Accuracy: 94.2%`
    };

    return reportContent[reportConfig.type] || 'Report data not available';
  };

  const addEmailRecipient = () => {
    if (emailInput && !reportConfig.emailRecipients.includes(emailInput)) {
      setReportConfig(prev => ({
        ...prev,
        emailRecipients: [...prev.emailRecipients, emailInput]
      }));
      setEmailInput('');
    }
  };

  const removeEmailRecipient = (email: string) => {
    setReportConfig(prev => ({
      ...prev,
      emailRecipients: prev.emailRecipients.filter(e => e !== email)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Generate Reports</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Report Configuration */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Report Type</label>
              <div className="grid grid-cols-1 gap-2">
                {reportTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setReportConfig(prev => ({ ...prev, type: type.value as any }))}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                      reportConfig.type === type.value
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{type.icon}</span>
                    <span className="font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
              <div className="flex space-x-4">
                {['pdf', 'excel'].map((format) => (
                  <button
                    key={format}
                    onClick={() => setReportConfig(prev => ({ ...prev, format: format as any }))}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                      reportConfig.format === format
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span className="capitalize">{format}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={reportConfig.dateRange.start}
                    onChange={(e) => setReportConfig(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, start: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">End Date</label>
                  <input
                    type="date"
                    value={reportConfig.dateRange.end}
                    onChange={(e) => setReportConfig(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, end: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={reportConfig.includeCharts}
                  onChange={(e) => setReportConfig(prev => ({ ...prev, includeCharts: e.target.checked }))}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm font-medium text-gray-700">Include Charts and Graphs</span>
              </label>
            </div>
          </div>

          {/* Email Recipients */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Recipients</label>
              <div className="flex space-x-2 mb-3">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter email address"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  onKeyPress={(e) => e.key === 'Enter' && addEmailRecipient()}
                />
                <button
                  onClick={addEmailRecipient}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add
                </button>
              </div>
              
              {reportConfig.emailRecipients.length > 0 && (
                <div className="space-y-2">
                  {reportConfig.emailRecipients.map((email, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">{email}</span>
                      <button
                        onClick={() => removeEmailRecipient(email)}
                        className="text-red-600 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Report Preview</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p>Type: {reportTypes.find(t => t.value === reportConfig.type)?.label}</p>
                <p>Format: {reportConfig.format.toUpperCase()}</p>
                <p>Period: {reportConfig.dateRange.start} to {reportConfig.dateRange.end}</p>
                <p>Charts: {reportConfig.includeCharts ? 'Included' : 'Not included'}</p>
                <p>Recipients: {reportConfig.emailRecipients.length} email(s)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Generate Report</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
        <div className="space-y-3">
          {[
            { name: 'Harvest Summary - Week 45', type: 'harvest', date: '2024-11-08', size: '2.4 MB' },
            { name: 'Environmental Logs - October', type: 'environmental', date: '2024-11-01', size: '1.8 MB' },
            { name: 'Drone Activity - Daily', type: 'drone', date: '2024-11-07', size: '956 KB' },
            { name: 'Security Report - Week 44', type: 'security', date: '2024-11-01', size: '3.2 MB' },
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">{report.name}</h4>
                  <p className="text-sm text-gray-600">
                    {report.date} • {report.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-200 rounded">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded">
                  <Mail className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;