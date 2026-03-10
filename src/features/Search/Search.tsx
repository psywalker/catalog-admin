import styles from './Search.module.scss';
import SearchIcon from '@/assets/search.svg?react';
import { Input } from 'antd';
import { useCallback } from 'react';

export interface SearchProps {
  onChange?: (value: string) => void;
}

export const Search = ({ onChange }: SearchProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    },
    [onChange],
  );

  return (
    <div className={styles.container}>
      <Input
        rootClassName={styles.input}
        className={styles.field}
        placeholder="Найти"
        onChange={handleChange}
        allowClear
        prefix={<SearchIcon className={styles.icon} />}
      />
    </div>
  );
};
