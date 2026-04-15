export const DOMAINS = {
  executing: "Execution",
  influencing: "Influence",
  relationship: "Relationship Building",
  thinking: "Strategic Thinking",
};

export const TALENTS: Record<string, { domain: string; fr: string; essence: string; shadow: string }> = {
  Achiever:          { domain: "executing",     fr: "Réalisateur",      essence: "Énergie et drive pour accomplir. Toujours une case à cocher.",                         shadow: "Peut ne jamais se sentir assez accompli, difficulté à s'arrêter." },
  Arranger:          { domain: "executing",     fr: "Organisateur",     essence: "Orchestre les ressources pour la configuration optimale.",                              shadow: "Peut réorganiser sans fin, déstabiliser ce qui fonctionne déjà." },
  Belief:            { domain: "executing",     fr: "Conviction",       essence: "Valeurs fondamentales non-négociables qui guident toutes les décisions.",               shadow: "Peut être perçu comme rigide ou dogmatique." },
  Consistency:       { domain: "executing",     fr: "Équité",           essence: "Traite tout le monde avec les mêmes règles. Justice et équilibre.",                    shadow: "Peut manquer de flexibilité dans les situations uniques." },
  Deliberative:      { domain: "executing",     fr: "Prudence",         essence: "Anticipe les risques, prend des décisions soigneusement pesées.",                       shadow: "Peut sembler lent ou frileux aux yeux des autres." },
  Discipline:        { domain: "executing",     fr: "Discipline",       essence: "Structure, routines, précision. Met l'ordre dans le chaos.",                           shadow: "Peut être rigide face à l'imprévu, frustré par le désordre." },
  Focus:             { domain: "executing",     fr: "Focalisation",     essence: "Fixe le cap et élimine les distractions. Productivité maximale.",                      shadow: "Peut négliger ce qui sort de sa trajectoire, impatient face aux digressions." },
  Responsibility:    { domain: "executing",     fr: "Responsabilité",   essence: "Ownership total. Ce qu'il prend en charge est tenu.",                                  shadow: "Peut prendre trop sur lui, difficulté à déléguer vraiment." },
  Restorative:       { domain: "executing",     fr: "Restaurateur",     essence: "Détecte et résout les problèmes avec énergie naturelle.",                              shadow: "Peut chercher des problèmes là où il n'y en a pas." },
  Activator:         { domain: "influencing",   fr: "Activateur",       essence: "Transforme la pensée en action. Impatient de démarrer.",                               shadow: "Peut agir avant d'avoir suffisamment réfléchi." },
  Command:           { domain: "influencing",   fr: "Autorité",         essence: "Prend le contrôle, dit ce que les autres pensent tout bas.",                           shadow: "Peut être perçu comme autoritaire ou intimidant." },
  Communication:     { domain: "influencing",   fr: "Communication",    essence: "Met les idées en mots et en histoires qui captivent.",                                  shadow: "Peut dominer les conversations, parler pour parler." },
  Competition:       { domain: "influencing",   fr: "Compétition",      essence: "Se mesure aux autres, veut gagner. Le classement comme moteur.",                       shadow: "Peut être mauvais perdant, désengagé si pas de compétition." },
  Maximizer:         { domain: "influencing",   fr: "Maximiseur",       essence: "Transforme le bien en excellent. Valorise l'élite.",                                   shadow: "Peut négliger ce qui est faible au profit de ce qui est fort." },
  Self_Assurance:    { domain: "influencing",   fr: "Assurance",        essence: "Confiance interne inébranlable. Sait qu'il peut y arriver.",                           shadow: "Peut sembler arrogant, difficile à conseiller." },
  Significance:      { domain: "influencing",   fr: "Importance",       essence: "Veut avoir un impact, être reconnu pour sa contribution unique.",                      shadow: "Peut avoir besoin de validation externe, d'être vu." },
  Woo:               { domain: "influencing",   fr: "Séduction",        essence: "Gagne instantanément les inconnus. Réseau naturel.",                                   shadow: "Peut être perçu comme superficiel, difficulté avec la profondeur." },
  Adaptability:      { domain: "relationship",  fr: "Adaptabilité",     essence: "Vit dans le présent, s'ajuste au flux. À l'aise dans l'incertitude.",                 shadow: "Peut manquer de vision long terme, résistance à la planification." },
  Connectedness:     { domain: "relationship",  fr: "Connexion",        essence: "Voit les liens entre toutes choses. Sens profond du but commun.",                      shadow: "Peut sembler mystique ou trop abstrait pour les pragmatiques." },
  Developer:         { domain: "relationship",  fr: "Développeur",      essence: "Voit le potentiel des autres et prend plaisir à les faire grandir.",                   shadow: "Peut trop investir dans des gens qui ne veulent pas grandir." },
  Empathy:           { domain: "relationship",  fr: "Empathie",         essence: "Ressent les émotions des autres. Crée des espaces de sécurité.",                      shadow: "Peut absorber les émotions négatives, s'épuiser." },
  Harmony:           { domain: "relationship",  fr: "Harmonie",         essence: "Cherche le consensus, évite les conflits inutiles.",                                   shadow: "Peut éviter les confrontations nécessaires." },
  Includer:          { domain: "relationship",  fr: "Inclusion",        essence: "Remarque qui est exclu et les intègre. Tous ont leur place.",                          shadow: "Peut diluer la qualité en voulant tout inclure." },
  Individualization: { domain: "relationship",  fr: "Individualisation", essence: "Perçoit ce qui rend chaque personne unique. Management sur-mesure.",                 shadow: "Peut avoir du mal à traiter les gens de façon uniforme." },
  Positivity:        { domain: "relationship",  fr: "Positivité",       essence: "Énergie contagieuse, enthousiasme naturel. Élève les autres.",                        shadow: "Peut sembler naïf, difficulté à nommer les problèmes." },
  Relator:           { domain: "relationship",  fr: "Relation",         essence: "Profondeur relationnelle avec un cercle proche. Loyauté totale.",                     shadow: "Peut être perçu comme fermé aux nouveaux, difficile d'accès." },
  Analytical:        { domain: "thinking",      fr: "Analytique",       essence: "Cherche les preuves, questionne les hypothèses. Rigueur intellectuelle.",              shadow: "Peut bloquer sur l'analyse, demander trop de données avant d'agir." },
  Context:           { domain: "thinking",      fr: "Contexte",         essence: "Comprend le présent par le passé. Historique comme boussole.",                        shadow: "Peut être trop ancré dans le passé, résistant au changement." },
  Futuristic:        { domain: "thinking",      fr: "Futuriste",        essence: "Voit le futur avec précision et inspire les autres vers cette vision.",                shadow: "Peut être impatient du présent, perçu comme tête dans les nuages." },
  Ideation:          { domain: "thinking",      fr: "Idéation",         essence: "Génère des idées en permanence. Voit des connexions inattendues.",                    shadow: "Peut rester dans les idées sans passer à l'exécution." },
  Input:             { domain: "thinking",      fr: "Veille",           essence: "Collecte informations et ressources. Curiosité insatiable.",                           shadow: "Peut accumuler sans utiliser, difficulté à jeter." },
  Intellection:      { domain: "thinking",      fr: "Réflexion",        essence: "Aime penser, seul et en profondeur. La réflexion comme ressource.",                   shadow: "Peut se retirer dans sa tête, apparaître absent." },
  Learner:           { domain: "thinking",      fr: "Apprentissage",    essence: "Passionné du processus d'apprendre. L'acquisition de compétences comme plaisir.",     shadow: "Peut collectionner les apprentissages sans les appliquer." },
  Strategic:         { domain: "thinking",      fr: "Stratégique",      essence: "Voit plusieurs chemins, choisit le meilleur. Pattern recognition naturel.",           shadow: "Peut sauter des étapes, frustration si on ne suit pas sa vision." },
};

