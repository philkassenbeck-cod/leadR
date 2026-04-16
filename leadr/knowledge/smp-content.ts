// Base de connaissance SMP — Florilège ENG
// Source : Philippe Kassenbeck — OPTIMUP
// Programme : Successful Manager Program

// ─────────────────────────────────────────────
// PROGRAMME OVERVIEW
// ─────────────────────────────────────────────

export const SMP_PROGRAM = {
  name: "Successful Manager Program (SMP)",
  structure: [
    { day: 1, module: "Delegation", format: "Full day face-to-face" },
    { day: 2, module: "Motivation", format: "½ day online" },
    { day: 3, module: "Team Dynamics", format: "½ day online" },
    { day: 4, module: "Feedback", format: "Full day face-to-face" },
    { day: 5, module: "Change Management", format: "½ day online" },
    { day: 6, module: "Bottom-up Communication", format: "Full day face-to-face" },
    { day: 7, module: "Final Anchorage", format: "½ day online" },
  ],
  assessment: "CliftonStrengths + 3 individual coaching sessions",
};

// ─────────────────────────────────────────────
// MODULE 1 : DELEGATION — SITUATIONAL LEADERSHIP
// ─────────────────────────────────────────────

export const DELEGATION = {
  situationalLeadership: {
    title: "Situational Leadership — The Managerial Adaptation Framework",
    autonomyLevels: [
      { level: "A1", motivation: "-", skills: "-", meaning: "Low motivation AND low skills — needs structure" },
      { level: "A2", motivation: "+", skills: "-", meaning: "Motivated but lacks skills — needs explanation and coaching" },
      { level: "A3", motivation: "-", skills: "+", meaning: "Skilled but unmotivated — needs involvement and recognition" },
      { level: "A4", motivation: "+", skills: "+", meaning: "Motivated AND skilled — ready for full delegation" },
    ],
    managementStyles: {
      M1: {
        name: "DIRECTIVE",
        role: "Structure and organize the work environment",
        actions: [
          "Accurate task list",
          "Don't explore demotivation",
          "Framing",
          "Precise and short deadlines",
        ],
        bestFor: "A1",
      },
      M2: {
        name: "EXPLANATORY",
        role: "Dynamize — provide context and motivation",
        actions: [
          "Context & explanations",
          "Incarnation (motivate)",
          "Accurate task list",
          "Framing",
          "Precise and short deadlines",
        ],
        bestFor: "A2",
      },
      M3: {
        name: "PARTICIPATORY",
        role: "Associate and involve",
        actions: [
          "Ask 'How are you going to…?'",
          "Highlight the expertise",
          "Don't explore demotivation",
        ],
        bestFor: "A3",
      },
      M4: {
        name: "DELEGATIVE",
        role: "Empower",
        actions: [
          "Provide very clear mission outlines",
          "Let go",
          "No to 'controlling ways of doing things', yes to 'results'",
        ],
        bestFor: "A4",
      },
    },
    riskMatrix: {
      title: "'You reap what you sow' matrix",
      principle: "In case of stretched employee/manager schemes (A1 vs M4 / A4 vs M1), tasks will not be performed and frustration will emerge.",
      extremes: {
        "A1-M4": "Employee: anxious, stressed, abandoned. Task: nothing happens. Manager: serene then overwhelmed.",
        "A4-M1": "Employee: revolt, depression. Task: risk of sabotage. Manager: power struggle.",
      },
    },
  },

  growModel: {
    title: "From Push to Pull — The GROW Coaching Model",
    principle: "Move from directive (push) to coaching (pull) through the GROW framework.",
    steps: {
      G: { name: "GOAL", description: "What are the objectives for this session? What topic to focus on?" },
      R: { name: "REALITY", description: "What is happening now? Current situation, challenges, stakeholders?" },
      O: { name: "OPTIONS", description: "What are the choices? Brainstorm ideas, find criteria, prioritize." },
      W: { name: "WAY AHEAD", description: "What action to commit to? In what timescale? You will succeed if…" },
    },
  },
};

// ─────────────────────────────────────────────
// MODULE 2 : MOTIVATION
// ─────────────────────────────────────────────

