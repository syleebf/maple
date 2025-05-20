# Maple_Report

## 소개

이 프로젝트는 ...

## 목차

- [설치](#설치)
- [사용법](#사용법)
- [기여](#기여)
- [라이선스](#라이선스)

## 설치
|auth-server/auth/login      | POST | 로그인                      | 공통     |
|:---------------------------|:------|:---------------------------|:---------|
| auth-server/users/signup    | POST | 회원가입                    | 공통     | 
| auth-server/users/:username | GET  | 유저 본인 정보 조회         | user     | 
| event-server/event/create   | POST | 이벤트 생성                 | operator | 
| event-server/event/list     | GET  | 진행중인 이벤트 목록 조회   | 공통     |  
| event-server/event/:id      | GET  | 이벤트 상세 조회            | 공통     | 
| event-server/reward/create  | POST | 보상 설정                   | operator |
| event-server/reward/total   | GET  | 보상 요청 내역 조회(관리자) | auditor  | 
| event-server/reward/:id     | GET  | 보상 요청 내역 조회(유저)   | user     |
| event-server/reward/request | POST | 유저 보상 신청              | user     | 
