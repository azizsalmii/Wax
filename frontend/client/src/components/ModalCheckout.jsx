import React, { useState, useEffect, useRef } from "react";
import "./ModalCheckout.css";
import Notification from "../components/Notification";

export default function ModalCheckout({ open, onClose, onSubmit }) {
  if (!open) return null;

  // Step (1 → 3)
  const [step, setStep] = useState(1);

  // Validation errors
  const [errors, setErrors] = useState({});

  // Tunisian phone regex
  const tnPhoneRegex = /^[24579][0-9]{7}$/;

  // Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Success Notification
  const [success, setSuccess] = useState(false);

  // Regions data
  const regions = {
    Ariana: ["Ariana", "Ettadhamen", "Kalaat El Andalous", "Mnihla", "Raoued", "Sidi Thabet", "Soukra"],
    Beja: ["Amdoun", "Beja", "Goubellat", "Majaz al Bab", "Nefza", "Teboursouk", "Testour", "Thibar"],
    "Ben Arous": ["Ben Arous", "Bou Mhel el-Bassatine", "El Mourouj", "Ezzahra", "Fouchana", "Hammam Chott", "Hammam Lif", "Mohamedia", "Medina Jedida", "Megrine", "Mornag", "Rades"],
    Bizerte: ["Bizerte", "Djoumime", "El Alia", "Ghar El Melh", "Ghezala", "Mateur", "Menzel Bourguiba", "Menzel Jemil", "Ras Jebel", "Sejenane", "Tinja", "Utica", "Zarzouna"],
    "Gabès": ["Gabes", "Ghannouch", "Hamma", "Mareth", "Matmata", "Menzel Habib", "Metouia"],
    "Gafsa": ["Belkhir", "Gafsa", "Guetar", "Ksar", "Mdhila", "Metlaoui", "Oum Larais", "Redeyef", "Sened", "Sidi Aich"],
    Jendouba: ["Ain Draham", "Balta (Bilta)", "Bou Salem", "Fernana", "Ghardimaou", "Jendouba", "Oued Melliz", "Tabarka"],
    Kairouan: ["Alaâ", "Bouhajla", "Chebika", "Echrarda", "Haffouz", "Hajeb El Ayoun", "Kairouan", "Nasrallah", "Oueslatia", "Sbikha"],
    Kasserine: ["Ayoun", "Ezzouhour", "Feriana", "Foussana", "Hassi El Ferid", "Hidra", "Jedelienne", "Kasserine", "Magel Bel Abbes", "Sbeitla", "Sbiba", "Thala"],
    Kebili: ["Douz North", "Douz South", "Faouar", "Kebili North", "Kebili South", "Souk El Ahed"],
    Kef: ["Dahmani", "Es Sers", "Jerissa", "Kalaa Khasbat", "Kalaat Senane", "Kef East", "Kef West", "Ksour", "Nebeur", "Sakiet Sidi Youssef", "Tajerouine", "Touiref"],
    Mahdia: ["Boumerdes", "Chebba", "Chorbane", "El Djem", "Hbira", "Ksour Essef", "Mahdia", "Melloulech", "Ouled Chamekh", "Sidi Alouane", "Souassi"],
    Manouba: ["Manouba", "Douar Hicher", "Oued Ellil", "Tebourba", "Borj El Amri", "Mornaguia", "Jedaida", "El Battan"],
    Medenine: ["Medenine North", "Medenine South", "Zarzis", "Ben Guerdane", "Djerba Midoun", "Djerba Houmet Souk", "Djerba Ajim", "Beni Khedache", "Sidi Makhlouf"],
    Monastir: ["Monastir", "Ksar Hellal", "Sahline", "Téboulba", "Jemmal", "Moknine", "Bekalta", "Bembla", "Zeramdine", "Lamta", "Ksibet El Mediouni"],
    Nabeul: ["Nabeul", "Hammamet", "Kelibia", "Dar Chaabane", "Korba", "Menzel Temime", "Menzel Bouzelfa", "Soliman", "Takelsa", "Beni Khalled", "Grombalia", "Bou Argoub"],
    Sfax: ["Agareb", "Bir Ali Ben Khelifa", "El Amra", "El Ghraiba", "Hencha", "Jebeniana", "Kerkennah", "Mahres", "Menzel Chaker", "Sakiet Eddaier", "Sakiet Ezzit", "Sfax Medina", "Sfax West", "Sfax South", "Skhira", "Thyna"],
    "Sidi Bouzid": ["Bir El Hfay", "Jelma", "Mazzouna", "Meknassi", "Menzel Bouzaiene", "Ouled Haffouz", "Regueb", "Sabalat Ouled Asker", "Sidi Ali Ben Aoun", "Sidi Bouzid East", "Sidi Bouzid West", "Souk Jedid"],
    Siliana: ["Bouarada", "El Aroussa", "El Krib", "Gaafour", "Kesra", "Makthar", "Rouhia", "Sidi Bourouis", "Siliana North", "Siliana South"],
    Sousse: ["Akouda", "Bouficha", "Enfidha", "Hammam Sousse", "Hergla", "Kalaa Kebira", "Kalaa Sghira", "Kondar", "M'Saken", "Sidi Bou Ali", "Sidi El Heni", "Sousse Jaouhara", "Sousse Medina", "Sousse Riadh", "Sousse Sidi Abdelhamid", "Zaouiet Ksibet Thrayet"],
    Tataouine: ["Bir Lahmar", "Dhiba", "Ghomrassen", "Remada", "Samar", "Tataouine"],
    Tozeur: ["Degueche", "Hazoua", "Nefta", "Tameghza", "Tozeur"],
    Tunis: ["Bab Bhar", "Bab Souika", "Carthage", "El Khadra City", "Djebel Djelloud", "El Haraïria", "El Kabaria", "El Menzah", "El Omrane", "El Omrane Supérieur", "El Ouardia", "Ettahrir", "Ezzouhour", "La Goulette", "La Marsa", "Le Bardo", "Le Kram", "Medina", "Sidi El Béchir", "Sidi Hassine", "Sijoumi"],
    Zaghouan: ["Zaghouan", "El Fahs", "Nadhour", "Bir Mcherga", "Saouaf", "Zriba"]
  };

  // Form state
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    gouvernorat: "",
    delegation: "",
    adresse: ""
  });

  const addressInput = useRef();

  // Google autocomplete
  useEffect(() => {
    if (!window.google) return;
    const ac = new window.google.maps.places.Autocomplete(addressInput.current, {
      componentRestrictions: { country: "tn" }
    });
    ac.addListener("place_changed", () => {
      const place = ac.getPlace();
      setForm((f) => ({ ...f, adresse: place.formatted_address || "" }));
    });
  }, []);

  // Autofill when gov + deleg selected
  useEffect(() => {
    if (form.gouvernorat && form.delegation) {
      setForm((f) => ({
        ...f,
        adresse: `${form.gouvernorat}, ${form.delegation}, Tunisia`
      }));
    }
  }, [form.gouvernorat, form.delegation]);

  // Handle inputs
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleGov = (e) => {
    setForm({ ...form, gouvernorat: e.target.value, delegation: "" });
  };

  const handleDeleg = (e) => {
    setForm({ ...form, delegation: e.target.value });
  };

  // Validation logic
  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!form.nom.trim()) newErrors.nom = "Last name is required";
      if (!form.prenom.trim()) newErrors.prenom = "First name is required";

      if (!form.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!emailRegex.test(form.email)) {
        newErrors.email = "Invalid email format";
      }

      if (!form.telephone.trim()) {
        newErrors.telephone = "Phone is required";
      } else if (!tnPhoneRegex.test(form.telephone)) {
        newErrors.telephone = "Invalid Tunisian phone number";
      }
    }

    if (step === 2) {
      if (!form.gouvernorat) newErrors.gouvernorat = "Select a governorate";
      if (!form.delegation) newErrors.delegation = "Select a delegation";
      if (!form.adresse.trim()) newErrors.adresse = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation
  const next = () => {
    if (validateStep()) setStep(step + 1);
  };

  const back = () => setStep(step - 1);

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    onSubmit(form);
    setSuccess(true);      
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-card" onClick={(e) => e.stopPropagation()}>

        {/* PROGRESS BAR */}
        <div className="progress-container">
          <div className={`progress-step ${step >= 1 ? "active" : ""}`}>1</div>
          <div className={`progress-line ${step >= 2 ? "active" : ""}`}></div>
          <div className={`progress-step ${step >= 2 ? "active" : ""}`}>2</div>
          <div className={`progress-line ${step >= 3 ? "active" : ""}`}></div>
          <div className={`progress-step ${step === 3 ? "active" : ""}`}>3</div>
        </div>

        <h2>Finalize the Order</h2>

        <form className="checkout-form" onSubmit={handleSubmit}>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <input name="nom" placeholder="Last Name" onChange={handleChange} />
              {errors.nom && <p className="error-msg">{errors.nom}</p>}

              <input name="prenom" placeholder="First Name" onChange={handleChange} />
              {errors.prenom && <p className="error-msg">{errors.prenom}</p>}

              <input type="email" name="email" placeholder="Email" onChange={handleChange} />
              {errors.email && <p className="error-msg">{errors.email}</p>}

              <input name="telephone" placeholder="Phone" onChange={handleChange} />
              {errors.telephone && <p className="error-msg">{errors.telephone}</p>}

              <button type="button" className="step-btn" onClick={next}>Next →</button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <select value={form.gouvernorat} onChange={handleGov}>
                <option value="">Select Governorate</option>
                {Object.keys(regions).map((gov) => (
                  <option key={gov} value={gov}>{gov}</option>
                ))}
              </select>
              {errors.gouvernorat && <p className="error-msg">{errors.gouvernorat}</p>}

              <select
                disabled={!form.gouvernorat}
                value={form.delegation}
                onChange={handleDeleg}
              >
                <option value="">Select Delegation</option>
                {form.gouvernorat &&
                  regions[form.gouvernorat].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
              </select>
              {errors.delegation && <p className="error-msg">{errors.delegation}</p>}

              <input
                ref={addressInput}
                name="adresse"
                placeholder="Full Address"
                value={form.adresse}
                onChange={handleChange}
              />
              {errors.adresse && <p className="error-msg">{errors.adresse}</p>}

              <div className="step-nav">
                <button type="button" className="step-btn back" onClick={back}>← Back</button>
                <button type="button" className="step-btn" onClick={next}>Next →</button>
              </div>
            </>
          )}

          {/* STEP 3 — REVIEW */}
          {step === 3 && (
            <>
              <div className="review-box">
                <p><strong>Name:</strong> {form.prenom} {form.nom}</p>
                <p><strong>Email:</strong> {form.email}</p>
                <p><strong>Phone:</strong> {form.telephone}</p>
                <p><strong>Address:</strong> {form.adresse}</p>
              </div>

              <div className="step-nav">
                <button type="button" className="step-btn back" onClick={back}>← Back</button>
                <button className="validate-btn" type="submit">
                  Approve the Purchase
                </button>
              </div>
            </>
          )}
        </form>

        <button className="close-checkout" onClick={onClose}>✖</button>
      </div>

      {/* NOTIFICATION LUXE */}
      {success && (
        <Notification
          message="Order successfully completed!"
          onClose={() => setSuccess(false)}
        />
      )}

    </div>
  );
}
