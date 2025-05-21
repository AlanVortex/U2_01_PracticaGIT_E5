import React, { useState } from "react";

const HARDCODED_CARS = [
    { id: 1, brand: { name: "Toyota" }, model: "Corolla" },
    { id: 2, brand: { name: "Honda" }, model: "Civic" },
    { id: 3, brand: { name: "Ford" }, model: "Focus" },
];

const CarCard = ({ brand, model }) => (
    <div
        style={{
            width: 160,
            height: 160,
            border: "1px solid #ddd",
            borderRadius: 10,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            margin: 12,
            padding: 12,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            background: "#fff",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <span
            style={{
                position: "absolute",
                top: 10,
                left: 14,
                fontWeight: "bold",
                color: "#aaa",
                fontSize: 13,
                marginBottom: 0,
            }}
        >
            {brand}
        </span>
        <div
            style={{
                fontSize: 18,
                fontWeight: 500,
                color: "#222",
                marginTop: 30,
            }}
        >
            {model}
        </div>
    </div>
);

function Autos() {
    const [cars] = useState(HARDCODED_CARS);

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                background: "#f5f6fa",
                minHeight: "100vh",
                padding: 24,
            }}
        >
            {cars.map((car) => (
                <CarCard
                    key={car.id}
                    brand={car.brand?.name || "Sin marca"}
                    model={car.model}
                />
            ))}
        </div>
    );
}

export default Autos;
