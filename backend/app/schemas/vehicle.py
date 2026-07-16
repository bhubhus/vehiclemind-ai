from pydantic import BaseModel, ConfigDict, Field


class VehicleBase(BaseModel):
    make: str = Field(min_length=1, max_length=100)
    model: str = Field(min_length=1, max_length=100)
    year: int = Field(ge=1900, le=2100)
    price: float = Field(gt=0)
    kilometres: int = Field(ge=0)
    fuel_type: str = Field(min_length=1, max_length=50)
    body_type: str | None = None
    seats: int | None = Field(default=None, ge=1, le=20)
    description: str | None = None


class VehicleCreate(VehicleBase):
    pass


class VehicleUpdate(BaseModel):
    make: str | None = None
    model: str | None = None
    year: int | None = Field(default=None, ge=1900, le=2100)
    price: float | None = Field(default=None, gt=0)
    kilometres: int | None = Field(default=None, ge=0)
    fuel_type: str | None = None
    body_type: str | None = None
    seats: int | None = Field(default=None, ge=1, le=20)
    description: str | None = None


class VehicleResponse(VehicleBase):
    id: int

    model_config = ConfigDict(from_attributes=True)