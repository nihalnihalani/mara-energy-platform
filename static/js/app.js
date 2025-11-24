// Global state
let systemInitialized = false;
let updateInterval = null;
let worldMap = null;
let revenueChart = null;
let efficiencyChart = null;

// API base URL
const API_BASE = '';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeEventListeners();
    
    // Check if we should auto-load dashboard (e.g. from previous session)
    // For now, always start at landing page
});

// Navigation Logic
function initializeNavigation() {
    const launchBtn = document.getElementById('launchAppBtn');
    const backHomeBtn = document.getElementById('backToHomeBtn');
    
    if (launchBtn) {
        launchBtn.addEventListener('click', () => {
            switchView('dashboard');
            // Initialize map and charts when dashboard becomes visible
            setTimeout(() => {
                if (!worldMap) initializeMap();
                if (!revenueChart) initializeCharts();
                worldMap.invalidateSize(); // Fix Leaflet rendering issue
            }, 100);
        });
    }
    
    if (backHomeBtn) {
        backHomeBtn.addEventListener('click', () => {
            switchView('landing');
        });
    }
}

function switchView(viewName) {
    const landingPage = document.getElementById('landingPage');
    const dashboardApp = document.getElementById('dashboardApp');
    
    if (viewName === 'dashboard') {
        landingPage.classList.add('hidden');
        dashboardApp.classList.remove('hidden');
        // Trigger animation/fade in if desired
    } else {
        dashboardApp.classList.add('hidden');
        landingPage.classList.remove('hidden');
    }
}

// Event listeners
function initializeEventListeners() {
    // Initialize system button
    const initBtn = document.getElementById('initializeBtn');
    if (initBtn) initBtn.addEventListener('click', initializeSystem);
    
    // Optimize button
    const optBtn = document.getElementById('optimizeBtn');
    if (optBtn) optBtn.addEventListener('click', optimizeSystem);
    
    // SLA request button
    const slaBtn = document.getElementById('requestSlaBtn');
    if (slaBtn) slaBtn.addEventListener('click', requestSLA);
}