export const MOTIVATION = {
  coDevelopment: {
    title: "Co-development — Collective Intelligence Method",
    purpose: "Solve collectively business or management issues and leverage collective intelligence.",
    einsteinQuote: "If I had an hour to solve a problem, I'd spend 55 minutes thinking about the problem and 5 minutes thinking about solutions.",
    process: [
      "Participants each present the problem; group votes for priority problem.",
      "Volunteer describes the problem concisely.",
      "Peers ask exploratory questions to understand the ins and outs.",
      "Peers summarize the problem.",
      "Volunteer chooses the reformulation that best fits.",
      "Group divides into 2 and each brainstorms 2–3 possible solutions.",
      "Groups explain their solutions.",
      "Volunteer chooses the most feasible solutions.",
    ],
    keyPrinciples: [
      "Fall in love with the problem, everybody produces ideas.",
      "Think, write, share — manager speaks last.",
      "Active listening: clarification, reformulation.",
      "Brainstorming without judgment.",
    ],
  },

  herzberg: {
    title: "Herzberg's Two-Factor Theory",
    principle: "Break motivation into extrinsic (hygiene) factors and intrinsic (motivator) factors.",
    hygieneFactors: {
      description: "Extrinsic factors. Improving these reduces dissatisfaction but does not create motivation.",
      factors: ["Company policies", "Supervision", "Relationships", "Work conditions", "Salary", "Status", "Security"],
    },
    motivators: {
      description: "Intrinsic factors linked to desire for personal development. Improving these increases satisfaction.",
      factors: ["Achievement", "Recognition", "The work itself", "Responsibility", "Advancement", "Growth"],
    },
    quadrants: [
      { hygiene: "High", motivation: "Low", description: "Employees have few complaints but are not engaged. Comfort/Stagnation zone." },
      { hygiene: "High", motivation: "High", description: "Ideal situation." },
      { hygiene: "Low", motivation: "Low", description: "Lack of engagement and regular complaints." },
      { hygiene: "Low", motivation: "High", description: "Engagement is polluted by unaddressed dissatisfactions. Risk of losing best people." },
    ],
  },

  motivationRocket: {
    title: "The Motivation Rocket — 6 Motivational Drivers",
    drivers: [
      { name: "Results", description: "I am happy because I have finished my to-do list." },
      { name: "Ecosystem", description: "I like working with others; the team is important to me." },
      { name: "Meaning", description: "I like to contribute to something that is beyond me. (Fragile — linked to key values.)" },
      { name: "Pleasure", description: "I like what I do; I get pleasure from it every day. (Flow, autotelic activity.)" },
      { name: "Daily feedback", description: "I need immediate feedback (financial, recognition). Need to be seen." },
      { name: "Learn", description: "I like to learn and continuously progress. Personal growth." },
    ],
    managerRole: "Always provide transparency, make the connection between daily work and what the company accomplishes. Embody the Vision and Mission.",
  },

  motivationFormula: {
    title: "Motivation Formula = No Dissatisfaction + Satisfaction",
    limitDissatisfaction: [
      "Promote team cohesion",
      "Be available, active listening",
      "Establish a climate of trust",
      "Properly orchestrate talent (positions and remuneration in line with skills)",
      "Be flexible in work organisation",
    ],
    promoteSatisfaction: [
      "Encourage autonomy and decision-making",
      "Empower, involve more",
      "Set SMART goals",
      "Value and recognize work and talents at their fair value",
      "Offer growth opportunities",
      "Develop talents and skills (training, coaching, feedback)",
      "Make the link between daily work and the impact on the organization — give Meaning",
    ],
  },
};

// ─────────────────────────────────────────────
// MODULE 3 : TEAM DYNAMICS — TUCKMAN MODEL
// ─────────────────────────────────────────────

