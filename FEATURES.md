# Mara Energy Platform - Features

This document outlines the key features and capabilities of the SLA-Smart Energy Arbitrage Platform.

## 1. Core Platform (Backend - FastAPI)

The backend, built with FastAPI, powers the simulation and logic for the entire platform.

- **Multi-Site Simulation**
  - Manages 10 global data center sites (e.g., Nordic Iceland, Texas USA, Singapore Tropical).
  - Each site has a specific profile including:
    - **Location**: Latitude/Longitude and Timezone.
    - **Climate**: Average temperature, cooling efficiency, and renewable energy mix.
    - **Hardware Profile**: Ratio of GPU vs. ASIC, and specific cooling types (Air, Hydro, Immersion).
    - **Energy Cost**: Localized cost multipliers.

- **SLA Management**
  - Supports 4 distinct Service Level Agreement (SLA) tiers:
    - **Premium**: 99.9% Uptime, 3.5x Price Multiplier (Priority 1).
    - **Standard**: 95.0% Uptime, 2.0x Price Multiplier (Priority 2).
    - **Flexible**: 90.0% Uptime, 1.2x Price Multiplier (Priority 3).
    - **Spot**: Best Effort, 0.4x Price Multiplier (Priority 4).
  - Automated site selection algorithm allocates workloads based on cooling efficiency and energy costs.

- **AI Optimization**
  - **Anthropic Claude Integration**: Uses `claude-3-5-sonnet` to analyze site data and provide intelligent workload distribution recommendations.
  - **Fallback Logic**: Robust rule-based optimization if AI is unavailable, prioritizing revenue and climate efficiency.
  - **Optimization Metrics**: Calculates potential climate savings and revenue gains from timezone arbitrage.

- **Financial Modeling**
  - **Revenue Calculation**: Real-time estimation based on hardware tokens (GPU/ASIC) and mining hashrate.
  - **Dynamic Pricing**: Incorporates energy price fluctuations and demand multipliers based on business hours (Timezone-aware).

- **Hardware Inventory Tracking**
  - Detailed inventory management for:
    - **Miners**: Air-cooled, Hydro-cooled, and Immersion-cooled units.
    - **AI Inference**: GPU and ASIC compute units.
  - Distributes a global pool of realistic hardware assets across sites based on their capacity and profile.

## 2. Interactive Dashboard (Frontend)

The frontend provides a real-time, interactive interface for monitoring and management.

- **Real-time Global Metrics**
  - Displays aggregate data: Total Revenue, Total Power Usage, Average Cooling Efficiency, and Renewable Energy Usage %.

- **Geospatial Visualization**
  - **Interactive World Map**: Built with Leaflet.js.
  - **Visual Indicators**:
    - **Color-coded Efficiency**: Green (>80%), Orange (60-80%), Red (<60%).
    - **Dynamic Size**: Marker radius scales with power usage.
  - **Detailed Tooltips**: Hover over sites to see specific temperature, revenue, and power stats.

- **SLA Panel**
  - Visual breakdown of current capacity allocation per SLA tier.
  - **Request Interface**: Form to request new power allocations with specific duration and SLA tier requirements.

- **Charts & Analytics**
  - **Revenue Optimization**: Line chart showing revenue trends over optimization cycles.
  - **Efficiency Distribution**: Doughnut chart visualizing the proportion of high vs. low efficiency sites.

- **Claude AI Panel**
  - Displays the reasoning output from the AI optimizer.
  - Highlights specific gains from "Climate Savings" and "Timezone Optimization".

## 3. Data Persistence & Reliability

- **SQLite Database**
  - Persistent storage for:
    - System State (Initialization status, global revenue).
    - Site Inventories and Allocations.
    - SLA Commitments.
    - Pricing Data History.
    - Optimization Run History.
- **Logging**: Comprehensive application logging (`app.log`) for debugging and audit trails.

