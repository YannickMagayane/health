/**
 * Suggests a medical specialty based on symptom keywords.
 * This is a very basic implementation and should not be used for real medical advice.
 *
 * @param {string} symptomName The name of the symptom.
 * @returns {string} A suggested medical specialty.
 */
export const getSpecialtySuggestion = (symptomName) => {
  if (typeof symptomName !== 'string' || !symptomName.trim()) {
    return 'Médecin généraliste (veuillez préciser le symptôme)';
  }

  const lowerSymptom = symptomName.toLowerCase();

  if (lowerSymptom.includes('gorge') || lowerSymptom.includes('oreille') || lowerSymptom.includes('nez') || lowerSymptom.includes('sinus')) {
    return 'ORL (Oto-rhino-laryngologiste)';
  }
  if (lowerSymptom.includes('fièvre') || lowerSymptom.includes('fatigue générale') || lowerSymptom.includes('courbature')) {
    return 'Médecin généraliste';
  }
  if (lowerSymptom.includes('douleur poitrine') || lowerSymptom.includes('palpitation') || lowerSymptom.includes('essoufflement effort')) {
    return 'Cardiologue (Consultez en URGENCE si la douleur est sévère ou nouvelle)';
  }
  if (lowerSymptom.includes('tête') || lowerSymptom.includes('migraine') || lowerSymptom.includes('vertige')) {
    return 'Neurologue ou Médecin généraliste';
  }
  if (lowerSymptom.includes('estomac') || lowerSymptom.includes('brûlure d\'estomac') || lowerSymptom.includes('digestion difficile') || lowerSymptom.includes('nausée')) {
    return 'Gastro-entérologue';
  }
  if (lowerSymptom.includes('peau') || lowerSymptom.includes('éruption') || lowerSymptom.includes('démangeaison') || lowerSymptom.includes('bouton')) {
    return 'Dermatologue';
  }
  if (lowerSymptom.includes('articulation') || lowerSymptom.includes('dos') || lowerSymptom.includes('genou') || lowerSymptom.includes('muscle')) {
    return 'Rhumatologue ou Médecin du sport';
  }
  if (lowerSymptom.includes('règle douloureuse') || lowerSymptom.includes('menstruation anormale')) {
    return 'Gynécologue';
  }
  if (lowerSymptom.includes('uriner') || lowerSymptom.includes('brûlure urinaire')) {
    return 'Urologue ou Médecin généraliste';
  }
  if (lowerSymptom.includes('anxiété') || lowerSymptom.includes('stress') || lowerSymptom.includes('déprime')) {
    return 'Psychiatre ou Psychologue';
  }

  return 'Médecin généraliste (parlez-en à votre médecin pour une orientation précise)';
};
