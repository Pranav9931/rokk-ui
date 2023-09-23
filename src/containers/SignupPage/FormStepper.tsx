import { useContext, useEffect, useState } from 'react';
import { BandContainer, FormContainer } from '../../utils/constants';
import { StateProvider } from '../../context/stateContent';
import { useNavigate } from 'react-router-dom';
import { useWindows } from '../../hooks/customHooks';
import { FormStepper, SignupPageDetails, SignupPlanDetailsComponent } from '../../components/stepper';

const SignupPageDetailsStepper = () => {
    // const [activeStep, setActiveStep] = useSessionStorage<number>('activeStep', 0);
    const { userEmail } = useContext(StateProvider);
    const { windowWidth } = useWindows();
    const navigate = useNavigate();
    useEffect(() => {
        if (!userEmail || userEmail.length === 0 || userEmail === null) {
            navigate("../")
        }
    }, [])
    const [activeStep, setActiveStep] = useState<number>(0)


    return (
        <BandContainer>
            <div
                className={`${windowWidth > 1177 ? 'max-w-[700px]' : 'w-full'} box-border md:px-10 md:pt-[100px] sm:flex sm:justify-center`}
            >
                <FormStepper activeStep={activeStep} />
            </div>
            {/* The actual form goes here */}
            <FormContainer className="w-full box-border md:px-10 md:py-[100px]">
                {activeStep === 0 && <SignupPageDetails activeStep={activeStep} setActiveStep={setActiveStep} />}
                {activeStep === 1 && <SignupPlanDetailsComponent activeStep={activeStep} setActiveStep={setActiveStep} />}
            </FormContainer>
        </BandContainer>
    );
}

export default SignupPageDetailsStepper;
