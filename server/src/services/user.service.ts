import bcrypt from 'bcryptjs';

import { prisma } from '../lib/prisma';
import { RegisterUserInput } from '../schemas/user.schema';

const SALT_ROUNDS = 10;

export class EmailAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`An account with email "${email}" already exists.`);
    this.name = 'EmailAlreadyExistsError';
  }
}

export async function createUser(input: RegisterUserInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existingUser) {
    throw new EmailAlreadyExistsError(input.email);
  }

  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      password: passwordHash,
    },
  });

  return {
    createdAt: user.createdAt,
    email: user.email,
    id: user.id,
    name: user.name,
    updatedAt: user.updatedAt,
  };
}
