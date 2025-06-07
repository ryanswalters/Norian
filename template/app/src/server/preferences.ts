import * as z from 'zod';
import {
  type GetPreferences,
  type UpdatePreferences,
  type TogglePublicMode,
  type GetPublicUser,
} from 'wasp/server/operations';
import { HttpError, prisma } from 'wasp/server';

export const getPreferences: GetPreferences<void, any> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  const prefs = await context.entities.Preferences.findUnique({ where: { userId: context.user.id } });
  if (!prefs) {
    return {
      useMemory: false,
      loadSaved: false,
      usePersonality: false,
      favoriteMusic: null,
      favoriteFood: null,
      sleepPattern: null,
      autoLearn: false,
      promptBeforeSave: true,
      publicPreference: false,
    };
  }
  return prefs;
};

const updatePrefsSchema = z.object({
  useMemory: z.boolean(),
  loadSaved: z.boolean(),
  usePersonality: z.boolean(),
  favoriteMusic: z.string().optional(),
  favoriteFood: z.string().optional(),
  sleepPattern: z.string().optional(),
  autoLearn: z.boolean().optional(),
  promptBeforeSave: z.boolean().optional(),
  publicPreference: z.boolean().optional(),
});

type UpdatePrefsInput = z.infer<typeof updatePrefsSchema>;

export const updatePreferences: UpdatePreferences<UpdatePrefsInput, { success: boolean }> = async (
  rawArgs,
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  const data = updatePrefsSchema.parse(rawArgs);
  await context.entities.Preferences.upsert({
    where: { userId: context.user.id },
    create: { userId: context.user.id, ...data },
    update: data,
  });
  return { success: true };
};

export const togglePublicMode: TogglePublicMode<void, boolean> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  const updated = await context.entities.User.update({
    where: { id: context.user.id },
    data: { isPublic: !context.user.isPublic },
  });
  return updated.isPublic;
};

export const toggleAdvancedMode = async (_args: void, context: any) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  const updated = await context.entities.User.update({
    where: { id: context.user.id },
    data: { advancedMode: !context.user.advancedMode },
  });
  return updated.advancedMode;
};

export const getPublicUser: GetPublicUser<{ username: string }, any> = async (args, _context) => {
  const user = await prisma.user.findFirst({
    where: { username: args.username, isPublic: true },
  });
  if (!user) {
    throw new HttpError(404, 'User not available');
  }
  return { username: user.username, displayName: user.displayName };
};