// Initialize system
async function initializeSystem() {
    showLoading(true);
    
    try {
        const response = await fetch(`${API_BASE}/api/initialize`, {
            method: 'POST'
        });
        
        if (!response.ok) {
            throw new Error('Failed to initialize system');
        }
        
        const data = await response.json();
        
        if (data.status === 'success') {
            systemInitialized = true;
            updateSystemStatus('online');
            
            const optBtn = document.getElementById('optimizeBtn');
            if (optBtn) optBtn.disabled = false;
            
            showNotification('System initialized successfully with dummy data!', 'success');
            
            // Start periodic updates
            startPeriodicUpdates();
            
            // Initial data load
            await updateDashboard();
        } else {
            throw new Error(data.message || 'Initialization failed');
        }
        
    } catch (error) {
        console.error('Initialization error:', error);
        showNotification('Failed to initialize system: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
}

// Optimize system
async function optimizeSystem() {
    showLoading(true);
    
    try {
        const response = await fetch(`${API_BASE}/api/optimize`, {
            method: 'POST'
        });
        
        if (!response.ok) {
            throw new Error('Failed to optimize system');
        }
        
        const data = await response.json();
        
        // Update Claude reasoning
        const claudeElement = document.getElementById('claudeReasoning');
        if (claudeElement) {
            // Typewriter effect for Claude's reasoning could go here
            claudeElement.textContent = data.claude_reasoning || 'Optimization completed successfully';
        }
        
        // Update metrics
        const climateSavingsElement = document.getElementById('climateSavings');
        const timezoneOptimizationElement = document.getElementById('timezoneOptimization');
        
        if (climateSavingsElement) {
            climateSavingsElement.textContent = formatCurrency(data.climate_savings || 0);
        }
        if (timezoneOptimizationElement) {
            timezoneOptimizationElement.textContent = formatCurrency(data.timezone_optimization || 0);
        }
        
        showNotification('System optimized successfully!', 'success');
        
        // Refresh dashboard
        await updateDashboard();
        
    } catch (error) {
        console.error('Optimization error:', error);
        showNotification('Failed to optimize system: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
}

// Request SLA
async function requestSLA() {
    const tierSelect = document.getElementById('slaTypeSelect');
    const powerInput = document.getElementById('powerRequirement');
    const durationInput = document.getElementById('durationHours');
    
    if (!tierSelect || !powerInput || !durationInput) return;
    
    const tier = tierSelect.value;
    const powerRequirement = parseInt(powerInput.value);
    const durationHours = parseInt(durationInput.value);
    
    if (!powerRequirement || !durationHours) {
        showNotification('Please fill in all SLA request fields', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/api/sla/request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tier: tier,
                power_requirement: powerRequirement,
                duration_hours: durationHours
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to request SLA');
        }
        
        const data = await response.json();
        
        showNotification(`SLA ${tier} allocated to ${data.optimal_site}`, 'success');
        
        // Clear form
        powerInput.value = '';
        durationInput.value = '';
        
        // Update dashboard
        await updateDashboard();
        
    } catch (error) {
        console.error('SLA request error:', error);
        showNotification('Failed to request SLA: ' + error.message, 'error');
    }
}

// Update dashboard
async function updateDashboard() {
    if (!systemInitialized) return;
    
    try {
        const response = await fetch(`${API_BASE}/api/dashboard/metrics`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch dashboard metrics');
        }
        
        const data = await response.json();
        
        if (data.error) {
            console.error('Dashboard error:', data.error);
            return;
        }
        
        // Update UI components
        if (data.global_metrics) updateGlobalMetrics(data.global_metrics);
        if (data.sites) updateSites(data.sites);
        if (data.sla_commitments) updateSLACommitments(data.sla_commitments);
        if (data.sites) updateMapMarkers(data.sites);
        updateCharts(data);
        
    } catch (error) {
        console.error('Dashboard update error:', error);
    }
}

// Update global metrics
function updateGlobalMetrics(metrics) {
    if (!metrics) return;
    
    updateElementText('totalRevenue', formatCurrency(metrics.total_revenue || 0));
    updateElementText('totalPower', formatNumber(metrics.total_power_used || 0) + ' MW');
    updateElementText('coolingEfficiency', formatPercentage(metrics.avg_cooling_efficiency || 0));
    updateElementText('renewableEnergy', formatPercentage(metrics.renewable_energy_usage || 0));
}

function updateElementText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

// Update sites
function updateSites(sites) {
    if (!sites || !Array.isArray(sites)) return;
    
    const container = document.getElementById('sitesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    sites.forEach(site => {
        const siteCard = createSiteCard(site);
        container.appendChild(siteCard);
    });
}

// Create site card
function createSiteCard(site) {
    const card = document.createElement('div');
    const efficiency = site.cooling_efficiency || 0.8;
    const effClass = efficiency > 0.8 ? 'high-efficiency' : efficiency > 0.6 ? 'medium-efficiency' : 'low-efficiency';
    
    card.className = `site-card ${effClass}`;
    
    // Safely access nested properties
    const currentTemp = site.weather?.temperature || site.current_temp || 70;
    const localTime = site.local_time || 'N/A';
    const energyPrice = site.pricing?.energy_price || site.energy_price || 1.0;
    const revenue = site.revenue || 0;
    const powerUsed = site.power_used || 0;
    
    card.innerHTML = `
        <div class="site-header">
            <div class="site-name">${site.name || 'Unknown Site'}</div>
            <div class="site-temp">
                <i class="fas fa-thermometer-half"></i>
                ${Math.round(currentTemp)}°F
            </div>
        </div>
        <div class="site-metrics">
            <div class="site-metric">
                <span class="site-metric-label">Local Time</span>
                <span class="site-metric-value">${formatTime(localTime)}</span>
            </div>
            <div class="site-metric">
                <span class="site-metric-label">Energy</span>
                <span class="site-metric-value">$${energyPrice.toFixed(2)}/kWh</span>
            </div>
            <div class="site-metric">
                <span class="site-metric-label">Efficiency</span>
                <span class="site-metric-value">${formatPercentage(efficiency)}</span>
            </div>
            <div class="site-metric">
                <span class="site-metric-label">Load</span>
                <span class="site-metric-value">${formatNumber(powerUsed)} MW</span>
            </div>
        </div>
    `;
    
    return card;
}

// Update SLA commitments
function updateSLACommitments(commitments) {
    if (!commitments) return;
    
    updateElementText('premiumAllocation', formatNumber(commitments.premium || 0) + ' MW');
    updateElementText('standardAllocation', formatNumber(commitments.standard || 0) + ' MW');
    updateElementText('flexibleAllocation', formatNumber(commitments.flexible || 0) + ' MW');
}

// Initialize world map
function initializeMap() {
    const mapElement = document.getElementById('worldMap');
    if (!mapElement || worldMap) return; // Avoid re-initializing
    
    worldMap = L.map('worldMap', {
        zoomControl: false,
        attributionControl: false
    }).setView([20, 0], 2);
    
    // Dark theme tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(worldMap);
}

// Update map markers
function updateMapMarkers(sites) {
    if (!worldMap || !sites || !Array.isArray(sites)) return;
    
    // Clear existing markers
    worldMap.eachLayer(layer => {
        if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
            worldMap.removeLayer(layer);
        }
    });
    
    // Add new markers
    sites.forEach(site => {
        if (!site.location || !site.location.lat || !site.location.lon) return;
        
        const efficiency = site.cooling_efficiency || 0.8;
        // Colors matching our CSS vars
        const color = efficiency > 0.8 ? '#00ff9d' : efficiency > 0.6 ? '#ffd700' : '#ff3366';
        const powerUsed = site.power_used || 0;
        
        const marker = L.circleMarker([site.location.lat, site.location.lon], {
            radius: Math.max(6, 6 + (powerUsed / 20000)), // Dynamic size
            fillColor: color,
            color: '#fff',
            weight: 1,
            opacity: 0.8,
            fillOpacity: 0.6
        }).addTo(worldMap);
        
        // Popup details
        const siteName = site.name || 'Site';
        marker.bindPopup(`
            <div style="color: #0f172a; font-family: 'Inter', sans-serif;">
                <strong>${siteName}</strong><br>
                Load: ${formatNumber(powerUsed)} MW<br>
                Eff: ${formatPercentage(efficiency)}
            </div>
        `);
    });
}

// Initialize charts
function initializeCharts() {
    Chart.defaults.color = '#64748b';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.05)';
    
    // Revenue chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx && !revenueChart) {
        revenueChart = new Chart(revenueCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Total Revenue',
                    data: [],
                    borderColor: '#00f2ff',
                    backgroundColor: 'rgba(0, 242, 255, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { grid: { display: false } },
                    y: { 
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { callback: (val) => '$' + formatNumber(val) }
                    }
                }
            }
        });
    }
    
    // Efficiency chart
    const efficiencyCtx = document.getElementById('efficiencyChart');
    if (efficiencyCtx && !efficiencyChart) {
        efficiencyChart = new Chart(efficiencyCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['High Eff', 'Med Eff', 'Low Eff'],
                datasets: [{
                    data: [0, 0, 0],
                    backgroundColor: ['#00ff9d', '#ffd700', '#ff3366'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%',
                plugins: {
                    legend: { position: 'right', labels: { boxWidth: 10 } }
                }
            }
        });
    }
}

