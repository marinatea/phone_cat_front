interface Props {
  iconId: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

import classnames from 'classnames';
import styles from './Icon.module.scss';

const Icon: React.FC<Props> = ({ iconId, className, onClick, disabled }) => {
  return (
    <svg
      className={classnames(styles.container, className, {
        [styles.disabled]: disabled,
      })}
      onClick={!disabled ? onClick : undefined}
    >
      <use href={`/img/sprite.svg#${iconId}`} />
    </svg>
  );
};

export default Icon;
