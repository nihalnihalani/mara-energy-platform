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
    initializeEventListeners();
    initializeCharts();
    initializeMap();
});

// Event listeners
function initializeEventListeners() {
    // Initialize system button
    document.getElementById('initializeBtn').addEventListener('click', initializeSystem);
    
    // Optimize button
    document.getElementById('optimizeBtn').addEventListener('click', optimizeSystem);
    
    // SLA request button
    document.getElementById('requestSlaBtn').addEventListener('click', requestSLA);
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
            document.getElementById('optimizeBtn').disabled = false;
            document.getElementById('initializeBtn').disabled = true; // Disable after successful initialization
            
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
    const tier = document.getElementById('slaTypeSelect').value;
    const powerRequirement = parseInt(document.getElementById('powerRequirement').value);
    const durationHours = parseInt(document.getElementById('durationHours').value);
    
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
        
        showNotification(`SLA ${tier} requested successfully! Allocated to ${data.optimal_site}`, 'success');
        
        // Clear form
        document.getElementById('powerRequirement').value = '';
        document.getElementById('durationHours').value = '';
        
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
        
        // Update global metrics
        if (data.global_metrics) {
            updateGlobalMetrics(data.global_metrics);
        }
        
        // Update sites
        if (data.sites) {
            updateSites(data.sites);
        }
        
        // Update SLA commitments
        if (data.sla_commitments) {
            updateSLACommitments(data.sla_commitments);
        }
        
        // Update map
        if (data.sites) {
            updateMapMarkers(data.sites);
        }
        
        // Update charts
        updateCharts(data);
        
    } catch (error) {
        console.error('Dashboard update error:', error);
    }
}

