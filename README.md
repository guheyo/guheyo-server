# wtb-server

> [wtb.kr](https://wtb.kr)은 디스코드 장터 [동물의 왕국](https://discord.com/servers/dongmulyi-wanggug-806383744151584779)에서 시작된 웹서비스에요

**Want to Buy** : 좋아하는 것을 구매해요
1. 커스텀 키보드를 좋아하는 사람들과 거래해요
2. 커스텀 키보드 전문가들과 거래해요

**White to Black** : 모던한 흑백 디자인을 추구해요
1. 단순하게 만들어요
2. 편하게 머물 수 있는 공간을 만들어요

**What to Build** : 이런 걸 개발해요
1. 거래
2. 경매
3. 양도/양수

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
$ yarn workspace @wtb/core prisma:generate
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

wtb-server는 좋아하는 것을 편리하게 거래할 수 있는 서버를 만들어요\
버그 수정 및 개선에 기여하고 싶으시다면 아래 가이드를 읽어주세요

### [Contributing Guide](https://github.com/wtb-kr/wtb-server/blob/develop/CONTRIBUTING.md)

[contributing guide](https://github.com/wtb-kr/wtb-server/blob/develop/CONTRIBUTING.md)에 버그를 제보하는 방법과 Pull Request를 하는 방법이 설명되어 있어요
