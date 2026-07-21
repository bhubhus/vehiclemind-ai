import os

from fastapi import APIRouter, HTTPException
from google import genai
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError(
        "GEMINI_API_KEY is missing from the backend .env file"
    )

client = genai.Client(api_key=api_key)


class VehicleDescriptionRequest(BaseModel):
    make: str
    model: str
    year: int
    price: float
    mileage: int | None = None
    fuel_type: str | None = None
    color: str | None = None
    features: list[str] = []


class VehicleDescriptionResponse(BaseModel):
    description: str


@router.post(
    "/generate-description",
    response_model=VehicleDescriptionResponse,
)
def generate_vehicle_description(
    vehicle: VehicleDescriptionRequest,
):
    features_text = (
        ", ".join(vehicle.features)
        if vehicle.features
        else "No additional features provided"
    )

    prompt = f"""
Write a professional vehicle sales listing description.

Vehicle information:
Make: {vehicle.make}
Model: {vehicle.model}
Year: {vehicle.year}
Price: {vehicle.price}
Mileage: {vehicle.mileage or "Not provided"}
Fuel type: {vehicle.fuel_type or "Not provided"}
Color: {vehicle.color or "Not provided"}
Features: {features_text}

Requirements:
- Write 2 short paragraphs.
- Use a professional and attractive tone.
- Do not invent specifications.
- Mention only the information provided.
- Do not use markdown headings.
- Do not include the price unless it improves the description.
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=prompt,
        )

        if not response.text:
            raise HTTPException(
                status_code=502,
                detail="Gemini returned an empty response",
            )

        return {
            "description": response.text.strip(),
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Gemini request failed: {str(error)}",
        )