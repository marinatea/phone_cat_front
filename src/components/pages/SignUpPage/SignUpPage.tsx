import { SignUp } from '@clerk/clerk-react';
import styles from './SignUpPage.module.scss';

const SignUpPage: React.FC = () => {
  return (
    <div className={styles.signUpPage}>
      <SignUp signInUrl="/signin" />
    </div>
  );
};

export default SignUpPage;
