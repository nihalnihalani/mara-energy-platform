# Contributing to SLA-Smart Energy Arbitrage Platform

Thank you for your interest in contributing to the SLA-Smart Energy Arbitrage Platform! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a new branch for your changes
4. Make your changes and test thoroughly
5. Submit a pull request

## Development Setup

### Prerequisites

- Python 3.9 or higher
- Git
- pip (Python package manager)

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/mara-energy-platform.git
cd mara-energy-platform

# Install dependencies
pip install -r requirements.txt

# Copy and configure environment
cp config.env.example config.env
# Edit config.env with your settings

# Run the application
python main.py
```

### Environment Setup

Create a `config.env` file with:

```bash
CLAUDE_API_KEY=your_test_api_key
DATABASE_URL=sqlite:///./test.db
ALLOWED_ORIGINS=http://localhost:8000
LOG_LEVEL=DEBUG
```

## Making Changes

### Branch Naming

Use descriptive branch names:

- `feature/add-new-endpoint` - New features
- `fix/resolve-database-issue` - Bug fixes
- `docs/update-readme` - Documentation updates
- `refactor/optimize-queries` - Code refactoring
- `test/add-integration-tests` - Test additions

### Commit Messages

Follow the conventional commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```bash
feat(api): add new hardware allocation endpoint

Add endpoint to manually allocate hardware resources to specific sites.
Includes validation and database persistence.

Closes #123
```

```bash
fix(database): resolve connection pool exhaustion

Implemented connection pooling limits and proper session cleanup
to prevent database connection exhaustion under high load.

Fixes #456
```

## Submitting Changes

### Pull Request Process

1. **Update Documentation**: Ensure README.md and relevant docs are updated
2. **Add Tests**: Include tests for new features or bug fixes
3. **Run Tests**: Verify all tests pass locally
4. **Update Changelog**: Add entry to CHANGELOG.md
5. **Create Pull Request**: Provide clear description of changes

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] No new warnings introduced
```

## Coding Standards

### Python Style Guide

Follow PEP 8 with these specifics:

```python
# Good
def calculate_site_revenue(
    site_id: str,
    allocation: Dict,
    prices: Dict
) -> float:
    """Calculate revenue for a specific site.
    
    Args:
        site_id: Unique site identifier
        allocation: Resource allocation dictionary
        prices: Current pricing data
        
    Returns:
        Total revenue in USD
    """
    # Implementation
    pass

# Bad
def calc_rev(s, a, p):
    return 0
```

### Key Principles

1. **Type Hints**: Use type hints for all function signatures
2. **Docstrings**: Document all public functions and classes
3. **Function Length**: Keep functions under 50 lines
4. **Naming**: Use descriptive variable names
5. **Comments**: Explain why, not what
6. **Error Handling**: Use try-except with specific exceptions

### Code Organization

```
mara-energy-platform/
├── api/              # Vercel serverless functions
├── static/           # Frontend files
│   ├── css/         # Stylesheets
│   ├── js/          # JavaScript files
│   └── index.html   # Main HTML
├── tests/           # Test files
├── main.py          # FastAPI application
├── database.py      # Database models
└── config.env       # Environment config
```

## Testing Guidelines

### Writing Tests

```python
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check():
    """Test health check endpoint."""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_initialize_system():
    """Test system initialization."""
    response = client.post("/api/initialize")
    assert response.status_code == 200
    assert response.json()["status"] == "success"
```

### Running Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=. --cov-report=html

# Run specific test file
pytest tests/test_api.py

# Run with verbose output
pytest -v
```

## Documentation

### Code Documentation

- Add docstrings to all public functions
- Include type hints
- Document parameters and return values
- Add usage examples for complex functions

### API Documentation

When adding new endpoints:

1. Update OpenAPI/Swagger docs (FastAPI auto-generates)
2. Add example requests/responses to README.md
3. Document error codes and responses

### README Updates

Keep README.md current with:

- New features
- API changes
- Configuration options
- Deployment instructions

## Questions?

If you have questions:

1. Check existing issues and discussions
2. Read the documentation thoroughly
3. Ask in GitHub Discussions
4. Create a new issue with the "question" label

## Recognition

Contributors will be recognized in:

- README.md contributors section
- CHANGELOG.md for significant contributions
- GitHub contributors page

Thank you for contributing to the SLA-Smart Energy Arbitrage Platform!

