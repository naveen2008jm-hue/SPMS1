/**
 * AXIOM Financial ROI Engine
 * Calculates the return on investment for L&D programs.
 */

export interface RoiInputs {
  programCost: number;        // Total spend on training/tools
  productivityGainValue: number; // Estimated $ value of efficiency increase
  adSpendSaved: number;       // Recruitment costs avoided by internal promotion
}

export interface RoiResult {
  roiPercentage: number;
  netBenefit: number;
  isPositive: boolean;
}

export function calculateRoi(inputs: RoiInputs): RoiResult {
  const { programCost, productivityGainValue, adSpendSaved } = inputs;
  
  if (programCost === 0) {
    return { roiPercentage: 0, netBenefit: 0, isPositive: false };
  }

  const totalBenefits = productivityGainValue + adSpendSaved;
  const netBenefit = totalBenefits - programCost;
  
  const roiRaw = (netBenefit / programCost) * 100;
  
  return {
    roiPercentage: Math.round(roiRaw * 100) / 100,
    netBenefit,
    isPositive: netBenefit > 0
  };
}
