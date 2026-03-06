import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { addUser, removeUser } from "../redux/bazarSlice";
import app from "../firebase.config";
import useAppToast from "../hooks/useAppToast";

const Login = () => {
  const { dark } = useOutletContext();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.bazar.userInfo);
  const { success } = useAppToast();

  const handleGoogleLogin = (event) => {
    event.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          addUser({
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      success("Signed out successfully");
      dispatch(removeUser());
    });
  };

  return (
    <section
      className={`relative flex min-h-screen items-center justify-center px-4 pt-24 ${
        dark ? "bg-[#0a0a0a]" : "bg-[#151515]"
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top,_rgba(201,169,110,0.14),_transparent_72%)]" />

      <div className="w-full max-w-lg border border-[#f4f0e8]/18 bg-[#101010]/80 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
        <p className="text-center text-[11px] uppercase tracking-[0.34em] text-[#c9a96e]">
          Account
        </p>
        <h2 className="mt-4 text-center font-display text-4xl text-[#f4f0e8]">
          Welcome to eBazaar
        </h2>

        {!userInfo ? (
          <div className="mt-10">
            <button
              onClick={handleGoogleLogin}
              className="group relative w-full overflow-hidden border border-[#c9a96e] px-4 py-3 text-[11px] uppercase tracking-[0.25em] text-[#f4f0e8]"
            >
              <span className="absolute inset-0 -translate-x-full bg-[#c9a96e] transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-500 group-hover:text-[#0a0a0a]">
                <svg viewBox="0 0 48 48" className="h-4 w-4 fill-current">
                  <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 3l6.1-6.1C34.4 4.5 29.5 2.5 24 2.5 12.4 2.5 3 11.9 3 23.5S12.4 44.5 24 44.5 45 35.6 45 24c0-1.3-.2-2.7-.5-4z" />
                </svg>
                Sign In With Google
              </span>
            </button>
          </div>
        ) : (
          <div className="mt-8 space-y-5 text-center">
            {userInfo.name && (
              <p className="font-display text-3xl capitalize text-[#f4f0e8]">
                {userInfo.name.toLowerCase()}
              </p>
            )}
            <button
              onClick={handleSignOut}
              className="w-full border border-[#c86060] px-4 py-3 text-[11px] uppercase tracking-[0.24em] text-[#c86060] transition hover:bg-[#c86060] hover:text-[#0a0a0a]"
            >
              Sign Out of eBazaar
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
