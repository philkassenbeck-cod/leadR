// Base de connaissance SLP — OPTIMUP Anthology 2026
// Source : Philippe Kassenbeck, pkassenbeck@optimup.ch
// Extraction complète du contenu pédagogique du programme SLP

// ─────────────────────────────────────────────
// MODULE 1 : MANAGER AS A COACH (Day 1)
// ─────────────────────────────────────────────

export const MANAGER_AS_COACH = {
  coachingPosture: {
    title: "Coaching Posture",
    principles: [
      "Create a space of trust and safety — establish a caring framework where the person can express themselves freely, without fear.",
      "Maintain unconditional positive regard — welcome the person in their entirety, with acceptance and without conditions.",
      "Show empathy and listening — connect authentically with what the other person is experiencing, beyond words.",
      "Seek the powerful question, not the solution — your role is not to solve, but to bring forth through relevant questioning.",
      "Be fully present in active listening — engage fully in the moment, with all your senses awakened.",
      "Name what you observe.",
    ],
    observationSentences: [
      "I notice that your tone/posture changed when you started talking about...",
      "I perceive hesitation about this project and I have the intuition that you have underlying concerns.",
      "I sense enthusiasm in your voice that wasn't there a few minutes ago...",
    ],
  },

  powerfulQuestions: {
    title: "Powerful Questions",
    definition: "A Powerful Question disrupts, provokes reflection, creates vulnerability, and opens the path to transformation.",
    characteristics: [
      "A break from the ordinary — they arrive as an unexpected interruption that makes the speaker pause and reflect.",
      "Beyond ready-made answers — they disrupt automatic, well-rehearsed responses and require original thinking.",
      "Diving deep — they explore territories people do not usually visit; they invite vulnerability.",
      "Transformative answers — they generate deep and meaningful insights that last well beyond the initial conversation.",
    ],
    examples: {
      weak: "How are you?",
      strong: "What was your favorite moment today?",
    },
  },

  openVsClosedQuestions: {
    closed: {
      description: "Call for a short answer (yes/no/fact). Limit the scope of response. Useful for factual information only.",
      example: "Have you finished this project?",
    },
    open: {
      description: "Invite expansive answers, encourage exploration. Begin with 'What' or 'How'. Create space for discovery.",
      examples: ["What excites you about this project?", "How do you feel about your work at the moment?"],
      principle: "Systematically favor open questions that invite discovery over closed questions that limit exploration.",
    },
  },

  whatToDoWithAnswers: {
    coachResponsibilities: [
      "Welcome without judgment — receive what emerges with openness and compassion.",
      "Amplify insights — reflect back what has been said: 'I hear that you've just realized that...'",
      "Dig deeper — use responses as a springboard: 'What does this realization change for you?'",
      "Anchor in action — transform insight into concrete commitment: 'Now that you see this, what will be your first action?'",
    ],
    principle: "Answers to Powerful Questions are not an end in themselves, but starting points. They accumulate, connect, and gradually build deeper understanding.",
  },

  growModel: {
    title: "GROW Model — by John Whitmore",
    steps: {
      G: { name: "GOAL", questions: ["What is/are the objectives for this session?", "What topic do you want to focus on?"] },
      R: { name: "REALITY", questions: ["What is happening now?", "What is the current situation?", "What challenges are you facing?", "Who are the stakeholders? What is their position?"] },
      O: { name: "OPTIONS", questions: ["What are the choices that you have?", "Brainstorm ideas and find choices criteria for those ideas.", "Prioritize."] },
      W: { name: "WAY AHEAD", questions: ["What action do I commit to taking?", "In what timescale?", "You will succeed if..."] },
    },
  },
};

// ─────────────────────────────────────────────
// MODULE 2 : ORATORY ART (Day 2)
// ─────────────────────────────────────────────

