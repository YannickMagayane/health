/**
 * Simulates a basic AI response based on keywords in the user's message.
 * @param {string} userMessage The message from the user.
 * @returns {string} A predefined AI response.
 */
export const getAiResponse = (userMessage) => {
  const message = userMessage.toLowerCase();

  if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
    return "Bonjour ! Comment puis-je vous aider aujourd'hui concernant votre santé ?";
  }
  if (message.includes('fièvre') || message.includes('temperature')) {
    return "En cas de fièvre, il est important de surveiller votre température et de vous reposer. Buvez beaucoup de liquides. Si la fièvre est élevée (plus de 38.5°C), persistante, ou accompagnée d'autres symptômes sévères, consultez un médecin.";
  }
  if (message.includes('mal de tête') || message.includes('céphalée') || message.includes('migraine')) {
    return "Pour un mal de tête léger, reposez-vous dans un endroit calme, hydratez-vous et évitez les écrans. Un analgésique léger peut aider. Si la douleur est sévère, soudaine, inhabituelle, ou s'accompagne de troubles de la vision ou de la parole, un avis médical urgent est recommandé.";
  }
  if (message.includes('stress') || message.includes('anxiété') || message.includes('nerveux') || message.includes('angoissé')) {
    return "La gestion du stress et de l'anxiété est cruciale. Des techniques comme la respiration profonde, la méditation, une activité physique régulière, et un sommeil suffisant peuvent être bénéfiques. Si cela devient envahissant, parlez-en à un professionnel de santé.";
  }
  if (message.includes('fatigue') || message.includes('épuisé') || message.includes('fatigué')) {
    return "La fatigue peut avoir de nombreuses causes. Assurez-vous de dormir suffisamment, d'avoir une alimentation équilibrée et de gérer votre stress. Si la fatigue est persistante et inexpliquée, il est conseillé de consulter un médecin pour écarter toute cause sous-jacente.";
  }
  if (message.includes('toux') || message.includes('tousse')) {
    return "Une toux légère peut être apaisée avec du repos et de l'hydratation (eau, tisanes). Si la toux persiste plus d'une semaine, s'accompagne de fièvre, de difficultés respiratoires ou de douleurs thoraciques, consultez un médecin.";
  }
  if (message.includes('mal de gorge')) {
    return "Pour un mal de gorge, essayez des pastilles apaisantes, des gargarismes à l'eau salée tiède et buvez des boissons chaudes. Si la douleur est intense, que vous avez du mal à avaler ou de la fièvre, un examen médical est pertinent.";
  }
   if (message.includes('remercie') || message.includes('merci')) {
    return "De rien ! N'hésitez pas si vous avez d'autres questions générales sur la santé.";
  }

  // Default response
  return "Je suis une IA d'assistance médicale basique et mes conseils sont d'ordre général. Pour des questions complexes, un diagnostic précis ou en cas d'urgence, veuillez consulter un professionnel de santé qualifié.";
};
