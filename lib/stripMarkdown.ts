// Convertit le Markdown des réponses de l'agent en texte lisible à voix haute
// (sinon la synthèse lit « dièse », « étoile étoile », les barres de tableau…).
export function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")                 // blocs de code
    .replace(/`([^`]+)`/g, "$1")                      // code inline
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")             // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")          // liens → texte
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")               // titres #
    .replace(/^\s{0,3}>\s?/gm, "")                    // citations
    .replace(/^\s*[-*+]\s+/gm, "")                    // puces
    .replace(/^\s*\d+\.\s+/gm, "")                    // listes numérotées
    .replace(/^\s*\|.*\|\s*$/gm, (line) =>            // lignes de tableau
      line.replace(/:?-{2,}:?/g, " ").replace(/\|/g, " · "))
    .replace(/\*\*([^*]+)\*\*/g, "$1")                // gras **
    .replace(/__([^_]+)__/g, "$1")                    // gras __
    .replace(/\*([^*]+)\*/g, "$1")                    // italique *
    .replace(/(?<!\w)_([^_]+)_(?!\w)/g, "$1")         // italique _
    .replace(/^\s*[-*_]{3,}\s*$/gm, "")               // séparateurs ---
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