// Update global metrics
function updateGlobalMetrics(metrics) {
    if (!metrics) return;
    
    const totalRevenueElement = document.getElementById('totalRevenue');
    const totalPowerElement = document.getElementById('totalPower');
    const coolingEfficiencyElement = document.getElementById('coolingEfficiency');
    const renewableEnergyElement = document.getElementById('renewableEnergy');
    
    if (totalRevenueElement) {
        totalRevenueElement.textContent = formatCurrency(metrics.total_revenue || 0);
    }
    if (totalPowerElement) {
        totalPowerElement.textContent = formatNumber(metrics.total_power_used || 0) + ' MW';
    }
    if (coolingEfficiencyElement) {
        coolingEfficiencyElement.textContent = formatPercentage(metrics.avg_cooling_efficiency || 0);
    }
    if (renewableEnergyElement) {
        renewableEnergyElement.textContent = formatPercentage(metrics.renewable_energy_usage || 0);
    }
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
    card.className = `site-card ${getEfficiencyClass(site.cooling_efficiency || 0.8)}`;
    
    // Safely access nested properties with fallbacks
    const currentTemp = site.weather?.temperature || site.current_temp || 70;
    const localTime = site.local_time || 'N/A';
    const energyPrice = site.pricing?.energy_price || site.energy_price || 1.0;
    const coolingEfficiency = site.cooling_efficiency || 0.8;
    const revenue = site.revenue || 0;
    const powerUsed = site.power_used || 0;
    const gpuCompute = site.allocation?.gpu_compute || 0;
    
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
                <span class="site-metric-label">Energy Price</span>
                <span class="site-metric-value">$${energyPrice.toFixed(3)}</span>
            </div>
            <div class="site-metric">
                <span class="site-metric-label">Cooling Efficiency</span>
                <span class="site-metric-value">${formatPercentage(coolingEfficiency)}</span>
            </div>
            <div class="site-metric">
                <span class="site-metric-label">Revenue</span>
                <span class="site-metric-value">${formatCurrency(revenue)}</span>
            </div>
            <div class="site-metric">
                <span class="site-metric-label">Power Used</span>
                <span class="site-metric-value">${formatNumber(powerUsed)} MW</span>
            </div>
            <div class="site-metric">
                <span class="site-metric-label">GPU Compute</span>
                <span class="site-metric-value">${gpuCompute}</span>
            </div>
        </div>
    `;
    
    return card;
}

// Update SLA commitments
function updateSLACommitments(commitments) {
    if (!commitments) return;
    
    const premiumElement = document.getElementById('premiumAllocation');
    const standardElement = document.getElementById('standardAllocation');
    const flexibleElement = document.getElementById('flexibleAllocation');
    const spotElement = document.getElementById('spotAllocation');
    
    if (premiumElement) {
        premiumElement.textContent = formatNumber(commitments.premium || 0) + ' MW';
    }
    if (standardElement) {
        standardElement.textContent = formatNumber(commitments.standard || 0) + ' MW';
    }
    if (flexibleElement) {
        flexibleElement.textContent = formatNumber(commitments.flexible || 0) + ' MW';
    }
    if (spotElement) {
        spotElement.textContent = formatNumber(commitments.spot || 0) + ' MW';
    }
}

// Initialize world map
function initializeMap() {
    const mapElement = document.getElementById('worldMap');
    if (!mapElement) return;
    
    worldMap = L.map('worldMap').setView([30, 0], 2);
    
    // Dark theme tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CartoDB',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(worldMap);
    
    // Disable zoom control for cleaner look
    worldMap.zoomControl.remove();
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
        const color = efficiency > 0.8 ? '#10b981' : efficiency > 0.6 ? '#f59e0b' : '#ef4444';
        const powerUsed = site.power_used || 0;
        
        const marker = L.circleMarker([site.location.lat, site.location.lon], {
            radius: 8 + (powerUsed / 50000), // Size based on power usage
            fillColor: color,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(worldMap);
        
        // Popup with site details
        const currentTemp = site.weather?.temperature || site.current_temp || 70;
        const siteName = site.name || 'Unknown Site';
        const efficiencyValue = site.cooling_efficiency || 0.8;
        const revenue = site.revenue || 0;
        const power = site.power_used || 0;
        
        marker.bindPopup(`
            <div style="color: #000;">
                <h3>${siteName}</h3>
                <p><strong>Temperature:</strong> ${Math.round(currentTemp)}°F</p>
                <p><strong>Efficiency:</strong> ${formatPercentage(efficiencyValue)}</p>
                <p><strong>Revenue:</strong> ${formatCurrency(revenue)}</p>
                <p><strong>Power:</strong> ${formatNumber(power)} MW</p>
            </div>
        `);
    });
}

// Initialize charts
function initializeCharts() {
    // Revenue chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        revenueChart = new Chart(revenueCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Total Revenue',
                    data: [],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#f8fafc'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#cbd5e1'
                        },
                        grid: {
                            color: 'rgba(203, 213, 225, 0.1)'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#cbd5e1',
                            callback: function(value) {
                                return '$' + formatNumber(value);
                            }
                        },
                        grid: {
                            color: 'rgba(203, 213, 225, 0.1)'
                        }
                    }
                }
            }
        });
    }
    
    // Efficiency chart
    const efficiencyCtx = document.getElementById('efficiencyChart');
    if (efficiencyCtx) {
        efficiencyChart = new Chart(efficiencyCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['High Efficiency', 'Medium Efficiency', 'Low Efficiency'],
                datasets: [{
                    data: [0, 0, 0],
                    backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#f8fafc',
                            padding: 20
                        }
                    }
                }
            }
        });
    }
}

// Update charts
function updateCharts(data) {
    // Update revenue chart
    if (revenueChart && data.optimization_history && Array.isArray(data.optimization_history)) {
        const history = data.optimization_history.slice(-10); // Last 10 points
        const labels = history.map((_, index) => `T-${history.length - index - 1}`);
        const revenues = history.map(h => h.total_revenue || 0);
        
        revenueChart.data.labels = labels;
        revenueChart.data.datasets[0].data = revenues;
        revenueChart.update();
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
    if (!value) return '0.0%';
    return (value * 100).toFixed(1) + '%';
}

function formatTime(timeString) {
    if (!timeString) return 'N/A';
    
    try {
        const date = new Date(timeString);
        if (isNaN(date.getTime())) {
            // If it's not a valid date, try to extract time from string
            return timeString.split(' ').slice(-2).join(' ') || timeString;
        }
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            timeZoneName: 'short'
        });
    } catch {
        return timeString.split(' ').slice(-2).join(' ') || timeString;
    }
}

function getEfficiencyClass(efficiency) {
    if (!efficiency) return 'medium-efficiency';
    if (efficiency > 0.8) return 'high-efficiency';
    if (efficiency >= 0.6) return 'medium-efficiency';
    return 'low-efficiency';
}

function updateSystemStatus(status) {
    const statusElement = document.getElementById('systemStatus');
    if (!statusElement) return;
    
    const dot = statusElement.querySelector('.status-dot');
    const text = statusElement.querySelector('span');
    
    if (!dot || !text) return;
    
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
    
    if (show) {
        overlay.classList.remove('hidden');
    } else {
        overlay.classList.add('hidden');
    }
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('notifications');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

function startPeriodicUpdates() {
    // Update dashboard every 30 seconds
    if (updateInterval) {
        clearInterval(updateInterval);
    }
    updateInterval = setInterval(updateDashboard, 30000);
}

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (updateInterval) {
        clearInterval(updateInterval);
    }
}); 