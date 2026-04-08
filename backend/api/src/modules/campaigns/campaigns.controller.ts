import { CampaignStatus, UserRole } from '@prisma/client';
import { Response } from 'express';

import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../../middleware/auth';
import { asyncHandler } from '../../utils/async-handler';

export const listPublicCampaigns = asyncHandler(async (_req, res: Response) => {
  const items = await prisma.campaign.findMany({ where: { status: CampaignStatus.ACTIVE }, orderBy: { createdAt: 'desc' } });
  res.json(items);
});

export const getPublicCampaign = asyncHandler(async (req, res: Response) => {
  const item = await prisma.campaign.findFirst({ where: { id: req.params.id, status: CampaignStatus.ACTIVE } });
  res.json(item);
});

export const createCampaign = asyncHandler(async (req: AuthRequest, res: Response) => {
  const item = await prisma.campaign.create({ data: req.body });
  res.status(201).json(item);
});

export const updateCampaign = asyncHandler(async (req, res: Response) => {
  const item = await prisma.campaign.update({ where: { id: req.params.id }, data: req.body });
  res.json(item);
});

export const activateCampaign = asyncHandler(async (req, res: Response) => {
  const item = await prisma.campaign.update({ where: { id: req.params.id }, data: { status: CampaignStatus.ACTIVE } });
  res.json(item);
});

export const deactivateCampaign = asyncHandler(async (req, res: Response) => {
  const item = await prisma.campaign.update({ where: { id: req.params.id }, data: { status: CampaignStatus.INACTIVE } });
  res.json(item);
});

export const adminRoles = [UserRole.SUPER_ADMIN, UserRole.NGO_MANAGER];
