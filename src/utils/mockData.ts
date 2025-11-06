import { SystemState, ModalConfidence } from '../types'

export function generateMockData(): Partial<SystemState> & { modalConfidences: ModalConfidence } {
  // 生成随机但合理的模拟数据
  const baseCam = 0.85 + (Math.random() - 0.5) * 0.1
  const baseLidar = 0.83 + (Math.random() - 0.5) * 0.12
  const baseSonar = 0.80 + (Math.random() - 0.5) * 0.15

  const modalConfidences: ModalConfidence = {
    cam: Math.max(0, Math.min(1, baseCam)),
    lidar: Math.max(0, Math.min(1, baseLidar)),
    sonar: Math.max(0, Math.min(1, baseSonar))
  }

  return {
    modalConfidences,
    cpuUsage: 40 + Math.random() * 20,
    gpuUsage: 50 + Math.random() * 25,
    memoryUsage: 45 + Math.random() * 20,
    frameRate: 15 + Math.random() * 5
  }
}

// 生成趋势数据（用于折线图）
export function generateTrendData(count: number = 60) {
  const data = []
  const now = Date.now()
  for (let i = count - 1; i >= 0; i--) {
    data.push({
      time: now - i * 5000, // 每5秒一个点
      cam: 0.8 + Math.random() * 0.15,
      lidar: 0.78 + Math.random() * 0.18,
      sonar: 0.75 + Math.random() * 0.20
    })
  }
  return data
}

