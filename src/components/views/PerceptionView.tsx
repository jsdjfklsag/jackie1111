import { useState } from 'react'
import { SystemState } from '../../types'
import './PerceptionView.css'

interface PerceptionViewProps {
  systemState: SystemState
}

const PerceptionView = ({ systemState }: PerceptionViewProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const madsHealth = [
    {
      sensor: 'camera',
      name: '相机',
      Hm: 0.95,
      Qm: 0.92,
      status: '正常'
    },
    {
      sensor: 'lidar',
      name: '激光雷达',
      Hm: systemState.modalConfidences.lidar < 0.3 ? 0.32 : 0.93,
      Qm: systemState.modalConfidences.lidar < 0.3 ? 0.28 : 0.90,
      status: systemState.modalConfidences.lidar < 0.3 ? '异常' : '正常',
      warning: systemState.modalConfidences.lidar < 0.3 ? '烟雾干扰，建议增强声呐权重' : undefined
    },
    {
      sensor: 'sonar',
      name: '声呐',
      Hm: 0.95,
      Qm: 0.91,
      status: '正常'
    }
  ]

  return (
    <div className="perception-view">
      <h2 className="view-title">多模态感知监控</h2>
      <div className="perception-layout">
        <div className="sensor-data-area">
          <div className={`sensor-column ${systemState.modalConfidences.cam < 0.5 ? 'warning' : ''}`}>
            <div className="sensor-header">
              <h3>视觉通路（相机）</h3>
              <div className="clarity-score">图像清晰度评分：<span className="value-display value-normal">0.87</span></div>
            </div>
            <div className="image-display" onClick={() => setSelectedImage(1)}>
              <div className="mock-image camera-image">
                <div className="image-placeholder">
                  <span>相机图像</span>
                  <span className="image-note">高斯滤波去噪后</span>
                </div>
              </div>
            </div>
          </div>
          <div className={`sensor-column ${systemState.modalConfidences.lidar < 0.5 ? 'warning' : ''}`}>
            <div className="sensor-header">
              <h3>激光雷达通路</h3>
              <div className="point-cloud-info">点云密度：<span className="value-display value-normal">120 点/㎡</span></div>
            </div>
            <div className="point-cloud-display">
              <div className="mock-point-cloud">
                <div className="point-cloud-placeholder">
                  <span>3D点云可视化</span>
                  <span className="point-cloud-note">PointPainting语义染色</span>
                </div>
              </div>
            </div>
          </div>
          <div className={`sensor-column ${systemState.modalConfidences.sonar < 0.5 ? 'warning' : ''}`}>
            <div className="sensor-header">
              <h3>声呐通路</h3>
              <div className="sonar-info">探测范围：<span className="value-display value-normal">0.5-10m</span></div>
            </div>
            <div className="sonar-display">
              <div className="mock-sonar">
                <div className="sonar-placeholder">
                  <span>2.5D声学深度图</span>
                  <div className="sonar-gradient"><div className="gradient-bar"></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mads-panel">
          <div className="panel-header"><h3>MADS健康监测</h3></div>
          <div className="mads-list">
            {madsHealth.map((item, index) => (
              <div key={index} className={`mads-item ${item.status === '异常' ? 'error' : ''}`}>
                <div className="mads-sensor-name">{item.name}：</div>
                <div className="mads-values">
                  <span>Hm={item.Hm.toFixed(2)}</span>
                  <span>，Qm={item.Qm.toFixed(2)}</span>
                  <span className="mads-status">{item.status}</span>
                </div>
                {item.warning && <div className="mads-warning">{item.warning}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerceptionView

