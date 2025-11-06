export type SystemStatus = 'normal' | 'warning' | 'error'
export type SceneMode = 'sunny' | 'fog' | 'smoke'

export interface ModalConfidence {
  cam: number
  lidar: number
  sonar: number
}

export interface SystemState {
  status: SystemStatus
  sceneMode: SceneMode
  algorithmRunning: string[]
  globalConfidence: number
  modalConfidences: ModalConfidence
  cpuUsage: number
  gpuUsage: number
  memoryUsage: number
  frameRate: number
}

export interface MADSHealth {
  sensor: 'camera' | 'lidar' | 'sonar'
  Hm: number
  Qm: number
  status: string
  warning?: string
}