export const TEAM_DYNAMICS = {
  tuckman: {
    title: "Team Development — Tuckman's 4 Stages",
    stages: [
      {
        name: "FORMING",
        description: "Members start interacting and try to work out what is expected. Excitement and enthusiasm mixed with fear of uncertainty.",
        managerRole: "FRAME",
        actions: [
          "Communicate the common goal by recalling expected benefits",
          "Listen to your team and reassure them",
          "Organize cohesive events to create interpersonal links",
          "Provide simple and clear direction",
        ],
      },
      {
        name: "STORMING",
        description: "Conflict as divergent opinions or personal agendas come to light. Members challenge authority.",
        managerRole: "ARBITRATE",
        actions: [
          "Play the role of referee between members while giving your opinion",
          "Listen and seek to understand, then refocus on objective — stay factual",
          "Do not avoid difficulties — tensions are necessary; from tension can arise innovation",
          "Channel and direct the energy of team members",
        ],
      },
      {
        name: "NORMING",
        description: "Group finds ways to resolve conflicts. Feedback given constructively. Common framework accepted.",
        managerRole: "HARMONIZE",
        actions: [
          "Create or recall the 'rules of life' of the group",
          "Emphasize positive attitudes and highlight the team",
          "Strengthen initiative and responsibility",
          "Deal with deviant cases individually",
          "Build a common project",
        ],
      },
      {
        name: "PERFORMING",
        description: "Confidence grows. High effectiveness. Members work toward common goal.",
        managerRole: "STIMULATE",
        actions: [
          "Congratulate and celebrate successes",
          "Stimulate through new challenges",
          "Secure all the means necessary to achieve objectives",
          "Remove subjects causing irritation or frustration",
        ],
      },
    ],
  },

  maturityAssessment: {
    title: "Team Maturity Assessment Tool",
    dimensions: [
      "Loyalty · Discipline",
      "Solidarity · Helping each other · No silos",
      "Capacity of constructive opposition · Ability to express and listen to diverging opinions",
      "Recognition and acceptance of others · Ability to celebrate and congratulate",
    ],
  },
};

// ─────────────────────────────────────────────
// MODULE 4 : FEEDBACK
// ─────────────────────────────────────────────

export const FEEDBACK = {
  flashFeedback: {
    title: "Flash Feedback — The 3-Element Structure",
    structure: [
      "1 element that I particularly liked (appreciate — disable threat circuit)",
      "1 element that I questioned (stay in YOUR personal circle, use 'I' — more neutral)",
      "1 idea for improvement and/or a joint action for improvement (resistance dissolves in action)",
    ],
    principle: "Appreciate first: it disables the threat circuit and improves the positive/negative ratio for more productive conversations.",
  },

  losadaRatio: {
    title: "Losada Ratio",
    ratio: "2.9 — minimum positive/negative interaction ratio for team performance",
    insight: "80,000 thoughts a day, 80% of which are negative. What is your personal positive/negative mix?",
  },

  osbd: {
    title: "OSBD / OFNR Model — Non-violent Communication",
    steps: [
      { step: "OBSERVATION", description: "Observe the situation objectively. Precise and factual, situation and behavior description. Demonstrate respect." },
      { step: "SENTIMENT (Feeling)", description: "Express related feelings. Use 'I' — not possible to challenge a feeling. Talk about the impact of the behavior on ME, not about the person." },
      { step: "BESOIN (Need)", description: "Clarify your need. What needed fulfillment? Say what you want, NOT what you don't want." },
      { step: "DEMANDE (Request)", description: "Make a request — if possible, open. 'How can we solve this? What do you propose? How can we work on it together?'" },
    ],
  },

  kss: {
    title: "KSS — Keep, Stop, Start",
    purpose: "Development tool for individuals and teams. Trust building tool.",
    description: "Allows open talk about what you like and dislike about the other person's habits, behaviors, talents, and flaws. Vulnerabilities exposed in the same way as strengths. Trust develops.",
    process: [
      "For each person, individually brainstorm a KSS feedback on what you observed.",
      "Write on three sticky notes (1 Keep / 1 Stop / 1 Start).",
      "Take turns presenting the sticky notes to each person.",
      "Debrief once all sticky notes are presented.",
      "Take 2 minutes: what are you taking away?",
    ],
    tip: "Do not qualify the person — describe a behavior. We do not criticize people, we give feedback on specific behaviors.",
  },
};

