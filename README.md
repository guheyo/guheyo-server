# guheyo-server

> [guheyo.com](https://guheyo.com)은 디스코드 장터 [동물의 왕국](https://discord.com/servers/dongmulyi-wanggug-806383744151584779)에서 시작된 웹서비스에요

자세한 내용은 [wiki pages](https://github.com/guheyo/guheyo-server/wiki) 를 참고해 주세요

## Monorepo

- apps
	- `api`: API server (depends on `core` + `shared`)
	- `bot`: Discord bot server (depends on `core` + `shared`)
- libs
	- `core`: Shared utilities between servers
	- `shared`: Shared utilities between server and client

## Installation

```bash
$ yarn install

# generating prisma client
$ yarn workspace @guheyo/core prisma:generate
```

## Running the app

```bash
# development (live-reload)
$ yarn start:dev:[name]

# development (live-reload + debug)
$ yarn start:debug:[name]

# production mode
$ yarn start:[name]
```
[name] = api, bot, core, shared

## Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```

## Contributing

guheyo-server는 좋아하는 것을 편리하게 거래할 수 있는 서버를 만들어요\
버그 수정 및 개선에 기여하고 싶으시다면 아래 가이드를 읽어주세요

### [Contributing Guide](https://github.com/guheyo/guheyo-server/blob/main/CONTRIBUTING.md)

[contributing guide](https://github.com/guheyo/guheyo-server/blob/main/CONTRIBUTING.md)에 버그를 제보하는 방법과 Pull Request를 하는 방법이 설명되어 있어요
