export function formatDate(date: string, lang: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(lang === "id" ? "id-ID" : lang, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