export const ORATORY_ART = {
  bodyLanguage: {
    title: "Body Language — Your body supports your brain",
    principles: [
      "Embody confidence: expand your chest and keep your shoulders relaxed but back.",
      "Foundation matters: stand with your feet hip-width apart, firmly planted on the ground.",
      "Maintain a dynamic spine: keep your back straight but not stiff.",
      "Head position: hold your head high, as if balancing a book on top — aligns neck and spine.",
      "Hand positioning: let your hands rest naturally at your sides initially; use them expressively as you warm up.",
      "Minimize excess movement: avoid unnecessary swaying or repetitive movements like nodding.",
    ],
  },

  voice: {
    title: "Your Voice is Music",
    principles: [
      "Focus on the emotion and intention behind your words to convey your message with power.",
      "Support your voice with diaphragmatic breathing to project more powerfully and sustainably.",
      "Acoustic awareness: your skull acts as a resonator for your voice, improving its richness and volume.",
      "Pace your speech: slow down to improve clarity and give your audience time to absorb your words.",
      "Vocal variety: repeat important points using different tones and volumes.",
    ],
  },

  connectedSpeaking: {
    title: "Connected Public Speaking",
    principles: [
      "Open your heart to your audience — stick to their gaze.",
      "Don't think when you speak (um, uh...) — offbeat thinking destroys your relationship with the audience.",
      "Read the room: upon entering, feel the energy of the audience and adjust your approach.",
      "Engage sincerely: show genuine interest in your audience — this sincerity is often reciprocal.",
      "Eye contact: use appropriate eye contact, not too fleeting or too prolonged.",
      "Dynamic eye contact: use active attention and gaze to stimulate your brain and guide your content. Don't talk to your slides.",
    ],
  },

  emotionalFirstAidKit: {
    title: "The Emotional First Aid Kit",
    tools: [
      "Do not label negative emotions as normal — be positive.",
      "Don't absorb, don't counter negative energy: transform it.",
      "Breathe, breathe, breathe...",
      "Use a personal signal to assess the need of calming down if needed.",
      "Avoid one-on-one discussion with toxic contributors: keep connected to the audience.",
    ],
  },

  breathing: {
    title: "The Benefits of Breathing in Oratory Art",
    types: [
      { type: "Cardiac coherence", effect: "Balance" },
      { type: "Chest breathing", effect: "Energy" },
      { type: "Abdominal breathing", effect: "Calm" },
      { type: "Combination of both", effect: "Call to the subconscious part of yourself" },
    ],
  },
};

// ─────────────────────────────────────────────
// MODULE 3 : STRENGTHS & INFLUENCE (Day 3)
// ─────────────────────────────────────────────

