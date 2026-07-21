import { useState } from "react";

import {
  generateVehicleDescription,
} from "../api/aiApi";

export default function VehicleDescriptionForm() {
  const [make, setMake] = useState("Tesla");
  const [model, setModel] = useState("Model 3");
  const [year, setYear] = useState(2024);
  const [price, setPrice] = useState(42000);
  const [mileage, setMileage] = useState(12000);
  const [fuelType, setFuelType] = useState("Electric");
  const [color, setColor] = useState("Pearl White");

  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateDescription = async () => {
    try {
      setIsGenerating(true);
      setError("");
      setDescription("");

      const result = await generateVehicleDescription({
        make,
        model,
        year,
        price,
        mileage,
        fuel_type: fuelType,
        color,
        features: [
          "Autopilot",
          "Heated seats",
          "Panoramic roof",
        ],
      });

      setDescription(result.description);
    } catch (requestError) {
      console.error(
        "Description generation failed:",
        requestError,
      );

      setError(
        "Unable to generate the vehicle description.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="vehicle-form">
      <h2>Generate vehicle description</h2>

      <label>
        Make
        <input
          value={make}
          onChange={(event) =>
            setMake(event.target.value)
          }
        />
      </label>

      <label>
        Model
        <input
          value={model}
          onChange={(event) =>
            setModel(event.target.value)
          }
        />
      </label>

      <label>
        Year
        <input
          type="number"
          value={year}
          onChange={(event) =>
            setYear(Number(event.target.value))
          }
        />
      </label>

      <label>
        Price
        <input
          type="number"
          value={price}
          onChange={(event) =>
            setPrice(Number(event.target.value))
          }
        />
      </label>

      <label>
        Mileage
        <input
          type="number"
          value={mileage}
          onChange={(event) =>
            setMileage(Number(event.target.value))
          }
        />
      </label>

      <label>
        Fuel type
        <input
          value={fuelType}
          onChange={(event) =>
            setFuelType(event.target.value)
          }
        />
      </label>

      <label>
        Color
        <input
          value={color}
          onChange={(event) =>
            setColor(event.target.value)
          }
        />
      </label>

      <button
        type="button"
        onClick={handleGenerateDescription}
        disabled={isGenerating}
      >
        {isGenerating
          ? "Generating..."
          : "Generate with Gemini"}
      </button>

      {error && (
        <p className="error">{error}</p>
      )}

      {description && (
        <section className="result">
          <h3>Generated description</h3>
          <p>{description}</p>
        </section>
      )}
    </section>
  );
}