# VehicleMind AI

A full-stack AI learning project built with React, TypeScript, Python, and FastAPI.

## Planned AI modules

- Natural-language vehicle search
- AI listing-description generator
- PDF document Q&A using RAG
- Vehicle recommendation scoring
- Vision-based vehicle condition analysis
- AI tool/function calling

## Local setup

### Backend

```powershell
cd backend
py -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API: http://localhost:8000
Docs: http://localhost:8000/docs

### Frontend

Open another PowerShell window:

```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Frontend: http://localhost:5173
