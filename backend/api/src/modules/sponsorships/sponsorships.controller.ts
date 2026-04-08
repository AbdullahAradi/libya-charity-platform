import { UserRole } from '@prisma/client';
import { Response } from 'express';

import { prisma } from '../../lib/prisma';
import { asyncHandler } from '../../utils/async-handler';

export const listPublicPrograms = asyncHandler(async (_req, res: Response) => {
  const items = await prisma.sponsorshipProgram.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } });
  res.json(items);
});

export const getPublicProgram = asyncHandler(async (req, res: Response) => {
  const item = await prisma.sponsorshipProgram.findFirst({ where: { id: req.params.id, isActive: true } });
  res.json(item);
});

export const createProgram = asyncHandler(async (req, res: Response) => {
  const item = await prisma.sponsorshipProgram.create({ data: req.body });
  res.status(201).json(item);
});

export const updateProgram = asyncHandler(async (req, res: Response) => {
  const item = await prisma.sponsorshipProgram.update({ where: { id: req.params.id }, data: req.body });
  res.json(item);
});

export const adminRoles = [UserRole.SUPER_ADMIN, UserRole.NGO_MANAGER];
