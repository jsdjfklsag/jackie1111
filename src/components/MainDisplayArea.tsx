import { SystemState } from '../types'
import OverviewView from './views/OverviewView'
import PerceptionView from './views/PerceptionView'
import FusionView from './views/FusionView'
import NavigationView from './views/NavigationView'
import ManagementView from './views/ManagementView'
import './MainDisplayArea.css'

interface MainDisplayAreaProps {
  currentView: string
  systemState: SystemState
}

const MainDisplayArea = ({ currentView, systemState }: MainDisplayAreaProps) => {
  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <OverviewView systemState={systemState} />
      case 'perception':
        return <PerceptionView systemState={systemState} />
      case 'fusion':
        return <FusionView systemState={systemState} />
      case 'navigation':
        return <NavigationView systemState={systemState} />
      case 'management':
        return <ManagementView systemState={systemState} />
      default:
        return <OverviewView systemState={systemState} />
    }
  }

  return (
    <div className="main-display-area">
      {renderView()}
    </div>
  )
}

export default MainDisplayArea

