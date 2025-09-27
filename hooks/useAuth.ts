
// This file is kept for structural completeness, but its content has been merged into context/AuthContext.tsx
// to simplify the structure for this single-page application and avoid circular dependencies.
// See context/AuthContext.tsx for the `useAuth` implementation.
import { useAuth as useAuthFromContext } from '../context/AuthContext';

/**
 * Custom hook to access the authentication context.
 * @deprecated Merged into AuthContext.tsx for simplicity. Use `import { useAuth } from './context/AuthContext'` instead.
 */
export const useAuth = useAuthFromContext;
