import bcrypt from 'bcrypt';

export function hashToken(token: string): Promise<string> {
  return bcrypt.hash(token, 10);
}