// ─────────────────────────────────────────────
// MODULE 5 : CHANGE MANAGEMENT
// ─────────────────────────────────────────────

export const CHANGE_MANAGEMENT = {
  fiveLensApproach: {
    title: "Culture of Change — The 5-Lens Approach",
    lenses: [
      { lens: "Vision & Direction", action: "Give meaning to the change, share clear direction and actionable information" },
      { lens: "Governance", action: "Define roles and responsibilities, facilitate decision-making by aligning stakeholders on a clear vision and path" },
      { lens: "Engagement", action: "Build a cohesive team, engage with stakeholders, create a collective dynamic" },
      { lens: "Shrinking the change", action: "Co-construction, exploration, test & learn and training" },
      { lens: "Impact & Risk", action: "Explore change options, assess impacts and risks on your populations to design the path and appropriate change actions" },
    ],
  },

  segmentation: {
    title: "Population Segmentation for Change",
    criteria: [
      { type: "Functional", description: "Grouping by business or department (HR, IT)" },
      { type: "Identification", description: "Grouping by personal characteristics (age, experience, education)" },
      { type: "Behavioral", description: "Grouping on behavior towards change (influencer, early adopter, tech freak)" },
      { type: "Psychosocial", description: "Grouping by way of thinking (creative, directive, seductive, pragmatic)" },
      { type: "Geographical", description: "Grouping by location of work (HQ, factory, country)" },
    ],
    roles: ["Project Managers — responsible for the success", "Participants — support and participate", "Beneficiaries — will see their work significantly modified", "Collaterals — not directly involved but impacted"],
  },

  projectDefinition: {
    title: "Change Project Definition — 10 Questions",
    questions: [
      "What is the project about?",
      "Why — what is the rationale?",
      "Target — who is the project targeted at?",
      "Benefits — what will the project achieve?",
      "Project ID — name, logo, project leader, slogan, dates",
      "Deliverables — what are the expected deliverables?",
      "Major changes — which changes will affect the organization?",
      "Project Organization — who are the team members?",
      "Roadmap — what are the main phases and deadlines?",
      "Key Success Factors — what is critical to success?",
    ],
  },

  strengthsAndChange: {
    title: "How Strengths Profiles React to Change",
    profiles: [
      { talent: "Adaptability", reaction: "In their element — thrives on change and uncertainty." },
      { talent: "Futuristic", reaction: "Motivated if the vision is clear and compelling." },
      { talent: "Context", reaction: "Needs to understand WHY we are changing — needs historical rationale." },
      { talent: "Deliberative", reaction: "Needs time and consistency. Embed early, not at the end." },
      { talent: "Consistency", reaction: "Resists if rules and fairness are not guaranteed through the change." },
      { talent: "Activator", reaction: "Wants to act NOW. Give them a pioneer role." },
      { talent: "Command", reaction: "Wants clarity and control. Brief them first; they will mobilize others." },
      { talent: "Belief", reaction: "Will resist if the change conflicts with core values. Address values explicitly." },
    ],
    principle: "Resistance is never bad will — it is always a talent that hasn't been heard yet.",
  },
};

// ─────────────────────────────────────────────
// MODULE 6 : BOTTOM-UP COMMUNICATION
// ─────────────────────────────────────────────

