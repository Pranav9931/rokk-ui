import { Button, Divider, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { CircleLink } from '../../components/SocialLink/CircleLink';
import { useAuth0 } from '@auth0/auth0-react';

import { StateProvider } from "../../context/stateContent"
import { useNavigate } from 'react-router-dom';

const EmailContainer = () => {
    const { setUserEmail } = useContext(StateProvider);
    const navigate = useNavigate();
    const { loginWithRedirect } = useAuth0();
    const [isValidEmail, setIsValidEmail] = React.useState(false);
    const [email, setEmail] = React.useState('')

    React.useEffect(() => {
        if (email.trim().length > 8) {
            setIsValidEmail(() => true)
        } else {
            setIsValidEmail(() => false)
        }
    }, [email])

    const handleContinue = () => {
        if (email && isValidEmail) {
            setUserEmail(() => (email));
            navigate("/signup/userdetails")
        }
    }
    return (
        <div className="flex flex-col md:w-1/2 items-center justify-between py-10 h-[100vh]">
            <div className="flex justify-end px-10 items-center h-10 w-full py-6">
                <Button
                    className="bg-[#ff8303] text-inherit rounded-3xl px-7 py-3 font-semibold"
                >
                    Sign in
                </Button>
            </div>
            <div className="min-h-[200px] sm:w-full flex flex-col md:max-w-[500px]"
                style={{
                    fontFamily: 'var(--head-font)'
                }}
            >
                <Typography
                    sx={{
                        fontSize: '50px',
                        fontFamily: 'var(--head-font), sans-serif'
                    }}
                >
                    SIGN UP
                </Typography>
                <Typography
                    sx={{
                        fontSize: '50px',
                        fontFamily: 'var(--head-font), sans-serif',
                        marginTop: '-15px'
                    }}
                >
                    FOR FREE
                </Typography>
                <TextField
                    placeholder='Enter your email address'
                    autoComplete='off'
                    type='email'
                    fullWidth
                    onChange={(event) => setEmail(event.target.value)}
                    sx={{
                        border: '0.1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '30px',
                        marginTop: '10px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        '& .MuiInputBase-root': {
                            color: 'rgba(255, 255, 255, 0.5)', // Initial text color
                            fontSize: 16
                        },
                        '& .Mui-focused': {
                            color: 'rgba(255, 255, 255, 0.8)'
                        }
                    }}
                    required
                />
                <Button
                    className='my-5 text-inherit'
                    type='submit'
                    fullWidth
                    disabled={!isValidEmail}
                    sx={{
                        background: `${isValidEmail ? '#ff8303' : 'rgba(255, 255, 255, 0.2)'}`,
                        borderRadius: '30px',
                        padding: '15px',
                        fontWeight: '700',
                        '& .MuiButton-root': {
                            color: '#ffffff',
                            fontWeight: '800'
                        },
                        '&:hover': {
                            background: `${isValidEmail ? '#ff8303' : 'rgba(255, 255, 255, 0.2)'}`
                        }
                    }}
                    onClick={handleContinue}
                >
                    Continue
                </Button>
                <div className="flex gap-2 items-center">
                    <Divider
                        sx={{
                            flex: 1,
                            border: '0.1px solid rgba(255, 255, 255, 0.2)'
                        }}
                    />
                    <Typography fontSize={'small'}>
                        OR
                    </Typography>
                    <Divider
                        sx={{
                            flex: 1,
                            border: '0.1px solid rgba(255, 255, 255, 0.2)'
                        }}
                    />
                </div>
                <div className='flex gap-2 items-center justify-between py-7'>
                    <CircleLink type="google" />
                    <CircleLink type="apple" />
                    <CircleLink type="facebook" />
                    <CircleLink type="twitter" />
                </div>
                <Divider
                    sx={{
                        width: '100%',
                        border: '0.1px solid rgba(255, 255, 255, 0.2)',
                        margin: '5px 0'
                    }}
                />
                <div className="flex justify-between items-center my-5">
                    <Typography className="font-medium">
                        Already have an account?
                    </Typography>

                    <Button className="text-[var(--primary-color)] font-bold"
                        onClick={() => {
                            loginWithRedirect({
                                appState: {
                                    returnTo: window.location.origin,
                                },
                            });
                        }}>
                        SIGN IN
                    </Button>
                </div>
            </div>
            <div>
                Footer Elements
            </div>
        </div>
    )
}

export default EmailContainer