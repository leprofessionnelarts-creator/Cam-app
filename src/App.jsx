import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  X,
  MessageCircle,
  User,
  Globe2,
  MapPin,
  Send,
  ChevronLeft,
  Sparkles,
  Users,
  ArrowRight,
  Camera,
  Pencil,
  Loader2,
  AlertCircle,
  SlidersHorizontal,
} from "lucide-react";

/* ============================================================
   CAM — Centre d'Amitié et de Mariage
   Version connectée à Supabase (comptes, profils, likes,
   matchs et messages réels).
   ============================================================ */

const CAM_LOGO_URI = "data:image/jpeg;base64,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";

const SUPABASE_URL = "https://msxpcgcxrbccxfjymome.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_q7X8nOqz47c1rQyfOYRClg_yC8rkqBv";

const FONT_IMPORT_ID = "cam-fonts";

function useGoogleFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_IMPORT_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_IMPORT_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);
}

/* ---------------- Référentiel pays ---------------- */

const COUNTRIES = {
  FR: "🇫🇷 France",
  SN: "🇸🇳 Sénégal",
  CI: "🇨🇮 Côte d'Ivoire",
  CM: "🇨🇲 Cameroun",
  CA: "🇨🇦 Canada",
  BR: "🇧🇷 Brésil",
  JP: "🇯🇵 Japon",
  MA: "🇲🇦 Maroc",
  US: "🇺🇸 États-Unis",
  CD: "🇨🇩 RD Congo",
  BE: "🇧🇪 Belgique",
  PH: "🇵🇭 Philippines",
  DE: "🇩🇪 Allemagne",
};

const LOOKING_FOR_LABEL = {
  amitie: "Amitié",
  mariage: "Mariage",
  "les-deux": "Amitié ou Mariage",
};

/* ============================================================
   Client Supabase minimal (fetch direct — pas de SDK requis)
   ============================================================ */

async function sbSignUp(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.msg || data.error_description || "Inscription impossible.");
  }
  return data; // { access_token, refresh_token, user } si confirmation email désactivée
}

async function sbSignIn(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error_description || data.msg || "Identifiants incorrects.");
  }
  return data;
}

function sbHeaders(session, extra = {}) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`,
    ...extra,
  };
}

async function sbFrom(path, session, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      ...sbHeaders(session, { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    let msg = "Erreur base de données";
    try {
      const err = await res.json();
      msg = err.message || msg;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

async function sbUploadAvatar(session, userId, blob) {
  const path = `${userId}/${Date.now()}.jpg`;
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/avatars/${path}`, {
    method: "POST",
    headers: sbHeaders(session, { "Content-Type": "image/jpeg", "x-upsert": "true" }),
    body: blob,
  });
  if (!res.ok) throw new Error("Échec de l'envoi de la photo.");
  return `${SUPABASE_URL}/storage/v1/object/public/avatars/${path}`;
}

/* ---------------- Session locale (persistée) ---------------- */

async function loadSession() {
  try {
    const res = await window.storage.get("cam:session", false);
    return res ? JSON.parse(res.value) : null;
  } catch {
    return null;
  }
}
async function saveSession(session) {
  try {
    await window.storage.set("cam:session", JSON.stringify(session), false);
  } catch {
    /* best effort */
  }
}
async function clearSession() {
  try {
    await window.storage.delete("cam:session", false);
  } catch {
    /* ignore */
  }
}

/* ---------------- Mise en forme d'un profil venant de la base ---------------- */

function mapProfile(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    age: row.age,
    gender: row.gender,
    country: row.country,
    city: row.city,
    lookingFor: row.looking_for,
    bio: row.bio || "",
    tags: row.tags || [],
    photo: row.photo_url || null,
    gradient: row.gender === "F" ? ["#E8607A", "#F0A868"] : ["#4A5FE0", "#7BC6E8"],
  };
}

/* ---------------- Redimensionnement de photo (data URL + blob) ---------------- */

function resizeImageFile(file, maxSize = 480, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Lecture du fichier impossible"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Image invalide"));
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxSize) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else if (height > maxSize) {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            resolve({ dataUrl: canvas.toDataURL("image/jpeg", quality), blob });
          },
          "image/jpeg",
          quality
        );
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ---------------- Avatar ---------------- */

function Avatar({ name, gradient, photo, size = 56 }) {
  const initial = name?.[0]?.toUpperCase() || "?";
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        style={{
          width: size,
          height: size,
          borderRadius: "999px",
          objectFit: "cover",
          flexShrink: 0,
          boxShadow: "0 4px 14px rgba(43,34,80,0.18)",
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "999px",
        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "'Fraunces', serif",
        fontWeight: 600,
        fontSize: size * 0.4,
        flexShrink: 0,
        boxShadow: "0 4px 14px rgba(43,34,80,0.18)",
      }}
    >
      {initial}
    </div>
  );
}

/* ============================================================
   ÉCRAN : Landing
   ============================================================ */

