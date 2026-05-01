import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Result from '../Result.jsx';

describe('Result Component Tests', () => {
  
  // 1. Guard Clause Test
  test('returns null when output is empty or null', () => {
    const { container } = render(<Result output={null} />);
    expect(container.firstChild).toBeNull();

    const { container: emptyContainer } = render(<Result output={{}} />);
    expect(emptyContainer.firstChild).toBeNull();
  });

  // 2. Data Rendering Test
  test('renders all provided health data correctly', () => {
    const mockOutput = {
      name: "Mansi",
      age: "25",
      gender: "Female",
      status: "Healthy",
      tscore: "-1.0",
      fractureRisk: "Low",
      severity: "None",
      bmi: "22.5",
      Osteoporosis_Prediction: "No",
      diet: "Calcium rich",
      lifestyle: "Active",
      doctor: "General Physician",
      badge: "Gold"
    };

    render(<Result output={mockOutput} />);

    // Check if critical fields appear in the document
    expect(screen.getByText(/Prediction Result/i)).toBeInTheDocument();
    expect(screen.getByText("Mansi")).toBeInTheDocument();
    expect(screen.getByText("-1.0")).toBeInTheDocument();
    expect(screen.getByText("Calcium rich")).toBeInTheDocument();
  });

  // 3. Conditional Styling Test (Negative Result)
  test('applies green color when Osteoporosis Prediction is "No"', () => {
    const mockOutput = {
      Osteoporosis_Prediction: "No",
      name: "Mansi"
    };

    render(<Result output={mockOutput} />);
    
    const predictionValue = screen.getByText("No");
    
    // Check for the specific Tailwind class you used
    expect(predictionValue).toHaveClass('text-green-600');
    expect(predictionValue).toHaveClass('font-bold');
  });

  // 4. Conditional Styling Test (Positive Result)
  test('applies red color when Osteoporosis Prediction is "Yes"', () => {
    const mockOutput = {
      Osteoporosis_Prediction: "Yes",
      name: "Patient X"
    };

    render(<Result output={mockOutput} />);
    
    const predictionValue = screen.getByText("Yes");
    
    // Check for the specific Tailwind class you used
    expect(predictionValue).toHaveClass('text-red-600');
    expect(predictionValue).toHaveClass('font-bold');
  });

  // 5. Fallback Test
  test('displays "N/A" for missing optional fields', () => {
    const incompleteOutput = {
      name: "Mansi",
      age: "25"
      // Other fields missing
    };

    render(<Result output={incompleteOutput} />);
    
    // There are many fields, so let's check one that wasn't provided
    const missingValues = screen.getAllByText("N/A");
    expect(missingValues.length).toBeGreaterThan(0);
  });
});