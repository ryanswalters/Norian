export function requireNodeEnvVar(name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`Env var ${name} is undefined`);
  } else {
    return value;
  }
}

export function validateServerConfig(): void {
  ['AXYN_API_URL'].forEach(requireNodeEnvVar);
}
