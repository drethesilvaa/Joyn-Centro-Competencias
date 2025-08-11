export function getAppEnv() {
  return (
    process.env.APP_ENV ||
    (process.env.NODE_ENV === "production" ? "prod" : "local")
  );
}

export function getPublicBaseUrl() {
  const env = getAppEnv();

  const BASES: Record<string, string> = {
    local: "http://localhost:3000",
    dev: "https://coejoyn-coejoyn-dev-g4e4ehc4ekfcf6hd.northeurope-01.azurewebsites.net",
    prod: "https://coe.joyn-group.com",
  };

  return process.env.PUBLIC_BASE_URL || BASES[env] || "http://localhost:3000";
}
