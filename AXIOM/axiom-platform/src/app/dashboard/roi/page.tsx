"use client";

import React, { useState, useEffect } from 'react';
import styles from './roi.module.css';
import { calculateRoi, type RoiInputs, type RoiResult } from '@/lib/logic/roi';

export default function RoiPage() {
  const [inputs, setInputs] = useState<RoiInputs>({
    programCost: 15000,
    productivityGainValue: 45000,
    adSpendSaved: 12000
  });

  const [result, setResult] = useState<RoiResult>({
    roiPercentage: 0,
    netBenefit: 0,
    isPositive: false
  });

  useEffect(() => {
    setResult(calculateRoi(inputs));
  }, [inputs]);

  const handleInputChange = (field: keyof RoiInputs, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: Number(value)
    }));
  };

  const totalBenefit = inputs.productivityGainValue + inputs.adSpendSaved;
  const maxBarHeight = Math.max(inputs.programCost, totalBenefit) * 1.2;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>ROI Engine</h1>
        <p className={styles.subtitle}>Calculate the financial impact of your skill development programs.</p>
      </header>

      <div className={styles.grid}>
        {/* Calculator Inputs */}
        <div className={`glass-panel ${styles.card}`}>
          <div className={styles.cardTitle}>
            Program Parameters
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Training Program Cost</label>
            <div className={styles.inputWrapper}>
              <span className={styles.currencySymbol}>$</span>
              <input 
                type="number" 
                className={styles.input} 
                value={inputs.programCost}
                onChange={(e) => handleInputChange('programCost', e.target.value)}
              />
            </div>
            <div className={styles.sliderContainer}>
              <input 
                type="range" 
                className={styles.slider} 
                min="0" max="100000" step="1000"
                value={inputs.programCost} 
                onChange={(e) => handleInputChange('programCost', e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Est. Value of Productivity Gain</label>
            <div className={styles.inputWrapper}>
              <span className={styles.currencySymbol}>$</span>
              <input 
                type="number" 
                className={styles.input} 
                value={inputs.productivityGainValue}
                onChange={(e) => handleInputChange('productivityGainValue', e.target.value)}
              />
            </div>
            <div className={styles.sliderContainer}>
              <input 
                type="range" 
                className={styles.slider} 
                min="0" max="200000" step="1000"
                value={inputs.productivityGainValue} 
                onChange={(e) => handleInputChange('productivityGainValue', e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Recruitment Costs Saved</label>
            <div className={styles.inputWrapper}>
              <span className={styles.currencySymbol}>$</span>
              <input 
                type="number" 
                className={styles.input} 
                value={inputs.adSpendSaved}
                onChange={(e) => handleInputChange('adSpendSaved', e.target.value)}
              />
            </div>
             <div className={styles.sliderContainer}>
              <input 
                type="range" 
                className={styles.slider} 
                min="0" max="50000" step="1000"
                value={inputs.adSpendSaved} 
                onChange={(e) => handleInputChange('adSpendSaved', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Results Visualization */}
        <div className={`glass-panel ${styles.card}`}>
          <div className={styles.cardTitle}>
            Projected Return
             <span style={{ 
               fontSize: '14px', 
               padding: '4px 8px', 
               backgroundColor: result.isPositive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
               color: result.isPositive ? '#10b981' : '#ef4444',
               borderRadius: '4px'
             }}>
               {result.isPositive ? 'POSITIVE ROI' : 'NEGATIVE ROI'}
             </span>
          </div>

          <div className={styles.resultBox} style={{ borderColor: result.isPositive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Return on Investment</div>
            <div className={styles.roiValue} style={{ color: result.isPositive ? '#10b981' : '#ef4444' }}>
              {result.roiPercentage}%
            </div>
            <div className={styles.netBenefit}>
              Net Benefit: <span style={{ color: '#fff', fontWeight: 600 }}>${result.netBenefit.toLocaleString()}</span>
            </div>
          </div>

          {/* Simple CSS Bar Chart */}
          <div className={styles.chartContainer}>
            <div className={styles.barGroup}>
               <div className={styles.bar} style={{ 
                 height: `${(inputs.programCost / maxBarHeight) * 200}px`, 
                 background: 'rgba(255, 255, 255, 0.2)' 
               }}></div>
               <div className={styles.barLabel}>Cost</div>
            </div>
            
            <div className={styles.barGroup}>
               <div className={styles.bar} style={{ 
                 height: `${(totalBenefit / maxBarHeight) * 200}px`, 
                 background: result.isPositive ? 'var(--primary)' : 'rgba(255,255,255,0.5)'
               }}></div>
               <div className={styles.barLabel}>Benefit</div>
            </div>
          </div>
          
          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
            For every $1 spent, you get <span style={{ color: '#fff' }}>${((totalBenefit / inputs.programCost) || 0).toFixed(2)}</span> back in value.
          </p>
        </div>
      </div>
    </div>
  );
}
