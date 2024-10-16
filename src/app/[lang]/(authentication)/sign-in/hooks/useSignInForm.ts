'use client';
//@3rd Party
import { Locale } from '@/i18n';
import { TSignInDto, TSignUpDto } from '@/services/api/auth/types';
import useUserStore from '@states/user/userSlice';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// ___________________________________________________________________

//@Hooks & Components
import {
  useCreateSignIn,
  useCreateSignUp,
  useGetOtpCode,
} from '@/services/api/auth/hooks';
// ___________________________________________________________________

//@Types
import { InputProps } from '@components/custom-form-generator/inputs/components/type';
import { TAuth } from '@i18n/dictionary/types/auth';
// ___________________________________________________________________

interface OtpFormData {
  phoneNumber: string | undefined;
}

interface SignInFormData extends OtpFormData {
  otp: string | undefined;
}

const useSignInForm = ({ dictionary }: { dictionary: TAuth }) => {
  const otpForm = useForm<OtpFormData>({
    defaultValues: { phoneNumber: undefined },
  });
  const signInForm = useForm<SignInFormData>({
    defaultValues: { phoneNumber: undefined, otp: undefined },
  });

  const { mutate: getOtpCode, isPending: isGettinOTP } = useGetOtpCode();
  const { mutate: signUpUser, isPending: isSigningUp } = useCreateSignUp();
  const { mutate: signInUser, isPending: isSigningIn } = useCreateSignIn();

  const [step, setStep] = useState<number>(0);
  const { setToken, setUserInfo, setLogout } = useUserStore();
  const { lang } = useParams<{ lang: Locale }>();
  const { push: navigateTo } = useRouter();
  const pathname = usePathname();

  const inputListOtp: InputProps[] = [
    {
      name: 'phoneNumber',
      type: 'phone',
      label: dictionary.phone_number,
      placeholder: '+98...',
      validation: { required: 'Phone number is required' },
    },
  ];

  const inputListSignIn: InputProps[] = [
    {
      name: 'otp',
      type: 'otp',
      label: dictionary.phone_number,
      validation: { required: 'OTP is required' },
    },
  ];

  const onSubmitSignUp = (data: TSignUpDto) => {
    signUpUser(data, {
      onSuccess: () => {
        onSubmitOtp(data); // Proceed to OTP submission
      },
      onError: () => {
        showSnackbar('Something went wrong!', 'error');
        setStep(0); // Reset step on error
      },
    });
  };

  const onSubmitSignIn = (data: TSignInDto) => {
    signInUser(data, {
      onSuccess: (response) => {
        const { token, ...userInfo } = response;
        setToken(token);

        setUserInfo({
          userId: userInfo.userId,
          phoneNumber: userInfo.phoneNumber,
          username: userInfo.username,
        });

        navigateTo(`/${lang ?? 'en'}/`);
        showSnackbar('You have been successfully logged in', 'success', {
          horizontal: 'center',
          vertical: 'top',
        });
      },
      onError: () => {
        showSnackbar('Something went wrong!', 'error');
      },
    });
  };

  const onSubmitOtp = (data: { phoneNumber: string }) => {
    getOtpCode(
      { phoneNumber: data.phoneNumber },
      {
        onSuccess: (res) => {
          setStep(1); // Move to the sign-in step
          signInForm.setValue('phoneNumber', res.phoneNumber);
          signInForm.setValue('otp', res.otpCode);
          showSnackbar('Code successfully sent', 'success');
        },
        onError: () => {
          onSubmitSignUp({ phoneNumber: data.phoneNumber });
        },
      },
    );
  };

  const showSnackbar = (
    message: string,
    variant: 'success' | 'error',
    anchorOrigin?: {
      horizontal: 'left' | 'center' | 'right';
      vertical: 'top' | 'bottom';
    },
  ) => {
    enqueueSnackbar({ variant, message, anchorOrigin });
  };
  useEffect(() => {
    if (pathname.includes('sign-in')) setLogout();
  }, []);

  return {
    onSubmitOtp,
    otpForm,
    inputListOtp,
    inputListSignIn,
    onSubmitSignIn,
    signInForm,
    step,
    isGettinOTP,
    isSigningIn,
    isSigningUp,
  };
};

export default useSignInForm;
