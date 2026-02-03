import { useCallback, useEffect, useState } from 'react';

const noop = () => Promise.resolve();

export const useAsync = (asyncFunction = noop, deps = [], options = {}) => {
  const { immediate = true, initialValue = null } = options;
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const depsArray = Array.isArray(deps) ? deps : [deps];

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const result = await asyncFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [asyncFunction, ...depsArray],
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { data, loading, error, execute, setData };
};

export default useAsync;
