import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createAgent = async (_args: { name: string; description?: string; style?: string }, context: any) => {
  return prisma.agent.create({ data: { name: _args.name, description: _args.description, style: _args.style, userId: context.user.id } })
}

export const listAgents = async (_args: void, context: any) => {
  return prisma.agent.findMany({ where: { userId: context.user.id } })
}

export const saveMemorySummary = async (
  _args: { agentId: string; summary: string },
  context: any
) => {
  return prisma.agent.update({
    where: { id: _args.agentId, userId: context.user.id },
    data: { memorySummary: _args.summary }
  })
}

export const updateAgentRetention = async (
  _args: { agentId: string; shortTermDays: number; midTermDays: number; longTermDays: number },
  context: any
) => {
  return prisma.agent.update({
    where: { id: _args.agentId, userId: context.user.id },
    data: { shortTermDays: _args.shortTermDays, midTermDays: _args.midTermDays, longTermDays: _args.longTermDays }
  })
}
