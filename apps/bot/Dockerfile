FROM node:18
LABEL email="keypport@gmial.com"
LABEL name="keypport"

# build
WORKDIR /app
COPY package* ./
COPY yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY apps/bot/package.json ./apps/bot/
COPY libs/shared/package.json ./libs/shared/
COPY libs/domains/package.json ./libs/domains/
COPY libs/shared/src/prisma/schema.prisma ./libs/shared/src/prisma/
RUN yarn install
RUN yarn workspace @guheyo/shared prisma:generate
COPY tsconfig.json ./
COPY nest-cli.json ./
COPY apps/bot ./apps/bot
COPY libs ./libs
RUN npx @nestjs/cli build bot

# run
ARG DOCKER_ENV
ENV NODE_ENV=$DOCKER_ENV
CMD node ./dist/apps/bot/main.js -e NODE_ENV=${NODE_ENV}