export type TalentName = keyof typeof TALENTS;

export function getTalent(name: string) {
  return TALENTS[name] ?? null;
}

export function getTop5Summary(top5: string[]): string {
  return top5.map((t, i) => {
    const talent = TALENTS[t];
    if (!talent) return `${i + 1}. ${t}`;
    return `${i + 1}. ${t} (${talent.fr}) — ${talent.essence}`;
  }).join("\n");
}
export const POSTURE_LEADERSHIP = {
  centrageSurSoi: {
    titre: "Comment devenir un produit de luxe pour les autres",
    source: "Philippe CA",
    usage: "Citer quand un manager exprime un manque de légitimité, une difficulté à poser des limites, un besoin de validation constant ou une posture d'effacement.",
    cles: [
      "Sortir du besoin d'être choisi : tant qu'on attend d'être validé, on se place en position inférieure. La réciprocité remplace l'approbation.",
      "Cohérence intérieure : l'écart entre ce qu'on ressent et ce qu'on montre est perçu immédiatement. Être aligné, c'est tolérer ce qu'on pense mériter.",
      "Gérer son attention : l'attention est une monnaie psychologique. Ce n'est pas l'intensité émotionnelle qui crée la valeur, c'est la stabilité.",
      "Tolérance à la frustration : rester calme face à l'inconfort est un marqueur de maturité. Ne pas être gouverné par l'urgence affective.",
      "Identité profonde : on confirme l'image qu'on a de soi-même. Question clé : si je me considérais comme précieux, que ferais-je différemment ?",
      "Capacité à se retirer : ne pas forcer ce qui ne circule pas. L'absence mesurée rappelle la valeur de la présence.",
      "Dialogue interne : on ne peut pas être perçu comme précieux si on se traite comme secondaire.",
      "Constance : être vu comme un luxe n'est pas un rôle ponctuel, c'est une cohérence répétée. Ce qui est cohérent devient crédible.",
    ],
  },
};
typescriptexport { GABOR_MATE } from "./gabor-mate-content";
