import React from 'react'
import './LeftNavigation.css'

interface LeftNavigationProps {
  currentView: string
  onViewChange: (view: string) => void
}

const LeftNavigation: React.FC<LeftNavigationProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'overview', label: '系统概览', icon: '📊' },
    { id: 'perception', label: '多模态感知监控', icon: '👁️' },
    { id: 'fusion', label: '分层融合控制', icon: '🔗' },
    { id: 'navigation', label: '定位导航决策', icon: '🧭' },
    { id: 'management', label: '系统管理', icon: '⚙️' }
  ]

  return (
    <div className="left-navigation">
      <div className="nav-header">
        <h2>导航系统</h2>
      </div>
      <nav className="nav-menu">
        {menuItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${currentView === item.id ? 'active' : ''}`}
            onClick={() => onViewChange(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>
      <div className="nav-footer">
        <div className="shortcut-hint">
          <div>F1: 技术说明</div>
          <div>F5: 刷新数据</div>
          <div>空格: 暂停/继续</div>
        </div>
      </div>
    </div>
  )
}

export default LeftNavigation

