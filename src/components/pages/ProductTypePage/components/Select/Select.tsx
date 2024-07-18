interface Props {
  options: Option[];
  value: SortType | number | undefined;
  onChange: (value: SortType | number | undefined) => void;
  className: string;
}

import { useEffect, useRef, useState } from 'react';

import { SortType } from '../../../../../types';
import styles from './Select.module.scss';

interface Option {
  value: SortType | number | undefined;
  label: string;
}

const CustomSelect: React.FC<Props> = ({
  options,
  value,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue: SortType | number | undefined) => {
    if (typeof optionValue !== 'undefined') {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as HTMLElement)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`${styles.customSelect} ${className}`} ref={dropdownRef}>
      <div className={styles.selectedOption} onClick={toggleDropdown}>
        {value === undefined || !options.find(option => option.value === value)
          ? 'Select...'
          : options.find(option => option.value === value)?.label}
      </div>
      {isOpen && (
        <div className={styles.optionsContainer}>
          {options.map(option => (
            <div
              key={option.value}
              className={`${styles.option} ${value === option.value ? styles.selected : ''}`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
