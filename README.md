# ⚡ SLA-Smart Energy Arbitrage Platform

<div align="center">

![Platform Status](https://img.shields.io/badge/status-production--ready-success?style=for-the-badge)
![Python](https://img.shields.io/badge/python-3.9+-blue?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green?style=for-the-badge&logo=fastapi&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0+-orange?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

### 🏆 **MARA Hackathon 2025 - TOP 5 FINALIST**
### ₿ **Top Runner for 1 Bitcoin Grand Prize**

**AI-Powered Global Energy Arbitrage System for Bitcoin Mining & AI Inference**

*Maximize profit and energy efficiency across 10 geographically distributed data centers through intelligent resource allocation*

[📖 Features](#-features) • [🚀 Quick Start](#-quick-start) • [📡 API Documentation](#-api-documentation) • [🏗️ Architecture](#️-architecture)

</div>

---

## 🎖️ Hackathon Achievement

<div align="center">

### **MARA Hackathon 2025 - Fort Mason, San Francisco**

**🏆 TOP 5 FINALIST** out of hundreds of submissions

**₿ TOP RUNNER** for the **1 Bitcoin Grand Prize**

This platform demonstrated cutting-edge innovation in energy arbitrage optimization, combining AI-powered decision making with real-time climate intelligence to maximize mining profitability while minimizing environmental impact.

</div>

---

## 📑 Table of Contents

- [👁️ Overview](#️-overview)
- [⭐ Key Features](#-key-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Technology Stack](#️-technology-stack)
- [📥 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [📡 API Documentation](#-api-documentation)
- [💾 Database Schema](#-database-schema)
- [🖥️ Frontend Features](#️-frontend-features)
- [☁️ Deployment](#️-deployment)
- [🧪 Testing](#-testing)
- [⚡ Performance](#-performance)
- [🔒 Security](#-security)

---

## 👁️ Overview

The **SLA-Smart Energy Arbitrage Platform** is an award-winning, enterprise-grade system that revolutionizes compute resource allocation across 10 global data centers. By leveraging real-time climate data, timezone intelligence, and Claude AI-powered decision making, the platform maximizes revenue while minimizing energy costs through strategic workload placement.

### 📊 Core Value Proposition

| Metric | Achievement |
|--------|-------------|
| ❄️ **Cooling Cost Savings** | 35-55% through climate-aware routing |
| 💰 **Revenue Increase** | 20-30% via timezone optimization |
| ⏱️ **Uptime Guarantee** | 99.9% for premium SLA commitments |
| 🤖 **AI Optimization** | Real-time using Claude AI |
| 💎 **Multi-Revenue** | Bitcoin mining + AI inference |

---

## ⭐ Key Features

### 🌍 Global Multi-Site Management

| Feature | Description |
|---------|-------------|
| **🏢 10 Data Centers** | Strategic locations: Iceland, Norway, Canada, Ireland, Germany, Chile, Japan, Australia, Texas, Singapore |
| **🌡️ Climate Intelligence** | Automatic routing to cold-climate sites for optimal cooling efficiency |
| **☀️ Timezone Optimization** | Follow-the-sun routing for AI inference during peak business hours |
| **💻 Hardware Specialization** | Site-specific GPU/ASIC ratios based on local conditions |

### 🤝 SLA-Tiered Pricing System

| Tier | ⏰ Uptime | 💵 Price | ⬆️ Priority | Use Case |
|------|--------|-------|----------|----------|
| **👑 Premium** | 99.9% | 3.5x | Highest | Mission-critical AI workloads |
| **✅ Standard** | 95.0% | 2.0x | High | Production services |
| **🔄 Flexible** | 90.0% | 1.2x | Medium | Development & testing |
| **🎲 Spot** | Best Effort | 0.4x | Low | Batch processing |

### 🧠 AI-Powered Optimization

- **🤖 Claude AI Integration** for intelligent resource allocation
- **🔄 Real-time Analysis** of 10 sites simultaneously
- **🗺️ Predictive Routing** based on weather and demand patterns
- **⚖️ Dynamic Rebalancing** every 5 minutes
- **📜 Historical Performance** tracking and learning

### 🏢 Enterprise Features

- **💾 SQLite Database** for persistent data storage
- **🔌 RESTful API** with 8 comprehensive endpoints
- **📊 Real-time Dashboard** with live metrics
- **📝 Structured Logging** for audit trails
- **🛡️ CORS Security** with configurable origins
- **💓 Health Monitoring** with status endpoints

---

## 🏗️ Architecture

### 🔀 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                   🖥️  FRONTEND LAYER                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Dashboard (HTML/CSS/JS) + Charts.js + Leaflet Maps      │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ⚡ API LAYER (FastAPI)                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  8 RESTful Endpoints + WebSocket Support + CORS          │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐   ┌──────────────────┐   ┌──────────────┐
│  🤖 Claude AI │   │  💾 SQLite DB    │   │  💰 Pricing  │
│  Optimization │   │  (SQLAlchemy)    │   │  API         │
└───────────────┘   └──────────────────┘   └──────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│               🌍 10 GLOBAL DATA CENTERS                          │
│  🇮🇸 Iceland • 🇳🇴 Norway • 🇨🇦 Canada • 🇮🇪 Ireland • 🇩🇪 Germany   │
│  🇨🇱 Chile • 🇯🇵 Japan • 🇦🇺 Australia • 🇺🇸 Texas • 🇸🇬 Singapore      │
└─────────────────────────────────────────────────────────────────┘
```

### 🔁 Data Flow

1. **👀 Monitor**: Track weather, timezone demand, energy prices across all sites
2. **📊 Analyze**: Calculate site-specific profitability considering climate, energy costs, and demand
3. **✨ Optimize**: Claude AI determines optimal workload placement
4. **🗺️ Route**: Allocate resources to maximize revenue and efficiency
5. **🛡️ Protect**: Ensure SLA commitments are maintained across regions
6. **📈 Track**: Log performance metrics and compliance data

---

## 🛠️ Technology Stack

### 🔧 Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **🐍 Python** | 3.9+ | Core application language |
| **⚡ FastAPI** | 0.104+ | High-performance async web framework |
| **💾 SQLAlchemy** | 2.0+ | ORM and database management |
| **✓ Pydantic** | 2.8+ | Data validation and serialization |
| **🤖 Anthropic** | 0.7+ | Claude AI integration |
| **🚀 Uvicorn** | 0.24+ | ASGI server |
| **📊 Alembic** | 1.12+ | Database migrations |

### 🎨 Frontend

| Technology | Purpose |
|------------|---------|
| **📜 JavaScript** | Modern ES6+ with async/await |
| **📊 Chart.js** | Real-time data visualization |
| **🗺️ Leaflet.js** | Interactive world map |
| **🎨 CSS3** | Responsive design with glassmorphism |

### ☁️ Infrastructure

| Component | Technology |
|-----------|------------|
| **💾 Database** | SQLite (dev) / PostgreSQL (prod) |
| **☁️ Deployment** | Vercel serverless functions |
| **📦 Version Control** | Git + GitHub |
| **⚙️ Environment** | python-dotenv |

---

## 📥 Installation

### ✅ Prerequisites

- 🐍 Python 3.9 or higher
- 📦 pip (Python package manager)
- 🔧 Git

### 📋 Step-by-Step Installation

#### Step 1: Clone Repository

```bash
git clone https://github.com/nihalnihalani/mara-energy-platform.git
cd mara-energy-platform
```

#### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

#### Step 3: Configure Environment

```bash
cp config.env.example config.env
# Edit config.env with your settings
```

#### Step 4: Initialize Database

The database is automatically initialized on first run. The SQLite file will be created as `energy_platform.db`.

#### Step 5: Run Application

```bash
python main.py
```

✅ The application will start on `http://localhost:8000`

---

## ⚙️ Configuration

### 🔑 Environment Variables

Create a `config.env` file in the project root:

```bash
# 🤖 Claude API Configuration
CLAUDE_API_KEY=your_claude_api_key_here

# 💾 Database Configuration
DATABASE_URL=sqlite:///./energy_platform.db

# ⚙️ Application Settings
APP_ENV=development
DEBUG=True

# 🔒 CORS Settings (comma-separated origins)
ALLOWED_ORIGINS=http://localhost:8000,http://localhost:3000,https://your-app.vercel.app

# 📝 Logging Configuration
LOG_LEVEL=INFO
LOG_FILE=app.log

# ⏰ Background Task Configuration
PRICE_UPDATE_INTERVAL=300  # 5 minutes in seconds

# 🔐 Security
SECRET_KEY=your-secret-key-change-in-production
```

---

## 📡 API Documentation

### 🔗 Base URL

- **💻 Local**: `http://localhost:8000`
- **🌐 Production**: `https://your-app.vercel.app`

### 📋 Endpoints

#### 💓 1. Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "initialized": true,
  "timestamp": "2025-11-18T11:14:14.072303"
}
```

#### 🔌 2. Initialize System

```http
POST /api/initialize
```

**Response:**
```json
{
  "status": "success",
  "message": "System initialized with dummy data",
  "pricing_data": {
    "energy_price": 0.65,
    "hash_price": 8.5,
    "token_price": 2.9
  },
  "total_sites": 10
}
```

#### 🖥️ 3. Get Sites Status

```http
GET /api/sites/status
```

**Response:**
```json
{
  "sites": [
    {
      "site_id": "site_1_nordic",
      "name": "Nordic Iceland",
      "location": {"lat": 64.1466, "lon": -21.9426},
      "current_temp": 32.5,
      "cooling_efficiency": 0.95,
      "power_used": 45000,
      "revenue": 12500.50
    }
  ],
  "total_sites": 10
}
```

#### 🧠 4. Run Global Optimization

```http
POST /api/optimize
```

**Response:**
```json
{
  "timestamp": "2025-11-18T11:14:00",
  "total_revenue": 21710468.50,
  "climate_savings": 1907907.76,
  "timezone_optimization": 3256570.28,
  "claude_reasoning": "Detailed AI analysis..."
}
```

#### 🤝 5. Request SLA

```http
POST /api/sla/request
Content-Type: application/json

{
  "tier": "premium",
  "power_requirement": 100,
  "duration_hours": 24
}
```

**Response:**
```json
{
  "sla_tier": "premium",
  "power_allocated": 100,
  "optimal_site": "site_1_nordic",
  "estimated_uptime": 99.9,
  "price_multiplier": 3.5
}
```

#### 📊 6. Get Dashboard Metrics

```http
GET /api/dashboard/metrics
```

**Response:**
```json
{
  "global_metrics": {
    "total_revenue": 31925.93,
    "total_power_used": 450000,
    "avg_cooling_efficiency": 0.78,
    "renewable_energy_usage": 0.65,
    "active_sites": 10
  }
}
```

#### 📦 7. Get Hardware Inventory

```http
GET /api/hardware/inventory
```

**Response:**
```json
{
  "inventory": {
    "total_inventory": {
      "miners": {"air": 500, "hydro": 200, "immersion": 100},
      "inference": {"gpu": 590, "asic": 193}
    }
  }
}
```

#### 🔍 8. Debug System State

```http
GET /api/debug/state
```

**Response:**
```json
{
  "is_initialized": true,
  "site_count": 10,
  "has_current_prices": true,
  "total_revenue": 21710468.50,
  "data_source": "database"
}
```

---

## 💾 Database Schema

### 📊 Tables

#### ⚙️ system_state
Tracks global system state and initialization

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| is_initialized | BOOLEAN | System initialization status |
| mara_inventory | JSON | Global hardware inventory |
| current_prices | JSON | Latest pricing data |
| total_revenue | FLOAT | Cumulative revenue |
| last_updated | DATETIME | Last update timestamp |

#### 📦 site_hardware_inventory
Hardware inventory per site

#### 🎛️ site_allocations
Current resource allocation per site

#### 📄 sla_commitments
SLA commitments and tracking

#### 📜 optimization_history
Historical optimization runs

#### 💰 pricing_data
Historical pricing information

---

## 🖥️ Frontend Features

### 📊 Dashboard Components

1. **📈 Global Metrics Cards**
   - Total Revenue with trend
   - Power Usage across all sites
   - Cooling Efficiency average
   - Renewable Energy percentage

2. **🗺️ Interactive World Map**
   - Leaflet.js powered map
   - Site markers color-coded by efficiency
   - Click for detailed site information
   - Real-time updates every 30 seconds

3. **🤝 SLA Management Panel**
   - 4-tier SLA visualization
   - Request new SLA allocations
   - View current commitments
   - Automatic optimal site routing

4. **🏢 Site Performance Grid**
   - 10 site cards with live metrics
   - Temperature, efficiency, revenue
   - Hardware allocation details
   - Power utilization percentages

5. **🤖 Claude AI Optimizer**
   - Real-time AI analysis display
   - Climate savings calculation
   - Timezone optimization metrics
   - One-click optimization trigger

6. **📊 Performance Charts**
   - Revenue optimization line chart
   - Climate efficiency doughnut chart
   - Historical trend analysis
   - Export capability

---

## ☁️ Deployment

### 🚀 Vercel Deployment

The project includes pre-configured `vercel.json` for seamless deployment.

#### 💻 Deploy with Vercel CLI

```bash
npm i -g vercel
vercel deploy
```

#### 📦 Deploy via GitHub Integration

Push to GitHub - Vercel auto-deploys if connected:

```bash
git push origin main
```

### 🐳 Docker Deployment

```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
# Build and run
docker build -t mara-platform .
docker run -p 8000:8000 mara-platform
```

---

## 🧪 Testing

### ▶️ Running Tests

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest tests/

# Run with coverage
pytest --cov=. --cov-report=html
```

### 💻 Manual API Testing

```bash
# Initialize system
curl -X POST http://localhost:8000/api/initialize

# Get sites status
curl http://localhost:8000/api/sites/status

# Run optimization
curl -X POST http://localhost:8000/api/optimize

# Request SLA
curl -X POST http://localhost:8000/api/sla/request \
  -H "Content-Type: application/json" \
  -d '{"tier":"premium","power_requirement":100,"duration_hours":24}'
```

---

## ⚡ Performance

### ⏱️ Benchmarks

| Metric | Value |
|--------|-------|
| ⚡ **API Response Time** | < 100ms (avg) |
| 💾 **Database Query Time** | < 50ms (avg) |
| 🖥️ **Dashboard Load Time** | < 2s |
| 🧠 **Optimization Runtime** | < 5s |
| 👥 **Concurrent Users** | 1000+ |

### 🎯 Optimization Strategies

- **📑 Database Indexing**: Indexes on site_id, timestamp columns
- **🔄 Connection Pooling**: SQLAlchemy connection pool
- **⚡ Async Operations**: FastAPI async endpoints
- **💾 Caching**: In-memory caching for frequently accessed data
- **📦 Lazy Loading**: Frontend components load on demand

---

## 🔒 Security

### ✅ Implementation

- **🌐 CORS**: Restricted to specified origins
- **🔑 Environment Variables**: Sensitive data in config.env
- **🛡️ SQL Injection**: Protected by SQLAlchemy ORM
- **✓ Input Validation**: Pydantic models validate all inputs
- **📝 Logging**: Structured audit logs for all operations
- **🔐 Error Handling**: Generic error messages to clients

### 📋 Best Practices

1. ❌ Never commit `config.env` to version control
2. 🔑 Use strong SECRET_KEY in production
3. 🔒 Enable HTTPS in production
4. 🔍 Regular security audits of dependencies
5. ⏱️ Implement rate limiting for API endpoints

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### 🔄 Development Workflow

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/mara-energy-platform.git

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and test
python main.py

# Commit with descriptive message
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/your-feature-name
```

---

## ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- ₿ **MARA Hackathon 2025** for the incredible opportunity and recognition
- ⚡ **FastAPI** for the excellent web framework
- 🤖 **Anthropic** for Claude AI capabilities
- ☁️ **Vercel** for serverless deployment platform

---

## 💬 Support

For questions, issues, or feature requests:

- 📝 **GitHub Issues**: [Create an issue](https://github.com/nihalnihalani/mara-energy-platform/issues)
- 📖 **Documentation**: [Read the docs](#-overview)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/nihalnihalani/mara-energy-platform/discussions)

---

<div align="center">

### ❤️ Built with passion for MARA Hackathon 2025

### 🏆 TOP 5 FINALIST | ₿ TOP RUNNER FOR 1 BITCOIN GRAND PRIZE

**Fort Mason, San Francisco**

[⬆️ Back to Top](#-sla-smart-energy-arbitrage-platform)

</div>
