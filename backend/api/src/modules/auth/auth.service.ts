import { UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { env } from '../../config/env';
import { prisma } from '../../lib/prisma';
import { AppError } from '../../utils/app-error';

export const register = async (input: {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
}) => {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw new AppError('Email already registered', 409);

  const passwordHash = await bcrypt.hash(input.password, 10);
  const user = await prisma.user.create({
    data: {
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      passwordHash,
      role: UserRole.DONOR,
    },
  });

  return { id: user.id, email: user.email, fullName: user.fullName, role: user.role };
};

export const login = async (input: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) throw new AppError('Invalid credentials', 401);

  const ok = await bcrypt.compare(input.password, user.passwordHash);
  if (!ok) throw new AppError('Invalid credentials', 401);

  const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });

  return {
    token,
    user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role },
  };
};
