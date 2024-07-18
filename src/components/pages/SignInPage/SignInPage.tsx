import { SignIn } from '@clerk/clerk-react';
import styles from './SignInPage.module.scss';

const SignUpPage: React.FC = () => {
  return (
    <div className={styles.signInPage}>
      <SignIn signUpUrl="/signup" />
    </div>
  );
};

export default SignUpPage;
