"use client"
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const dietaryOptions = ["Vegan", "Vegetarian", "Keto", "Gluten-Free", "Halal", "Paleo", "High-Protein"];
const mealPreferences = ["No Nuts", "No Dairy", "No Onions", "Spicy", "Extra Cheese", "Medium Portion"];

export default function MealPreferences() {
    const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
    const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

    const toggleSelection = (option: string, setFunction: React.Dispatch<React.SetStateAction<string[]>>, currentState: string[]) => {
        setFunction(
            currentState.includes(option)
                ? currentState.filter((item) => item !== option)
                : [...currentState, option]
        );
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <Card className="mb-6">
                <CardContent className="p-4">
                    <h2 className="text-xl font-semibold mb-3">Select Dietary Preferences</h2>
                    <div className="grid grid-cols-2 gap-2">
                        {dietaryOptions.map((option) => (
                            <label key={option} className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                    checked={selectedDietary.includes(option)}
                                    onCheckedChange={() => toggleSelection(option, setSelectedDietary, selectedDietary)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-6">
                <CardContent className="p-4">
                    <h2 className="text-xl font-semibold mb-3">Meal Customization</h2>
                    <div className="grid grid-cols-2 gap-2">
                        {mealPreferences.map((option) => (
                            <label key={option} className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                    checked={selectedPreferences.includes(option)}
                                    onCheckedChange={() => toggleSelection(option, setSelectedPreferences, selectedPreferences)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Button className="w-full">Save Preferences</Button>
        </div>
    );
}
