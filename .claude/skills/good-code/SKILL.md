---
name: good-code
description: Use when implementing any new feature, writing components, or reviewing code structure. Covers 4 code quality principles from Toss Frontend Fundamentals.
---

# Good Code

**좋은 코드 = 변경하기 쉬운 코드.** 아래 4가지 기준으로 판단하되, 상황에 따라 유연하게 적용한다.

---

## 1. 가독성 — 한 번에 고려하는 맥락을 줄인다

### 같이 실행되지 않는 코드는 분리

서로 다른 조건에서만 실행되는 코드가 한 컴포넌트에 섞이면 읽기 어렵다.

```tsx
// ❌ 같이 있으면 두 경우를 동시에 생각해야 함
function SubmitButton() {
  const isViewer = useRole() === "viewer";
  useEffect(() => {
    if (!isViewer) showButtonAnimation();
  }, [isViewer]);
  return isViewer ? (
    <TextButton disabled>Submit</TextButton>
  ) : (
    <Button type="submit">Submit</Button>
  );
}

// ✅ 각자 자신의 역할만 신경 씀
function SubmitButton() {
  const isViewer = useRole() === "viewer";
  return isViewer ? <ViewerSubmitButton /> : <AdminSubmitButton />;
}
```

### 구현을 추상화해서 상위 수준의 의도를 드러내기

복잡한 구현을 숨기고 의미 있는 이름으로 감싸면, 읽는 사람이 한 번에 처리할 맥락이 줄어든다.

```tsx
// ❌ 인증 확인 로직이 페이지 안에 그대로 노출
function LoginStartPage() {
  const { data: user } = useUser();
  if (!user) return <Navigate to="/login" />;
  return <Main />;
}

// ✅ 의도가 이름으로 드러남
function LoginStartPage() {
  return (
    <AuthGuard>
      <Main />
    </AuthGuard>
  );
}
```

### 복잡한 조건식엔 이름 붙이기

조건이 복잡하거나 여러 줄이면 변수에 담아 의도를 드러낸다.

```tsx
// ❌ 무슨 조건인지 바로 파악 안됨
const result = products.filter((p) =>
  p.categories.some(
    (c) =>
      c.id === targetCategory.id &&
      p.prices.some((price) => price >= min && price <= max),
  ),
);

// ✅ 이름이 의도를 설명
const matchedProducts = products.filter((product) => {
  return product.categories.some((category) => {
    const isSameCategory = category.id === targetCategory.id;
    const isPriceInRange = product.prices.some(
      (price) => price >= min && price <= max,
    );
    return isSameCategory && isPriceInRange;
  });
});
```

단순한 표현식(`arr.map(x => x * 2)`)은 이름 없이도 명확하다.

### 매직 넘버에 이름 붙이기

숫자만 보면 의도를 알 수 없다. 이름 있는 상수로 목적을 드러낸다.

```ts
// ❌ 300이 뭔지 모름 — 애니메이션? API 딜레이? 테스트 코드?
await delay(300);

// ✅ 목적이 명확
const ANIMATION_DELAY_MS = 300;
await delay(ANIMATION_DELAY_MS);
```

### 시점 이동 줄이기

조건을 이해하려고 다른 파일/함수로 이동해야 한다면, 호출 시점에서 바로 알 수 있도록 인라인으로 옮긴다.

```tsx
// ❌ policy가 뭔지 알려면 getPolicyByRole, POLICY_SET까지 따라가야 함
const policy = getPolicyByRole(user.role);
if (!policy.canInvite) return null;

// ✅ 한 눈에 파악 가능
const policy = { admin: { canInvite: true }, viewer: { canInvite: false } }[
  user.role
];
```

### 중첩 삼항 대신 IIFE + if문

삼항이 중첩되면 어떤 조건에서 어떤 값인지 추적하기 어렵다.

```ts
// ❌ 읽기 어려움
const status = A && B ? "BOTH" : A || B ? (A ? "A" : "B") : "NONE";

// ✅ 명확
const status = (() => {
  if (A && B) return "BOTH";
  if (A) return "A";
  if (B) return "B";
  return "NONE";
})();
```

### 범위 비교는 수학 표기 순서로

`b <= a && a <= c` 형태가 수학적 부등식과 같아 직관적이다.

```ts
// ❌ 중간값을 두 번 처리해야 파악됨
if (score >= 80 && score <= 100) { ... }

// ✅ 수직선에서 범위를 보듯 읽힘
if (80 <= score && score <= 100) { ... }
```

### 실행 맥락별로 함수 분리

하나의 훅/함수가 여러 역할을 한꺼번에 담당하면 필요한 부분만 이해하기 어렵다.

```ts
// ❌ 모든 파라미터를 한 훅에서 관리 → 카드 ID만 쓰는데 전체 의존
const { cardId, statementId, dateFrom, ... } = usePageState();

// ✅ 역할이 명확한 전용 훅
const [cardId, setCardId] = useCardIdQueryParam();
```

---

## 2. 예측 가능성 — 이름만 봐도 동작을 알 수 있어야 한다

### 같은 이름 = 같은 동작

이름이 같으면 동일하게 동작해야 한다. 동작이 다르면 이름을 다르게 해서 차이를 드러낸다.

```ts
// ❌ http.get()인데 인증 헤더를 자동으로 붙임 — 호출하는 쪽이 예상 못함
export const http = {
  async get(url: string) {
    const token = await fetchToken();
    return httpLibrary.get(url, { headers: { Authorization: `Bearer ${token}` } });
  }
};

// ✅ 이름에서 차이가 드러남
export const httpService = {
  async getWithAuth(url: string) { ... }
};
```

