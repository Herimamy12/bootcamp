import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, UserPlus } from "lucide-react";
import { Navbar } from "../components/Navbar";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs");
      setIsLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Email invalide");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }

    try {
      await signup(name, email, password);
      navigate("/");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de l'inscription",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-base-300 via-gray-900 to-base-300 p-4">
      <Navbar />
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
              <UserPlus size={32} className="text-accent-content" />
            </div>
          </div>

          <h2 className="card-title text-3xl font-bold text-center justify-center mb-2">
            Inscription
          </h2>
          <p className="text-center text-base-content/70 mb-6">
            Créez votre compte gratuitement
          </p>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text mb-2">Nom complet</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <User size={20} className="text-base-content/70" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="grow"
                  disabled={isLoading}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text mb-2">Email</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <Mail size={20} className="text-base-content/70" />
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="grow"
                  disabled={isLoading}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text mb-2">Mot de passe</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <Lock size={20} className="text-base-content/70" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="grow"
                  disabled={isLoading}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text mb-2">Confirmer le mot de passe</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <Lock size={20} className="text-base-content/70" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="grow"
                  disabled={isLoading}
                />
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-accent w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <UserPlus size={20} />
                  S'inscrire
                </>
              )}
            </button>
          </form>

          <div className="divider">OU</div>

          <p className="text-center">
            Déjà un compte ?{" "}
            <Link to="/login" className="link link-error">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
