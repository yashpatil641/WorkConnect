import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

export const requireAuth = ClerkExpressRequireAuth({
  jwtKey: process.env.CLERK_SECRET_KEY,
  debug: true
});