import { useState } from 'react'
import { SystemState } from '../../types'
import './FusionView.css'

interface FusionViewProps {
  systemState: SystemState
}

const FusionView = ({ systemState }: FusionViewProps) => {
  const [activeTab, setActiveTab] = useState<'data' | 'feature' | 'decision'>('data')
  const [paintingIntensity, setPaintingIntensity] = useState(75)
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="fusion-view">
      <h2 className="view-title">分层融合控制</h2>
      <div className="tabs">
        <button className={`tab ${activeTab === 'data' ? 'active' : ''}`} onClick={() => setActiveTab('data')}>数据层融合</button>
        <button className={`tab ${activeTab === 'feature' ? 'active' : ''}`} onClick={() => setActiveTab('feature')}>特征层融合</button>
        <button className={`tab ${activeTab === 'decision' ? 'active' : ''}`} onClick={() => setActiveTab('decision')}>决策层融合</button>
      </div>
      {activeTab === 'data' && (
        <div className="fusion-content">
          <div className="data-fusion-layout">
            <div className="fusion-left">
              <div className="card">
                <div className="card-title">PointPainting语义染色控制</div>
                <div className="control-group">
                  <label>染色强度：{paintingIntensity}%</label>
                  <input type="range" min="0" max="100" value={paintingIntensity} onChange={(e) => setPaintingIntensity(Number(e.target.value))} className="slider" />
                </div>
                <div className="control-group">
                  <label><input type="checkbox" checked={showPreview} onChange={(e) => setShowPreview(e.target.checked)} />实时预览</label>
                </div>
              </div>
            </div>
            <div className="fusion-right">
              <div className="card">
                <div className="card-title">自适应卡尔曼滤波（AKF）配置</div>
                <div className="akf-params">
                  <div className="param-group"><label>过程噪声矩阵</label><input type="text" className="input" defaultValue="基于 C_lidar 动态生成" /></div>
                  <div className="param-group"><label>观测噪声矩阵</label><input type="text" className="input" defaultValue="基于 C_sonar 动态生成" /></div>
                </div>
                <div className="improvement-text">密度提升 <span className="value-normal">35%</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'feature' && (
        <div className="fusion-content">
          <div className="card">
            <div className="card-title">跨模态注意力权重热力图</div>
            <div className="heatmap-container">
              <div className="heatmap">
                {[0.82, 0.75, 0.68, 0.71].map((w, i) => (
                  <div key={i} className="heatmap-cell" style={{ backgroundColor: `rgb(${255 - Math.floor(w * 255)}, ${Math.floor(w * 255)}, 0)` }}>
                    {w.toFixed(2)}
                  </div>
                ))}
              </div>
            </div>
            <div className="improvement-text">特征信息完整性提升 <span className="value-normal">42%</span></div>
          </div>
        </div>
      )}
      {activeTab === 'decision' && (
        <div className="fusion-content">
          <div className="card">
            <div className="card-title">CLOC-S策略配置</div>
            <div className="matching-results">
              <div className="result-item">3D框：IoU=0.78，C_lidar={systemState.modalConfidences.lidar.toFixed(2)}</div>
              <div className="result-item">最终置信度：<span className="value-display value-normal">0.76</span></div>
            </div>
            <div className="slam-status">低置信度数据（C_m &lt; 0.5）已标记为未知区域</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FusionView

