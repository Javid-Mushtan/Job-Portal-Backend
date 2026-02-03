import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { setClientToken } from '../api/client.js';

const STORAGE_KEY = 'job_portal_auth';

const AuthContext = createContext(null);

const normalizeSession = (payload) => {
  if (!payload) return null;
  if (payload.token && payload.user) {
    return payload;
  }

  const roles = payload.roles
    ? payload.roles
    : payload.role
    ? [payload.role]
    : payload.user?.roles ?? [];

  const user = payload.user ?? {
    id: payload.id,
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName,
    roles,
  };

  return {
    token: payload.token ?? payload.accessToken ?? payload.jwt,
    type: payload.type ?? 'Bearer',
    user,
  };
};

const parseStoredAuth = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return normalizeSession(parsed);
  } catch (error) {
    console.error('Failed to parse auth session', error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => parseStoredAuth());

  useEffect(() => {
    const token = session?.token;
    setClientToken(token);
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [session]);

  const value = useMemo(
    () => ({
      session,
      token: session?.token,
      user: session?.user,
      login: (payload) => setSession(normalizeSession(payload)),
      logout: () => setSession(null),
      updateUser: (userPatch) =>
        setSession((prev) =>
          prev
            ? {
                ...prev,
                user: {
                  ...prev.user,
                  ...userPatch,
                },
              }
            : prev,
        ),
      isEmployer: session?.user?.roles?.includes('ROLE_EMPLOYER'),
      isJobSeeker: session?.user?.roles?.includes('ROLE_JOB_SEEKER'),
      hasRole: (role) => session?.user?.roles?.includes(role),
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
