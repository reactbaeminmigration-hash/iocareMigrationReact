import { useNavigate } from "react-router-dom";

type Options = {
  fallback?: string;   // 없으면 홈으로
  replace?: boolean;   // fallback 이동 시 replace 여부
  onBefore?: () => void; // 로그/추적 등 훅 전 처리
};

const ROUTES = {
    HOME: "/",
} as const;

export function useBackNavigation(options: Options = {}) {
    const { fallback = ROUTES.HOME, replace = true, onBefore } = options;
    const navigate = useNavigate();

    return () => {
        onBefore?.();
        const canGoBack = typeof window !== "undefined" && (window.history.state?.idx ?? 0) > 0;

        if (canGoBack) {
            navigate(-1);
        } else {
            navigate(fallback, { replace });
        }
    };
}