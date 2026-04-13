// Questions puissantes par domaine — utilisées par tous les agents

export const DOMAIN_QUESTIONS: Record<string, string[]> = {
  executing: [
    "Qu'est-ce que tu as accompli récemment dont tu es vraiment fier ?",
    "Comment tu organises ta journée pour être au maximum de ton efficacité ?",
    "Qu'est-ce qui t'empêche de déléguer davantage ?",
    "Où est-ce que tu portes une responsabilité que tu pourrais lâcher ?",
  ],
  influencing: [
    "Comment tu inspires les autres à te suivre ?",
    "Quel impact veux-tu avoir dans 3 ans ?",
    "Comment tu gères les moments où les autres ne partagent pas ton enthousiasme ?",
    "Qu'est-ce que tu fais naturellement qui élève les autres ?",
  ],
  relationship: [
    "Comment tu construis la confiance avec quelqu'un de nouveau ?",
    "Qui dans ton équipe a le plus de potentiel inexploité ?",
    "Comment tu gères quand une relation professionnelle se détériore ?",
    "Qu'est-ce que tu remarques chez les autres que personne d'autre ne voit ?",
  ],
  thinking: [
    "Quelle est l'idée qui t'anime en ce moment ?",
    "Comment tu prends tes meilleures décisions ?",
    "Qu'est-ce que tu as appris récemment qui a changé ta façon de voir les choses ?",
    "Quand est-ce que tu as besoin de plus de données avant d'agir ?",
  ],
};

// Questions spécifiques pour le coaching individuel
export const INDIVIDUAL_QUESTIONS: Record<string, string[]> = {
  Achiever: [
    "Qu'est-ce que 'assez' veut dire pour toi aujourd'hui ?",
    "Comment tu célèbres ce que tu accomplis, pas seulement ce qui reste à faire ?",
    "Où est-ce que ton drive te sert, et où est-ce qu'il te coûte ?",
  ],
  Strategic: [
    "Quand tu vois plusieurs chemins, comment tu choisis ?",
    "Comment tu partages ta vision sans que les autres se sentent exclus du processus ?",
    "Quelle décision tu différes en ce moment alors que tu sais déjà quelle est la bonne ?",
  ],
  Empathy: [
    "Comment tu te protèges quand tu absorbes trop les émotions des autres ?",
    "Qu'est-ce que tu ressens dans cette situation que les autres ne voient pas encore ?",
    "Comment tu utilises ta sensibilité comme force de leadership ?",
  ],
  Activator: [
    "Qu'est-ce qui t'empêche de démarrer en ce moment ?",
    "Comment tu embarques les autres dans ton élan sans les brusquer ?",
    "Où est-ce que ta vitesse est un atout, et où est-ce qu'elle crée des frictions ?",
  ],
  Relator: [
    "Comment tu ouvres ton cercle tout en maintenant la profondeur qui compte pour toi ?",
    "Avec qui tu as besoin de renforcer la relation en ce moment ?",
    "Comment tu utilises la confiance que les autres te donnent ?",
  ],
  Analytical: [
    "Quand tu as assez de données pour décider ?",
    "Comment tu communiques ta rigueur sans paraître bloquant ?",
    "Qu'est-ce que ton analyse te dit là que tu n'as pas encore dit à voix haute ?",
  ],
  Futuristic: [
    "Comment tu ramènes ta vision dans le présent pour les autres ?",
    "Quelle est la prochaine étape concrète vers ce futur que tu vois ?",
    "Comment tu gères la frustration du présent quand ton regard est dans le futur ?",
  ],
  Maximizer: [
    "Où est-ce que tu investis ton énergie sur ce qui est déjà fort ?",
    "Comment tu gères les contextes qui t'obligent à travailler sur les faiblesses ?",
    "Qui autour de toi mérite plus d'attention pour devenir excellent ?",
  ],
  Responsibility: [
    "Qu'est-ce que tu portes en ce moment qui n'est pas à toi de porter ?",
    "Comment tu sais quand dire non sans trahir tes valeurs ?",
    "Où est-ce que ton ownership t'isole plutôt que de te connecter ?",
  ],
  Ideation: [
    "Parmi toutes tes idées en ce moment, laquelle mérite d'être lancée maintenant ?",
    "Comment tu passes de l'idée à l'action concrète ?",
    "Qui a besoin d'entendre ton idée la plus folle de la semaine ?",
  ],
};

// Questions pour le team coaching
export const TEAM_QUESTIONS = [
  "Quelles forces de l'équipe ne sont pas encore pleinement utilisées ?",
  "Quel est l'angle mort collectif qui vous coûte le plus en ce moment ?",
  "Comment les forces dominantes de l'équipe influencent-elles vos décisions collectives ?",
  "Qui dans l'équipe compense naturellement les faiblesses des autres, et est-ce reconnu ?",
  "Quelle serait la configuration idéale pour votre prochain grand projet ?",
  "Où est-ce que vos forces collectives créent de la friction entre vous ?",
];
