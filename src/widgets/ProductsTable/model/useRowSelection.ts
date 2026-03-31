import { useCallback, useState, type Key } from 'react';

export const useRowSelection = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const toggleRow = useCallback((key: Key) => {
    setSelectedRowKeys((prev) => {
      const exists = prev.includes(key);
      return exists ? prev.filter((item) => item !== key) : [...prev, key];
    });
  }, []);

  const handleSelectionChange = useCallback((keys: Key[]) => {
    setSelectedRowKeys(keys);
  }, []);

  return {
    selectedRowKeys,
    toggleRow,
    handleSelectionChange,
  };
};
