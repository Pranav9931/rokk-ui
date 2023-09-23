import { useAuth0 } from "@auth0/auth0-react";
// import { Logo } from "../components/common/Logo";
import SignupPage from "./SignupPage";
import ArtistPage from "./ArtistPage";
import { useCookies } from "react-cookie";

import { useEffect } from "react";
import { coreAgency } from "../apis/instances";
import { Box, CircularProgress } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import SignupPageDetailsStepper from "./SignupPage/FormStepper";

export const Layout = () => {
  const { isAuthenticated, isLoading, getIdTokenClaims, user } = useAuth0();
  const [cookies, setCookie] = useCookies(["id_token"]);
  if (isAuthenticated) {
    coreAgency.defaults.headers.common["Authorization"] =
      "Bearer " + cookies.id_token;
  }
  useEffect(() => {
    if (isAuthenticated) {
      getIdTokenClaims().then((res) => {
        setCookie("id_token", res?.__raw);
      });
    }
  }, [isAuthenticated, setCookie, getIdTokenClaims]);

  return (
    <div className="bg-gradient-to-t from-[#1a1a1a] to-[#060606] min-h-[100vh]">
      {isLoading ? (
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          <CircularProgress sx={{ color: 'var(--primary)' }} />
          <h1>Loading ... </h1>
        </Box>
      ) : (
        <>
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/" element={<ArtistPage />} />
              </>
            ) : (
              <>
                <Route path="/" element={<SignupPage />} />
                <Route path="/signup/userdetails" element={<SignupPageDetailsStepper />} />
              </>
            )}
          </Routes>
        </>
      )}
    </div>
  );
};

export default Layout;