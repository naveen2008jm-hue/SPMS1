/**
 * AXIOM Weighted Scoring Algorithm
 * Calculates "Skill Application" score based on 4 pillars.
 */

export interface ScoringInputs {
  workOutput: number;    // 0-100: Quality of actual deliverables (Git commits, Jira tickets closed)
  managerObs: number;    // 0-100: Manager's subjective rating
  peerFeedback: number;  // 0-100: Peer reviews
  systemUsage: number;   // 0-100: Frequency/Depth of tool usage (e.g. Google Analytics sessions)
}

export interface ScoreResult {
  finalScore: number;
  grade: 'EXPERT' | 'PROFICIENT' | 'COMPETENT' | 'DEVELOPING' | 'NOVICE';
  breakdown: {
    workContribution: number;
    managerContribution: number;
    peerContribution: number;
    usageContribution: number;
  }
}

const WEIGHTS = {
  WORK: 0.40,
  MANAGER: 0.30,
  PEER: 0.20,
  USAGE: 0.10
};

export function calculateSkillScore(inputs: ScoringInputs): ScoreResult {
  // 1. Calculate weighted sum
  const workContrib = inputs.workOutput * WEIGHTS.WORK;
  const managerContrib = inputs.managerObs * WEIGHTS.MANAGER;
  const peerContrib = inputs.peerFeedback * WEIGHTS.PEER;
  const usageContrib = inputs.systemUsage * WEIGHTS.USAGE;

  const total = workContrib + managerContrib + peerContrib + usageContrib;
  const final = Math.round(total * 10) / 10; // Round to 1 decimal

  // 2. Determine Grade
  let grade: ScoreResult['grade'] = 'NOVICE';
  if (final >= 90) grade = 'EXPERT';
  else if (final >= 80) grade = 'PROFICIENT';
  else if (final >= 70) grade = 'COMPETENT';
  else if (final >= 60) grade = 'DEVELOPING';

  return {
    finalScore: final,
    grade,
    breakdown: {
      workContribution: workContrib,
      managerContribution: managerContrib,
      peerContribution: peerContrib,
      usageContribution: usageContrib
    }
  };
}
