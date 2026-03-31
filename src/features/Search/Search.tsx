import { useCallback } from 'react';
import { Input } from 'antd';

import styles from './Search.module.scss';
import SearchIcon from '@/assets/search.svg?react';
import { useSearch } from './model/useSearch';

export const Search = () => {
  const { value, handleChange } = useSearch();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e.target.value);
    },
    [handleChange],
  );

  return (
    <div className={styles.container}>
      <Input
        rootClassName={styles.input}
        className={styles.field}
        placeholder="Найти"
        value={value}
        onChange={onChange}
        allowClear
        prefix={<SearchIcon className={styles.icon} />}
      />
    </div>
  );
};
