import React, { useState } from "react";
import { Controller } from "react-hook-form";
import Input from "../input";
import { Plus, X } from "lucide-react";

type Property = {
  label: string;
  values: string[];
};

type CustomPropertiesProps = {
  control: any;
  errors: any;
};

const CustomProperties = ({ control, errors }: CustomPropertiesProps) => {
  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <Controller
        name="customProperties"
        control={control}
        defaultValue={[]}
        render={({ field }) => {
          const properties: Property[] = field.value;

          const addProperty = () => {
            if (!newLabel.trim()) return;
            const updated = [...properties, { label: newLabel, values: [] }];
            field.onChange(updated);
            setNewLabel("");
          };

          const addValue = (index: number) => {
            if (!newValue.trim()) return;
            const updated = [...properties];
            updated[index].values.push(newValue);
            field.onChange(updated);
            setNewValue("");
          };

          const removeProperty = (index: number) => {
            const updated = properties.filter((_, i) => i !== index);
            field.onChange(updated);
          };

          return (
            <div className="mt-2">
              <label className="block font-semibold text-gray-300 mb-1">
                Custom Properties
              </label>

              <div className="flex flex-col gap-3">
                {properties.map((property, index) => (
                  <div
                    key={index}
                    className="border border-gray-700 p-3 rounded-lg bg-gray-900"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">
                        {property.label}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeProperty(index)}
                      >
                        <X size={18} className="text-red-500" />
                      </button>
                    </div>

                    {/* Add Values */}
                    <div className="flex items-center mt-2 gap-2">
                      <input
                        type="text"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        className="border outline-none border-gray-700 bg-gray-800 p-2 rounded-md text-white w-full"
                        placeholder="Enter value..."
                      />
                      <button
                        type="button"
                        className="px-3 py-1 bg-blue-500 text-white rounded-md"
                        onClick={() => addValue(index)}
                      >
                        Add
                      </button>
                    </div>

                    {/* Show Values */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {property.values.map((value, i) => (
                        <span
                          key={`${index}-${i}`}
                          className="px-2 py-1 bg-gray-700 text-white rounded-md text-sm"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Add new Property */}
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    placeholder="Enter property label (e.g., Material, Warranty)"
                    value={newLabel}
                    onChange={(e: any) => setNewLabel(e.target.value)}
                  />
                  <button
                    className="px-3 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2"
                    onClick={addProperty}
                  >
                    <Plus size={20} /> Add
                  </button>
                </div>
              </div>

              {errors.customProperties && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.customProperties.message as string}
                </p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default CustomProperties;
