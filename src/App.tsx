import { useState, useEffect } from 'react'
import TopStatusBar from './components/TopStatusBar'
import LeftNavigation from './components/LeftNavigation'
import MainDisplayArea from './components/MainDisplayArea'
import RightMonitorPanel from './components/RightMonitorPanel'
import { SystemState, SystemStatus } from './types'
import { generateMockData } from './utils/mockData'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState<string>('overview')
  const [isPaused, setIsPaused] = useState(false)
  const [showTechDoc, setShowTechDoc] = useState(false)
  const [systemState, setSystemState] = useState<SystemState>({
    status: 'normal',
    sceneMode: 'sunny',
    algorithmRunning: ['LES-Cartographer', '跨模态注意力融合'],
    globalConfidence: 0.85,
    modalConfidences: {
      cam: 0.87,
      lidar: 0.85,
      sonar: 0.83
    },
    cpuUsage: 45,
    gpuUsage: 60,
    memoryUsage: 52,
    frameRate: 18
  })

  // 计算全局置信度和系统状态的辅助函数
  const calculateStatus = (confidences: { cam: number; lidar: number; sonar: number }) => {
    const globalConf = Math.min(confidences.cam, confidences.lidar, confidences.sonar)
    
    let status: SystemStatus = 'normal'
    if (globalConf < 0.3) {
      status = 'error'
    } else if (globalConf < 0.5) {
      status = 'warning'
    }
    
    return { globalConf, status }
  }

  // 模拟数据更新
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      const newData = generateMockData()
      const { globalConf, status } = calculateStatus(newData.modalConfidences)
      
      setSystemState(prev => ({
        ...prev,
        ...newData,
        globalConfidence: globalConf,
        status: status
      }))
    }, 1000) // 每秒更新

    return () => clearInterval(interval)
  }, [isPaused])

  // 快捷键处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // F1: 查看技术说明
      if (e.key === 'F1') {
        e.preventDefault()
        setShowTechDoc(true)
      }
      // F5: 刷新数据
      else if (e.key === 'F5') {
        e.preventDefault()
        const newData = generateMockData()
        const { globalConf, status } = calculateStatus(newData.modalConfidences)
        setSystemState(prev => ({
          ...prev,
          ...newData,
          globalConfidence: globalConf,
          status: status
        }))
      }
      // 空格: 暂停/继续
      else if (e.key === ' ' && e.target === document.body) {
        e.preventDefault()
        setIsPaused(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="app-container">
      <TopStatusBar systemState={systemState} />
      <div className="app-content">
        <LeftNavigation currentView={currentView} onViewChange={setCurrentView} />
        <MainDisplayArea currentView={currentView} systemState={systemState} />
        <RightMonitorPanel currentView={currentView} systemState={systemState} />
      </div>
      {showTechDoc && (
        <div className="tech-doc-modal" onClick={() => setShowTechDoc(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>技术说明</h3>
              <button className="close-btn" onClick={() => setShowTechDoc(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>本文档基于《AIC-2025-46644903-AC1 - 面向复杂环境的多模态智能导航系统 - 技术方案.pdf》</p>
              <h4>核心架构：感知 - 融合 - 决策</h4>
              <ul>
                <li><strong>感知层：</strong>三模态传感器（相机、激光雷达、声呐）数据采集与MADS健康监测</li>
                <li><strong>融合层：</strong>数据层（PointPainting、AKF）、特征层（跨模态注意力）、决策层（CLOC-S）</li>
                <li><strong>决策层：</strong>LES-Cartographer SLAM建图与包容式行为架构导航</li>
              </ul>
              <p>详细技术说明请参考技术方案PDF文档。</p>
            </div>
          </div>
        </div>
      )}
      {isPaused && (
        <div className="pause-indicator">
          已暂停 (按空格继续)
        </div>
      )}
    </div>
  )
}

export default App

