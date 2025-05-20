
# 이벤트 보상 관리 시스템

---

## 기능 상세

###  Gateway Server
- 모든 요청을 받아 **라우팅 및 인증/인가 처리**
- **JWT 검증** 및 **역할(Role) 검사**
- NestJS의 `@nestjs/passport`, `AuthGuard`, `RolesGuard` 사용
- 역할에 따른 접근 권한 분기 처리

### Auth Server
- 유저 등록 / 로그인
- JWT 발급 및 검증
- 역할(Role) 관리

| 역할     | 권한 설명                        |
|----------|---------------------------------|
| USER     | 보상 요청 가능                   |
| OPERATOR | 이벤트 및 보상 등록 가능         |
| AUDITOR  | 보상 이력 조회만 가능            |
| ADMIN    | 모든 기능 접근 가능              |

### Event Server

#### 1. 이벤트 등록 / 조회
- **운영자(OPERATOR)** 또는 **관리자(ADMIN)** 가 이벤트 생성 가능
- 이벤트 조건: 로그인 3일 연속, 친구 초대, 레벨 달성 등
- 정보 포함: `event_type`, `condition`, `start_date`, `end_date`, `is_active`
- 전체 목록 및 상세 조회 API 제공

#### 2. 보상 등록 / 조회
- 이벤트에 **보상 정보 추가** 가능
- 보상 예: 포인트, 아이템, 쿠폰 등 (`item`, `qty` 포함)
- 각 보상은 특정 이벤트와 **연결 관계**를 가짐

#### 3. 유저 보상 요청
- 유저는 **보상 요청 가능**
- 시스템은 **조건 충족 여부 검증**
- **중복 요청 방지**, 요청 결과 기록 (성공/실패 등)

#### 4. 보상 요청 내역 조회
- 유저: 본인 요청 내역 조회
- 운영자 / 감사자 / 관리자: 전체 유저 요청 내역 조회
- (선택) 필터링 기능: 이벤트별, 상태별 등

---

## 인증 구조

- **JWT 기반 인증**
- 인증 토큰은 요청 헤더의 `Authorization: Bearer <token>` 형식
- 역할 기반 권한 확인은 `RolesGuard`를 통해 처리

---

## 시스템 구조

```

myproject/
├── auth-server/       # 사용자 인증 및 역할 관리
├── event-server/      # 이벤트 및 보상 처리 로직
├── gateway-server/    # 인증 및 요청 라우팅
├── docker-compose.yml
└── README.md

````

---

## 실행 방법 (Docker Compose)

### 📦 사전 준비
- Docker & Docker Compose 설치

### 실행

```bash
# 루트 디렉토리에서 실행
docker-compose up --build
````

### 서버 주소

* Gateway API: `http://localhost:3000`
* Auth Server: `http://localhost:4000`
* Event Server: `http://localhost:5000`
* MongoDB: `mongodb://localhost:27017`

---

## ✅ 개발 스택

* **Framework**: NestJS
* **Database**: MongoDB
* **Authentication**: JWT + Passport
* **Deployment**: Docker, Docker Compose

---

## API

- Base URL : http://localhost:3000/
- 인증 : Jwt ( Authorization: Bearer accessToken... )
- Content-Type : application/json

| EndPoint        | Method | Detail                      | role     |
|-----------------|--------|-----------------------------|----------|
| auth/login      | POST   | 로그인                      | 공통     |
| users/signup    | POST   | 회원가입                    | 공통     |
| users/:username | GET    | 유저 본인 정보 조회         | user     |
| event/create    | POST   | 이벤트 생성                 | operator |
| event/list      | GET    | 진행중인 이벤트 목록 조회   | 공통     |
| event/:id       | GET    | 이벤트 상세 조회            | 공통     |
| reward/create   | POST   | 보상 설정                   | operator |
| reward/total    | GET    | 보상 요청 내역 조회(관리자) | auditor  |
| reward/:id      | GET    | 보상 요청 내역 조회(유저)   | user     |
| reward/request  | POST   | 유저 보상 신청              | user     |

---

## 예시 시나리오
1. operator가 회원가입을 한다 
| 항목      | 설명                               |
|-----------|------------------------------------|
| Method    | POST   | 
| URL       | http://localhost:3000/users/signup |
| 설명      |     |
| 요청 헤더 | POST   | 
| 요청 본문 | GET    |
| 성공 응답 | POST   | 
| 실패 응답 | GET    |











