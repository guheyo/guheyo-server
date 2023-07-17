import _ from 'lodash';
import { GuildMember, User } from 'discord.js';
import { v4 as uuidv4 } from 'uuid';
import userService from '../../services/user-service';
import imageService from '../../services/image-service';
import { prisma } from '../../loaders';

interface ParseUserParams {
  username: string;
  avatarURL: string | null;
  bot: boolean;
}

interface ParseSocialAccountParams {
  provider: string;
  socialId: string;
  createdAt: Date;
}

const getUsername = (user: User): string =>
  user.discriminator === '0'
    ? user.username
    : `${user.username}#${user.discriminator}`;

const parseUser = (member: GuildMember): ParseUserParams => {
  const { user } = member;
  if (!user) throw new Error(`No user`);

  return {
    username: getUsername(member.user),
    avatarURL: user.avatarURL(),
    bot: user.bot,
  };
};

const parseSocialAccount = (member: GuildMember): ParseSocialAccountParams => ({
  provider: 'discord',
  socialId: member.id,
  createdAt: member.user.createdAt,
});

const getRoleIds = (member: GuildMember) => {
  const roleManger = member.roles;
  const roleIds = roleManger.cache.map((r) => r.id);
  return roleIds;
};

const createUser = async (member: GuildMember) => {
  const userData = parseUser(member);
  const socialAccountData = parseSocialAccount(member);
  const id = uuidv4();
  const roleIds = getRoleIds(member);

  if (userData.avatarURL) {
    userData.avatarURL = await imageService.uploadFileFromURL({
      url: userData.avatarURL,
      type: 'users',
      id,
    });
  }
  const user = await prisma.user.create({
    data: {
      id,
      ...userData,
      socialAccounts: {
        create: [socialAccountData],
      },
      roles: {
        connect: roleIds.map((roleId) => ({
          id: roleId,
        })),
      },
    },
    include: {
      roles: {
        orderBy: {
          rank: 'asc',
        },
      },
      socialAccounts: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });
  return user;
};

const setUserRoles = async (member: GuildMember) => {
  let user = await userService.getUserBySocailAccount('discord', member.id);
  if (!user) user = await createUser(member);
  const roleIds = getRoleIds(member);
  return userService.setRoles(user.id, roleIds);
};

const getOrCreateUser = async (member: GuildMember) => {
  let user = await userService.getUserBySocailAccount('discord', member.id);
  if (!user) user = await createUser(member);
  return user;
};

const updateUsername = async (member: GuildMember) => {
  let user = await getOrCreateUser(member);
  const username = getUsername(member.user);
  if (user.username !== username) {
    user = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        username,
      },
      include: {
        roles: {
          orderBy: {
            rank: 'asc',
          },
        },
        socialAccounts: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }
  return user;
};

const upsertUser = async (member: GuildMember) => {
  let user = await userService.getUserBySocailAccount('discord', member.id);
  if (!user) user = await createUser(member);
  else {
    const userData = parseUser(member);
    const roleIds = getRoleIds(member);

    if (userData.avatarURL) {
      userData.avatarURL = await imageService.uploadFileFromURL({
        url: userData.avatarURL,
        type: 'users',
        id: member.id,
      });
    }
    user = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...userData,
        roles: {
          connect: roleIds.map((id) => ({
            id,
          })),
        },
      },
      include: {
        roles: {
          orderBy: {
            rank: 'asc',
          },
        },
        socialAccounts: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }
  return user;
};

const getServerNickname = (user: User): string =>
  user.discriminator === '0'
    ? /^[a-z]/.test(user.username)
      ? _.capitalize(user.username)
      : `${user.username}#0`
    : `${user.username}#${user.discriminator}`;

const setNickname = async (member: GuildMember) => {
  const nickname = getServerNickname(member.user);
  return member.setNickname(nickname);
};

export {
  getOrCreateUser,
  updateUsername,
  upsertUser,
  createUser,
  getServerNickname,
  setNickname,
  getUsername,
  setUserRoles,
};