function Landing({ onStart, onLogin }) {
  return (
    <div className="cam-screen cam-landing">
      <div className="cam-landing-glow" />
      <div className="cam-landing-content">
        <div className="cam-logo-mark cam-logo-mark--landing">
          <img src={CAM_LOGO_URI} alt="CAM" className="cam-logo-img" />
        </div>
        <p className="cam-eyebrow">Centre d'Amitié et de Mariage</p>
        <h1 className="cam-hero-title">
          Là où deux <em>horizons</em>
          <br />
          se rencontrent.
        </h1>
        <p className="cam-hero-sub">
          CAM relie des hommes et des femmes du monde entier, quel que soit le
          fuseau horaire, autour d'un même objectif : trouver une amitié
          sincère ou construire un mariage durable.
        </p>

        <div className="cam-horizon-strip" aria-hidden="true">
          {Object.keys(COUNTRIES)
            .slice(0, 8)
            .map((c) => (
              <span key={c} className="cam-flag-chip">
                {COUNTRIES[c].split(" ")[0]}
              </span>
            ))}
        </div>

        <button className="cam-btn-primary cam-btn-full" onClick={onStart}>
          Créer mon profil
          <ArrowRight size={18} />
        </button>
        <button className="cam-btn-ghost cam-btn-ghost--light" onClick={onLogin}>
          J'ai déjà un compte — Se connecter
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   ÉCRAN : Connexion
   ============================================================ */

function Login({ onBack, onLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    setBusy(true);
    try {
      const session = await sbSignIn(email.trim(), password);
      await onLoggedIn(session);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="cam-screen cam-onboarding">
      <button className="cam-back-btn cam-back-btn--inline" onClick={onBack}>
        <ChevronLeft size={20} />
      </button>
      <h2 className="cam-onb-title">Content de te revoir</h2>
      <div className="cam-form-block">
        <label className="cam-label">Email</label>
        <input
          className="cam-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="toi@exemple.com"
        />
        <label className="cam-label">Mot de passe</label>
        <input
          className="cam-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        {error && (
          <p className="cam-error">
            <AlertCircle size={14} /> {error}
          </p>
        )}
      </div>
      <div className="cam-onb-actions cam-onb-actions--single">
        <button
          className="cam-btn-primary cam-btn-full"
          disabled={!email || !password || busy}
          onClick={submit}
        >
          {busy ? <Loader2 size={16} className="cam-spin" /> : "Se connecter"}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   ÉCRAN : Onboarding (création de compte + profil)
   ============================================================ */

function Onboarding({ onBack, onComplete }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    gender: "F",
    country: "FR",
    city: "",
    lookingFor: "les-deux",
    bio: "",
    photoDataUrl: null,
    photoBlob: null,
  });
  const [photoBusy, setPhotoBusy] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const steps = ["Compte", "Identité", "Photo", "Origine", "Objectif", "À propos"];

  const canNext = () => {
    if (step === 0) return form.email.includes("@") && form.password.length >= 6;
    if (step === 1) return form.name.trim().length > 1 && form.age;
    if (step === 2) return true;
    if (step === 3) return form.city.trim().length > 0;
    if (step === 4) return !!form.lookingFor;
    if (step === 5) return form.bio.trim().length > 4;
    return true;
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoBusy(true);
    try {
      const { dataUrl, blob } = await resizeImageFile(file);
      setForm((f) => ({ ...f, photoDataUrl: dataUrl, photoBlob: blob }));
    } catch {
      /* l'utilisateur peut réessayer */
    } finally {
      setPhotoBusy(false);
    }
  };

  const next = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }
    setError("");
    setBusy(true);
    try {
      const auth = await sbSignUp(form.email.trim(), form.password);
      if (!auth.access_token || !auth.user) {
        throw new Error(
          "Compte créé, mais la confirmation par email est activée sur ton projet Supabase. Désactive-la dans Authentication → Providers → Email pour un test immédiat."
        );
      }
      const session = {
        access_token: auth.access_token,
        refresh_token: auth.refresh_token,
        user_id: auth.user.id,
      };

      let photoUrl = null;
      if (form.photoBlob) {
        photoUrl = await sbUploadAvatar(session, session.user_id, form.photoBlob);
      }

      const row = {
        id: session.user_id,
        name: form.name.trim(),
        age: Number(form.age),
        gender: form.gender,
        country: form.country,
        city: form.city.trim(),
        looking_for: form.lookingFor,
        bio: form.bio.trim(),
        photo_url: photoUrl,
      };
      await sbFrom("profiles", session, {
        method: "POST",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify(row),
      });

      await onComplete(session, mapProfile(row));
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="cam-screen cam-onboarding">
      <div className="cam-onb-progress">
        {steps.map((s, i) => (
          <div key={s} className={"cam-onb-dot" + (i <= step ? " cam-onb-dot--active" : "")} />
        ))}
      </div>

      <p className="cam-onb-step-label">
        Étape {step + 1} / {steps.length} — {steps[step]}
      </p>

      {step === 0 && (
        <div className="cam-form-block">
          <h2 className="cam-onb-title">Crée ton compte</h2>
          <label className="cam-label">Email</label>
          <input
            className="cam-input"
            type="email"
            placeholder="toi@exemple.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <label className="cam-label">Mot de passe</label>
          <input
            className="cam-input"
            type="password"
            placeholder="6 caractères minimum"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
      )}

      {step === 1 && (
        <div className="cam-form-block">
          <h2 className="cam-onb-title">Comment t'appelles-tu ?</h2>
          <label className="cam-label">Prénom</label>
          <input
            className="cam-input"
            placeholder="Ex. Awa, Léo, Yuki..."
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <label className="cam-label">Âge</label>
          <input
            className="cam-input"
            type="number"
            min="18"
            max="99"
            placeholder="Ex. 27"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
          <label className="cam-label">Genre</label>
          <div className="cam-pill-row">
            {["F", "H"].map((g) => (
              <button
                key={g}
                className={"cam-pill" + (form.gender === g ? " cam-pill--active" : "")}
                onClick={() => setForm({ ...form, gender: g })}
              >
                {g === "F" ? "Femme" : "Homme"}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="cam-form-block">
          <h2 className="cam-onb-title">Ajoute ta photo</h2>
          <p className="cam-photo-hint">
            Un vrai visage inspire confiance : les profils avec photo reçoivent
            bien plus de réponses.
          </p>
          <label className="cam-photo-picker" htmlFor="cam-photo-input">
            {form.photoDataUrl ? (
              <img src={form.photoDataUrl} alt="Ta photo de profil" />
            ) : (
              <span className="cam-photo-picker-empty">
                <Camera size={26} />
                <span>{photoBusy ? "Chargement..." : "Choisir une photo"}</span>
              </span>
            )}
          </label>
          <input
            id="cam-photo-input"
            type="file"
            accept="image/*"
            className="cam-photo-input-hidden"
            onChange={handlePhotoChange}
          />
          {form.photoDataUrl && (
            <button
              className="cam-btn-ghost"
              onClick={() => setForm((f) => ({ ...f, photoDataUrl: null, photoBlob: null }))}
            >
              Supprimer la photo
            </button>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="cam-form-block">
          <h2 className="cam-onb-title">D'où viens-tu ?</h2>
          <label className="cam-label">Pays</label>
          <select
            className="cam-input"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          >
            {Object.entries(COUNTRIES).map(([code, label]) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
          <label className="cam-label">Ville</label>
          <input
            className="cam-input"
            placeholder="Ex. Abidjan"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        </div>
      )}

      {step === 4 && (
        <div className="cam-form-block">
          <h2 className="cam-onb-title">Que recherches-tu sur CAM ?</h2>
          <div className="cam-goal-cards">
            <button
              className={"cam-goal-card" + (form.lookingFor === "amitie" ? " cam-goal-card--active" : "")}
              onClick={() => setForm({ ...form, lookingFor: "amitie" })}
            >
              <Users size={22} />
              <span>Amitié</span>
              <p>Échanger, discuter, se faire des amis dans le monde</p>
            </button>
            <button
              className={"cam-goal-card" + (form.lookingFor === "mariage" ? " cam-goal-card--active" : "")}
              onClick={() => setForm({ ...form, lookingFor: "mariage" })}
            >
              <Heart size={22} />
              <span>Mariage</span>
              <p>Construire une relation sérieuse et durable</p>
            </button>
            <button
              className={"cam-goal-card" + (form.lookingFor === "les-deux" ? " cam-goal-card--active" : "")}
              onClick={() => setForm({ ...form, lookingFor: "les-deux" })}
            >
              <Sparkles size={22} />
              <span>Les deux</span>
              <p>Rester ouvert(e) à ce que la rencontre apportera</p>
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="cam-form-block">
          <h2 className="cam-onb-title">Parle un peu de toi</h2>
          <label className="cam-label">Présentation courte</label>
          <textarea
            className="cam-input cam-textarea"
            rows={4}
            placeholder="Tes passions, ton métier, ce que tu recherches..."
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </div>
      )}

      {error && (
        <p className="cam-error">
          <AlertCircle size={14} /> {error}
        </p>
      )}

      <div className="cam-onb-actions">
        {step > 0 ? (
          <button className="cam-btn-ghost" onClick={() => setStep(step - 1)}>
            <ChevronLeft size={18} />
            Retour
          </button>
        ) : (
          <button className="cam-btn-ghost" onClick={onBack}>
            <ChevronLeft size={18} />
            Retour
          </button>
        )}
        <button className="cam-btn-primary" disabled={!canNext() || busy} onClick={next}>
          {busy ? (
            <Loader2 size={16} className="cam-spin" />
          ) : step === steps.length - 1 ? (
            "Terminer"
          ) : (
            "Continuer"
          )}
          {!busy && <ArrowRight size={16} />}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   Badge d'objectif
   ============================================================ */

function GoalBadge({ value }) {
  const icon =
    value === "amitie" ? <Users size={12} /> : value === "mariage" ? <Heart size={12} /> : <Sparkles size={12} />;
  return (
    <span className={`cam-goal-badge cam-goal-badge--${value}`}>
      {icon}
      {LOOKING_FOR_LABEL[value]}
    </span>
  );
}

/* ============================================================
   Panneau de filtres
   ============================================================ */

function FilterPanel({ filters, onApply, onClose }) {
  const [country, setCountry] = useState(filters.country);
  const [lookingFor, setLookingFor] = useState(filters.lookingFor);
  const [minAge, setMinAge] = useState(filters.minAge);
  const [maxAge, setMaxAge] = useState(filters.maxAge);

  return (
    <div className="cam-filter-overlay" onClick={onClose}>
      <div className="cam-filter-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="cam-filter-sheet-header">
          <h3>Filtres</h3>
          <button className="cam-filter-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <label className="cam-label">Pays</label>
        <select className="cam-input" value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="all">Tous les pays</option>
          {Object.entries(COUNTRIES).map(([code, label]) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>

        <label className="cam-label">Recherche</label>
        <div className="cam-pill-row cam-pill-row--wrap">
          {[
            { v: "tous", l: "Tous" },
            { v: "amitie", l: "Amitié" },
            { v: "mariage", l: "Mariage" },
            { v: "les-deux", l: "Les deux" },
          ].map((opt) => (
            <button
              key={opt.v}
              className={"cam-pill" + (lookingFor === opt.v ? " cam-pill--active" : "")}
              onClick={() => setLookingFor(opt.v)}
            >
              {opt.l}
            </button>
          ))}
        </div>

        <label className="cam-label">Tranche d'âge : {minAge} – {maxAge} ans</label>
        <div className="cam-age-row">
          <input
            type="number"
            className="cam-input cam-age-input"
            min="18"
            max="99"
            value={minAge}
            onChange={(e) => setMinAge(Math.min(Number(e.target.value) || 18, maxAge))}
          />
          <span>à</span>
          <input
            type="number"
            className="cam-input cam-age-input"
            min="18"
            max="99"
            value={maxAge}
            onChange={(e) => setMaxAge(Math.max(Number(e.target.value) || 99, minAge))}
          />
        </div>

        <div className="cam-filter-actions">
          <button
            className="cam-btn-ghost"
            onClick={() => {
              setCountry("all");
              setLookingFor("tous");
              setMinAge(18);
              setMaxAge(99);
            }}
          >
            Réinitialiser
          </button>
          <button
            className="cam-btn-primary"
            onClick={() => onApply({ country, lookingFor, minAge, maxAge })}
          >
            Appliquer
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ÉCRAN : Découvrir
   ============================================================ */

function Discover({ profiles, loading, likesCount, onOpenLikes, onDecision, onOpenProfile, filters, onApplyFilters }) {
  const current = profiles[0];
  const [exitDir, setExitDir] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const handle = (dir) => {
    if (!current) return;
    setExitDir(dir);
    setTimeout(() => {
      onDecision(current, dir === "right");
      setExitDir(null);
    }, 220);
  };

  const activeFilterCount =
    (filters.country !== "all" ? 1 : 0) +
    (filters.lookingFor !== "tous" ? 1 : 0) +
    (filters.minAge !== 18 || filters.maxAge !== 99 ? 1 : 0);

  return (
    <div className="cam-screen cam-discover">
      <div className="cam-discover-header">
        <div className="cam-logo-mark cam-logo-mark--sm">
          <img src={CAM_LOGO_URI} alt="CAM" className="cam-logo-img" />
        </div>
        <span className="cam-discover-title">Découvrir</span>
        <button className="cam-filter-btn" onClick={() => setShowFilters(true)}>
          <SlidersHorizontal size={16} />
          {activeFilterCount > 0 && <span className="cam-filter-btn-badge">{activeFilterCount}</span>}
        </button>
      </div>

      {showFilters && (
        <FilterPanel
          filters={filters}
          onApply={(f) => {
            onApplyFilters(f);
            setShowFilters(false);
          }}
          onClose={() => setShowFilters(false)}
        />
      )}

      {likesCount > 0 && (
        <button className="cam-likes-banner" onClick={onOpenLikes}>
          <span className="cam-likes-banner-hearts">
            <Heart size={16} fill="currentColor" />
          </span>
          <span className="cam-likes-banner-text">
            <strong>
              {likesCount} {likesCount > 1 ? "personnes t'ont" : "personne t'a"} déjà aimé(e)
            </strong>
            <span>Découvre qui, et matche en un tap</span>
          </span>
          <ArrowRight size={16} />
        </button>
      )}

      {loading ? (
        <div className="cam-empty-state">
          <Loader2 size={30} className="cam-spin" />
          <h2>Chargement des profils...</h2>
        </div>
      ) : !current ? (
        <div className="cam-empty-state">
          <Globe2 size={40} strokeWidth={1.3} />
          <h2>Tu as fait le tour du monde !</h2>
          <p>
            Plus de nouveaux profils pour l'instant. Reviens bientôt, de
            nouveaux membres rejoignent CAM chaque jour.
          </p>
        </div>
      ) : (
        <>
          <div className="cam-card-stack">
            {profiles
              .slice(0, 3)
              .reverse()
              .map((p, idx) => {
                const isTop = idx === profiles.slice(0, 3).length - 1;
                return (
                  <div
                    key={p.id}
                    className={
                      "cam-profile-card" + (isTop && exitDir ? ` cam-profile-card--exit-${exitDir}` : "")
                    }
                    style={{
                      zIndex: idx,
                      transform: isTop
                        ? undefined
                        : `scale(${0.94 + idx * 0.03}) translateY(${(2 - idx) * 10}px)`,
                    }}
                    onClick={() => isTop && onOpenProfile(p)}
                  >
                    <div
                      className="cam-card-photo"
                      style={
                        p.photo
                          ? { backgroundImage: `url(${p.photo})`, backgroundSize: "cover", backgroundPosition: "center" }
                          : { background: `linear-gradient(160deg, ${p.gradient[0]}, ${p.gradient[1]})` }
                      }
                    >
                      {!p.photo && <span className="cam-card-initial">{p.name[0]}</span>}
                      <div className="cam-card-photo-fade" />
                      <div className="cam-card-info">
                        <div className="cam-card-name-row">
                          <h3>
                            {p.name}, {p.age}
                          </h3>
                          <GoalBadge value={p.lookingFor} />
                        </div>
                        <p className="cam-card-loc">
                          <MapPin size={13} />
                          {p.city}, {COUNTRIES[p.country]}
                        </p>
                      </div>
                    </div>
                    <div className="cam-card-bio">
                      <p>{p.bio}</p>
                      <div className="cam-tag-row">
                        {p.tags.map((t) => (
                          <span key={t} className="cam-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="cam-swipe-actions">
            <button className="cam-round-btn cam-round-btn--pass" onClick={() => handle("left")} aria-label="Passer">
              <X size={24} />
            </button>
            <button className="cam-round-btn cam-round-btn--like" onClick={() => handle("right")} aria-label="Aimer">
              <Heart size={24} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ============================================================
   ÉCRAN : On t'a déjà aimé(e)
   ============================================================ */

function LikesReceived({ likes, onLikeBack, onPass, onBack }) {
  return (
    <div className="cam-screen cam-likes-screen">
      <div className="cam-discover-header cam-discover-header--withback">
        <button className="cam-back-btn cam-back-btn--inline" onClick={onBack}>
          <ChevronLeft size={20} />
        </button>
        <span className="cam-discover-title">On t'a aimé(e)</span>
      </div>

      {likes.length === 0 ? (
        <div className="cam-empty-state">
          <Heart size={36} strokeWidth={1.3} />
          <h2>Plus personne à découvrir ici</h2>
          <p>Reviens plus tard, de nouveaux likes peuvent arriver à tout moment.</p>
        </div>
      ) : (
        <div className="cam-likes-grid">
          {likes.map((p) => (
            <div key={p.id} className="cam-like-card">
              <div
                className="cam-like-card-photo"
                style={
                  p.photo
                    ? { backgroundImage: `url(${p.photo})`, backgroundSize: "cover", backgroundPosition: "center" }
                    : { background: `linear-gradient(160deg, ${p.gradient[0]}, ${p.gradient[1]})` }
                }
              >
                {!p.photo && <span className="cam-like-card-initial">{p.name[0]}</span>}
                <span className="cam-like-card-heart">
                  <Heart size={13} fill="currentColor" />
                </span>
              </div>
              <div className="cam-like-card-body">
                <h4>
                  {p.name}, {p.age}
                </h4>
                <p className="cam-card-loc">
                  <MapPin size={12} />
                  {p.city}, {COUNTRIES[p.country]}
                </p>
                <div className="cam-like-card-actions">
                  <button className="cam-round-btn cam-round-btn--pass cam-round-btn--sm" onClick={() => onPass(p)} aria-label="Passer">
                    <X size={16} />
                  </button>
                  <button className="cam-round-btn cam-round-btn--like cam-round-btn--sm" onClick={() => onLikeBack(p)} aria-label="Matcher">
                    <Heart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   ÉCRAN : Fiche profil détaillée
   ============================================================ */

function ProfileDetail({ profile, onBack, onDecision }) {
  return (
    <div className="cam-screen cam-profile-detail">
      <button className="cam-back-btn" onClick={onBack}>
        <ChevronLeft size={20} />
      </button>
      <div
        className="cam-detail-hero"
        style={
          profile.photo
            ? { backgroundImage: `url(${profile.photo})`, backgroundSize: "cover", backgroundPosition: "center" }
            : { background: `linear-gradient(160deg, ${profile.gradient[0]}, ${profile.gradient[1]})` }
        }
      >
        {!profile.photo && <span className="cam-detail-initial">{profile.name[0]}</span>}
      </div>
      <div className="cam-detail-body">
        <div className="cam-card-name-row">
          <h2>
            {profile.name}, {profile.age}
          </h2>
          <GoalBadge value={profile.lookingFor} />
        </div>
        <p className="cam-card-loc">
          <MapPin size={14} />
          {profile.city}, {COUNTRIES[profile.country]}
        </p>
        <h4 className="cam-detail-section-title">À propos</h4>
        <p className="cam-detail-bio">{profile.bio}</p>
        <h4 className="cam-detail-section-title">Centres d'intérêt</h4>
        <div className="cam-tag-row">
          {profile.tags.map((t) => (
            <span key={t} className="cam-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="cam-swipe-actions cam-swipe-actions--fixed">
        <button className="cam-round-btn cam-round-btn--pass" onClick={() => onDecision(profile, false)}>
          <X size={24} />
        </button>
        <button className="cam-round-btn cam-round-btn--like" onClick={() => onDecision(profile, true)}>
          <Heart size={24} />
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   ÉCRAN : Match (overlay)
   ============================================================ */

function MatchOverlay({ me, match, onKeepBrowsing, onSendMessage }) {
  return (
    <div className="cam-match-overlay">
      <div className="cam-match-overlay-inner">
        <Sparkles size={28} className="cam-match-sparkle" />
        <h2>C'est un match !</h2>
        <p>
          Toi et {match.name} vous êtes plu. C'est le début d'une nouvelle
          histoire.
        </p>
        <div className="cam-match-avatars">
          <Avatar name={me.name} gradient={me.gradient} photo={me.photo} size={72} />
          <div className="cam-match-heart">
            <Heart size={20} fill="currentColor" />
          </div>
          <Avatar name={match.name} gradient={match.gradient} photo={match.photo} size={72} />
        </div>
        <button className="cam-btn-primary cam-btn-full" onClick={onSendMessage}>
          Envoyer un message
        </button>
        <button className="cam-btn-ghost" onClick={onKeepBrowsing}>
          Continuer à découvrir
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   ÉCRAN : Liste des matchs
   ============================================================ */

function MatchList({ matches, loading, onOpenChat }) {
  return (
    <div className="cam-screen cam-matches">
      <div className="cam-discover-header">
        <span className="cam-discover-title">Mes matchs</span>
      </div>
      {loading ? (
        <div className="cam-empty-state">
          <Loader2 size={28} className="cam-spin" />
        </div>
      ) : matches.length === 0 ? (
        <div className="cam-empty-state">
          <Heart size={36} strokeWidth={1.3} />
          <h2>Pas encore de match</h2>
          <p>Continue à découvrir des profils pour trouver ta connexion.</p>
        </div>
      ) : (
        <div className="cam-match-list">
          {matches.map((m) => (
            <button key={m.matchId} className="cam-match-row" onClick={() => onOpenChat(m)}>
              <Avatar name={m.name} gradient={m.gradient} photo={m.photo} size={52} />
              <div className="cam-match-row-info">
                <div className="cam-match-row-top">
                  <h4>{m.name}</h4>
                  <GoalBadge value={m.lookingFor} />
                </div>
                <p>Ouvrir la conversation</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   ÉCRAN : Chat
   ============================================================ */

function Chat({ me, match, messages, onSend, onBack }) {
  const [text, setText] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <div className="cam-screen cam-chat">
      <div className="cam-chat-header">
        <button className="cam-back-btn cam-back-btn--inline" onClick={onBack}>
          <ChevronLeft size={20} />
        </button>
        <Avatar name={match.name} gradient={match.gradient} photo={match.photo} size={38} />
        <div>
          <h4>{match.name}</h4>
          <p className="cam-chat-sub">
            {match.city}, {COUNTRIES[match.country]}
          </p>
        </div>
      </div>

      <div className="cam-chat-messages">
        {messages.map((m) => (
          <div key={m.id} className={"cam-bubble " + (m.sender_id === me.id ? "cam-bubble--me" : "cam-bubble--them")}>
            {m.content}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="cam-chat-input-row">
        <input
          className="cam-chat-input"
          placeholder="Écris ton message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button className="cam-send-btn" onClick={send} aria-label="Envoyer">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   ÉCRAN : Mon profil
   ============================================================ */

function MyProfile({ me, onUpdatePhoto, onLogout }) {
  const [busy, setBusy] = useState(false);

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const { dataUrl, blob } = await resizeImageFile(file);
      await onUpdatePhoto(dataUrl, blob);
    } catch {
      /* on ignore, l'utilisateur peut réessayer */
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="cam-screen cam-my-profile">
      <div className="cam-discover-header">
        <span className="cam-discover-title">Mon profil</span>
      </div>
      <div className="cam-my-profile-card">
        <label className="cam-avatar-edit" htmlFor="cam-profile-photo-input">
          <Avatar name={me.name} gradient={me.gradient} photo={me.photo} size={84} />
          <span className="cam-avatar-edit-badge">
            <Pencil size={13} />
          </span>
        </label>
        <input
          id="cam-profile-photo-input"
          type="file"
          accept="image/*"
          className="cam-photo-input-hidden"
          onChange={handlePhotoChange}
        />
        {busy && <p className="cam-photo-hint">Mise à jour de la photo...</p>}
        <h2>
          {me.name}, {me.age}
        </h2>
        <p className="cam-card-loc">
          <MapPin size={14} />
          {me.city}, {COUNTRIES[me.country]}
        </p>
        <GoalBadge value={me.lookingFor} />
        <h4 className="cam-detail-section-title">À propos</h4>
        <p className="cam-detail-bio">{me.bio}</p>
      </div>
      <button className="cam-btn-ghost cam-btn-full" onClick={onLogout}>
        Se déconnecter
      </button>
    </div>
  );
}

/* ============================================================
   Navigation basse
   ============================================================ */

function BottomNav({ tab, setTab, matchCount }) {
  const items = [
    { key: "discover", label: "Découvrir", icon: Globe2 },
    { key: "matches", label: "Matchs", icon: MessageCircle, badge: matchCount },
    { key: "profile", label: "Profil", icon: User },
  ];
  return (
    <div className="cam-bottom-nav">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <button
            key={it.key}
            className={"cam-nav-btn" + (tab === it.key ? " cam-nav-btn--active" : "")}
            onClick={() => setTab(it.key)}
          >
            <span className="cam-nav-icon-wrap">
              <Icon size={20} strokeWidth={tab === it.key ? 2.2 : 1.8} />
              {it.badge > 0 && <span className="cam-nav-badge">{it.badge}</span>}
            </span>
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   APP racine
   ============================================================ */

export default function CamApp() {
  useGoogleFonts();

  const [phase, setPhase] = useState("loading"); // loading | landing | login | onboarding | app
  const [session, setSession] = useState(null);
  const [me, setMe] = useState(null);

  const [queue, setQueue] = useState([]);
  const [loadingQueue, setLoadingQueue] = useState(false);
  const [filters, setFilters] = useState({ country: "all", lookingFor: "tous", minAge: 18, maxAge: 99 });
  const [incomingLikes, setIncomingLikes] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [conversations, setConversations] = useState({});

  const [tab, setTab] = useState("discover");
  const [viewingProfile, setViewingProfile] = useState(null);
  const [pendingMatch, setPendingMatch] = useState(null);
  const [openChatWith, setOpenChatWith] = useState(null);
  const [showLikes, setShowLikes] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const chatPollRef = useRef(null);

  /* ---------- Chargement de la session au démarrage ---------- */
  useEffect(() => {
    (async () => {
      const saved = await loadSession();
      if (saved) {
        try {
          const rows = await sbFrom(`profiles?id=eq.${saved.user_id}&select=*`, saved);
          if (rows && rows[0]) {
            setSession(saved);
            setMe(mapProfile(rows[0]));
            setPhase("app");
            return;
          }
        } catch {
          /* session invalide, on repart sur l'accueil */
        }
      }
      setPhase("landing");
    })();
  }, []);

  /* ---------- Chargement des données une fois dans l'app ---------- */
  const refreshDiscover = async (activeSession, myId, activeFilters) => {
    setLoadingQueue(true);
    try {
      const f = activeFilters || filters;
      let query = `profiles?id=neq.${myId}&select=*&order=created_at.desc&limit=30`;
      query += `&age=gte.${f.minAge}&age=lte.${f.maxAge}`;
      if (f.country !== "all") query += `&country=eq.${f.country}`;
      if (f.lookingFor !== "tous") {
        query +=
          f.lookingFor === "les-deux"
            ? `&looking_for=eq.les-deux`
            : `&looking_for=in.(${f.lookingFor},les-deux)`;
      }
      const rows = await sbFrom(query, activeSession);
      const swiped = await sbFrom(`swipes?swiper_id=eq.${myId}&select=target_id`, activeSession);
      const swipedIds = new Set((swiped || []).map((s) => s.target_id));
      setQueue((rows || []).filter((r) => !swipedIds.has(r.id)).map(mapProfile));
    } catch (e) {
      setGlobalError(e.message);
    } finally {
      setLoadingQueue(false);
    }
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    if (session && me) refreshDiscover(session, me.id, newFilters);
  };

  const refreshLikes = async (activeSession) => {
    try {
      const rows = await sbFrom(`incoming_likes?select=*`, activeSession);
      setIncomingLikes((rows || []).map(mapProfile));
    } catch (e) {
      setGlobalError(e.message);
    }
  };

  const refreshMatches = async (activeSession) => {
    setLoadingMatches(true);
    try {
      const rows = await sbFrom(`my_matches?select=*&order=created_at.desc`, activeSession);
      setMatches(
        (rows || []).map((r) => ({ ...mapProfile(r), matchId: r.match_id }))
      );
    } catch (e) {
      setGlobalError(e.message);
    } finally {
      setLoadingMatches(false);
    }
  };

  useEffect(() => {
    if (phase === "app" && session && me) {
      refreshDiscover(session, me.id);
      refreshLikes(session);
      refreshMatches(session);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, session, me?.id]);

  /* ---------- Chat : chargement + sondage des nouveaux messages ---------- */
  useEffect(() => {
    if (!openChatWith || !session) return;
    let cancelled = false;

    const load = async () => {
      try {
        const rows = await sbFrom(
          `messages?match_id=eq.${openChatWith.matchId}&select=*&order=created_at.asc`,
          session
        );
        if (!cancelled) {
          setConversations((c) => ({ ...c, [openChatWith.matchId]: rows || [] }));
        }
      } catch (e) {
        if (!cancelled) setGlobalError(e.message);
      }
    };

    load();
    chatPollRef.current = setInterval(load, 3000);
    return () => {
      cancelled = true;
      clearInterval(chatPollRef.current);
    };
  }, [openChatWith, session]);

  /* ---------- Actions ---------- */

  const handleDecision = async (profile, liked) => {
    setQueue((q) => q.filter((p) => p.id !== profile.id));
    setViewingProfile(null);
    if (!session || !me) return;
    try {
      await sbFrom("swipes", session, {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates" },
        body: JSON.stringify({ swiper_id: me.id, target_id: profile.id, direction: liked ? "like" : "pass" }),
      });
      if (liked) {
        const reciprocal = await sbFrom(
          `swipes?swiper_id=eq.${profile.id}&target_id=eq.${me.id}&direction=eq.like&select=id`,
          session
        );
        if (reciprocal && reciprocal.length > 0) {
          setPendingMatch(profile);
          refreshMatches(session);
        }
      }
    } catch (e) {
      setGlobalError(e.message);
    }
  };

  const likeBack = async (profile) => {
    setIncomingLikes((l) => l.filter((p) => p.id !== profile.id));
    setShowLikes(false);
    if (!session || !me) return;
    try {
      await sbFrom("swipes", session, {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates" },
        body: JSON.stringify({ swiper_id: me.id, target_id: profile.id, direction: "like" }),
      });
      setPendingMatch(profile);
      refreshMatches(session);
    } catch (e) {
      setGlobalError(e.message);
    }
  };

  const passLike = async (profile) => {
    setIncomingLikes((l) => l.filter((p) => p.id !== profile.id));
    if (!session || !me) return;
    try {
      await sbFrom("swipes", session, {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates" },
        body: JSON.stringify({ swiper_id: me.id, target_id: profile.id, direction: "pass" }),
      });
    } catch (e) {
      setGlobalError(e.message);
    }
  };

  const startChatFlow = (match) => {
    setPendingMatch(null);
    setTab("matches");
    const withMatchId = matches.find((m) => m.id === match.id) || { ...match, matchId: match.matchId };
    setOpenChatWith(withMatchId);
  };

  const sendMessage = async (matchId, text) => {
    if (!session || !me) return;
    const optimistic = { id: `tmp-${Date.now()}`, sender_id: me.id, content: text, created_at: new Date().toISOString() };
    setConversations((c) => ({ ...c, [matchId]: [...(c[matchId] || []), optimistic] }));
    try {
      await sbFrom("messages", session, {
        method: "POST",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ match_id: matchId, sender_id: me.id, content: text }),
      });
    } catch (e) {
      setGlobalError(e.message);
    }
  };

  const updatePhoto = async (dataUrl, blob) => {
    if (!session || !me) return;
    try {
      const url = await sbUploadAvatar(session, me.id, blob);
      await sbFrom(`profiles?id=eq.${me.id}`, session, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ photo_url: url }),
      });
      setMe((m) => ({ ...m, photo: url }));
    } catch (e) {
      setGlobalError(e.message);
    }
  };

  const handleLoggedIn = async (auth) => {
    const newSession = { access_token: auth.access_token, refresh_token: auth.refresh_token, user_id: auth.user.id };
    const rows = await sbFrom(`profiles?id=eq.${newSession.user_id}&select=*`, newSession);
    if (!rows || !rows[0]) {
      setGlobalError("Aucun profil trouvé pour ce compte.");
      return;
    }
    setSession(newSession);
    setMe(mapProfile(rows[0]));
    await saveSession(newSession);
    setPhase("app");
  };

  const handleSignupComplete = async (newSession, profile) => {
    setSession(newSession);
    setMe(profile);
    await saveSession(newSession);
    setPhase("app");
  };

  const logout = async () => {
    await clearSession();
    setSession(null);
    setMe(null);
    setQueue([]);
    setIncomingLikes([]);
    setMatches([]);
    setConversations({});
    setPhase("landing");
    setTab("discover");
  };

  if (phase === "loading") {
    return (
      <div className="cam-screen cam-loading">
        <Style />
        <div className="cam-logo-mark cam-logo-mark--pulse">
          <img src={CAM_LOGO_URI} alt="CAM" className="cam-logo-img" />
        </div>
      </div>
    );
  }

  if (phase === "landing") {
    return (
      <>
        <Style />
        <Landing onStart={() => setPhase("onboarding")} onLogin={() => setPhase("login")} />
      </>
    );
  }

  if (phase === "login") {
    return (
      <>
        <Style />
        <Login onBack={() => setPhase("landing")} onLoggedIn={handleLoggedIn} />
      </>
    );
  }

  if (phase === "onboarding") {
    return (
      <>
        <Style />
        <Onboarding onBack={() => setPhase("landing")} onComplete={handleSignupComplete} />
      </>
    );
  }

  // phase === "app"
  return (
    <div className="cam-app-shell">
      <Style />

      {globalError && (
        <div className="cam-toast-error" onClick={() => setGlobalError("")}>
          <AlertCircle size={14} /> {globalError}
        </div>
      )}

      {openChatWith ? (
        <Chat
          me={me}
          match={openChatWith}
          messages={conversations[openChatWith.matchId] || []}
          onSend={(text) => sendMessage(openChatWith.matchId, text)}
          onBack={() => setOpenChatWith(null)}
        />
      ) : viewingProfile ? (
        <ProfileDetail profile={viewingProfile} onBack={() => setViewingProfile(null)} onDecision={handleDecision} />
      ) : showLikes ? (
        <LikesReceived likes={incomingLikes} onLikeBack={likeBack} onPass={passLike} onBack={() => setShowLikes(false)} />
      ) : (
        <>
          {tab === "discover" && (
            <Discover
              profiles={queue}
              loading={loadingQueue}
              likesCount={incomingLikes.length}
              onOpenLikes={() => setShowLikes(true)}
              onDecision={handleDecision}
              onOpenProfile={setViewingProfile}
              filters={filters}
              onApplyFilters={applyFilters}
            />
          )}
          {tab === "matches" && (
            <MatchList matches={matches} loading={loadingMatches} onOpenChat={setOpenChatWith} />
          )}
          {tab === "profile" && <MyProfile me={me} onUpdatePhoto={updatePhoto} onLogout={logout} />}
          <BottomNav tab={tab} setTab={setTab} matchCount={matches.length} />
        </>
      )}

      {pendingMatch && me && (
        <MatchOverlay
          me={me}
          match={pendingMatch}
          onKeepBrowsing={() => setPendingMatch(null)}
          onSendMessage={() => startChatFlow(pendingMatch)}
        />
      )}
    </div>
  );
}

/* ============================================================
   Styles
   ============================================================ */

function Style() {
  return (
    <style>{`
      :root {
        --cam-ink: #241E30;
        --cam-indigo: #2B2250;
        --cam-rose: #E8607A;
        --cam-amber: #F0A868;
        --cam-cream: #FAF6F0;
        --cam-blue: #4A5FE0;
        --cam-line: rgba(36,30,48,0.1);
      }
      * { box-sizing: border-box; }
      .cam-app-shell, .cam-screen {
        font-family: 'Manrope', -apple-system, sans-serif;
        color: var(--cam-ink);
      }
      .cam-app-shell {
        max-width: 430px;
        margin: 0 auto;
        min-height: 100vh;
        background: var(--cam-cream);
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
      }
      .cam-screen {
        width: 100%;
        min-height: 100vh;
        max-width: 430px;
        margin: 0 auto;
        background: var(--cam-cream);
        position: relative;
      }
      .cam-loading { display: flex; align-items: center; justify-content: center; }
      .cam-spin { animation: cam-spin 0.9s linear infinite; }
      @keyframes cam-spin { to { transform: rotate(360deg); } }

      .cam-toast-error {
        position: fixed; top: 12px; left: 50%; transform: translateX(-50%);
        max-width: 400px; width: calc(100% - 24px);
        background: #B8425A; color: white; font-size: 13px; font-weight: 600;
        padding: 10px 14px; border-radius: 12px; z-index: 100;
        display: flex; align-items: center; gap: 8px;
        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        cursor: pointer;
      }

      /* ---------- Landing ---------- */
      .cam-landing {
        background: linear-gradient(180deg, #2B2250 0%, #4A3A6B 45%, #E8607A 100%);
        color: white;
        overflow: hidden;
        padding: 56px 28px 40px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
      .cam-landing-glow {
        position: absolute;
        top: -80px; right: -80px;
        width: 260px; height: 260px;
        border-radius: 999px;
        background: radial-gradient(circle, rgba(240,168,104,0.55), transparent 70%);
        filter: blur(10px);
      }
      .cam-landing-content { position: relative; z-index: 1; }
      .cam-logo-mark {
        width: 44px; height: 44px;
        border-radius: 999px;
        overflow: hidden;
        display: flex; align-items: center; justify-content: center;
        margin-bottom: 22px;
        background: white;
        box-shadow: 0 4px 14px rgba(43,34,80,0.25);
      }
      .cam-logo-img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .cam-logo-mark--landing { width: 60px; height: 60px; margin-bottom: 24px; }
      .cam-logo-mark--sm { width: 32px; height: 32px; box-shadow: 0 2px 8px rgba(43,34,80,0.18); }
      .cam-logo-mark--pulse { width: 64px; height: 64px; animation: cam-pulse 1.4s ease-in-out infinite; }
      @keyframes cam-pulse { 0%,100% { opacity: .5; transform: scale(1);} 50% { opacity: 1; transform: scale(1.08);} }
      .cam-eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.14em;
        font-size: 11.5px;
        font-weight: 700;
        color: rgba(255,255,255,0.75);
        margin: 0 0 12px;
      }
      .cam-hero-title {
        font-family: 'Fraunces', serif;
        font-weight: 600;
        font-size: 38px;
        line-height: 1.12;
        margin: 0 0 16px;
      }
      .cam-hero-title em { font-style: italic; color: #FFD9C7; }
      .cam-hero-sub {
        font-size: 14.5px;
        line-height: 1.6;
        color: rgba(255,255,255,0.86);
        margin: 0 0 26px;
        max-width: 340px;
      }
      .cam-horizon-strip { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
      .cam-flag-chip {
        font-size: 16px;
        background: rgba(255,255,255,0.14);
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 999px;
        padding: 6px 10px;
      }

      /* ---------- Boutons ---------- */
      .cam-btn-primary {
        background: linear-gradient(135deg, var(--cam-rose), #D6486A);
        color: white;
        border: none;
        border-radius: 14px;
        padding: 15px 22px;
        font-family: 'Manrope', sans-serif;
        font-weight: 700;
        font-size: 15px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        cursor: pointer;
        box-shadow: 0 8px 20px rgba(232,96,122,0.35);
        transition: transform .15s ease, box-shadow .15s ease, opacity .15s ease;
      }
      .cam-btn-primary:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; }
      .cam-btn-primary:not(:disabled):active { transform: scale(0.97); }
      .cam-btn-full { width: 100%; }
      .cam-btn-ghost {
        background: transparent;
        border: none;
        color: var(--cam-ink);
        opacity: 0.65;
        font-weight: 600;
        font-size: 14px;
        padding: 12px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        justify-content: center;
        width: 100%;
      }
      .cam-btn-ghost--light { color: white; opacity: 0.85; margin-top: 6px; }

      /* ---------- Onboarding / Login ---------- */
      .cam-onboarding { padding: 40px 26px 26px; display: flex; flex-direction: column; min-height: 100vh; }
      .cam-onb-progress { display: flex; gap: 6px; margin-bottom: 18px; }
      .cam-onb-dot { flex: 1; height: 4px; border-radius: 999px; background: var(--cam-line); }
      .cam-onb-dot--active { background: var(--cam-rose); }
      .cam-onb-step-label { font-size: 12px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; color: var(--cam-rose); margin: 0 0 18px; }
      .cam-onb-title { font-family: 'Fraunces', serif; font-size: 25px; font-weight: 600; margin: 0 0 22px; }
      .cam-form-block { flex: 1; }
      .cam-label { display: block; font-size: 12.5px; font-weight: 700; color: rgba(36,30,48,0.55); margin: 16px 0 6px; }
      .cam-input {
        width: 100%;
        border: 1.5px solid var(--cam-line);
        background: white;
        border-radius: 12px;
        padding: 13px 14px;
        font-size: 15px;
        font-family: 'Manrope', sans-serif;
        color: var(--cam-ink);
        outline: none;
      }
      .cam-input:focus { border-color: var(--cam-rose); }
      .cam-textarea { resize: none; }
      .cam-pill-row { display: flex; gap: 10px; }
      .cam-pill {
        flex: 1; padding: 12px; border-radius: 12px; border: 1.5px solid var(--cam-line);
        background: white; font-weight: 700; font-size: 14px; cursor: pointer; color: var(--cam-ink);
      }
      .cam-pill--active { border-color: var(--cam-rose); background: rgba(232,96,122,0.08); color: var(--cam-rose); }
      .cam-goal-cards { display: flex; flex-direction: column; gap: 12px; }
      .cam-goal-card {
        display: flex; flex-direction: column; align-items: flex-start; gap: 4px; text-align: left;
        border: 1.5px solid var(--cam-line); background: white; border-radius: 14px; padding: 16px;
        cursor: pointer; color: var(--cam-ink);
      }
      .cam-goal-card span { font-weight: 700; font-size: 15.5px; }
      .cam-goal-card p { margin: 0; font-size: 12.5px; color: rgba(36,30,48,0.6); }
      .cam-goal-card--active { border-color: var(--cam-rose); background: rgba(232,96,122,0.06); }
      .cam-goal-card--active svg { color: var(--cam-rose); }
      .cam-onb-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 24px; }
      .cam-onb-actions--single { justify-content: stretch; }
      .cam-error {
        display: flex; align-items: center; gap: 6px;
        color: #B8425A; font-size: 12.5px; font-weight: 600; margin-top: 14px;
      }

      /* ---------- Photo picker ---------- */
      .cam-photo-hint { font-size: 13px; line-height: 1.5; color: rgba(36,30,48,0.6); margin: 0 0 16px; }
      .cam-photo-input-hidden { display: none; }
      .cam-photo-picker {
        display: block; width: 100%; height: 220px; border-radius: 16px;
        border: 1.5px dashed rgba(232,96,122,0.5); background: rgba(232,96,122,0.05);
        cursor: pointer; overflow: hidden; margin-bottom: 12px;
      }
      .cam-photo-picker img { width: 100%; height: 100%; object-fit: cover; }
      .cam-photo-picker-empty {
        width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;
        gap: 8px; color: var(--cam-rose); font-weight: 700; font-size: 13.5px;
      }
      .cam-avatar-edit { position: relative; display: inline-block; cursor: pointer; }
      .cam-avatar-edit-badge {
        position: absolute; bottom: 0; right: 0; width: 26px; height: 26px; border-radius: 999px;
        background: var(--cam-rose); color: white; display: flex; align-items: center; justify-content: center;
        border: 2.5px solid white;
      }

      .cam-filter-btn {
        margin-left: auto;
        position: relative;
        width: 36px; height: 36px; border-radius: 999px;
        background: white; border: 1.5px solid var(--cam-line);
        display: flex; align-items: center; justify-content: center;
        color: var(--cam-ink); cursor: pointer;
      }
      .cam-filter-btn-badge {
        position: absolute; top: -4px; right: -4px;
        background: var(--cam-rose); color: white;
        font-size: 10px; font-weight: 800; min-width: 16px; height: 16px;
        border-radius: 999px; display: flex; align-items: center; justify-content: center;
      }
      .cam-filter-overlay {
        position: fixed; inset: 0; z-index: 60;
        background: rgba(43,34,80,0.5);
        display: flex; align-items: flex-end; justify-content: center;
      }
      .cam-filter-sheet {
        width: 100%; max-width: 430px;
        background: var(--cam-cream);
        border-radius: 22px 22px 0 0;
        padding: 20px 22px calc(20px + env(safe-area-inset-bottom));
        max-height: 85vh; overflow-y: auto;
      }
      .cam-filter-sheet-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
      .cam-filter-sheet-header h3 { font-family: 'Fraunces', serif; font-size: 19px; margin: 0; }
      .cam-filter-close { background: none; border: none; color: var(--cam-ink); opacity: 0.6; cursor: pointer; }
      .cam-pill-row--wrap { flex-wrap: wrap; }
      .cam-pill-row--wrap .cam-pill { flex: 0 1 auto; padding: 10px 14px; }
      .cam-age-row { display: flex; align-items: center; gap: 10px; }
      .cam-age-input { text-align: center; }
      .cam-filter-actions { display: flex; gap: 10px; margin-top: 22px; }
      .cam-filter-actions .cam-btn-primary { flex: 1; }
      .cam-filter-actions .cam-btn-ghost { flex: 0 0 auto; width: auto; }

      /* ---------- Discover ---------- */
      .cam-discover { padding: 20px 20px 96px; display: flex; flex-direction: column; }
      .cam-discover-header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
      .cam-discover-header--withback { gap: 4px; }
      .cam-discover-title { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600; }

      .cam-likes-banner {
        display: flex; align-items: center; gap: 12px; width: 100%; text-align: left;
        background: linear-gradient(135deg, rgba(232,96,122,0.12), rgba(240,168,104,0.14));
        border: 1px solid rgba(232,96,122,0.25); border-radius: 16px; padding: 12px 14px;
        margin-bottom: 16px; cursor: pointer;
      }
      .cam-likes-banner-hearts {
        width: 34px; height: 34px; border-radius: 999px; flex-shrink: 0;
        background: linear-gradient(135deg, var(--cam-rose), #D6486A); color: white;
        display: flex; align-items: center; justify-content: center;
      }
      .cam-likes-banner-text { flex: 1; display: flex; flex-direction: column; }
      .cam-likes-banner-text strong { font-size: 13.5px; }
      .cam-likes-banner-text span { font-size: 12px; color: rgba(36,30,48,0.6); }
      .cam-likes-screen { padding: 20px 20px 40px; }
      .cam-likes-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .cam-like-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 6px 16px rgba(43,34,80,0.1); }
      .cam-like-card-photo { height: 110px; position: relative; display: flex; align-items: center; justify-content: center; }
      .cam-like-card-initial { font-family: 'Fraunces', serif; font-size: 40px; color: rgba(255,255,255,0.5); font-weight: 600; }
      .cam-like-card-heart {
        position: absolute; top: 8px; right: 8px; width: 24px; height: 24px; border-radius: 999px;
        background: rgba(255,255,255,0.9); color: var(--cam-rose); display: flex; align-items: center; justify-content: center;
      }
      .cam-like-card-body { padding: 10px 10px 12px; }
      .cam-like-card-body h4 { margin: 0 0 2px; font-size: 13.5px; font-family: 'Fraunces', serif; }
      .cam-like-card-body .cam-card-loc { font-size: 11px; margin: 0 0 8px; }
      .cam-like-card-actions { display: flex; gap: 8px; }
      .cam-round-btn--sm { width: 38px; height: 38px; box-shadow: none; }

      .cam-card-stack { position: relative; flex: 1; min-height: 480px; }
      .cam-profile-card {
        position: absolute; inset: 0; background: white; border-radius: 22px; overflow: hidden;
        box-shadow: 0 14px 34px rgba(43,34,80,0.16); display: flex; flex-direction: column;
        transition: transform .22s ease, opacity .22s ease;
      }
      .cam-profile-card--exit-left { transform: translateX(-130%) rotate(-8deg); opacity: 0; }
      .cam-profile-card--exit-right { transform: translateX(130%) rotate(8deg); opacity: 0; }
      .cam-card-photo { position: relative; height: 62%; display: flex; align-items: flex-end; padding: 18px; }
      .cam-card-initial {
        position: absolute; top: 50%; left: 50%; transform: translate(-50%, -60%);
        font-family: 'Fraunces', serif; font-size: 96px; color: rgba(255,255,255,0.25); font-weight: 600;
      }
      .cam-card-photo-fade { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.45) 100%); }
      .cam-card-info { position: relative; z-index: 1; color: white; width: 100%; }
      .cam-card-name-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
      .cam-card-name-row h3, .cam-card-name-row h2 { font-family: 'Fraunces', serif; font-weight: 600; margin: 0; font-size: 22px; }
      .cam-card-loc { display: flex; align-items: center; gap: 5px; font-size: 13px; opacity: 0.9; margin: 4px 0 0; }
      .cam-card-bio { padding: 16px 18px; flex: 1; overflow-y: auto; }
      .cam-card-bio p { margin: 0 0 12px; font-size: 14px; line-height: 1.55; color: rgba(36,30,48,0.8); }
      .cam-tag-row { display: flex; flex-wrap: wrap; gap: 8px; }
      .cam-tag { font-size: 12px; font-weight: 600; background: rgba(74,95,224,0.08); color: var(--cam-blue); padding: 6px 11px; border-radius: 999px; }
      .cam-goal-badge {
        display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 700;
        padding: 5px 10px; border-radius: 999px; white-space: nowrap;
        background: rgba(255,255,255,0.22); color: white; backdrop-filter: blur(3px);
      }
      .cam-detail-body .cam-goal-badge, .cam-my-profile-card .cam-goal-badge { background: rgba(232,96,122,0.1); color: var(--cam-rose); }
      .cam-swipe-actions { display: flex; justify-content: center; gap: 20px; margin-top: 18px; }
      .cam-swipe-actions--fixed { position: sticky; bottom: 16px; }
      .cam-round-btn {
        width: 58px; height: 58px; border-radius: 999px; border: none;
        display: flex; align-items: center; justify-content: center; cursor: pointer;
        box-shadow: 0 8px 20px rgba(43,34,80,0.16); transition: transform .12s ease;
      }
      .cam-round-btn:active { transform: scale(0.92); }
      .cam-round-btn--pass { background: white; color: #B8425A; border: 1.5px solid var(--cam-line); }
      .cam-round-btn--like { background: linear-gradient(135deg, var(--cam-rose), #D6486A); color: white; }
      .cam-empty-state {
        flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
        text-align: center; gap: 10px; color: rgba(36,30,48,0.6); padding: 40px;
      }
      .cam-empty-state h2 { font-family: 'Fraunces', serif; color: var(--cam-ink); margin: 6px 0 0; font-size: 19px; }
      .cam-empty-state svg { color: var(--cam-rose); opacity: 0.7; }

      /* ---------- Profile detail ---------- */
      .cam-profile-detail { padding-bottom: 110px; }
      .cam-back-btn {
        position: absolute; top: 16px; left: 16px; z-index: 3; width: 36px; height: 36px; border-radius: 999px;
        background: rgba(255,255,255,0.85); border: none; display: flex; align-items: center; justify-content: center;
        cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.12);
      }
      .cam-back-btn--inline { position: static; box-shadow: none; background: transparent; }
      .cam-detail-hero { height: 280px; display: flex; align-items: center; justify-content: center; }
      .cam-detail-initial { font-family: 'Fraunces', serif; font-size: 110px; color: rgba(255,255,255,0.35); font-weight: 600; }
      .cam-detail-body { padding: 20px 22px; }
      .cam-detail-body h2 { font-family: 'Fraunces', serif; font-size: 24px; margin: 0; }
      .cam-detail-section-title { font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: rgba(36,30,48,0.5); margin: 20px 0 8px; }
      .cam-detail-bio { font-size: 14.5px; line-height: 1.6; margin: 0; }

      /* ---------- Match overlay ---------- */
      .cam-match-overlay {
        position: fixed; inset: 0; z-index: 50; background: rgba(43,34,80,0.92);
        display: flex; align-items: center; justify-content: center; padding: 24px;
      }
      .cam-match-overlay-inner { text-align: center; color: white; max-width: 340px; }
      .cam-match-sparkle { color: var(--cam-amber); margin-bottom: 6px; }
      .cam-match-overlay-inner h2 { font-family: 'Fraunces', serif; font-size: 30px; margin: 0 0 8px; }
      .cam-match-overlay-inner p { font-size: 14px; color: rgba(255,255,255,0.8); margin: 0 0 26px; }
      .cam-match-avatars { display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 30px; }
      .cam-match-heart { color: var(--cam-rose); }
      .cam-match-overlay-inner .cam-btn-ghost { color: white; opacity: 0.75; }

      /* ---------- Matches list ---------- */
      .cam-matches { padding: 20px 20px 96px; }
      .cam-match-list { display: flex; flex-direction: column; gap: 4px; }
      .cam-match-row {
        display: flex; align-items: center; gap: 12px; background: transparent; border: none;
        padding: 12px 6px; border-radius: 14px; cursor: pointer; text-align: left; border-bottom: 1px solid var(--cam-line);
        width: 100%;
      }
      .cam-match-row-info { flex: 1; min-width: 0; }
      .cam-match-row-top { display: flex; align-items: center; gap: 8px; margin-bottom: 2px; }
      .cam-match-row-top h4 { margin: 0; font-size: 15px; font-family: 'Fraunces', serif; }
      .cam-match-row-info p { margin: 0; font-size: 13px; color: rgba(36,30,48,0.55); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

      /* ---------- Chat ---------- */
      .cam-chat { display: flex; flex-direction: column; height: 100vh; padding: 0; }
      .cam-chat-header { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-bottom: 1px solid var(--cam-line); background: white; }
      .cam-chat-header h4 { margin: 0; font-family: 'Fraunces', serif; font-size: 16px; }
      .cam-chat-sub { margin: 0; font-size: 11.5px; color: rgba(36,30,48,0.5); }
      .cam-chat-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
      .cam-bubble { max-width: 78%; padding: 11px 14px; border-radius: 16px; font-size: 14px; line-height: 1.45; }
      .cam-bubble--them { align-self: flex-start; background: white; border: 1px solid var(--cam-line); border-bottom-left-radius: 4px; }
      .cam-bubble--me { align-self: flex-end; background: linear-gradient(135deg, var(--cam-rose), #D6486A); color: white; border-bottom-right-radius: 4px; }
      .cam-chat-input-row { display: flex; gap: 8px; padding: 12px 14px; border-top: 1px solid var(--cam-line); background: white; }
      .cam-chat-input { flex: 1; border: 1.5px solid var(--cam-line); border-radius: 999px; padding: 11px 16px; font-size: 14px; outline: none; font-family: 'Manrope', sans-serif; }
      .cam-chat-input:focus { border-color: var(--cam-rose); }
      .cam-send-btn {
        width: 42px; height: 42px; border-radius: 999px; border: none;
        background: linear-gradient(135deg, var(--cam-rose), #D6486A); color: white;
        display: flex; align-items: center; justify-content: center; cursor: pointer;
      }

      /* ---------- My profile ---------- */
      .cam-my-profile { padding: 20px 20px 100px; }
      .cam-my-profile-card {
        background: white; border-radius: 18px; padding: 26px 22px; display: flex; flex-direction: column;
        align-items: center; text-align: center; gap: 6px; margin-bottom: 18px; box-shadow: 0 6px 18px rgba(43,34,80,0.08);
      }
      .cam-my-profile-card h2 { font-family: 'Fraunces', serif; margin: 6px 0 0; }
      .cam-my-profile-card .cam-detail-section-title { align-self: flex-start; }
      .cam-my-profile-card .cam-detail-bio { text-align: left; align-self: stretch; }

      /* ---------- Bottom nav ---------- */
      .cam-bottom-nav {
        position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 430px;
        display: flex; background: white; border-top: 1px solid var(--cam-line);
        padding: 10px 10px calc(10px + env(safe-area-inset-bottom));
      }
      .cam-nav-btn {
        flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px;
        background: none; border: none; cursor: pointer; font-size: 11px; font-weight: 700; color: rgba(36,30,48,0.45); padding: 4px;
      }
      .cam-nav-btn--active { color: var(--cam-rose); }
      .cam-nav-icon-wrap { position: relative; }
      .cam-nav-badge {
        position: absolute; top: -4px; right: -8px; background: var(--cam-rose); color: white;
        font-size: 9.5px; font-weight: 800; min-width: 15px; height: 15px; border-radius: 999px;
        display: flex; align-items: center; justify-content: center; padding: 0 3px;
      }

      @media (prefers-reduced-motion: reduce) {
        .cam-profile-card, .cam-logo-mark--pulse { transition: none; animation: none; }
      }
    `}</style>
  );
}
