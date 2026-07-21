from pydantic import BaseModel, Field


class VehicleDescriptionRequest(BaseModel):
    make: str = Field(min_length=1, max_length=100)
    model: str = Field(min_length=1, max_length=100)
    year: int = Field(ge=1900, le=2100)
    price: float = Field(gt=0)
    kilometres: int = Field(ge=0)
    fuel_type: str = Field(min_length=1, max_length=50)
    body_type: str | None = None
    seats: int | None = Field(default=None, ge=1, le=20)
    features: list[str] = Field(default_factory=list)


class VehicleDescriptionResponse(BaseModel):
    title: str = Field(
        description="A concise professional vehicle listing title."
    )

    short_description: str = Field(
        description="A one-sentence summary of the vehicle."
    )

    full_description: str = Field(
        description="A professional description containing 80 to 140 words."
    )

    highlights: list[str] = Field(
        description="Three to six factual vehicle highlights."
    )