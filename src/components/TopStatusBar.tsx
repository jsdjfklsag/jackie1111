import React from 'react'
import { SystemState } from '../types'
import './TopStatusBar.css'

interface TopStatusBarProps {
  systemState: SystemState
}

const TopStatusBar: React.FC<TopStatusBarProps> = ({ systemState }) => {
  const getStatusIcon = () => {
    switch (systemState.status) {
      case 'normal':
        return <span className="status-indicator status-normal"></span>
      case 'warning':
        return <span className="status-indicator status-warning"></span>
      case 'error':
        return <span className="status-indicator status-error"></span>
    }
  }

  const getSceneModeText = () => {
    switch (systemState.sceneMode) {
      case 'sunny':
        return '晴朗'
      case 'fog':
        return '浓雾'
      case 'smoke':
        return '烟雾'
    }
  }

  const isGlobalConfidenceLow = systemState.globalConfidence < 0.5

  return (
    <div className="top-status-bar">
      <div className="status-bar-left">
        {getStatusIcon()}
        <span>系统状态：{systemState.status === 'normal' ? '正常' : systemState.status === 'warning' ? '预警' : '故障'}</span>
        <span className="separator">|</span>
        <span>场景模式：{getSceneModeText()}</span>
      </div>
      
      <div className="status-bar-center">
        <span>算法运行：{systemState.algorithmRunning.join('、')}</span>
      </div>
      
      <div className={`status-bar-right ${isGlobalConfidenceLow ? 'warning' : ''}`}>
        <span>全局置信度 C_global：</span>
        <span className={`value-display ${isGlobalConfidenceLow ? 'value-error' : 'value-normal'}`}>
          {systemState.globalConfidence.toFixed(3)}
        </span>
        {isGlobalConfidenceLow && (
          <span className="warning-badge">预警</span>
        )}
      </div>
    </div>
  )
}

export default TopStatusBar