export const STRENGTHS_AND_INFLUENCE = {
  whyAssessment: {
    title: "6 Reasons to Know Yourself and Take a Personality Assessment",
    reasons: [
      "You perform better when you understand how you work. Self-awareness turns effort into impact.",
      "You stop fighting your nature. You start playing to your strengths instead of fixing yourself.",
      "You make better decisions — because you understand your patterns, not just your goals.",
      "You communicate with more clarity and confidence. You know what you need and how you show up.",
      "You lead with authenticity. People follow who you are, not who you pretend to be.",
      "You build a career that fits you. Not one that exhausts you.",
    ],
  },

  assessmentComparison: [
    { name: "DISC", measures: "Behavioural style", bestFor: "Understanding communication & interaction", use: "Team communication, role awareness" },
    { name: "Hogan", measures: "Personality traits + derailers + motives", bestFor: "Leadership performance & risk", use: "Leadership development, recruitment" },
    { name: "CliftonStrengths", measures: "Natural talents (34 themes)", bestFor: "Strengths activation & development", use: "Coaching, growth & role fit" },
    { name: "Predictive Index (PI)", measures: "Behavioural drives + cognitive ability", bestFor: "Talent optimisation & hiring", use: "Hiring decisions, team alignment" },
    { name: "Wave (PDI)", measures: "Personality + competencies", bestFor: "Leadership & team strategies", use: "Leadership assessment, talent planning" },
  ],

  corePhilosophy: {
    principles: [
      "Everyone has natural talents.",
      "Talents are recurring patterns of thinking, feeling and acting.",
      "A strength is a talent that is developed, practiced and mastered.",
      "You don't become great by fixing weaknesses.",
      "You become great by amplifying what already works.",
      "Awareness turns talent into performance.",
      "Mastery comes from conscious use, not perfection.",
      "Strengths create confidence, energy and engagement.",
      "Teams perform best when strengths are combined.",
      "Sustainable success starts from what is already strong.",
    ],
    mindset: "You are not defined by your limits. You are empowered by your potential.",
  },

  strengthsFormula: {
    formula: "TALENT × CONTEXT × INVESTMENT = STRENGTH",
    definitions: {
      talent: "A natural way of thinking, feeling and behaving.",
      context: "What you are mainly and daily surrounded by.",
      investment: "Time spent practicing and developing your skills + building your knowledge base.",
      strength: "The ability to consistently provide near-perfect performance.",
    },
  },

  keyInsights: [
    "Strengths are your natural patterns of excellence. They shape how you think, decide and act.",
    "Words create worlds — your language shapes your reality.",
    "A positive self-perspective fuels sustainable performance.",
    "Leadership starts where 'I am not enough' ends.",
    "Your strengths are the antidote to self-doubt and self-sabotage.",
    "When used consciously, strengths multiply impact.",
    "When used unconsciously, without self-awareness, strengths can become limitations.",
    "Awareness turns talent into leadership power.",
    "Giving each strength a persona helps you activate it on demand.",
  ],

  fourDomains: [
    { domain: "Influencing", energy: "Impact & Visibility", bring: "Mobilize, persuade, move people to action", differ: "Focus on impact rather than harmony", roots: "Being heard mattered early" },
    { domain: "Strategic Thinking", energy: "Clarity & Meaning", bring: "Analyze, anticipate, give perspective", differ: "Think before acting", roots: "Thinking was a safe place" },
    { domain: "Relationship Building", energy: "Trust & Connection", bring: "Create safety, loyalty, cohesion", differ: "Connect before convincing", roots: "Belonging was essential" },
    { domain: "Executing", energy: "Action & Delivery", bring: "Turn ideas into results", differ: "Act before refining", roots: "Performance was expected" },
  ],

  sevenQuestionsToSelf: {
    title: "7 Questions to Yourself — How do your talents INTERACT in YOUR specific context?",
    questions: [
      { type: "Sequence", question: "Which talent activates which other talent in you?" },
      { type: "Isolation", question: "Which talent lacks support?" },
      { type: "Compression", question: "Which talent is suffocated by your environment?" },
      { type: "Collision", question: "Which talents are at war within you?" },
      { type: "Shadow trigger", question: "Under what precise conditions do your talents turn against you?" },
      { type: "Deficit", question: "What exhausts you reveals which absent talents?" },
      { type: "Evolution", question: "How have your talents changed over time?" },
    ],
  },

  teamAnalysisFramework: {
    title: "Analysing a Team",
    steps: [
      "Global synthesis: What is unique? What is over-represented? What is absent? How are key roles mapping?",
      "What is the context of this team?",
      "Match with the Fauvet and Hawkins Matrix.",
    ],
    workshopOrganisation: [
      "Framing",
      "Test (assessment)",
      "Debrief",
      "Workshop",
      "Anchorage",
    ],
  },
};

// ─────────────────────────────────────────────
// MODULE 4 : APPRECIATIVE CHANGE DESIGN (Day 4)
// ─────────────────────────────────────────────

