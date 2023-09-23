import React, { ReactNode, createContext } from "react";

export const StateProvider = createContext<any>({} as any);

const ReactStateProvider = ({ children }: { children: ReactNode }) => {
    const [userEmail, setUserEmail] = React.useState<string>("")
    return (
        <StateProvider.Provider
            value={
                {
                    userEmail,
                    setUserEmail
                }
            }
        >
            {children}
        </StateProvider.Provider>
    )

}

export default ReactStateProvider