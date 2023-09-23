import { useAuth0 } from "@auth0/auth0-react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signup } from "../../apis/auth";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useSnackbar } from "notistack";

import { Checkbox, FormHelperText } from "@mui/material";

// import _ from "lodash";
import { CircleLink } from "../../components/SocialLink/CircleLink";
import MenuInput from "../../components/Button/MenuInput";
import { ValidationInput } from "../../components/Input/ValidationInput";
import FullButton from "../../components/Button/FullButton";
import { StateProvider } from "../../context/stateContent";
import { useContext, useState } from "react";
import FormStepper from "../../components/stepper/stepperComponent";
import { SignUpPageDetailsProps } from "../../utils/constants";

export type UserData = {
    email: string;
    name: string;
    password: string;
    month: number;
    date: number;
    year: number;
    gender: string;
};


const schema = yup.object().shape({
    name: yup.string().required("You must enter your name"),
    email: yup
        .string()
        .email("You must enter a valid email")
        .required("You must enter a email"),
    password: yup
        .string()
        .required("Please enter your password.")
        .min(8, "Password should be 8 chars minimum.")
        .matches(RegExp("(.*[a-z].*)"), "Lowercase")
        .matches(RegExp("(.*[A-Z].*)"), "Uppercase")
        .matches(RegExp("(.*\\d.*)"), "Number")
        .matches(RegExp('[!@#$%^&*(),.?":{}|<>]'), "Special"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    month: yup.number(),
    date: yup.number().min(1, "Date > 1").max(31, "Date < 31").required(),
    year: yup.number().min(1, "Year > 1950").max(2050, "Year < 2050").required(),
    gender: yup.string(),
    acceptTermsConditions: yup
        .boolean()
        .required()
        .oneOf([true], "The terms and conditions must be accepted."),
});

export const SignupPageDetails: React.FC<SignUpPageDetailsProps> = ({ activeStep, setActiveStep }) => {
    const { loginWithRedirect } = useAuth0();
    const { enqueueSnackbar } = useSnackbar();

    const { userEmail } = useContext(StateProvider);

    const initUserData = {
        email: userEmail,
        name: "",
        password: "",
        confirmPassword: "",
        month: 1,
        date: 1,
        year: 1970,
        gender: "male",
        acceptTermsConditions: false,
    };

    const { control, formState, handleSubmit } = useForm({
        mode: "onChange",
        defaultValues: initUserData,
        resolver: yupResolver(schema),
    });

    const { errors } = formState;

    const onSubmit = async (data: UserData) => {
        signup(data)
            .then((res) => {
                enqueueSnackbar("Success", { variant: "success" });
                setActiveStep((prevCount) => (prevCount + 1))
            })
            .catch((e) => {
                enqueueSnackbar("Failed", { variant: "warning" });
            });
    };

    return (
        <div className="z-[1] relative py-5 w-full sm:overflow-y-auto flex justify-center">
            <form
                name="registerForm"
                noValidate
                className="lg:max-w-[700px] box-border w-full px-5"
                // onSubmit={handleSubmit(onSubmit)}
                onSubmit={() => setActiveStep(activeStep + 1)}
            >
                <div className="flex flex-col">
                    <div className="flex sm:text-2xl text-[18px] font-medium leading-[27px] mb-6">
                        <span className="text-white">Sign up for free to </span>
                        <span className="text-[#FF8303] ml-2">Start Rocking.</span>
                    </div>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field: { ref, ...others } }) => (
                            <ValidationInput
                                {...others}
                                innerRef={ref}
                                placeholder="Full Name"
                                type="name"
                                error={!!errors.name}
                                helperText={errors?.name?.message?.toString()}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { ref, ...others } }) => (
                            <ValidationInput
                                {...others}
                                innerRef={ref}
                                placeholder="New Password"
                                type="password"
                                error={!!errors.password}
                                helperText={errors?.password?.message?.toString()}
                            />
                        )}
                    />
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field: { ref, ...others } }) => (
                            <ValidationInput
                                {...others}
                                innerRef={ref}
                                placeholder="Confirm Password"
                                type="password"
                                error={!!errors.confirmPassword}
                                helperText={errors?.confirmPassword?.message?.toString()}
                            />
                        )}
                    />
                    <div>
                        <div className="mb-2">What's your date of birth?</div>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <Controller
                                    name="month"
                                    control={control}
                                    render={({ field }) => <MenuInput field={field}></MenuInput>}
                                />
                            </div>
                            <Controller
                                name="date"
                                control={control}
                                render={({ field: { ref, ...others } }) => (
                                    <ValidationInput
                                        {...others}
                                        innerRef={ref}
                                        name="date"
                                        type="text"
                                        placeholder="Date"
                                        error={!!errors.date}
                                        helperText="invalid date"
                                    />
                                )}
                            />
                            <Controller
                                name="year"
                                control={control}
                                render={({ field: { ref, ...others } }) => (
                                    <ValidationInput
                                        {...others}
                                        innerRef={ref}
                                        name="year"
                                        placeholder="Year"
                                        error={!!errors.year}
                                        helperText="invalid year"
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <span className="mb-2">What's your Gender?</span>
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="male"
                                    name="radio-buttons-group">
                                    <div className="flex justify-between flex-wrap gap-2 sm:text-xs">
                                        <FormControlLabel
                                            value="male"
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: "#ffffffb2",
                                                        "&.Mui-checked": {
                                                            color: "#FF8303",
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Male"
                                        />
                                        <FormControlLabel
                                            value="female"
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: "#ffffffb2",
                                                        "&.Mui-checked": {
                                                            color: "#FF8303",
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Female"
                                        />
                                        <FormControlLabel
                                            value="nonBinary"
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: "#ffffffb2",
                                                        "&.Mui-checked": {
                                                            color: "#FF8303",
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Non-binary"
                                        />
                                        <FormControlLabel
                                            value="preferNotToSay"
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: "#ffffffb2",
                                                        "&.Mui-checked": {
                                                            color: "#FF8303",
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Prefer not to say"
                                        />
                                    </div>
                                </RadioGroup>
                            )}
                        />
                    </div>
                    <div>
                        <Controller
                            name="acceptTermsConditions"
                            control={control}
                            render={({ field }) => (
                                <div className="">
                                    <FormControl
                                        error={!!errors.acceptTermsConditions}>
                                        <FormControlLabel
                                            sx={{
                                                display: 'flex'
                                            }}
                                            label={
                                                <div className="self-start">
                                                    I want to receive news about ROKK and artists I might like
                                                </div>
                                            }
                                            control={
                                                <Checkbox
                                                    color="primary"
                                                    sx={{
                                                        color: "#ffffffb2",
                                                        "&.Mui-checked": {
                                                            color: "#FF8303",
                                                        },
                                                    }}
                                                    {...field}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'flex-start'
                                            }}
                                            label={
                                                <div>
                                                    I agree that my registration data will be shared with ROKK's content providers for marketing reasons (Please note that your data may be transferred to a country outside the EEA)
                                                </div>
                                            }
                                            control={
                                                <Checkbox
                                                    color="primary"
                                                    sx={{
                                                        color: "#ffffffb2",
                                                        "&.Mui-checked": {
                                                            color: "#FF8303",
                                                        },
                                                    }}
                                                    {...field}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label={
                                                <div>
                                                    I have read and accepted the T&C of ROKK
                                                </div>
                                            }
                                            control={
                                                <Checkbox
                                                    color="primary"
                                                    sx={{
                                                        color: "#ffffffb2",
                                                        "&.Mui-checked": {
                                                            color: "#FF8303",
                                                        },
                                                    }}
                                                    {...field}
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label={
                                                <div>
                                                    I have read ROKK's data privacy policy
                                                </div>
                                            }
                                            control={
                                                <Checkbox
                                                    color="primary"
                                                    sx={{
                                                        color: "#ffffffb2",
                                                        "&.Mui-checked": {
                                                            color: "#FF8303",
                                                        },
                                                    }}
                                                    {...field}
                                                />
                                            }
                                        />
                                        <FormHelperText>
                                            {errors?.acceptTermsConditions?.message?.toString()}
                                        </FormHelperText>
                                    </FormControl>
                                </div>
                            )}
                        />
                    </div>
                </div>
                {/* <input type="submit" /> */}
                <FullButton type="submit">SIGN UP</FullButton>
            </form>
        </div>
    );
};
