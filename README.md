# Express와 Prisma로 만드는 첫 번째 REST API 프로젝트 🚀

안녕하세요! 이 프로젝트는 Express.js와 Prisma를 사용하여 기본적인 REST API를 만드는 방법을 배우기 위한 예제입니다. 사용자와 게시글을 관리하는 간단한 API를 만들어볼 거예요. 

## 시작하기 전에 필요한 것들 📋

이 프로젝트를 시작하기 전에 컴퓨터에 다음 프로그램들이 설치되어 있어야 해요:

1. Node.js (버전 14 이상) - [다운로드 링크](https://nodejs.org/)
2. Yarn 패키지 매니저 - [설치 가이드](https://yarnpkg.com/getting-started/install)
3. PostgreSQL - [다운로드 링크](https://www.postgresql.org/download/)
4. 코드 에디터 (VS Code 추천) - [다운로드 링크](https://code.visualstudio.com/)

## 프로젝트 설정하기 🛠

### 1. 프로젝트 폴더 만들기
```bash
mkdir express-prisma-rest-api
cd express-prisma-rest-api
```

### 2. 프로젝트 파일 복사하기
이 저장소의 모든 파일을 방금 만든 폴더에 복사해주세요.

### 3. 필요한 패키지 설치하기
터미널(또는 명령 프롬프트)을 열고 다음 명령어를 실행해주세요:
```bash
yarn install
```

### 4. 환경 설정 파일 만들기
1. 프로젝트 루트 디렉토리에 `.env` 파일을 생성해주세요:
```bash
touch .env  # Mac/Linux의 경우
# 또는 윈도우에서는 직접 .env 파일을 생성해주세요
```

2. `.env` 파일을 열어서 다음 내용을 입력해주세요:
```env
# 데이터베이스 연결 정보
DATABASE_URL="postgresql://사용자이름:비밀번호@localhost:5432/데이터베이스이름"

# 서버 포트 설정
PORT=3000
```

⚠️ 주의사항:
- `사용자이름`: PostgreSQL 데이터베이스 사용자 이름
- `비밀번호`: PostgreSQL 데이터베이스 비밀번호
- `데이터베이스이름`: 사용할 PostgreSQL 데이터베이스 이름
예시: DATABASE_URL="postgresql://postgres:1234@localhost:5432/myapp"

### 5. 데이터베이스 설정하기

#### 최초 데이터베이스 초기화
프로젝트를 처음 시작할 때 한 번만 실행하면 됩니다:
```bash
yarn prisma:init
```
이 명령어는 데이터베이스를 초기화하고 필요한 테이블들을 생성합니다.

## 프로젝트 실행하기 🚀

개발 모드로 서버 실행하기:
```bash
yarn dev
```

일반 모드로 서버 실행하기:
```bash
yarn start
```

서버가 정상적으로 실행되면 콘솔에 "Server is running on port 3000" 메시지가 표시됩니다.

## API 사용해보기 🎯

### 사용자 관리 API

#### 새 사용자 만들기
```bash
POST http://localhost:3000/api/users
Content-Type: application/json

{
    "email": "test@example.com",
    "name": "홍길동"
}
```

#### 모든 사용자 조회하기
```bash
GET http://localhost:3000/api/users
```

#### 특정 사용자 조회하기
```bash
GET http://localhost:3000/api/users/1
```

#### 사용자 정보 수정하기
```bash
PUT http://localhost:3000/api/users/1
Content-Type: application/json

{
    "name": "새이름"
}
```

#### 사용자 삭제하기
```bash
DELETE http://localhost:3000/api/users/1
```

### 게시글 관리 API

#### 새 게시글 작성하기
```bash
POST http://localhost:3000/api/posts
Content-Type: application/json

{
    "title": "첫 번째 게시글",
    "content": "안녕하세요!",
    "authorId": 1,
    "published": true
}
```

#### 모든 게시글 조회하기
```bash
GET http://localhost:3000/api/posts
```

#### 특정 게시글 조회하기
```bash
GET http://localhost:3000/api/posts/1
```

#### 게시글 수정하기
```bash
PUT http://localhost:3000/api/posts/1
Content-Type: application/json

{
    "title": "수정된 제목",
    "content": "수정된 내용"
}
```

#### 게시글 삭제하기
```bash
DELETE http://localhost:3000/api/posts/1
```

## API 테스트하기 🧪

API를 테스트하는 방법에는 여러 가지가 있어요:

1. [Postman](https://www.postman.com/downloads/) - 추천!
2. [Insomnia](https://insomnia.rest/download)
3. VS Code의 [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) 확장 프로그램
4. curl 명령어 (터미널에서 사용)

## 프로젝트 구조 설명 📁

```
express-prisma-rest-api/
├── .env                    # 환경 변수 설정 파일
├── .gitignore             # Git 무시 파일 목록
├── .yarnrc.yml            # Yarn 설정 파일
├── package.json           # 프로젝트 설정 및 의존성
├── prisma/                # Prisma 관련 파일들
│   └── schema.prisma      # 데이터베이스 스키마 정의
└── src/                   # 소스 코드
    ├── config/            # 설정 파일들
    │   └── database.js    # 데이터베이스 연결 설정
    ├── routes/            # API 라우트 정의
    │   ├── userRoutes.js  # 사용자 관련 API
    │   └── postRoutes.js  # 게시글 관련 API
    └── index.js           # 메인 서버 파일
```

## 문제 해결하기 🔧

### 자주 발생하는 문제들

1. **서버가 시작되지 않는 경우**
   - PORT가 이미 사용 중인지 확인해보세요
   - .env 파일이 올바르게 설정되어 있는지 확인해보세요
   - 모든 패키지가 설치되어 있는지 확인해보세요

2. **데이터베이스 연결 오류**
   - PostgreSQL이 실행 중인지 확인해보세요
   - 데이터베이스 접속 정보가 올바른지 확인해보세요
   - 데이터베이스가 생성되어 있는지 확인해보세요

3. **마이그레이션 오류**
   - `yarn prisma:init`을 실행했는지 확인해보세요
   - 데이터베이스 연결이 정상적인지 확인해보세요
   - schema.prisma 파일에 문법 오류가 없는지 확인해보세요

### 도움이 필요하다면?

1. 에러 메시지를 자세히 읽어보세요
2. 구글에서 에러 메시지를 검색해보세요
3. [Prisma 문서](https://www.prisma.io/docs/)나 [Express 문서](https://expressjs.com/)를 참고해보세요

## 더 배워보기 📚

이 프로젝트를 마스터했다면, 다음 단계로 이런 것들을 시도해볼 수 있어요:

1. 사용자 인증 추가하기 (JWT나 세션 사용)
2. 입력 값 유효성 검사 추가하기
3. 파일 업로드 기능 추가하기
4. API 문서 자동화하기 (Swagger/OpenAPI 사용)
5. 테스트 코드 작성하기

## 기타 참고 자료 📖

- [Node.js 공식 문서](https://nodejs.org/docs)
- [Express.js 공식 문서](https://expressjs.com/)
- [Prisma 공식 문서](https://www.prisma.io/docs/)
- [PostgreSQL 공식 문서](https://www.postgresql.org/docs/)
- [Yarn 공식 문서](https://yarnpkg.com/getting-started)

화이팅! 궁금한 점이 있으면 언제든 질문해주세요! 🙌