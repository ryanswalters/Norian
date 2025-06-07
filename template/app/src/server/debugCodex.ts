export const codexDebug = async (_args: void, context: any) => {
  const agentCount = await context.entities.Agent.count()
  return {
    featureFlags: {},
    agentCount,
    db: 'ok',
    vectorDb: process.env.QDRANT_URL ? 'configured' : 'none'
  }
}
