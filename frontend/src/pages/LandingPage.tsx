import LandingPageComponent from "../components/LandingPage";

interface LandingPageProps {
  onEnterApp: () => void;
  onGoToLogin: () => void;
  onGoToSignup: () => void;
}

export default function LandingPage({
  onEnterApp,
  onGoToLogin,
  onGoToSignup,
}: LandingPageProps) {
  return (
    <LandingPageComponent
      onEnterApp={onEnterApp}
      onGoToLogin={onGoToLogin}
      onGoToSignup={onGoToSignup}
    />
  );
}