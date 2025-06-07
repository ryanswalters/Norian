import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createAgent = async (_args: { name: string; description?: string; style?: string }, context: any) => {
  return prisma.agent.create({ data: { name: _args.name, description: _args.description, style: _args.style, userId: context.user.id } })
}

export const listAgents = async (_args: void, context: any) => {
  return prisma.agent.findMany({ where: { userId: context.user.id } })
}