export const APPRECIATIVE_INQUIRY = {
  comparison: {
    problemSolving: [
      "Identify a need or a problem",
      "Analyze root causes",
      "Mindset focuses on a defined difficulty",
      "Creativity and innovation tend to be reduced",
      "Define 'what could be'",
      "Formulate solution hypotheses",
      "Build a corrected vision of the present",
      "Establish a rational action plan",
    ],
    appreciativeInquiry: [
      "Appreciate existing resources and potentials",
      "Define a positive solution projection",
      "Build an attractive vision to leverage a new future",
      "Establish a co-constructed action plan for a better future",
    ],
  },

  positiveMission: {
    title: "The Positive Mission: I want…",
    characteristics: [
      "Simple, clear, and obvious to everyone.",
      "May include a 'how,' but only one.",
      "Should not be overloaded or ambiguous.",
      "Enables the team to clearly understand what is expected.",
      "Serves as a foundation for building the positive core.",
    ],
    principle: "A well-formulated mission already activates collective momentum.",
  },

  appreciativeInterviews: {
    title: "Appreciative Interviews",
    questions: [
      { theme: "Story", question: "Without overthinking, describe a moment or situation in your professional life when you felt fully engaged, energized, resourceful, and enthusiastic." },
      { theme: "Talents & Resources", question: "Without excessive modesty, what talents or skills did you mobilize in this experience, and how did your contribution matter?" },
      { theme: "Motivation", question: "Describe precisely what you enjoyed, what you felt, your personal satisfaction, and the atmosphere that resulted." },
      { theme: "Wishes", question: "In light of all this, what would be the three wishes you would formulate for the mission? What do you want more of?" },
    ],
    interviewerBehavior: [
      "Adopt an open and welcoming attitude toward the interviewee's experiences.",
      "Focus on and follow up on successes and achievements.",
      "Look for concrete facts and lived experiences.",
      "Rephrase and build on what brings life and strength to the experience.",
      "Take notes.",
    ],
    process: "20 minutes of interview per participant + 5 minutes of synthesis per participant.",
  },

  wallOfStrengths: {
    title: "Strengths Debrief — Building the Wall of Strengths",
    process: [
      "Each pair debriefs their partner's strengths.",
      "Present to the whole group the strengths identified in your partner.",
      "Start with a full round of the team (all members presented before synthesis).",
      "Record progressively on Post-its, flipchart, or wall.",
      "Collective synthesis: dominant strengths, complementarities, potential imbalances or blind spots.",
    ],
    outcome: "This step establishes a shared foundation of recognition and psychological safety.",
  },

  positiveFoundation: {
    title: "Positive Foundation",
    definition: "The collective expression of the mission, as formulated by the team after individual interviews and the Wall of Strengths. It represents what the team is able to deliver together — and what none of its members could produce alone.",
    coConstruction: [
      "Each member expresses their wishes and priorities.",
      "Divergences are discussed.",
      "Arbitrations are made.",
      "A common commitment is formulated.",
    ],
    principle: "The positive foundation is neither a slogan nor an average of opinions, but a consciously assumed collective agreement.",
  },

  fourD: {
    title: "4D Cycle of Appreciative Change Design",
    steps: [
      { phase: "DISCOVER", question: "Appreciate existing resources — when is this team at its best?" },
      { phase: "DREAM", question: "Define a positive solution projection — what would it look like if always at this level?" },
      { phase: "DESIGN", question: "Build the vision — co-construct the positive foundation." },
      { phase: "DEPLOY", question: "Establish a co-constructed action plan — from wishes to projects to prototypes." },
    ],
  },

  fromWishesToProjects: {
    steps: [
      "Self-reflection: how can the wishes become projects?",
      "As a group, formulate one or several initiative(s) linked to the wish.",
      "Write initiatives on Post-its and select 3–5 to present.",
      "Project prototyping: express the project through a prototype (visual, role-play, story, symbol).",
    ],
    prototypingTips: [
      "Agree on the type of prototype you want to show.",
      "Your prototype doesn't have to be beautiful — it needs to express your project.",
      "Listen to all ideas at the table before getting started.",
      "Find symbols, a name, and stories that explain your project.",
      "Let your creativity flow.",
    ],
  },
};

// ─────────────────────────────────────────────
// MODULE 5 : CONFLICT MANAGEMENT (Day 5)
// ─────────────────────────────────────────────

