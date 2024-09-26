import { Form, Input } from 'common/Form'
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from 'common/Button/Button';
import { BrandColor, TextColor } from 'constants/theme';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'constants/routes';
import Divider from 'common/Divider/Divider';
import { VStack } from '@chakra-ui/react';
import { Link } from 'common/Link/Link';
import { useAppDispatch } from 'hooks/useApp';
import { loginReq } from 'store/authSlice';
import Notify from 'utils/notify';


function LoginForm() {
    const dispatch = useAppDispatch()
    const push = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup.string().required('Required'),
            password: yup.string().required('Required'),
        }),
        validateOnChange: false,
        onSubmit: (values) => {
            push(AppRoutes.dashboard)
            dispatch(
                loginReq({
                    username: values.email,
                    password: values.password,
                }),
            ).then(({ payload }: { payload: any }) => {
                if (payload.error) {
                    Notify.error(payload.error);
                }
            });
        },
    });

    return (
        <Form
            w='full'
            align="center"
            spacing='1.5rem'
            px={['2.5rem', '2.5rem', "3rem"]}
            onSubmit={formik.handleSubmit}
        >
            <Input
                label='Email Id/Username'
                placeholder="Email"
                name="email"
                formik={formik}
                value={formik.values.email}
            />
            <Input
                label='Password'
                placeholder="Password"
                name="password"
                type="password"
                formik={formik}
                value={formik.values.password}
            />
            <Link
                href={AppRoutes.forgot_password}
                alignSelf='end'
                fontSize='sm'
                mb='2rem'
                color='#1E2772'
            >
                Forgot Password?
            </Link>

            <VStack w='full' spacing='2rem'>
                <Button
                    text="Login now"
                    type='submit'
                    w='full'
                    borderRadius='md'
                    size='lg'
                    bg={BrandColor.primary}
                    color={TextColor.white}
                />
                <Divider text='OR' textProps={{ color: '#C2C2C2' }} />
                <Button
                    text="Signup now"
                    w='full'
                    borderRadius='md'
                    size='lg'
                    variant='outline'
                    bgColor={BrandColor.primary}
                />
            </VStack>
        </Form>
    )
}

export default LoginForm