### 비슷한 역할의 함수는 반환 타입 통일

같은 종류의 함수가 제각각 반환 타입을 쓰면, 쓸 때마다 타입을 확인해야 한다.

```ts
// ❌ useUser()는 Query 객체, useServerTime()은 값만 반환
const { data: user } = useUser();
const serverTime = useServerTime(); // 값 바로 반환

// ❌ 검증 함수 반환 타입이 불일치
checkIsNameValid(name); // boolean
checkIsAgeValid(age); // { ok: false, reason: string } — object는 항상 truthy!

// ✅ 타입을 통일하고 Discriminated Union 활용
type ValidationResult = { ok: true } | { ok: false; reason: string };
```

### 숨은 사이드이펙트는 함수 이름에 드러내거나 호출 시점으로 이동

함수 이름이 약속하지 않은 동작은 호출하는 쪽에서 예상할 수 없다.

```ts
// ❌ fetchBalance인데 로깅도 함 — 이름에서 예측 불가
async function fetchBalance(): Promise<number> {
  const balance = await http.get<number>("...");
  logging.log("balance_fetched"); // 숨은 사이드이펙트
  return balance;
}

// ✅ 로깅은 호출하는 쪽에서 명시적으로
async function fetchBalance(): Promise<number> {
  return http.get<number>("...");
}

// 호출 시점에서 의도가 보임
const balance = await fetchBalance();
logging.log("balance_fetched");
```

---

## 3. 응집도 — 함께 바뀌는 코드는 함께 있어야 한다

### 도메인 기반 디렉토리 구조

타입별(components/, hooks/, utils/)로 나누면 하나의 기능을 수정할 때 여러 디렉토리를 오가야 한다. 도메인 기반으로 묶으면 관련 파일이 한 곳에 있다.

```
// ❌ 타입 기반 — 기능 하나 수정에 3개 디렉토리 이동
src/components/UserCard.tsx
src/hooks/useUser.ts
src/utils/userUtils.ts

// ✅ 도메인 기반 — 관련 파일이 한 곳에, 삭제도 폴더 하나면 끝
src/domains/User/
  UserCard.tsx
  useUser.ts
  userUtils.ts
```

공통으로 쓰는 것만 최상위 `components/`, `hooks/`, `utils/`에 둔다. 도메인 간 import(`../../OtherDomain/hooks`)가 보이면 의존 관계를 의심한다.

### 상수는 의미와 함께 한 곳에

매직 넘버를 상수로 만들면 값의 의미와 위치가 함께 관리된다. 애니메이션 딜레이가 바뀌면 `ANIMATION_DELAY_MS`만 수정하면 된다.

### 폼 응집도: 필드 단위 vs 폼 단위

- **필드 단위**: 각 입력이 독립적으로 검증될 때, 필드를 재사용할 때 (`react-hook-form` 개별 validate)
- **폼 단위**: 필드 간 의존성이 있을 때, 폼 전체가 하나의 기능일 때 (`zod` schema)

변경 패턴에 맞춰 선택한다.

---

## 4. 결합도 — 수정 시 영향 범위를 작게 유지한다

### 훅/함수는 하나의 책임만

여러 역할을 담당하면 한 곳을 수정할 때 다른 역할에 영향이 생긴다.

```ts
// ❌ usePageState가 모든 쿼리 파라미터를 한 번에 관리
// → cardId만 바꿔도 statementId 사용 컴포넌트도 리렌더링

// ✅ 각 파라미터를 전담하는 훅으로 분리
function useCardIdQueryParam() { ... }
function useStatementIdQueryParam() { ... }
// 수정 영향 범위가 해당 훅 사용처로만 한정됨
```

### 영향범위가 다른 중복 코드는 분리 유지

공통으로 쓸 수 있어도, 각 사용처의 요구사항이 나중에 달라질 수 있다. 억지로 묶으면 한쪽을 수정할 때 다른 쪽까지 테스트해야 한다.

```ts
// 두 페이지에서 거의 같은 바텀시트 로직 사용 → 당장은 같아 보여도
// 페이지 A는 로깅 값이 다르고, 페이지 B는 닫기 동작이 다를 수 있음
// → 나중에 달라질 것 같으면 처음부터 분리하는 게 낫다
```

판단 기준: 지금도, 앞으로도 동일하게 동작할 것이 확실할 때만 공통화한다.

### Props Drilling 제거

중간 컴포넌트가 실제로 사용하지 않는 props를 단순 전달만 할 때, 이름이 바뀌면 연쇄 수정이 발생한다.

1. **조합 패턴 (먼저 시도)**: `children`으로 내려보내 중간 계층 제거
2. **Context API**: 조합으로 해결 안 될 때만 사용

```tsx
// ❌ 중간 컴포넌트들이 items, recommendedItems, keyword를 그냥 통과시킴
<ItemEditModal items={items} recommendedItems={...} keyword={...} />
  <ItemEditBody items={items} recommendedItems={...} keyword={...} />
    <ItemEditList items={items} ... />

// ✅ 조합 패턴
<ItemEditModal>
  <ItemEditList items={items} />
</ItemEditModal>
```

---

## 체크리스트

- [ ] 같이 실행되지 않는 코드를 같은 함수/컴포넌트에 뒀나?
- [ ] 이름만 봐도 동작과 사이드이펙트를 예측할 수 있나?
- [ ] 함께 바뀌는 파일이 같은 디렉토리에 있나?
- [ ] 훅/함수 하나가 여러 역할을 담당하고 있지 않나?
- [ ] Props Drilling이 3단계 이상이면 조합 패턴 또는 Context 검토했나?
