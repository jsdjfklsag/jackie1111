import { SystemState } from '../types'
import './RightMonitorPanel.css'

interface RightMonitorPanelProps {
  currentView: string
  systemState: SystemState
}

const RightMonitorPanel = ({ currentView: _currentView, systemState }: RightMonitorPanelProps) => {
  return (
    <div className="right-monitor-panel">
      <div className="panel-header">
        <h3>实时监控</h3>
      </div>
      <div className="panel-content">
        <div className="monitor-section">
          <h4>系统资源</h4>
          <div className="resource-item">
            <span>CPU占用率：</span>
            <span className="value-display">{systemState.cpuUsage.toFixed(1)}%</span>
          </div>
          <div className="resource-item">
            <span>GPU占用率：</span>
            <span className="value-display">{systemState.gpuUsage.toFixed(1)}%</span>
          </div>
          <div className="resource-item">
            <span>内存使用：</span>
            <span className="value-display">{systemState.memoryUsage.toFixed(1)}%</span>
          </div>
          <div className="resource-item">
            <span>帧率：</span>
            <span className={`value-display ${systemState.frameRate >= 15 ? 'value-normal' : 'value-warning'}`}>
              {systemState.frameRate.toFixed(1)} fps
            </span>
          </div>
          {systemState.frameRate >= 15 && (
            <div className="status-text value-normal">实时性达标：帧率≥15fps</div>
          )}
        </div>

        <div className="monitor-section">
          <h4>模态置信度</h4>
          <div className="confidence-item">
            <span>相机 (C_cam)：</span>
            <span className={`value-display ${systemState.modalConfidences.cam >= 0.5 ? 'value-normal' : 'value-error'}`}>
              {systemState.modalConfidences.cam.toFixed(3)}
            </span>
          </div>
          <div className="confidence-item">
            <span>激光雷达 (C_lidar)：</span>
            <span className={`value-display ${systemState.modalConfidences.lidar >= 0.5 ? 'value-normal' : 'value-error'}`}>
              {systemState.modalConfidences.lidar.toFixed(3)}
            </span>
          </div>
          <div className="confidence-item">
            <span>声呐 (C_sonar)：</span>
            <span className={`value-display ${systemState.modalConfidences.sonar >= 0.5 ? 'value-normal' : 'value-error'}`}>
              {systemState.modalConfidences.sonar.toFixed(3)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightMonitorPanel

