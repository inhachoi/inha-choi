import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      /**
       * Type Rules
       * - 세부 기준은 ESLint로 강제하기 힘드니, 다음과 같이 주석으로 정리
       * - union 타입만 type 사용, 그 외 객체 타입은 interface 사용
       * - props 타입: Props
       * - 서버 통신 데이터 타입: ~DTO (ModelName + DTO)
       * - 단일 사용 타입은 파일 내 선언, 재사용 시 types.ts 분리
       * - props가 2개 이상일 때만 타입 분리, 그 외에는 인라인 선언
       */
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
          suffix: ["Props", "DTO"],
        },
      ],
    },
  },
]);
