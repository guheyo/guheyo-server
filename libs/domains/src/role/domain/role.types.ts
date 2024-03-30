export interface UpdateRoleProps {
  name?: string;

  position?: number;

  hexColor?: string;
}

export const ROOT_BLOCKLIST_ROLE_NAMES = [
  '부계정 용의자',
  '경매 블랙리스트',
  '나눔 블랙리스트',
  '비정상적인 접근',
  '신고 자격상실',
  '모임 블랙리스트',
  '선제시 빌런',
] as const;

export type RootBlocklistRoleName = (typeof ROOT_BLOCKLIST_ROLE_NAMES)[number];
