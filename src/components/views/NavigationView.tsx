import { useState } from 'react'
import { SystemState } from '../../types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import './NavigationView.css'

interface NavigationViewProps {
  systemState: SystemState
}

const NavigationView = ({ systemState }: NavigationViewProps) => {
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d')
  const isCarefulMode = systemState.modalConfidences.lidar < 0.4 && systemState.modalConfidences.cam < 0.4
  const errorData = Array.from({ length: 50 }, (_, i) => ({
    time: i * 2,
    xError: 0.1 + Math.random() * 0.1,
    yError: 0.08 + Math.random() * 0.12,
    angleError: 0.05 + Math.random() * 0.08
  }))
  const avgXError = errorData.reduce((sum, d) => sum + d.xError, 0) / errorData.length
  const avgYError = errorData.reduce((sum, d) => sum + d.yError, 0) / errorData.length

  return (
    <div className="navigation-view">
      <h2 className="view-title">定位导航决策</h2>
      <div className="navigation-layout">
        <div className="slam-visualization">
          <div className="card">
            <div className="visualization-header">
              <div className="card-title">SLAM建图可视化</div>
              <div className="view-controls">
                <button className={`view-btn ${viewMode === '2d' ? 'active' : ''}`} onClick={() => setViewMode('2d')}>2D</button>
                <button className={`view-btn ${viewMode === '3d' ? 'active' : ''}`} onClick={() => setViewMode('3d')}>3D</button>
              </div>
            </div>
            <div className="map-container">
              <div className="mock-map">
                <svg width="100%" height="100%" viewBox="0 0 800 600">
                  <rect width="800" height="600" fill="#0C0C0C" />
                  <rect x="100" y="200" width="150" height="100" fill="#3C3C3C" opacity="0.5"><title>未知区域</title></rect>
                  <text x="175" y="255" fill="#888" fontSize="12" textAnchor="middle">未知</text>
                  <path d="M 50 300 Q 200 200, 400 250 T 750 300" fill="none" stroke="#00FF00" strokeWidth="3" />
                  <path d="M 50 300 Q 200 200, 400 250 T 750 300" fill="none" stroke="#FF0000" strokeWidth="2" strokeDasharray="5,5" transform="translate(0, -10)" />
                  <circle cx="400" cy="250" r="12" fill="#00FF00" stroke="#FFFFFF" strokeWidth="2"><title>当前位置</title></circle>
                </svg>
              </div>
            </div>
            <div className="trajectory-fitness">轨迹拟合度：<span className="value-display value-normal">92%</span></div>
          </div>
        </div>
        <div className="navigation-control">
          <div className="card">
            <div className="card-title">导航决策控制</div>
            <div className="behavior-section">
              <h4>包容式行为架构</h4>
              <div className="behavior-list">
                {['直线行驶', '通道穿越', '障碍规避', '预防撞击', '碰撞检测'].map((name, i) => (
                  <div key={i} className="behavior-item">
                    <span className="behavior-name">{name}</span>
                    <span className="behavior-priority">优先级 {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mode-section">
              <h4>模式切换</h4>
              <button className={`mode-btn ${isCarefulMode ? 'careful' : 'normal'}`}>
                {isCarefulMode ? '谨慎模式（已激活）' : '正常模式'}
              </button>
              {isCarefulMode && <div className="careful-mode-info">当前速度：1.0m/s（原速度50%），依赖声呐导航</div>}
            </div>
          </div>
        </div>
      </div>
      <div className="error-monitor">
        <div className="card">
          <div className="card-title">误差监控</div>
          <div className="error-chart">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={errorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="time" stroke="#888" fontSize={10} />
                <YAxis stroke="#888" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid #555' }} />
                <Line type="monotone" dataKey="xError" stroke="#FF0000" name="x轴误差" dot={false} />
                <Line type="monotone" dataKey="yError" stroke="#00FF00" name="y轴误差" dot={false} />
                <Line type="monotone" dataKey="angleError" stroke="#00AAFF" name="方位角误差" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="error-stats">
            <div className="stat-item">x轴误差：均值 {avgXError.toFixed(2)}m，方差 0.03</div>
            <div className="stat-item">y轴误差：均值 {avgYError.toFixed(2)}m，方差 0.03</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavigationView

