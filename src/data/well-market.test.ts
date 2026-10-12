import { describe, expect, it } from 'vitest';
import { commercialTerms, filterFaqs } from './well-market';

describe('Well Market commercial proposal', () => {
  it('requires no initial investment from the condominium', () => expect(commercialTerms.initialInvestment).toBe(0));
  it('proposes a 90-day pilot', () => expect(commercialTerms.pilotDays).toBe(90));
  it('proposes 24-hour availability', () => expect(commercialTerms.availabilityHours).toBe(24));
  it('uses 5 percent only as a reference', () => expect(commercialTerms.participationReferencePercent).toBe(5));
  it('does not guarantee a participation return', () => expect(commercialTerms.participationGuaranteed).toBe(false));
  it('limits initial region to the five named cities', () => expect(commercialTerms.cities).toEqual(['Vitória', 'Vila Velha', 'Serra', 'Cariacica', 'Viana']));
  it('assigns energy costs to the operator', () => expect(commercialTerms.energyPaidBy).toBe('operator'));
  it('assigns merchandise losses to the operator', () => expect(commercialTerms.merchandiseLossPaidBy).toBe('operator'));
  it('requires a site assessment before installation', () => expect(commercialTerms.installationRequiresAssessment).toBe(true));
  it('searches without requiring accents', () => expect(filterFaqs('Todas as dúvidas', 'energia').length).toBeGreaterThan(0));
  it('restricts search to the selected topic', () => expect(filterFaqs('Segurança e privacidade', 'energia')).toEqual([]));
  it('returns no results for an unmatched search', () => expect(filterFaqs('Todas as dúvidas', 'zzznotfound')).toEqual([]));
});