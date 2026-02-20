import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { ArrowRight, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import app from "../firebase.config";
import { addUser, removeUser } from "../redux/bazarSlice";

const Login = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.bazar.userInfo);

  const handleGoogleLogin = async (event) => {
    event.preventDefault();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      dispatch(
        addUser({
          _id: user.uid,
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        })
      );

      toast.success("Signed in successfully");
      navigate("/");
    } catch {
      toast.error("Google sign-in failed");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());
      toast.success("Signed out successfully");
    } catch {
      toast.error("Unable to sign out");
    }
  };

  return (
    <section className="section-shell py-8">
      <div className="surface-card rounded-[2rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">
        <aside className="relative h-72 lg:h-auto">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80"
            alt="Fashion mood"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1f1a1570] to-[#1f1a15d6]" />
          <div className="absolute inset-0 p-6 sm:p-8 text-[#f6f2ea] flex flex-col justify-end">
            <p className="uppercase tracking-[0.2em] text-xs text-[#efe1c9] mb-2">Account Lounge</p>
            <h1 className="editorial-heading text-[clamp(2rem,4vw,3.8rem)] leading-[0.94]">
              Your style journey starts here
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#e6d8c1] max-w-md">
              Save favorites, keep cart items synced, and enjoy a smooth checkout in every session.
            </p>
          </div>
        </aside>

        <div className="p-6 sm:p-9 lg:p-10 flex flex-col justify-center">
          <p className="uppercase tracking-[0.18em] text-xs muted-text mb-3">Profile Access</p>
          <h2 className="section-title mb-3">Sign in to continue</h2>
          <p className="muted-text text-sm mb-7">
            Use your Google account for secure, one-click access.
          </p>

          {!userInfo ? (
            <>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="surface-card rounded-2xl px-4 py-3 inline-flex items-center justify-center gap-3 text-sm font-semibold hover:bg-[#fff6e8]"
              >
                <FcGoogle size={20} />
                Continue with Google
              </button>

              <div className="mt-5 rounded-2xl border border-[#486b5b35] bg-[#e8f0ec] p-4 text-sm text-[#3f5b4f]">
                <p className="font-semibold flex items-center gap-2 mb-1">
                  <ShieldCheck size={16} />
                  Secure authentication
                </p>
                <p>Your session is protected and persisted for faster checkout.</p>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#1f1a1522] bg-[#fbf5ea] p-4">
                <p className="text-xs uppercase tracking-[0.14em] muted-text mb-2">Signed in profile</p>
                <div className="flex items-center gap-3">
                  {userInfo.image ? (
                    <img
                      src={userInfo.image}
                      alt={userInfo.name || "User"}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="h-12 w-12 rounded-full bg-[#1f1a15] text-[#f6f2ea] grid place-content-center">
                      <UserRound size={20} />
                    </span>
                  )}
                  <div>
                    <p className="font-semibold">{userInfo.name}</p>
                    <p className="text-sm muted-text">{userInfo.email}</p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <Link
                  to="/cart"
                  className="btn-primary inline-flex items-center justify-center gap-2 !rounded-2xl"
                >
                  Go to cart
                  <ArrowRight size={14} />
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="btn-secondary inline-flex items-center justify-center gap-2 !rounded-2xl"
                >
                  <LogOut size={14} />
                  Sign out
                </button>
              </div>
            </div>
          )}

          <Link to="/shop" className="mt-7 text-sm font-semibold text-[#1f1a15] hover:underline">
            Continue browsing products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
