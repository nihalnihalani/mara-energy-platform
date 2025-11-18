"""
Database models and operations for SLA-Smart Energy Arbitrage Platform
"""
from sqlalchemy import create_engine, Column, Integer, Float, String, JSON, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv("config.env")

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./energy_platform.db")

# Create engine
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class SystemState(Base):
    """Track system initialization and global state"""
    __tablename__ = "system_state"
    
    id = Column(Integer, primary_key=True, index=True)
    is_initialized = Column(Boolean, default=False)
    mara_inventory = Column(JSON)
    current_prices = Column(JSON)
    total_revenue = Column(Float, default=0.0)
    last_updated = Column(DateTime, default=datetime.utcnow)

class SiteHardwareInventory(Base):
    """Hardware inventory for each site"""
    __tablename__ = "site_hardware_inventory"
    
    id = Column(Integer, primary_key=True, index=True)
    site_id = Column(String, unique=True, index=True)
    inventory_data = Column(JSON)  # Store complete inventory as JSON
    last_updated = Column(DateTime, default=datetime.utcnow)

class SiteAllocation(Base):
    """Current resource allocation for each site"""
    __tablename__ = "site_allocations"
    
    id = Column(Integer, primary_key=True, index=True)
    site_id = Column(String, index=True)
    allocation_data = Column(JSON)  # GPU, ASIC, miners allocation
    timestamp = Column(DateTime, default=datetime.utcnow)

class SLACommitment(Base):
    """SLA commitments by tier"""
    __tablename__ = "sla_commitments"
    
    id = Column(Integer, primary_key=True, index=True)
    tier = Column(String, index=True)  # premium, standard, flexible, spot
    power_requirement = Column(Integer)
    duration_hours = Column(Integer)
    optimal_site = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    active = Column(Boolean, default=True)

class OptimizationHistory(Base):
    """History of optimization runs"""
    __tablename__ = "optimization_history"
    
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    total_revenue = Column(Float)
    climate_savings = Column(Float)
    timezone_optimization = Column(Float)
    sla_performance = Column(JSON)
    claude_reasoning = Column(String)

class PricingData(Base):
    """Historical pricing data"""
    __tablename__ = "pricing_data"
    
    id = Column(Integer, primary_key=True, index=True)
    energy_price = Column(Float)
    hash_price = Column(Float)
    token_price = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)
    source = Column(String, default="dummy_data")

# Database helper functions
def get_db():
    """Get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """Initialize database tables"""
    Base.metadata.create_all(bind=engine)

def get_system_state(db: Session):
    """Get or create system state"""
    state = db.query(SystemState).first()
    if not state:
        state = SystemState(is_initialized=False)
        db.add(state)
        db.commit()
        db.refresh(state)
    return state

def update_system_state(db: Session, **kwargs):
    """Update system state"""
    state = get_system_state(db)
    for key, value in kwargs.items():
        if hasattr(state, key):
            setattr(state, key, value)
    state.last_updated = datetime.utcnow()
    db.commit()
    db.refresh(state)
    return state

def get_site_inventory(db: Session, site_id: str):
    """Get site hardware inventory"""
    inventory = db.query(SiteHardwareInventory).filter(SiteHardwareInventory.site_id == site_id).first()
    return inventory.inventory_data if inventory else None

def update_site_inventory(db: Session, site_id: str, inventory_data: dict):
    """Update or create site inventory"""
    inventory = db.query(SiteHardwareInventory).filter(SiteHardwareInventory.site_id == site_id).first()
    if inventory:
        inventory.inventory_data = inventory_data
        inventory.last_updated = datetime.utcnow()
    else:
        inventory = SiteHardwareInventory(site_id=site_id, inventory_data=inventory_data)
        db.add(inventory)
    db.commit()
    return inventory

def get_all_site_inventories(db: Session):
    """Get all site inventories"""
    inventories = db.query(SiteHardwareInventory).all()
    return {inv.site_id: inv.inventory_data for inv in inventories}

def add_optimization_history(db: Session, optimization_data: dict):
    """Add optimization run to history"""
    history = OptimizationHistory(**optimization_data)
    db.add(history)
    db.commit()
    return history

def get_optimization_history(db: Session, limit: int = 10):
    """Get recent optimization history"""
    history = db.query(OptimizationHistory).order_by(OptimizationHistory.timestamp.desc()).limit(limit).all()
    return [{
        "timestamp": h.timestamp.isoformat(),
        "total_revenue": h.total_revenue,
        "climate_savings": h.climate_savings,
        "timezone_optimization": h.timezone_optimization,
        "sla_performance": h.sla_performance,
        "claude_reasoning": h.claude_reasoning
    } for h in history]

def add_sla_commitment(db: Session, tier: str, power_requirement: int, duration_hours: int, optimal_site: str):
    """Add SLA commitment"""
    commitment = SLACommitment(
        tier=tier,
        power_requirement=power_requirement,
        duration_hours=duration_hours,
        optimal_site=optimal_site
    )
    db.add(commitment)
    db.commit()
    return commitment

def get_active_sla_commitments(db: Session):
    """Get all active SLA commitments aggregated by tier"""
    commitments = db.query(SLACommitment).filter(SLACommitment.active == True).all()
    aggregated = {"premium": 0, "standard": 0, "flexible": 0, "spot": 0}
    for commitment in commitments:
        if commitment.tier in aggregated:
            aggregated[commitment.tier] += commitment.power_requirement
    return aggregated

def add_pricing_data(db: Session, pricing: dict):
    """Add pricing data"""
    price = PricingData(**pricing)
    db.add(price)
    db.commit()
    return price

def get_latest_pricing(db: Session):
    """Get latest pricing data"""
    pricing = db.query(PricingData).order_by(PricingData.timestamp.desc()).first()
    if pricing:
        return {
            "energy_price": pricing.energy_price,
            "hash_price": pricing.hash_price,
            "token_price": pricing.token_price,
            "timestamp": pricing.timestamp.isoformat() if pricing.timestamp else datetime.utcnow().isoformat(),
            "source": pricing.source
        }
    return None

def get_site_allocation(db: Session, site_id: str):
    """Get latest allocation for a site"""
    allocation = db.query(SiteAllocation).filter(
        SiteAllocation.site_id == site_id
    ).order_by(SiteAllocation.timestamp.desc()).first()
    return allocation.allocation_data if allocation else None

def update_site_allocation(db: Session, site_id: str, allocation_data: dict):
    """Update site allocation"""
    allocation = SiteAllocation(site_id=site_id, allocation_data=allocation_data)
    db.add(allocation)
    db.commit()
    return allocation

# Initialize database on import
init_db()

