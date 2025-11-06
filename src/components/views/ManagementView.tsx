import { useState } from 'react'
import { SystemState } from '../../types'
import './ManagementView.css'

interface ManagementViewProps {
  systemState: SystemState
}

const ManagementView = ({ systemState: _systemState }: ManagementViewProps) => {
  const [activeTab, setActiveTab] = useState<'algorithm' | 'data' | 'device'>('algorithm')

  return (
    <div className="management-view">
      <h2 className="view-title">系统管理</h2>
      <div className="tabs">
        <button className={`tab ${activeTab === 'algorithm' ? 'active' : ''}`} onClick={() => setActiveTab('algorithm')}>算法配置</button>
        <button className={`tab ${activeTab === 'data' ? 'active' : ''}`} onClick={() => setActiveTab('data')}>数据管理</button>
        <button className={`tab ${activeTab === 'device' ? 'active' : ''}`} onClick={() => setActiveTab('device')}>设备管理</button>
      </div>
      {activeTab === 'algorithm' && (
        <div className="management-content">
          <div className="card">
            <div className="card-title">算法配置</div>
            <div className="algorithm-list">
              {['LES-Cartographer', '跨模态注意力网络', 'MADS'].map((name, i) => (
                <div key={i} className="algorithm-item">
                  <span className="algorithm-name">{name}</span>
                  <button className="btn btn-primary">参数配置</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {activeTab === 'data' && (
        <div className="management-content">
          <div className="card">
            <div className="card-title">数据管理</div>
            <div className="dataset-info">
              <div className="info-item">
                <span>训练数据集</span>
                <button className="btn">上传</button>
                <button className="btn">导出</button>
              </div>
              <div className="dataset-stats">
                <div>正常场景 70%（10万帧）</div>
                <div>极端场景 30%（4.3万帧）</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'device' && (
        <div className="management-content">
          <div className="card">
            <div className="card-title">设备管理</div>
            <div className="device-list">
              {[
                { name: 'Intel RealSense D455', type: '相机', status: '已连接' },
                { name: 'Velodyne VLP-16', type: '激光雷达', status: '已连接' },
                { name: '自研 eRTIS', type: '声呐', status: '已连接' }
              ].map((device, i) => (
                <div key={i} className="device-item">
                  <div className="device-name">{device.name}</div>
                  <div className="device-meta">{device.type} - {device.status}</div>
                  <div className="device-actions">
                    <button className="btn">校准</button>
                    <button className="btn">重启</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManagementView

