# 예: gateway/Dockerfile (auth, event도 동일)
FROM node:18

# 작업 디렉토리 설정
WORKDIR /app

# package.json 복사 후 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# NestJS 빌드 (필요한 경우)
RUN npm run build

# 애플리케이션 실행
CMD ["npm", "run", "start:prod"]
