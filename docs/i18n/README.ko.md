<div align="center">
  <h1>🧪 AcidMind</h1>
  <p><strong>한국어 문서</strong> ·
    <a href="../../README.md">English</a> |
    <a href="README.ja.md">日本語</a> |
    <a href="README.zh-CN.md">简体中文</a> |
    <a href="README.pt-BR.md">Português</a> |
    <a href="README.es.md">Español</a>
  </p>
</div>

# AcidMind

AI 코딩 에이전트를 위한 8개의 전문 비판 스킬. 하나의 라우터. 단 하나의 일반적인 리뷰도 없습니다.

렌즈 없이 코드를 리뷰하는 AI 에이전트는 항상 똑같이 무난한 문단을 내놓습니다: 칭찬, 사소한 지적 몇 개, 애매한 마무리. AcidMind는 당신이 실제로 물은 질문에 답하는 전문가들로 그것을 대체합니다. 아키텍처 우려에는 아키텍처 리뷰를, 기능에는 빈 상태(empty state)까지 포함해 실제 사용자 관점에서 검증하고, 출시 전 앱은 실제 공격자처럼 공격한 뒤 하드닝 플랜과 함께 돌려줍니다.

모든 리뷰는 기계적으로 도출된 한 줄 판정으로 끝납니다:

> **Gate: SHIP | FIX FIRST | DO NOT SHIP**

스킬은 필요할 때만 로드됩니다. 코드 리뷰에 소요되는 컨텍스트는 5개 파일뿐입니다.

## 스킬 패밀리

| 스킬 | 페르소나 | 답하는 질문 | 커맨드 |
|---|---|---|---|
| `ruthless-critic` | 🧪 산 테스트 (ROAST / AUTOPSY / HONEST 레지스터) | 이 아티팩트는 구체적으로 어디서 무너지는가? | `/grill-me`, `/autopsy`, `/tellingtruth`, `/honest` |
| `design-critic` | 🧠 설계자 | 이 구조는 다음 세 번의 요구사항 변경을 견딜 수 있는가? | `/designcritic` |
| `feature-critic` | 🔪 해부사 | 이 기능이 모든 상태에서 실제 사용자에게 작동하는가? | `/featurecritic` |
| `badass-critic` | 💻 성능 엔지니어 | 어떤 부하에서, 어떻게 측정했을 때 한계에 도달하는가? | `/badass` |
| `security-critic` | 😠🥷 인시던트 커맨더 + 고용된 해커 (Protocol A 재난 시뮬레이션 / Protocol B 레드팀) | 무엇이 치명적으로 잘못될 수 있는가? 누가 어떻게 침입하는가? | `/heartattack`, `/blackhat`, `/pentest` |
| `autocritic-skill` | 🎭 감사관 | 이 SKILL.md가 올바르게 트리거되고 유용한 출력을 내는가? | `/auditskill` |
| `unified-critic` | 🧩 패널 진행자 | 모든 렌즈의 결과를 하나의 보고서로 병합하면? | `/acidmind` |
| `secondthought-critic` | 🤔 실행 직전의 제동 | **매 세션 자동 로드:** 의견이나 계획을 말하면 에이전트가 실행하기 전에 비판합니다 | 자동, `/wait` |

세 가지 공통 속성: 기본 읽기 전용 · 범위가 겹치지 않음 · 목적 게이트(기술 금지가 아닌 목적 없는 기술이 발견 사항).

## 빠른 시작

```bash
npx github:ragajatsuma-cmd/acidmind init                    # core (5 스킬)
npx github:ragajatsuma-cmd/acidmind init --edition security # + security-critic (6)
npx github:ragajatsuma-cmd/acidmind init --all              # full (8)
```

Claude Code 플러그인:

```bash
/plugin marketplace add https://github.com/ragajatsuma-cmd/acidmind
/plugin install acidmind@acidmind
```

업데이트:

```bash
npx github:ragajatsuma-cmd/acidmind status   # 설치 버전 vs 최신
npx github:ragajatsuma-cmd/acidmind update   # 자동 업데이트
```

## 책임 사용

`security-critic` Protocol B는 사용자가 소유하거나 서면 허가를 받은 대상만 공격합니다. 그 외에는 거부하며, 실행 가능한 익스플로잇을 생성하지 않고, 설치된 Strix/Wallbreaker 에이전트를 통해서만 위임합니다. 8개 스킬 중 나머지 7개는 명시적 요청이 없는 한 순수 읽기 전용 진단 도구입니다.

## 라이선스

MIT, [LICENSE](../../LICENSE) 참조.
