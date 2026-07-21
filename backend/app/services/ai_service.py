import json
import os

from google import genai

from app.schemas.ai import (
    VehicleDescriptionRequest,
    VehicleDescriptionResponse,
)


MODEL_NAME = os.getenv(
    "GEMINI_MODEL",
    "gemini-3.5-flash",
)


def generate_vehicle_description(
    vehicle: VehicleDescriptionRequest,
) -> VehicleDescriptionResponse:
    client = genai.Client()

    vehicle_json = json.dumps(
        vehicle.model_dump(),
        indent=2,
        ensure_ascii=False,
    )

    prompt = f"""
You are a professional automotive listing writer.

Create a vehicle listing using only the verified data provided below.

Verified vehicle data:
{vehicle_json}

Rules:
- Never invent features or specifications.
- Never invent ownership history.
- Never invent accident history.
- Never invent battery range.
- Never invent warranty information.
- Never invent performance information.
- Never claim the vehicle is in excellent condition unless that information
  is explicitly supplied.
- Use a professional and clear tone.
- The full description must contain approximately 80 to 140 words.
- Include three to six factual highlights.
"""

    interaction = client.interactions.create(
        model=MODEL_NAME,
        input=prompt,
        response_format={
            "type": "text",
            "mime_type": "application/json",
            "schema": VehicleDescriptionResponse.model_json_schema(),
        },
    )

    if not interaction.output_text:
        raise RuntimeError(
            "Gemini returned an empty response."
        )

    return VehicleDescriptionResponse.model_validate_json(
        interaction.output_text
    )