export const BOTTOM_UP_COM = {
  transactionalAnalysis: {
    title: "Transactional Analysis — Ego States",
    states: [
      {
        state: "ADULT",
        description: "Best position. Focused on present moment, free from past and emotions. Makes controlled choices adapted to the professional situation.",
        behaviors: ["Factual, sharing observations", "With empathy and listening", "Speaks impact, no judgment", "Asks questions to overcome emotions"],
      },
      {
        state: "PARENT",
        description: "State driven by models and comparisons to the past. More or less conscious beliefs.",
        behaviors: ["Normative/authoritarian", "Or overprotective/savior, rescuer"],
      },
      {
        state: "CHILD",
        description: "State driven by emotions and inner needs.",
        behaviors: ["Rebellious or submissive", "Victim or persecutor", "Does not use full capacities for action and reflection"],
      },
    ],
    principle: "Ask many questions to overcome emotions and bring the other back into an adult state. Don't criticize, don't overprotect, don't complain, don't rebel.",
  },

  lifePositions: {
    title: "4 Life Positions",
    positions: [
      { label: "ASSERTIVITY", formula: "I'm OK / You're OK", description: "Win/win. Self-confidence and trust in others. Recognize needs and duties of both sides. 'What can WE do?'" },
      { label: "DOMINATION", formula: "I'm OK / You're not OK", description: "I win / you lose. I value myself and depreciate the other. Shift the blame. 'It's your fault.'" },
      { label: "SUBMISSION", formula: "I'm not OK / You're OK", description: "I lose / you win. I depreciate myself. Don't feel legitimate to contribute. 'It's my fault, you're better than me.'" },
      { label: "RESIGNATION", formula: "I'm not OK / You're not OK", description: "I lose / you lose. Powerless. 'It's my fault and your fault. We can't do anything.'" },
    ],
    target: "ASSERTIVITY — 'I'm OK / You're OK' is the target position in all professional interactions.",
  },

  disc: {
    title: "DISC — 4 Main Behavioral Styles",
    styles: [
      {
        style: "DOMINANCE",
        motto: "Decide, Action",
        traits: ["Assertive", "Quick", "Demanding", "Bold", "Decisive", "Direct"],
        communicate: { dos: ["Focus on task and results", "Be clear, brief, specific", "Stick to business", "Make them feel they have power and control", "Answer the WHAT question"], donts: ["Beat around the bush", "No conclusion", "Make digression", "Be disorganized"] },
        opinion: "What is your recommendation?",
      },
      {
        style: "INFLUENCE",
        motto: "Communicate, Ideate",
        traits: ["Outgoing", "Sociable", "Cheerful", "Confident", "Creative", "Optimistic"],
        communicate: { dos: ["Focus on positive and people", "Be warm and friendly", "Give big pictures", "Show interest when they are talking", "Answer the WHO question"], donts: ["Be cold, 100% factual", "Rush or control the conversation"] },
        opinion: "What are your impressions?",
      },
      {
        style: "STEADINESS",
        motto: "Support, Continuous Improvement",
        traits: ["Collaborative", "Listening", "Patient", "Even-tempered", "Willing", "Reliable"],
        communicate: { dos: ["Focus on benefit for their team and close people", "Warm and soft manner", "Slow down and explain with method", "Give time to think and discuss with others", "Answer the HOW question"], donts: ["Be dominant", "Interrupt", "Attack their team", "Force quick answers"] },
        opinion: "What is the team thinking about it?",
      },
      {
        style: "COMPLIANCE",
        motto: "Structure, Analyse",
        traits: ["Cautious", "Precise", "Orderly", "Analytical", "Structured", "Critical sense"],
        communicate: { dos: ["Focus on fact-based, accurate information", "Stick to business", "Give time to think and ask questions", "Provide written information and details", "Answer the WHY question"], donts: ["Be too casual or too aggressive", "Be disorganized, unprecise or unrealistic"] },
        opinion: "To which conclusion are the facts leading?",
      },
    ],
  },

  conflictInBottomUp: {
    title: "Conflict Roots in Communication",
    neuroscience: [
      "Isolation is proven to destroy our neurons",
      "We want people to feel what we feel",
      "We all want to be part of a team",
      "We all respect and love Status",
      "Our brain is still built for survival activities in priority",
    ],
    solvingMethodology: [
      "Separate the problem from the person",
      "Focus on interest, not on position",
      "Invent and prepare options for future win-win",
      "Agree on the disagreements",
      "Slice down the main topic to small steps",
      "Make a conclusion",
    ],
    duringProcess: [
      "Create bond with authentic empathy",
      "4 sentences rule",
      "Listen actively and reformulate",
      "Explore the other's intentions, not positions",
    ],
    usefulPhrases: [
      "Correct me if I am wrong…",
      "So what you're saying is…",
      "Are we agreeing that we disagree on…",
      "Thank you for making this point",
    ],
  },
};
export { GABOR_MATE } from "./gabor-mate-content";