export const CONFLICT_MANAGEMENT = {
  rootsOfConflict: {
    lossOf: ["Attachment", "Territory", "Structure", "Identity", "Future", "Meaning", "Control", "Power"],
    comingFrom: ["Goals", "Interests", "Values", "Perception", "Communication styles", "Status", "Judgements", "Role definition", "Personal ego agenda", "Resistance to change", "Level of sensitivity"],
    corporatePlaces: ["Mail", "Silence", "SMS", "Meeting Room", "Face to face"],
  },

  blockingBehaviors: {
    primary: [
      { behavior: "Passivity", description: "The person's focus is on inhibiting himself rather than engaging in problem solving." },
      { behavior: "Discounting", description: "The person puts down the other person or herself." },
      { behavior: "Redefining", description: "The stimulus and the response refer to different issues." },
      { behavior: "Over-detailing", description: "Speaker overwhelms other with too many details." },
    ],
    secondary: [
      "Too rational and absence of warmth",
      "Too emotional and unclear thinking",
      "Over-generalizing by using general statements",
      "Abstraction by over-thinking",
      "Lack of directness to avoid main issue",
      "Lack of honesty, self disclosure and distortion of true feelings",
    ],
  },

  reactionPatterns: [
    { pattern: "FIGHT (Against)", description: "Aggressivity" },
    { pattern: "FLIGHT (Away)", description: "Silence" },
    { pattern: "DIALOG (Towards)", description: "Constructive engagement" },
  ],

  selfCoachingSaboteur: {
    title: "Test Your Own Saboteur First — Self-coaching Tool",
    questions: [
      "What is the situation about here?",
      "Is it true? Is it really true? Is it really really true?",
      "What is happening when I believe that thought?",
      "How do I feel? What person do I become when I believe this thought?",
      "How much space do I give to this thought?",
      "Who would I be without this thought?",
      "How would it feel? How would I keep expanding without this thought?",
    ],
  },

  batna: {
    title: "BATNA — Best Alternative To a Negotiated Agreement",
    principles: [
      "BATNA represents the best option you have if the current negotiation fails.",
      "Knowing your BATNA gives you clarity about when to accept a deal or walk away.",
      "The stronger your BATNA, the more negotiating power you have.",
      "Good negotiators actively improve their BATNA before and during negotiations.",
    ],
  },

  negotiationProcess: {
    title: "Process Proposal",
    steps: [
      "Come prepared with: acceptable minimum viable solution + out-of-the-table options.",
      "Opening with positive authenticity.",
      "Explore the other's point of view.",
      "Mirror / Reformulate.",
      "Transform position into intentions with reformulation.",
      "Agree on agreements and disagreements about intentions, not positions.",
      "Propose options for disagreements.",
    ],
    phases: ["CONNECT", "NEGOTIATE"],
  },

  nonViolentSentences: [
    "Thank you (rather than sorry)",
    "Correct me if I'm wrong...",
    "You're telling me...",
    "I understand",
    "We agree that on this point we do not agree",
    "I particularly appreciate...",
    "What do you see that I don't see?",
    "Thank you for having the openness to tell me this",
    "Help me understand your point of view...",
    "How can we make a step towards each other?",
  ],

  emotionControl: {
    self: [
      "Understand what causes your emotional reaction",
      "Consider facts, not feelings",
      "Focus on a goal and a positive solution",
      "Identify a win-win",
      "Factually expressing your feelings (non-violent communication)",
      "Listen carefully and objectively",
    ],
    withEmotionalPeople: [
      "Communicate your understanding of their emotions",
      "Avoid making them justify themselves",
      "Encourage people to communicate their feelings",
      "Find solutions through questioning",
      "Show authentic empathy",
      "Accept a slower resolution pace",
      "Stop when needed",
    ],
  },

  conflictManagementPrinciples: [
    "Stay connected with mirroring",
    "Separate the problem from the person",
    "Focus on intentions, not positions",
    "Invent options for a win-win future",
    "Agree on disagreements",
    "Break down the main topic into small steps",
    "Stay in control of provocations and emotions — use silence",
    "Create a connection with authentic empathy",
    "4-sentences rule",
    "Actively listen and rephrase",
    "Explore intents",
  ],
};

// ─────────────────────────────────────────────
// PROGRAMME OVERVIEW
// ─────────────────────────────────────────────

export const SLP_PROGRAM = {
  name: "Successful Leader Program (SLP)",
  subtitle: "Coaching. Oratory Art. Strengths. Appreciative Change. Conflict.",
  author: "Philippe Kassenbeck — OPTIMUP",
  structure: [
    { day: 1, module: "Manager as a Coach", content: "Coaching posture, powerful questions, GROW model" },
    { day: 2, module: "Oratory Art", content: "Body language, voice, connected speaking, breathing" },
    { day: 3, module: "Strengths & Influence", content: "CliftonStrengths, 34 talents, team analysis" },
    { day: 4, module: "Appreciative Change Design", content: "Appreciative Inquiry, 4D cycle, positive foundation" },
    { day: 5, module: "Conflict Management", content: "Roots of conflict, BATNA, negotiation, non-violent communication" },
    { day: 6, module: "Anchorage & Celebration", content: "Personalized learning formats, certificate" },
  ],
  assessment: "CliftonStrengths Assessment + Individual coaching debrief",
};
