// Monitor Kesehatan Sistem
// Komponen ini menampilkan status operasional keseluruhan sistem.

import React, { useState, useEffect, useCallback } from 'react'
import { Icon } from './icons.jsx'

// Realistic mock data for different states
const MOCK_METRICS = {
  // Optimal state example
  openWorkOrders: 25,
  slaCompliance: 98.5,
  avgResolutionTime: 5.2, // hours
}

// --- Thresholds ---
const THRESHOLDS = {
  openWorkOrders: { optimal: 50, stressed: 100 },
  slaCompliance: { optimal: 95, stressed: 90 }, // Lower is worse
  avgResolutionTime: { optimal: 8, stressed: 12 }, // Higher is worse
}

// Fungsi untuk menentukan keadaan sistem berdasarkan metrik
function getSystemStatus(metrics) {
  const { openWorkOrders, slaCompliance, avgResolutionTime } = metrics
  let isCritical = false
  let isStressed = false

  // Check Critical
  if (openWorkOrders > THRESHOLDS.openWorkOrders.stressed ||
      slaCompliance < THRESHOLDS.slaCompliance.stressed ||
      avgResolutionTime > THRESHOLDS.avgResolutionTime.stressed) {
    isCritical = true
  }
  // Check Stressed (only if not Critical)
  else if (openWorkOrders > THRESHOLDS.openWorkOrders.optimal ||
           slaCompliance < THRESHOLDS.slaCompliance.optimal ||
           avgResolutionTime > THRESHOLDS.avgResolutionTime.optimal) {
    isStressed = true
  }

  if (isCritical) return { status: 'CRITICAL', color: 'red' }
  if (isStressed) return { status: 'STRESSED', color: 'orange' }
  return { status: 'OPTIMAL', color: 'green' }
}

function SystemHealthMonitor() {
  const [metrics, setMetrics] = useState(MOCK_METRICS)
  const [status, setStatus] = useState(() => getSystemStatus(MOCK_METRICS))
  const [tooltipVisible, setTooltipVisible] = useState(false)

  // Effect for simulating data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate realistic fluctuations around optimal/stressed states
      const newMetrics = {
        openWorkOrders: Math.max(10, Math.floor(Math.random() * 80) + 10), // Mostly stays below stressed threshold
        slaCompliance: Math.max(80, Math.min(99.9, Math.random() * 18 + 82)), // Stays mostly above 80%
        avgResolutionTime: Math.max(4, Math.floor(Math.random() * 10) + 4), // Mostly stays below stressed threshold
      }

      // Occasionally push to critical state for testing
      if (Math.random() < 0.05) { // 5% chance to enter critical state
        newMetrics.openWorkOrders = Math.floor(Math.random() * 70) + 110; // Above 100
        newMetrics.slaCompliance = Math.floor(Math.random() * 10) + 80; // Below 90
        newMetrics.avgResolutionTime = Math.floor(Math.random() * 5) + 13; // Above 12
      }

      setMetrics(newMetrics)
      setStatus(getSystemStatus(newMetrics))
    }, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [])

  const statusColor = {
    OPTIMAL: '#35c27a', // Green
    STRESSED: '#e0a352', // Orange
    CRITICAL: '#e05252', // Red
  }[status.color.toUpperCase()] || '#8a8a8a' // Default Grey

  const handleMouseEnter = useCallback(() => setTooltipVisible(true), [])
  const handleMouseLeave = useCallback(() => setTooltipVisible(false), [])

  return (
    <div className="health-monitor" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div
        className="health-indicator"
        style={{ borderColor: statusColor, boxShadow: `0 0 0 3px ${statusColor}33` }}
      >
        <div className="indicator-text">{status.status}</div>
      </div>

      {tooltipVisible && (
        <div className="health-tooltip">
          <h4>System Health Details</h4>
          <div className="tooltip-metric">
            <span>Open Work Orders:</span>
            <span>{metrics.openWorkOrders}</span>
          </div>
          <div className="tooltip-metric">
            <span>SLA Compliance:</span>
            <span>{metrics.slaCompliance.toFixed(1)}%</span>
          </div>
          <div className="tooltip-metric">
            <span>Avg. Resolution Time:</span>
            <span>{metrics.avgResolutionTime.toFixed(1)} hrs</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default SystemHealthMonitor
