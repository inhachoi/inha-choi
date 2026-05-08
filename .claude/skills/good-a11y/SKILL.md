---
name: good-a11y
description: Use when writing or modifying UI components, interactive elements, forms, or any HTML structure - before finalizing markup
---

# Accessibility (a11y)

접근성은 장애 사용자뿐 아니라 **모든 사용자**에게 필요한 기반이다. 시맨틱 HTML이 잘 갖춰져야 키보드 탐색, 우클릭 메뉴, Enter 제출 같은 기본 동작도 제대로 작동한다.

---

## 4가지 원칙

### 1. 올바른 구조

HTML 요소를 의미에 맞게 배치하고 중첩하는 것이 접근성의 시작이다.

- 버튼 안에 버튼, `<main>` 안에 `role="button"` 등 잘못된 중첩 금지
- `<div>`에 클릭 핸들러를 달려면 반드시 `role` 명시
- 테이블 행 전체를 클릭 가능하게 만들 때 구조 주의

```tsx
// ❌ div에 클릭 핸들러만 있으면 스크린 리더가 인식 못 함
<div onClick={handleClick}>클릭</div>

// ✅ role과 tabIndex 함께
<div role="button" tabIndex={0} onClick={handleClick}>클릭</div>

// ✅ 더 좋음 — 시맨틱 요소 사용
<button onClick={handleClick}>클릭</button>
```

### 2. 의미 전달

사용자가 요소의 목적과 기능을 명확히 알 수 있어야 한다.

```tsx
// ❌ 아이콘만 있는 버튼 — 스크린 리더에 아무것도 안 읽힘
<button><img src="close.svg" alt="" /></button>

// ✅ aria-label로 목적 설명
<button aria-label="닫기"><img src="close.svg" alt="" /></button>

// ❌ 이미지에 alt 없음
<img src="home.svg" />

// ✅ alt 필수 (장식용이면 alt="" 허용)
<img src="home.svg" alt="홈" />
```

### 3. 예측 가능한 인터랙션

시각적으로 보이는 모습과 실제 동작이 일치해야 한다.

- 폼 입력은 `<form>`으로 감싸야 Enter 제출이 동작함
- `<a>` 태그를 써야 우클릭 → 새 탭으로 열기가 동작함
- `<input>`은 반드시 `<label>`과 연결

```tsx
// ❌ 폼이 없으면 Enter 제출 안됨
<div>
  <input type="text" />
  <button onClick={submit}>제출</button>
</div>

// ✅
<form onSubmit={submit}>
  <label htmlFor="name">이름</label>
  <input id="name" type="text" />
  <button type="submit">제출</button>
</form>
```

### 4. 시각 정보 보완

색상, 아이콘, 이미지만으로 정보를 전달하면 색각 이상자나 스크린 리더 사용자가 놓친다.

- 색상으로만 상태 표현 금지 → 텍스트나 아이콘 병행
- 이미지의 의미는 `alt`로 설명
- 아이콘 버튼에 `aria-label` 필수

---

## ESLint 규칙 (jsx-a11y)

| 규칙                                            | 검사 내용                               |
| ----------------------------------------------- | --------------------------------------- |
| `alt-text`                                      | `<img>`에 alt 필수                      |
| `control-has-associated-label`                  | 인터랙티브 요소에 레이블 필수           |
| `no-noninteractive-element-interactions`        | `<div>` 클릭 시 role 필요               |
| `no-noninteractive-element-to-interactive-role` | `<main>` 등에 `role="button"` 부여 금지 |
| `no-noninteractive-tabindex`                    | 인터랙티브 요소만 tabIndex 허용         |
| `tabindex-no-positive`                          | tabIndex는 0 또는 -1만 사용             |

---

## 체크리스트

- [ ] 클릭 가능한 요소가 `<button>` 또는 `role="button"` + `tabIndex={0}`인가?
- [ ] `<img>`에 alt 있나? (장식용은 `alt=""`)
- [ ] 아이콘 버튼에 `aria-label` 있나?
- [ ] 폼 입력에 `<label>` 연결됐나?
- [ ] 색상만으로 상태를 표현하고 있지 않나?
- [ ] `tabIndex`가 양수(1 이상)인 경우가 없나?
