/* eslint-disable import/no-cycle */

/* eslint-disable jsx-a11y/label-has-associated-control */

/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react'

import { DataConfig } from '.'

interface ConfigurationPanelProps {
  priorityDataConfig: DataConfig
  feasibleDataConfig: DataConfig
  setPriorityDataConfig: React.Dispatch<React.SetStateAction<DataConfig>>
  setFeasibleDataConfig: React.Dispatch<React.SetStateAction<DataConfig>>
  closePanel: () => void
}

const titlesMap = {
  toggleCiRange: 'CES Percentile',
  toggleLevRange: 'LEVs/10000',
  toggleMultiFaRange: '# Multi-Family residents',
  toggleRentersRange: '# Renters',
  toggleWalkableRange: 'Walkable',
  toggleDrivableRange: 'Drivable',
  togglePopRange: 'Population in pixels',
  toggleCommercialRange: 'Commercial Zoning %',
  toggleResidentialRange: 'Multifamily Residential Zoning %',
  toggleNeviFilterActive: 'NEVI Eligible',
  toggleirs30cFilterActive: 'IRS 30C Eligible',
  togglePgeFilterActive: 'Grid Capacity',
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  priorityDataConfig,
  feasibleDataConfig,
  setPriorityDataConfig,
  setFeasibleDataConfig,
  closePanel,
}) => {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        closePanel()
      }
    }

    document.addEventListener('mousedown', handleDocumentClick)
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [closePanel])

  const handlePriorityChange = (key: keyof DataConfig) => {
    setPriorityDataConfig(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleFeasibleChange = (key: keyof DataConfig) => {
    setFeasibleDataConfig(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div
      className="config-panel-container"
      onClick={event => {
        if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
          closePanel()
        }
      }}
    >
      <div className="config-panel" ref={panelRef}>
        <div className="config-columns">
          <div className="config-section">
            <h2>
              <b>Priority Data</b>
            </h2>
            <div className="checkbox-column">
              {Object.entries(priorityDataConfig).map(([key, value]) => (
                <label key={key} className="config-item">
                  <input
                    type="checkbox"
                    id={`priority-${key}`}
                    checked={value}
                    onChange={() => handlePriorityChange(key as keyof DataConfig)}
                  />
                  {titlesMap[key as keyof DataConfig]}
                </label>
              ))}
            </div>
          </div>

          <div className="config-section">
            <h2>
              <b>Feasibility Data</b>
            </h2>
            <div className="checkbox-column">
              {Object.entries(feasibleDataConfig).map(([key, value]) => (
                <label key={key} className="config-item">
                  <input
                    type="checkbox"
                    id={`feasible-${key}`}
                    checked={value}
                    onChange={() => handleFeasibleChange(key as keyof DataConfig)}
                  />
                  {titlesMap[key as keyof DataConfig]}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfigurationPanel
