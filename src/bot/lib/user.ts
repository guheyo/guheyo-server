import _ from 'lodash';;
import { GuildMember, User } from "discord.js";
import userService from '../../services/userService';
import imageService from '../../services/imageService';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../../loaders';

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
        id: user.id
      },
      data: {
        username: username
      },
      include: {
        roles: {
          orderBy: {
            rank: 'asc'
          }
        },
        socialAccounts: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
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
      userData.avatarURL = await imageService.uploadFileFromURL({url: userData.avatarURL, type: 'users', id: member.id});
    }
    user = await prisma.user.update({
      where: {
        id: user.id
      },    
      data: {
        ...userData,
        roles: {
          connect: roleIds.map((id) => {
            return {
              id: id
            }
          }) 
        }
      },
      include: {
        roles: {
          orderBy: {
            rank: 'asc'
          }
        },
        socialAccounts: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    });
  }
  return user;
};

const createUser = async (member: GuildMember) => {
  const userData = parseUser(member);
  const socialAccountData = parseSocialAccount(member);
  const id = uuidv4(); 
  const roleIds = getRoleIds(member);  
  
  if (userData.avatarURL) {
    userData.avatarURL = await imageService.uploadFileFromURL({url: userData.avatarURL, type: 'users', id: id});
  }
  const user = await prisma.user.create({
    data: {
      id: id,
      ... userData,
      socialAccounts: {
        create: [socialAccountData]
      },
      roles: {
        connect: roleIds.map((id) => {
          return {
            id: id
          }
        })
      }
    },
    include: {
      roles: {
        orderBy: {
          rank: 'asc'
        }
      },
      socialAccounts: {
        orderBy: {
          createdAt: 'asc'
        }
      }
    }
  });
  return user;
};

const getServerNickname = (user: User): string => {
  return user.discriminator == '0' ?
    (/^[a-z]/.test(user.username) ? _.capitalize(user.username) : `${user.username}#0`)
    : `${user.username}#${user.discriminator}`;
};

const setNickname = async (member: GuildMember) => {
  const nickname = getServerNickname(member.user);
  return member.setNickname(nickname);
};

const getUsername = (user: User): string => {
  return user.discriminator == '0' ?
    user.username : `${user.username}#${user.discriminator}`;
};

const parseUser = (member: GuildMember): parseUserParams => {
  const user = member.user;
  if (!user) throw new Error(`No user`);

  return {
    username: getUsername(member.user),
    avatarURL: user.avatarURL(),
    bot: user.bot
  };
};

const parseSocialAccount = (member: GuildMember): parseSocialAccountParams => {
  return {
    provider: 'discord',
    socialId: member.id,
    createdAt: member.user.createdAt
  };
}

const setUserRoles = async (member: GuildMember) => {
  let user = await userService.getUserBySocailAccount('discord', member.id);
  if (!user) user = await createUser(member);
  const roleIds = getRoleIds(member);
  return userService.setRoles(user.id, roleIds);
};

const getRoleIds = (member: GuildMember) => {
  const roleManger = member.roles;
  const roleIds = roleManger.cache.map((r) => r.id);
  return roleIds;
};

interface parseUserParams {
  username: string,
  avatarURL: string | null,
  bot: boolean,
};

interface parseSocialAccountParams {
  provider: string,
  socialId: string,
  createdAt: Date
};

export {
  getOrCreateUser,
  updateUsername,
  upsertUser,
  createUser,
  getServerNickname,
  setNickname,
  getUsername,
  setUserRoles
};