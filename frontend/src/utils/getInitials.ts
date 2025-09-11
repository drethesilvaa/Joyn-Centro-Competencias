export function getInitials(fullName: string): string {
  if (!fullName) return "";

  const names = fullName.trim().split(/\s+/); 
  const firstInitial = names[0]?.[0] ?? "";
  const lastInitial = names.length > 1 ? names[names.length - 1][0] : "";

  return (firstInitial + lastInitial).toUpperCase();
}
