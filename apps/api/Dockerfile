FROM node:18
LABEL email="keypport@gmial.com"
LABEL name="keypport"

# build
WORKDIR /app
COPY package* ./
COPY yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY apps/api/package.json ./apps/api/
COPY libs/shared/package.json ./libs/shared/
COPY libs/domains/package.json ./libs/domains/
COPY libs/shared/src/prisma/schema.prisma ./libs/shared/src/prisma/
RUN yarn install
RUN yarn workspace @guheyo/shared prisma:generate
COPY tsconfig.json ./
COPY nest-cli.json ./
COPY apps/api ./apps/api
COPY libs ./libs
RUN npx @nestjs/cli build api

# run
CMD node ./dist/apps/api/main.js