// Update charts
function updateCharts(data) {
    // Update revenue chart
    if (revenueChart && data.optimization_history && Array.isArray(data.optimization_history)) {
        const history = data.optimization_history.slice(-20); 
        const labels = history.map((_, index) => index); // Simple index labels
        const revenues = history.map(h => h.total_revenue || 0);
        
        revenueChart.data.labels = labels;
        revenueChart.data.datasets[0].data = revenues;
        revenueChart.update('none'); // 'none' mode for smoother animation
    }
    
    // Update efficiency chart
    if (efficiencyChart && data.sites && Array.isArray(data.sites)) {
        const highEff = data.sites.filter(s => (s.cooling_efficiency || 0.8) > 0.8).length;
        const mediumEff = data.sites.filter(s => (s.cooling_efficiency || 0.8) >= 0.6 && (s.cooling_efficiency || 0.8) <= 0.8).length;
        const lowEff = data.sites.filter(s => (s.cooling_efficiency || 0.8) < 0.6).length;
        
        efficiencyChart.data.datasets[0].data = [highEff, mediumEff, lowEff];
        efficiencyChart.update();
    }
}

// Utility functions
function formatCurrency(value) {
    if (!value || value === 0) return '$0';
    if (value < 1000) return '$' + value.toFixed(2);
    if (value < 1000000) return '$' + (value / 1000).toFixed(1) + 'K';
    return '$' + (value / 1000000).toFixed(1) + 'M';
}

function formatNumber(value) {
    if (!value || value === 0) return '0';
    if (value < 1000) return value.toFixed(0);
    if (value < 1000000) return (value / 1000).toFixed(1) + 'K';
    return (value / 1000000).toFixed(1) + 'M';
}

function formatPercentage(value) {
    if (!value) return '0%';
    return (value * 100).toFixed(0) + '%';
}

function formatTime(timeString) {
    if (!timeString || timeString === 'N/A') return 'N/A';
    try {
        // If it's a full date string, extract HH:MM
        if (timeString.includes('T') || timeString.includes('-')) {
            const date = new Date(timeString);
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        }
        // If it's already formatted roughly like "2023-01-01 12:00:00 UTC"
        const parts = timeString.split(' ');
        if (parts.length > 1) return parts[1].substring(0, 5); 
        return timeString;
    } catch {
        return timeString;
    }
}

function updateSystemStatus(status) {
    const statusElement = document.getElementById('systemStatus');
    if (!statusElement) return;
    
    const dot = statusElement.querySelector('.status-dot');
    const text = statusElement.querySelector('span');
    
    if (status === 'online') {
        dot.className = 'status-dot online';
        text.textContent = 'Online';
    } else {
        dot.className = 'status-dot offline';
        text.textContent = 'Offline';
    }
}

function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (!overlay) return;
    if (show) overlay.classList.remove('hidden');
    else overlay.classList.add('hidden');
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('notifications');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) notification.parentNode.removeChild(notification);
    }, 5000);
}

function startPeriodicUpdates() {
    if (updateInterval) clearInterval(updateInterval);
    updateInterval = setInterval(updateDashboard, 5000); // Faster updates for demo
}

// Cleanup
window.addEventListener('beforeunload', function() {
    if (updateInterval) clearInterval(updateInterval);
});