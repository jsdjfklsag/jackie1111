import { SystemState } from '../../types'
import { generateTrendData } from '../../utils/mockData'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import './OverviewView.css'

interface OverviewViewProps {
  systemState: SystemState
}

const OverviewView = ({ systemState }: OverviewViewProps) => {
  const trendData = generateTrendData(60)
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return `${date.getMinutes()}:${date.getSeconds().toString().padStart(2, '0')}`
  }
  const confidenceTrend = trendData.map((d) => ({
    time: formatTime(d.time),
    cam: d.cam,
    lidar: d.lidar,
    sonar: d.sonar
  }))
  const performanceData = [
    { name: '激光雷达', value: 0.38 },
    { name: 'BEVFusion', value: 0.50 },
    { name: '声光融合', value: 0.85 },
    { name: 'Ours模型', value: 0.82 }
  ]
  const resourceData = [
    { name: 'CPU', value: systemState.cpuUsage, color: '#00FF00' },
    { name: 'GPU', value: systemState.gpuUsage, color: '#00AAFF' },
    { name: '内存', value: systemState.memoryUsage, color: '#FFAA00' },
    { name: '空闲', value: 100 - systemState.memoryUsage, color: '#444' }
  ]
  const getSceneModeText = () => {
    switch (systemState.sceneMode) {
      case 'sunny': return '晴朗场景'
      case 'fog': return '浓雾场景'
      case 'smoke': return '烟雾场景'
    }
  }
  const mAPValue = systemState.sceneMode === 'fog' ? 0.82 : systemState.sceneMode === 'smoke' ? 0.75 : 0.90

  return (
    <div className="overview-view">
      <h2 className="view-title">系统概览</h2>
      <div className="confidence-cards">
        <div className="confidence-card">
          <div className="card-header">
            <h3>相机置信度 (C_cam)</h3>
            <span className={`confidence-value ${systemState.modalConfidences.cam >= 0.5 ? 'value-normal' : 'value-error'}`}>
              {systemState.modalConfidences.cam.toFixed(3)}
            </span>
          </div>
          <div className="health-status">健康，Qm=0.92</div>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={confidenceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="time" stroke="#888" fontSize={10} />
              <YAxis domain={[0, 1]} stroke="#888" fontSize={10} />
              <Tooltip contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid #555' }} />
              <Line type="monotone" dataKey="cam" stroke="#00FF00" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="confidence-card">
          <div className="card-header">
            <h3>激光雷达置信度 (C_lidar)</h3>
            <span className={`confidence-value ${systemState.modalConfidences.lidar >= 0.5 ? 'value-normal' : 'value-error'}`}>
              {systemState.modalConfidences.lidar.toFixed(3)}
            </span>
          </div>
          <div className="health-status">健康，Qm=0.92</div>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={confidenceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="time" stroke="#888" fontSize={10} />
              <YAxis domain={[0, 1]} stroke="#888" fontSize={10} />
              <Tooltip contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid #555' }} />
              <Line type="monotone" dataKey="lidar" stroke="#00AAFF" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="confidence-card">
          <div className="card-header">
            <h3>声呐置信度 (C_sonar)</h3>
            <span className={`confidence-value ${systemState.modalConfidences.sonar >= 0.5 ? 'value-normal' : 'value-error'}`}>
              {systemState.modalConfidences.sonar.toFixed(3)}
            </span>
          </div>
          <div className="health-status">健康，Qm=0.91</div>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={confidenceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="time" stroke="#888" fontSize={10} />
              <YAxis domain={[0, 1]} stroke="#888" fontSize={10} />
              <Tooltip contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid #555' }} />
              <Line type="monotone" dataKey="sonar" stroke="#FFAA00" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card">
        <div className="card-title">性能对比</div>
        <div className="performance-content">
          <div className="performance-left">
            <div className="mAP-display">
              <span>{getSceneModeText()}：Ours模型</span>
              <span className="value-display value-normal">{mAPValue.toFixed(2)}</span>
            </div>
          </div>
          <div className="performance-right">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#888" fontSize={10} />
                <YAxis domain={[0, 1]} stroke="#888" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid #555' }} />
                <Bar dataKey="value" fill="#00FF00" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-title">系统资源</div>
        <div className="resource-content">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={resourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                outerRadius={80}
                fill="#888888"
                dataKey="value"
              >
                {resourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid #555' }} />
            </PieChart>
          </ResponsiveContainer>
          {systemState.frameRate >= 15 && (
            <div className="resource-status">
              <div className="status-text value-normal">实时性达标：帧率≥15fps</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OverviewView

