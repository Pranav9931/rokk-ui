import React from 'react';
import { Stepper, Step, StepLabel as Box, Divider, StepLabel } from '@mui/material';
import { useWindows } from '../../hooks/customHooks';
import { Header, stepperOption } from '../../utils/constants';

interface Props {
    activeStep: number;
}

const VerticalLinearStepper = ({ activeStep }: { activeStep: number }) => {
    const { windowWidth } = useWindows();

    return (
        <Box sx={{ padding: '30px 0' }}>
            <Stepper
                alternativeLabel={windowWidth < 1178}
                activeStep={activeStep}
                orientation={windowWidth < 1178 ? 'horizontal' : 'vertical'}
                sx={{

                    '.MuiSvgIcon-root': {
                        color: 'rgba(255, 255, 255, 0.1)',
                        width: '30px',
                        height: '30px',
                        fontWeight: 700
                    },
                    '.MuiSvgIcon-root.Mui-active': {
                        color: '#ff8303'
                    },
                    '.MuiSvgIcon-root.Mui-completed': {
                        color: '#ff8303'
                    }
                }}
            >
                {stepperOption.map((step, index) => (
                    <Step key={index} >
                        <StepLabel
                            sx={{
                                '& .MuiStepLabel-label.Mui-disabled': {
                                    color: 'rgba(255, 255, 255, 0.2)'
                                },
                                '& .MuiStepLabel-label.Mui-active': {
                                    color: '#ff8303'
                                },
                                '& .MuiStepLabel-label.Mui-completed': {
                                    color: '#ff8303'
                                }
                            }}
                        >
                            <span>
                                {step.label}
                            </span>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>

    );
};

const FormStepper: React.FC<Props> = ({ activeStep }) => {
    const [textData, setTextData] = React.useState(
        {
            textA: 'ROKK - FAIR',
            textB: 'MUSIC STREAMING',
            subTextA: 'Sign up and become one of the official Rokk User.',
        }
    )

    const TextArea = () => {
        if (activeStep === 0) {
            setTextData((prev) => (
                {
                    textA: 'ROKK - FAIR',
                    textB: 'MUSIC STREAMING',
                    subTextA: 'Sign up and become one of the official Rokk User.'
                }
            ))
        } else if (activeStep === 1) {
            setTextData((prev) => (
                {
                    textA: 'PLANS & PRICING',
                    textB: 'JUST FOR YOU',
                    subTextA: 'Save even more on annual plans & combine them with a Student or Family discount'
                }
            ))
        } else if (activeStep === 2) {
            setTextData((prev) => (
                {
                    textA: 'CHOOSE YOUR',
                    textB: 'PAYMENT METHOD',
                    subTextA: 'Save even more on annual plans & combine them with a Student or Family discount'
                }
            ))
        } else if (activeStep === 3) {
            setTextData((prev) => (
                {
                    textA: 'WELCOME TO',
                    textB: 'ROKK!',
                    subTextA: 'Email with a summary of your data and all information has already been sent to your registered address.'
                }
            ))
        } else if (activeStep === 4) {
            setTextData((prev) => (
                {
                    textA: 'SELECT FAVOURITE',
                    textB: 'BANDS & ARTISTS',
                    subTextA: 'Sign up and become one of the official Rokk User.'
                }
            ))
        } else {
            setTextData((prev) => (
                {
                    textA: 'ROKK - FAIR',
                    textB: 'MUSIC STREAMING',
                    subTextA: 'Sign up and become one of the official Rokk User.'
                }
            ))
        }
    }
    React.useEffect(() => {
        TextArea();
    }, [activeStep])
    return (
        <Header>
            <div className="head-text text-5xl md:text-7xl">
                <span className="head-txt-off-white">{textData.textA} </span>
                <br />
                <span className="head-txt-off-white">{textData.textB} </span>
            </div>

            <div className="text-[13px] md:text-[16px]">
                <span>{textData.subTextA}</span>
                <br />
                {activeStep === 0 && (<span><span style={{ color: '#ff8303' }}>Start free trial</span> and only takes a few seconds.</span>)}
            </div>
            <br />

            <Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
            <VerticalLinearStepper activeStep={activeStep} />

        </Header>

    );
};

export default FormStepper;
