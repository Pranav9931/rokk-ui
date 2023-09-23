import styled from "@emotion/styled";

export const months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

export const stepperOption = [
    {
        label: 'Details'
    },
    {
        label: 'Plans & Pricing'
    },
    {
        label: 'Payment'
    },
    {
        label: 'Welcome'
    },
    {
        label: 'Select Artists'
    }
];

export const Header = styled.div`
    box-sizing: border-box;
    padding: 20px 60px;
    @media screen and (max-width: 1128px){
        padding: 20px;
    }
`;

export const BandContainer = styled.div`
    padding: var(--global-padding);
    display: flex;
    column-gap: 50px;
    row-gap: 10px;
    flex-wrap: wrap;
    flex: 1;
    width: 100%;
`;


export const FormContainer = styled.div`
    flex: 1;
`

export type SignUpPageDetailsProps = {
    activeStep: number;
    setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
