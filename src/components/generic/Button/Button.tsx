interface Props {
  onClick?: VoidFunction;
  icon?: Icons;
  title?: string | number;
  type?: 'primary' | 'secondary' | 'rounded' | 'transparent';
  isDisabled?: boolean;
  isSelected?: boolean;
  className?: string;
}

import Icon from '../Icon/Icon';
import { Icons } from '../../../types';
import classnames from 'classnames';
import styles from './Button.module.scss';

const Button: React.FC<Props> = ({
  type = 'primary',
  onClick = () => {},
  isDisabled = false,
  isSelected = false,
  className,
  title,
  icon,
}) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={classnames(styles.container, className, {
        [styles.isDisabled]: isDisabled,
        [styles.isSpaceBetween]: !!title && !!icon,
        [styles.primary]: type === 'primary',
        [styles.secondary]: type === 'secondary',
        [styles.transparent]: type === 'transparent',
        [styles.selected]: isSelected,
      })}
    >
      {title}
      {icon && <Icon iconId={icon} />}
    </button>
  );
};

export default Button;
