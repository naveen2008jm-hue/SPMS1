import { type ScoreResult } from './scoring';

export interface SkillGap {
  skillName: string;
  requiredScore: number;
  actualScore: number;
  gap: number;
  isCritical: boolean;
  status: 'SAFE' | 'AT_RISK' | 'CRITICAL';
}

export function detectGap(skillName: string, requiredScore: number, currentAssessment: ScoreResult): SkillGap {
  const actual = currentAssessment.finalScore;
  const gap = requiredScore - actual;
  
  let status: SkillGap['status'] = 'SAFE';
  if (gap > 20) status = 'CRITICAL';
  else if (gap > 0) status = 'AT_RISK';

  return {
    skillName,
    requiredScore,
    actualScore: actual,
    gap: Math.max(0, gap),
    isCritical: status === 'CRITICAL',
    status
  };
}
