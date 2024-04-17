import React, {useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import signupAnimation from "../../assets/gif/signup.json";
import LottieAnimation from "../../components/LottieAnimation";
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../utils/validators";
import {useForm} from "../../hooks/form-hook";
import {useHttpClient} from "../../hooks/http-hook";
import Input from "../../components/shared/FormElements/Input";
import {PropTypes} from "prop-types";
import { login, register, loadUser } from "../../actions/auth-action";
import {connect} from "react-redux";
import Swal from "sweetalert2";

function GetStartedScreen({ register , loadUser, user }) {
    const { sendRequest } = useHttpClient();
    const history = useHistory();

    const [ formState, inputHandler ] = useForm(
        {
            email: {
                value: '',
                isValid: false,
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const inputElements = [
        { elementTitle: 'name', type: 'text', placeholder: 'Name', validators: [VALIDATOR_REQUIRE()], errorText: 'Please enter your full name.' },
        { elementTitle: 'username', type: 'text', placeholder: 'User Name', validators: [VALIDATOR_REQUIRE()], errorText: 'Please enter your full name.' },
        { elementTitle: 'email', type: 'email', placeholder: 'Email', validators: [VALIDATOR_EMAIL()], errorText: 'Please enter a valid email address.' },
        { elementTitle: 'password', placeholder: 'Password', type: 'password', validators: [VALIDATOR_MINLENGTH(6)], errorText: 'Please enter at least 6 characters.' },
        { elementTitle: 'confirmPassword', placeholder: 'Confirm Password', type: 'password', validators: [VALIDATOR_MINLENGTH(6)], errorText: 'Please enter at least 6 characters.' }
    ];

    const authSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if(formState?.inputs?.password?.value !== formState?.inputs?.confirmPassword?.value) {
                //TODO: HAVE TO FIX
                // M.toast({html: 'Confirm password and Confirm new password have to be same', classes: 'red'});
                Swal.fire({
                    title: 'Error!',
                    text: 'Confirm password and Confirm new password have to be same',
                    icon: 'error',
                });
            } else {
                try {
                    await register(formState?.inputs?.name?.value, formState?.inputs?.username?.value,
                        formState?.inputs?.email?.value, formState?.inputs?.password?.value, sendRequest);
                    await loadUser(sendRequest);

                    console.log(formState?.inputs?.password?.value)
                } catch (error) {
                    console.error(error);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if(user) {
            history.push('/dashboard');
        }
    }, [user]);

    return (
        <section className="bg-default min-h-screen text-white-light flex flex-col lg:flex-row justify-between px-4 lg:pt-20 md:pt-20 pt-6 lg:overflow-hidden md:overflow-hidden overflow-y-auto">
            <div className="lg:w-1/2 md:w-full w-full flex flex-col items-center">
                <form onSubmit={authSubmitHandler} className="lg:w-96 md:w-96 w-full flex flex-col md:items-center gap-5">
                    <div className="lg:mb-5 md:mb-4 mb-3">
                        <h2 className="lg:text-3xl md:text-2xl text-2xl font-medium font-sans">
                            <span className="text-orange-500">Create Account</span> to continue
                        </h2>

                        <p className="mt-3">
                            Unlock a world of features by signing up now.
                        </p>
                    </div>

                    {inputElements?.map((inputProps, elementTitle) => (
                        <Input
                            key={elementTitle}
                            element="input"
                            {...inputProps}
                            styleClass="lg:w-96 md:w-96 w-full lg:h-10 md:h-8 h-6 rounded-[4px] active:border-orange-500 focus:border-orange-500 p-4 pr-12 text-gray-700 text-sm shadow-sm"
                            onInput={inputHandler}
                        />
                    ))}

                    <button
                        type="submit"
                        disabled={!formState?.isValid}
                        className="lg:w-96 md:w-96 w-full lg:h-10 md:h-8 h-8 rounded-[4px] bg-orange-500 font-semibold">
                        Sign Up
                    </button>

                    <div className="lg:w-96 md:w-96 w-full flex flex-col gap-1 px-1 text-sm">
                        <div className="w-full flex items-center justify-between gap-4 px-1">
                            <p>Already a member?</p>
                            <Link to="/auth/login" className="hover:text-orange-500 hover:underline decoration-orange-500">Login</Link>
                        </div>
                    </div>
                </form>
            </div>

            <div className="lg:w-1/3 h-[80vh] lg:block md:hidden hidden">
                <LottieAnimation animationData={signupAnimation} />
            </div>
        </section>
    );
}

GetStartedScreen.propTypes = {
    login: PropTypes?.func?.isRequired,
    isAuthenticated: PropTypes?.bool?.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state?.auth?.isAuthenticated,
    user: state?.auth?.user,
    token: state?.auth?.token
});

export default connect(mapStateToProps, { login, register, loadUser })(GetStartedScreen);