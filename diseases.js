// ===== COMPREHENSIVE DISEASE KNOWLEDGE BASE =====
// Used by the Carebridge AI Triage system to ground assessments in medical knowledge.
// Each condition: name, typical presentation, atypical presentations, red flags, risk factors, triage urgency, management.

const DISEASE_KNOWLEDGE = {
  version: "1.0",
  disclaimer: "This knowledge base is for triage decision support only. It does not replace clinical judgment.",

  // US Clinical Vital Sign Reference — 3-tier (GREEN / URGENT / EMERGENCY)
  vitalSigns: {
    temperature: {
      green: "95-99.5°F",
      urgent: "100.4-103.9°F — medical review advised",
      emergency: "≥104°F or <95°F with symptoms (confusion, shivering, weakness, AMS)"
    },
    heartRate: {
      green: "60-100 bpm (athletes may have 50-59 without symptoms)",
      urgent: "101-120 bpm, or 50-59 bpm with symptoms",
      emergency: ">130 bpm, or <40 bpm, or abnormal HR with chest pain/fainting/severe dizziness/SOB"
    },
    bloodPressure: {
      green: "90/60 – 129/84 mmHg",
      urgent: "130-179 systolic OR 85-119 diastolic",
      emergency: "≥180 systolic OR ≥120 diastolic WITH symptoms (chest pain, neuro symptoms, SOB, confusion)"
    },
    respiratoryRate: {
      green: "12-20/min",
      urgent: "21-24/min",
      emergency: ">30/min or <8/min"
    },
    oxygenSaturation: {
      green: "≥95%",
      urgent: "90-94%",
      emergency: "<90%"
    },
    bloodGlucose: {
      green: "70-140 mg/dL",
      urgent: "180-399 mg/dL",
      emergency: "≥400 mg/dL, or <54 mg/dL, or abnormal glucose with confusion/unconsciousness/seizures/vomiting/severe dehydration"
    }
  },

  cardiovascular: {
    label: "Cardiovascular Diseases",
    conditions: [
      {
        name: "Acute Myocardial Infarction (Heart Attack)",
        typical: "Chest pain/pressure/squeezing radiating to left arm, jaw, or back; shortness of breath; diaphoresis; nausea; lightheadedness; crushing substernal pain lasting >20min",
        atypical: "Women: back pain, jaw pain, extreme fatigue, indigestion, flu-like symptoms WITHOUT chest pain. Diabetics: silent ischemia, nausea, SOB only. Elderly: confusion, syncope, sudden weakness without pain.",
        redFlags: ["chest pain at rest >15min", "pain radiating to arm/jaw/back", "associated SOB", "cold sweat/clammy", "sense of impending doom", "new onset chest pain with nausea"],
        riskFactors: ["hypertension", "diabetes", "smoking", "hyperlipidemia", "family history premature CAD", "obesity", "sedentary lifestyle", "age >45M/>55F", "chronic kidney disease"],
        urgency: "RED - Call 911 immediately",
        advice: "Aspirin 325mg chewed if not allergic and no contraindication. Sit upright, do not lie flat. Stay calm."
      },
      {
        name: "Unstable Angina",
        typical: "Chest pain with minimal exertion or at rest; worsening pattern of previously stable angina; pain lasting >20min",
        atypical: "Epigastric discomfort, indigestion-like sensation, isolated dyspnea",
        redFlags: ["new onset chest pain with exertion", "crescendo pattern (more frequent/severe)", "pain at rest", "pain lasting >20min"],
        riskFactors: ["known CAD", "diabetes", "smoking", "hypertension"],
        urgency: "RED - Call 911 (same as MI)"
      },
      {
        name: "Congestive Heart Failure (Acute Decompensation)",
        typical: "Progressive dyspnea on exertion, orthopnea, PND, bilateral leg edema, crackles on lung exam, JVD, paroxysmal nocturnal dyspnea",
        atypical: "Only fatigue/cough in elderly; new confusion from poor cerebral perfusion; abdominal symptoms from hepatic congestion; weight gain over days",
        redFlags: ["severe dyspnea at rest", "cannot lie flat", "confusion/altered mental status", "low urine output", "hypotension", "chest pain"],
        riskFactors: ["known HF", "CAD", "hypertension", "valvular disease", "cardiomyopathy", "non-adherence to meds", "excess sodium/fluid intake"],
        urgency: "RED if severe (rest dyspnea, AMS) — ORANGE if moderate but worsening",
        advice: "Sit upright. Use prescribed diuretics if you have them. Weigh daily. Restrict sodium."
      },
      {
        name: "Aortic Dissection",
        typical: "Sudden onset severe tearing/ripping chest pain radiating to back, between shoulder blades; differential BP arms; syncope; stroke symptoms",
        atypical: "Painless presentation in 5-10% — syncope, stroke, HF, or cardiac tamponade without pain",
        redFlags: ["sudden worst-ever chest or back pain", "BP differential >20mmHg between arms", "syncope + chest/back pain", "marfanoid habitus", "known aortic aneurysm"],
        riskFactors: ["hypertension", "connective tissue disorders (Marfan, Ehlers-Danlos)", "bicuspid aortic valve", "aortic coarctation", "cocaine use", "pregnancy (3rd trimester/postpartum)", "vasculitis"],
        urgency: "RED - 911 immediately. Time-sensitive surgical emergency.",
        advice: "Keep patient calm, supine. Do not give anything by mouth. Do not give anticoagulants."
      },
      {
        name: "Pericarditis",
        typical: "Sharp pleuritic chest pain, worse lying flat, better sitting forward, may radiate to trapezius ridge; fever; pericardial rub",
        atypical: "Dull ache with gradual onset in viral cases; can mimic MI; may have only fever/malaise",
        redFlags: ["cardiac tamponade signs: hypotension, JVD, muffled hearts, pulsus paradoxus", "high fever", "immunocompromised", "purulent pericarditis"],
        riskFactors: ["viral infection", "autoimmune disease", "post-MI/post-cardiac surgery", "uremia", "radiation therapy"],
        urgency: "YELLOW-ORANGE uncomplicated — RED if tamponade suspected",
        advice: "NSAIDs/colchicine for pain. Avoid anticoagulants. Rest."
      },
      {
        name: "DVT / Pulmonary Embolism",
        typical: "DVT: unilateral leg swelling, warmth, erythema, calf tenderness, Homan's sign. PE: sudden onset pleuritic chest pain, dyspnea, tachypnea, hemoptysis, hypoxia, syncope",
        atypical: "Isolated unexplained dyspnea (especially elderly); syncope as only sign of massive PE; low-grade fever; anxiety/feeling of doom",
        redFlags: ["hypotension", "severe hypoxia", "syncope", "right heart strain", "massive PE signs"],
        riskFactors: ["prolonged immobility/surgery", "cancer", "pregnancy/postpartum", "OCP/HRT", "obesity", "prior DVT/PE", "thrombophilia", "long flights/travel"],
        urgency: "RED if suspected PE with any vital sign instability — ORANGE if stable",
        advice: "Sit upright, use oxygen if available. No massaging of leg. No ambulation if DVT suspected."
      },
      {
        name: "Arrhythmia (Atrial Fibrillation / SVT / VT)",
        typical: "Palpitations, racing heart, fluttering in chest, lightheadedness, dyspnea, chest discomfort, near-syncope, fatigue",
        atypical: "Only fatigue or reduced exercise tolerance (elderly); only anxiety/panic; polyuria (AFib); silent AFib found on exam",
        redFlags: ["syncope/near-syncope", "chest pain with palpitations", "severe dyspnea", "hypotension", "heart rate >150", "VT suspected", "ICD shocks"],
        riskFactors: ["hypertension", "CAD", "valvular disease", "thyrotoxicosis", "electrolyte abnormalities", "sleep apnea", "alcohol use", "caffeine", "anxiety"],
        urgency: "RED if unstable (hypotension, AMS, chest pain, pulmonary edema) — YELLOW/ORANGE if stable"
      },
      {
        name: "Hypertensive Emergency",
        typical: "BP >180/120 with end-organ damage: severe headache, vision changes, chest pain, dyspnea, confusion, papilledema, stroke symptoms",
        atypical: "May have only vague symptoms until organ damage is severe; headache may be only complaint in some",
        redFlags: ["BP >180/120 + symptoms", "acute vision loss", "new neuro deficit", "chest pain", "dyspnea", "seizure", "pregnancy"],
        riskFactors: ["chronic hypertension", "medication non-adherence", "renal disease", "preeclampsia", "pheochromocytoma", "cocaine/amphetamine use"],
        urgency: "RED - Emergency department",
        advice: "Do NOT rapidly lower BP at home. Do not take extra doses of BP meds without guidance. Go to ER."
      }
    ]
  },

  respiratory: {
    label: "Respiratory Diseases",
    conditions: [
      {
        name: "Severe Asthma Exacerbation",
        typical: "Progressive SOB, wheezing, chest tightness, cough, tachypnea, accessory muscle use, unable to speak full sentences, use of accessory muscles, tripod position",
        atypical: "Elderly: only fatigue/confusion with hypoxia. Some: cough-variant asthma without wheeze. Silent chest (ominous) = no wheeze indicates severe obstruction.",
        redFlags: ["cannot speak full sentences", "silent chest", "cyanosis", "confusion", "severe exhaustion", "PEFR <33% predicted", "SaO2 <90%"],
        riskFactors: ["prior intubation", "multiple ED visits", "medication non-adherence", "steroid dependence", "respiratory infection"],
        urgency: "RED if severe features — ORANGE if moderate",
        advice: "Sit upright. Use rescue inhaler every 20min. Call 911 if not improving. Remove triggers."
      },
      {
        name: "COPD Exacerbation",
        typical: "Increased dyspnea, increased sputum purulence and/or volume, wheezing, cough, tachypnea, accessory muscle use",
        atypical: "Elderly: confusion/delirium as only sign; fatigue/lethargy; failure to thrive",
        redFlags: ["altered mental status", "new cyanosis", "severe dyspnea at rest", "using accessory muscles", "SaO2 <88%", "bilateral leg edema (cor pulmonale)"],
        riskFactors: ["smoking", "advanced age", "frequent exacerbations", "oxygen dependence", "comorbid HF", "chronic bronchitis pattern"],
        urgency: "RED if AMS/cyanosis/severe distress — ORANGE if moderate"
      },
      {
        name: "Pneumonia",
        typical: "Fever, chills, productive cough, pleuritic chest pain, dyspnea, crackles, bronchial breath sounds, tachypnea, hypoxia",
        atypical: "Elderly: confusion/falls as only sign, no fever or cough. Infants: poor feeding, irritability. Immunocompromised: minimal symptoms early.",
        redFlags: ["confusion/AMS", "hypoxia SaO2 <90%", "tachypnea >30", "hypotension", "high fever >103", "immunocompromised", "multilobar or severe"],
        riskFactors: ["age >65", "smoking", "COPD", "diabetes", "immunosuppression", "recent viral illness", "aspiration risk", "alcohol use disorder", "post-surgical"],
        urgency: "RED if severe — YELLOW/ORANGE if mild-moderate",
        advice: "Monitor temperature and O2 sat. Hydrate well. Rest. If prescribed antibiotics, complete full course."
      },
      {
        name: "COVID-19 (Moderate-Severe)",
        typical: "Fever, dry cough, dyspnea, fatigue, myalgias, loss of taste/smell, headache, sore throat, GI symptoms",
        atypical: "Silent hypoxia: profoundly low O2 with minimal dyspnea sensation; isolated GI symptoms; confusion in elderly; thromboembolic events",
        redFlags: ["SaO2 <92%", "respiratory rate >30", "chest pain/pressure", "confusion", "difficulty waking", "cyanosis", "high-risk patient"],
        riskFactors: ["age >65", "obesity", "diabetes", "hypertension", "CKD", "immunosuppression", "heart disease", "pregnancy", "unvaccinated"],
        urgency: "RED if O2 <92% or severe symptoms — YELLOW/ORANGE if mild-moderate",
        advice: "Check O2 sat regularly. Position prone for better oxygenation. Stay hydrated. Monitor for worsening at day 5-10."
      },
      {
        name: "Pneumothorax (Spontaneous/Tension)",
        typical: "Sudden sharp pleuritic chest pain, ipsilateral shoulder pain, dyspnea, diminished breath sounds, hyperresonance, tracheal deviation (tension)",
        atypical: "Small spontaneous pneumothorax may have minimal symptoms; only vague chest discomfort",
        redFlags: ["tracheal deviation away from affected side (tension)", "hypotension", "severe hypoxia", "JVD", "distended neck veins"],
        riskFactors: ["tall thin habitus", "smoking", "COPD (bleb disease)", "Marfan syndrome", "catamenial (menstrual)", "mechanical ventilation", "chest trauma"],
        urgency: "RED if suspected tension or large — ORANGE if small (evaluate within hours)"
      },
      {
        name: "Aspiration / Foreign Body Airway",
        typical: "Sudden onset choking, coughing, stridor, inability to speak, cyanosis, respiratory distress, unilateral wheezing (partial obstruction)",
        atypical: "Recurrent pneumonia same lobe; chronic cough; subtle dysphagia; 'asthma' not responding to treatment",
        redFlags: ["complete obstruction: unable to speak, cough, or breathe", "stridor", "severe distress", "cyanosis", "loss of consciousness"],
        riskFactors: ["neurologic impairment", "dysphagia", "elderly", "dementia", "alcohol intoxication", "dental procedures", "children (toddlers)"],
        urgency: "RED - Emergency - Heimlich maneuver, call 911"
      },
      {
        name: "Anaphylaxis / Allergic Reaction",
        typical: "Acute onset after allergen exposure: urticaria, angioedema (lips/tongue/throat), stridor, wheeze, dyspnea, hypotension, abdominal pain, nausea, vomiting",
        atypical: "Only GI symptoms; only hypotension without skin findings; only severe anxiety/feeling of doom; biphasic reaction hours later",
        redFlags: ["airway compromise (stridor, tongue swelling)", "hypotension", "hypoxia", "rapid progression", "previous severe reaction", "biphasic risk"],
        riskFactors: ["known allergies (food, drug, insect, latex)", "prior anaphylaxis", "asthma", "mastocytosis", "recent allergen exposure"],
        urgency: "RED - Call 911, use epinephrine auto-injector",
        advice: "Use epinephrine auto-injector (EpiPen) in lateral thigh — do NOT delay. Lie flat with legs elevated. Second dose after 5min if needed."
      }
    ]
  },

  infectious: {
    label: "Infectious Diseases",
    conditions: [
      {
        name: "Sepsis / Septic Shock",
        typical: "SIRS criteria: fever/hypothermia, tachycardia, tachypnea, leukocytosis/leukopenia; suspected infection; altered mental status; hypotension; poor organ perfusion",
        atypical: "Elderly: hypothermia instead of fever, confusion/falls only, no localizing symptoms. Immunocompromised: minimal fever, subtle progression.",
        redFlags: ["hypotension (SBP <90)", "confusion/AMS", "RR >22", "lactate elevated", "petechial/purpuric rash", "immunocompromised", "qSOFA >2"],
        riskFactors: ["age >65", "immunosuppression", "diabetes", "cancer", "recent surgery/invasive procedure", "indwelling catheter", "chronic organ dysfunction"],
        urgency: "RED - 911 immediately. Time-critical. Hourly antibiotics matter.",
        advice: "Seek emergency care immediately. Time = survival in sepsis."
      },
      {
        name: "Meningitis / Encephalitis",
        typical: "Triad: fever, neck stiffness, altered mental status; headache (often worst-ever), photophobia, nausea/vomiting, Kernig/Brudzinski signs, petechial rash (meningococcal)",
        atypical: "Elderly: only confusion/lethargy, no fever or neck stiffness. Infants: bulging fontanelle, high-pitched cry, lethargy, poor feeding, no classic signs.",
        redFlags: ["petechial/purpuric rash (meningococcemia)", "rapidly progressive AMS", "seizure", "focal neuro deficit", "immunocompromised", "head trauma recent", "CSF shunt"],
        riskFactors: ["age (children <5, adults >60)", "immunosuppression", "close contact with meningitis", "asplenia", "sickle cell", "basilar skull fracture"],
        urgency: "RED - 911 immediately. Empiric antibiotics within 60min."
      },
      {
        name: "Cellulitis / Necrotizing Fasciitis",
        typical: "Cellulitis: localized erythema, warmth, swelling, tenderness, fever, chills, lymphangitic streaking. Necrotizing: severe pain OUT OF PROPORTION to exam, blistering/bullae, crepitus, rapid spread, systemic toxicity",
        atypical: "Diabetic foot infection: minimal erythema but deep infection; immunocompromised: minimal local signs but severe systemic",
        redFlags: ["pain out of proportion", "crepitus (gas in tissue)", "blistering/bullae", "rapid spread in hours", "systemic toxicity/fever", "hypotension", "immunocompromised"],
        riskFactors: ["diabetes", "peripheral vascular disease", "immunosuppression", "chronic venous stasis", "obesity", "trauma/wound", "IV drug use"],
        urgency: "RED if necrotizing fasciitis suspected — YELLOW if mild cellulitis",
        advice: "Mark advancing edge with pen every 1-2 hours. Seek immediate care if rapidly spreading or severe pain."
      },
      {
        name: "Urinary Tract Infection / Pyelonephritis",
        typical: "UTI: dysuria, frequency, urgency, suprapubic pain, hematuria. Pyelonephritis: fever, chills, flank pain, CVA tenderness, nausea/vomiting",
        atypical: "Elderly: confusion/AMS as only sign (no GU symptoms), falls, functional decline. Infants: fever only, poor feeding, jaundice.",
        redFlags: ["confusion/AMS", "hypotension/sepsis", "high fever >103", "nausea/vomiting preventing oral intake", "immunocompromised", "pregnancy", "known obstruction"],
        riskFactors: ["female sex", "sexual activity", "catheter", "pregnancy", "diabetes", "immunosuppression", "urinary obstruction", "recent instrumentation"],
        urgency: "RED if sepsis/severe pyelo — YELLOW if uncomplicated cystitis",
        advice: "Hydrate well. Monitor fever. UTI can progress — seek care if symptoms worsening."
      },
      {
        name: "Influenza / Severe Viral Illness",
        typical: "Sudden fever, chills, myalgias, headache, dry cough, sore throat, rhinorrhea, fatigue (can be profound)",
        atypical: "Elderly: confusion, falls, no fever. Infants: sepsis-like presentation. Immunocompromised: prolonged course, secondary pneumonia risk.",
        redFlags: ["dyspnea at rest", "hypoxia SaO2 <92%", "confusion", "severe dehydration", "secondary bacterial pneumonia", "seizure"],
        riskFactors: ["age >65", "pregnancy", "immunosuppression", "chronic cardiac/pulmonary disease", "morbid obesity", "neurologic conditions"],
        urgency: "YELLOW-ORANGE uncomplicated — RED if severe complications",
        advice: "Rest, hydrate, acetaminophen/ibuprofen for fever. Monitor O2 if available. Seek care if worsening."
      },
      {
        name: "C. difficile / Severe Diarrhea",
        typical: "Watery diarrhea >3 episodes/day, foul-smelling stool, abdominal cramping, fever, leukocytosis, usually after recent antibiotic use",
        atypical: "Elderly: may present with confusion, no diarrhea initially; ileus without diarrhea in severe colitis",
        redFlags: ["ileus/distended abdomen", "severe abdominal pain", "high fever", "hemodynamic instability", "toxic megacolon", "recent antibiotic use"],
        riskFactors: ["antibiotic use (especially broad-spectrum)", "hospitalization/long-term care", "age >65", "PPI use", "immunocompromised", "IBD"],
        urgency: "RED if severe/fulminant — YELLOW if mild-moderate",
        advice: "Hydrate well with electrolyte solutions. Avoid anti-diarrheals (can worsen). Contact doctor."
      }
    ]
  },

  neurologic: {
    label: "Neurological Diseases",
    conditions: [
      {
        name: "Acute Ischemic Stroke / TIA",
        typical: "Sudden onset focal neuro deficit: unilateral weakness/numbness (face/arm/leg), speech difficulty (aphasia/dysarthria), vision loss (monocular/binocular), ataxia, vertigo, diplopia, acute confusion",
        atypical: "Posterior circulation: only vertigo/diplopia/ataxia (mimics labyrinthitis); isolated acute confusion; 'ALOC' as only sign; limb shaking TIA",
        redFlags: ["sudden onset ANY neuro deficit", "BE FAST: Balance, Eyes, Face, Arm, Speech, Time", "symptoms present >5min", "symptoms within 4.5hr window (thrombolysis)", "rapidly improving but not resolved"],
        riskFactors: ["hypertension", "AFib", "diabetes", "smoking", "hyperlipidemia", "prior stroke/TIA", "carotid stenosis"],
        urgency: "RED - 911 immediately. 'Time is brain.'",
        advice: "Last Known Well time is critical. Do NOT give aspirin until CT rules out hemorrhage. Do not eat/drink."
      },
      {
        name: "Intracranial Hemorrhage (ICH / SAH)",
        typical: "Sudden onset severe headache (worst of life), nausea/vomiting, altered mental status, focal neuro deficit, seizure, meningismus, decreased consciousness, hypertension",
        atypical: "Sentinel headache (small leak days before): milder but sudden headache. Elderly: only confusion/drowsiness without headache.",
        redFlags: ["thunderclap headache (maximal at onset)", "decreasing consciousness", "seizure with headache", "anticoagulant use", "known aneurysm/AVM"],
        riskFactors: ["hypertension", "aneurysm/AVM", "anticoagulant use", "cocaine/amphetamine use", "smoking", "heavy alcohol", "bleeding disorder", "age >50"],
        urgency: "RED - 911 immediately. 50% mortality in SAH.",
        advice: "Lie flat. No anticoagulants. No straining. Prepare for emergency neurosurgery."
      },
      {
        name: "Seizure Disorder / Status Epilepticus",
        typical: "Tonic-clonic movements, loss of consciousness, tongue biting, urinary incontinence, post-ictal confusion lasting minutes-hours, staring spells (absence), focal twitching",
        atypical: "Complex partial: automatisms, confusion without convulsions; non-convulsive status: prolonged confusion/AMS without motor activity; seizure in sleep only; subtle focal aware seizures",
        redFlags: ["seizure >5min (status)", "multiple seizures without recovery", "first-ever seizure", "known epilepsy with increasing frequency", "pregnancy (eclampsia)", "head trauma", "fever", "anticoagulant use"],
        riskFactors: ["known epilepsy/med non-compliance", "recent stroke/tumor/head trauma", "alcohol withdrawal", "electrolyte disturbances", "CNS infection"],
        urgency: "RED if active prolonged seizure, status, or first seizure with any risk factor",
        advice: "Place patient on side (recovery position). Time the seizure. Do NOT put anything in mouth. Call 911 if >5min or first seizure."
      },
      {
        name: "Migraine / Severe Headache",
        typical: "Unilateral throbbing headache, nausea/vomiting, photophobia, phonophobia, aura (visual/scotoma), worsened by movement, lasting 4-72hrs",
        atypical: "Migraine without aura; brainstem aura (vertigo, dysarthria, diplopia); hemiplegic migraine (with focal weakness — mimics stroke); chronic daily headache",
        redFlags: ["worst headache of life (thunderclap)", "new onset after age 50", "fever/neck stiffness", "focal neuro deficit persisting beyond aura", "change in pattern", "positional worsening", "with exertion/Valsalva", "immunocompromised/HIV", "cancer history"],
        riskFactors: ["female sex", "family history", "hormonal changes", "triggers (certain foods, sleep deprivation, stress, weather)"],
        urgency: "YELLOW typical migraine — RED if red flag features present",
        advice: "Dark quiet room. Hydrate. NSAIDs or triptans if prescribed. Ice pack on head/neck."
      },
      {
        name: "Delirium / Acute Confusional State",
        typical: "Acute onset fluctuating confusion, inattention, disorganized thinking, altered level of consciousness, hallucinations/illusions, agitation or withdrawal, sleep-wake disturbance",
        atypical: "Hypoactive delirium: quiet, withdrawn, lethargic (often missed — worse prognosis). Elderly: only 'not acting right' or poor appetite.",
        redFlags: ["acute onset (hours-days)", "underlying infection (especially UTI in elderly)", "hypoxia", "hypoglycemia", "medication side effects", "substance withdrawal", "fever", "head trauma"],
        riskFactors: ["age >65", "dementia", "multiple medications", "infection", "dehydration", "recent surgery/hospitalization", "sensory impairment"],
        urgency: "RED if acute delirium — requires urgent medical evaluation for underlying cause",
        advice: "Do not restrain. Reassure calmly. Remove hazards. Call 911 or seek immediate evaluation."
      },
      {
        name: "Vertigo (Central vs Peripheral)",
        typical: "Peripheral: sudden spinning, nystagmus horizontal/rotatory, worsened by head movement, N/V, no neuro deficits. Central: vertical or direction-changing nystagmus, neuro deficits (ataxia, dysarthria, diplopia, weakness), severe imbalance",
        atypical: "Posterior circulation stroke can present as isolated vertigo (HINTS exam needed); vertebrobasilar insufficiency with neck rotation",
        redFlags: ["central nystagmus (vertical, direction-changing)", "new headache", "focal neuro deficit", "stroke risk factors", "impaired gait OUT OF PROPORTION to vertigo"],
        riskFactors: ["peripheral: BPPV, vestibular neuritis, Meniere disease, labyrinthitis", "central: stroke risk factors, migraine, MS, tumors"],
        urgency: "YELLOW peripheral — RED if central features or stroke risk factors",
        advice: "Avoid sudden head movements. Can use meclizine or dimenhydrinate for symptoms. Seek care if central signs."
      }
    ]
  },

  endocrine: {
    label: "Endocrine & Metabolic Diseases",
    conditions: [
      {
        name: "Diabetic Ketoacidosis (DKA)",
        typical: "Hyperglycemia >250, metabolic acidosis, ketones in urine/blood: polyuria, polydipsia, dehydration, N/V, abdominal pain, Kussmaul respirations (deep/rapid), fruity breath, confusion, coma",
        atypical: "Euglycemic DKA (SGLT-2 inhibitors): normal glucose but ketotic and acidotic — easily missed; mild/moderate cases with only fatigue, polyuria",
        redFlags: ["altered mental status/coma", "Kussmaul respirations", "vomiting unable to keep fluids", "severe dehydration/hypotension", "new confusion"],
        riskFactors: ["type 1 diabetes", "insulin omission/nonadherence", "infection", "new onset T1DM", "pump failure", "major illness/stress", "SGLT-2 inhibitors (euglycemic DKA)"],
        urgency: "RED - 911. DKA is a medical emergency requiring IV fluids and insulin.",
        advice: "Do NOT give insulin without knowing current glucose and ketone level. Drink sugar-free fluids if able. Seek ER immediately."
      },
      {
        name: "Hyperosmolar Hyperglycemic State (HHS)",
        typical: "Extreme hyperglycemia >600, severe dehydration, hyperosmolality, altered mental status, NO significant ketosis, polyuria, polydipsia, weight loss, weakness, seizure, coma",
        atypical: "Gradual onset over days-weeks with progressive lethargy/confusion; focal seizure/TIA mimic; patient may have only profound weakness",
        redFlags: ["extreme hyperglycemia >600", "altered mental status/seizure/coma", "severe dehydration", "hypotension", "elderly patient", "underlying infection"],
        riskFactors: ["type 2 diabetes", "elderly", "infection", "medication nonadherence", "new onset T2DM", "steroids", "impaired thirst mechanism (elderly)"],
        urgency: "RED - 911. HHS has high mortality.",
        advice: "Emergency IV fluids and insulin needed urgently."
      },
      {
        name: "Hypoglycemia (Severe)",
        typical: "Blood glucose <70 (severe <54): sweating, tremors, palpitations, anxiety, hunger, confusion, drowsiness, slurred speech, seizure, coma, personality change, focal neuro deficits",
        atypical: "Hypoglycemia unawareness (long-standing diabetes or beta-blocker use): no autonomic warning signs before neuro symptoms; only AMS or seizure; nocturnal hypoglycemia with morning headache and fatigue",
        redFlags: ["unconsciousness", "seizure", "severe confusion/cannot swallow", "glucose <40", "elderly living alone", "on sulfonylureas or insulin"],
        riskFactors: ["diabetes on insulin/sulfonylureas", "missed meals", "excessive exercise", "alcohol intake", "renal impairment", "hypoglycemia unawareness"],
        urgency: "RED if unconscious/seizure (glucagon or 911) — YELLOW if awake and can swallow",
        advice: "If awake and can swallow: 15g fast-acting glucose (juice, glucose tabs, hard candy). Recheck in 15min. Repeat if still low. If unconscious: glucagon injection or call 911."
      },
      {
        name: "Thyroid Storm",
        typical: "Extreme hyperthyroidism: fever >104, tachycardia out of proportion, tachyarrhythmia (AFib), hypertension → hypotension, agitation/psychosis/confusion/coma, N/V/diarrhea, diaphoresis",
        atypical: "Apathetic thyroid storm (elderly): lethargy/weakness/depression instead of agitation; only cardiovascular collapse; 'masked' hyperthyroidism",
        redFlags: ["fever + tachycardia + AMS", "heart failure symptoms", "atrial fibrillation with RVR", "jaundice/hepatic dysfunction", "known hyperthyroidism + infection/trauma/surgery"],
        riskFactors: ["known Graves/hyperthyroidism", "medication nonadherence", "infection", "recent surgery/trauma", "iodinated contrast", "amiodarone therapy"],
        urgency: "RED - 911 immediately. High mortality if untreated."
      },
      {
        name: "Myxedema Coma",
        typical: "Severe hypothyroidism: altered mental status/coma, hypothermia, bradycardia, hypotension, hypoventilation, hyponatremia, hypoglycemia, myxedema (non-pitting edema), delayed reflexes",
        atypical: "Gradual onset with progressive lethargy/weakness over weeks; hypothermia may be missed (severe <95); 'coma' may be just profound lethargy",
        redFlags: ["altered mental status", "hypothermia <95", "bradycardia <60", "hypoventilation", "known hypothyroidism nonadherent"],
        riskFactors: ["known hypothyroidism (especially nonadherence)", "elderly", "female", "cold exposure", "infection", "CNS depressants", "recent surgery"],
        urgency: "RED - 911. High mortality (20-50%)."
      },
      {
        name: "Adrenal Crisis",
        typical: "Acute adrenal insufficiency: hypotension/shock unresponsive to fluids, hyponatremia, hyperkalemia, hypoglycemia, fever, abdominal pain/back pain, N/V, confusion, lethargy, skin hyperpigmentation (chronic), rapid collapse",
        atypical: "Only hypoglycemia and fatigue; only abdominal pain mimicking acute abdomen; only hyponatremia and confusion; gradual decline until a stressor triggers crisis",
        redFlags: ["hypotension refractory to fluids", "hypoglycemia + hyponatremia + hyperkalemia", "known adrenal insufficiency + acute stress (infection, surgery, trauma)", "sudden corticosteroid withdrawal"],
        riskFactors: ["chronic steroid use (most common — suppression of HPA axis)", "primary adrenal insufficiency (Addison disease)", "secondary adrenal insufficiency (pituitary)", "infection/trauma/surgery"],
        urgency: "RED - 911. Stress-dose steroids and IV fluids needed immediately.",
        advice: "If known adrenal insufficiency: give stress-dose steroids (e.g., hydrocortisone 100mg IM/IV) and call 911."
      },
      {
        name: "Electrolyte Emergencies (Severe Na/K/Ca)",
        typical: "Severe hyponatremia (<120): headache, N/V, confusion, seizure, coma, respiratory arrest. Severe hypernatremia (>160): altered mental status, coma. Severe hyperkalemia (>6.5): weakness, arrhythmia, cardiac arrest, ECG changes (peaked T, wide QRS). Severe hypokalemia (<2.5): weakness, paralysis, arrhythmia, respiratory failure.",
        atypical: "Chronic hyponatremia can be asymptomatic at very low levels; hyperkalemia may cause sudden cardiac death before symptoms; hypercalcemia: 'stones, bones, moans, groans' — nephrolithiasis, bone pain, depression, constipation",
        redFlags: ["ECG changes hyperkalemia", "seizure/AMS with Na abnormality", "cardiac arrhythmia", "muscle paralysis", "rapid onset"],
        riskFactors: ["diuretic use", "renal disease", "vomiting/diarrhea", "HF/liver disease (K, Na)", "endocrine disorders", "medications (ACEi, ARB, spironolactone, lithium)", "SIADH", "excessive water intake"],
        urgency: "RED if severe abnormality + symptoms — ORANGE if mild-moderate"
      }
    ]
  },

  gastrointestinal: {
    label: "Gastrointestinal Diseases",
    conditions: [
      {
        name: "Acute Appendicitis",
        typical: "Periumbilical pain migrating to RLQ, anorexia, N/V, low-grade fever, RLQ tenderness/rebound/guarding, Rovsing sign, psoas sign, obturator sign",
        atypical: "Elderly/diabetic: mild/absent pain, only distension/obstipation (late presentation → higher perforation rate). Pregnant: RUQ pain (appendix displaced). Children: vomiting before pain, diffuse tenderness.",
        redFlags: ["diffuse peritonitis/perforation signs", "high fever + toxicity", "severe pain + vomiting", "elderly with vague but persistent symptoms", "duration >24-36hrs"],
        riskFactors: ["age 10-30", "family history", "CF", "male sex slightly higher"],
        urgency: "RED if perforation/peritonitis suspected — ORANGE if suspected (evaluate today)",
        advice: "Do NOT eat/drink (NPO). Do NOT take laxatives. Do not use heating pad (can cause rupture). Seek ER."
      },
      {
        name: "Acute Pancreatitis",
        typical: "Severe epigastric pain radiating to back, relieved by leaning forward, N/V, fever, abdominal distension, guarding, shock in severe cases, Gray-Turner/Cullen signs (periumbilical/flank ecchymosis in severe hemorrhagic)",
        atypical: "Only epigastric pain without radiation; only vomiting and distension with mild pain; silent presentation in post-op ICU; postoperative pancreatitis after ERCP/GB surgery",
        redFlags: ["hypotension/shock", "severe unrelenting pain", "respiratory failure/ARDS", "renal failure", "high fever", "obesity", "age >70"],
        riskFactors: ["gallstones", "alcohol", "hypertriglyceridemia", "hypercalcemia", "ERCP", "medications (AZA, diuretics, DDI)", "trauma", "hereditary"],
        urgency: "RED if severe (organ failure, necrosis, hemorrhage) — ORANGE if mild",
        advice: "NPO. IV fluids in ER. Do NOT eat or drink until evaluated."
      },
      {
        name: "Upper GI Bleed (UGIB)",
        typical: "Hematemesis (bright red blood or coffee-ground emesis), melena (black tarry stool), hematochezia (if massive UGI), syncope, weakness, hypotension, tachycardia, pallor",
        atypical: "Only melena without hematemesis; only iron deficiency anemia (chronic slow bleed); only near-syncope/fatigue (acute bleed without visible blood yet); hematochezia with massive bleed",
        redFlags: ["hypotension/tachycardia at rest", "hematochezia (massive bleed)", "syncope", "age >65", "variceal bleed suspicion (known cirrhosis, ascites, jaundice)", "anticoagulant/antiplatelet use"],
        riskFactors: ["NSAIDs/aspirin use", "anticoagulation", "known PUD/varices/esophagitis", "alcohol use", "H pylori", "cirrhosis/portal HTN", "Mallory-Weiss tear"],
        urgency: "RED if active bleed or unstable — ORANGE if mild/stable",
        advice: "Nothing by mouth. Do NOT drive. Call 911 if large bleed or unstable."
      },
      {
        name: "Lower GI Bleed (LGIB)",
        typical: "Bright red blood per rectum, maroon-colored stool, clots, possibly with cramping abdominal pain, tenesmus (left-sided colitis/diverticular), may be massive",
        atypical: "Only melena (if right colon or slow small bowel bleed); only anemia/fatigue with no visible blood; hemorrhoidal bleeding (but this is the exception). Older patients may have less pain.",
        redFlags: ["massive hemorrhage requiring transfusion", "hemodynamic instability", "anticoagulant use", "known IBD/diverticulosis with severe bleed", "bleeding on and off with clots"],
        riskFactors: ["diverticulosis", "angiodysplasia", "IBD (UC/Crohn)", "colorectal cancer/polyps", "anticoagulants", "NSAIDs", "ischemic colitis"],
        urgency: "RED if massive/hemodynamically significant — YELLOW if self-limited/diverticulosis with small bleed",
        advice: "Do not eat if severe. Do not strain. Seek evaluation even if bleeding stops — can recur."
      },
      {
        name: "Bowel Obstruction",
        typical: "Colicky abdominal pain, distension, N/V (bilious/feculent), obstipation/constipation, hyperactive bowel sounds early (tinkling/rushing), absent later, high-pitched sounds above obstruction",
        atypical: "Small obstruction with only vomiting and no pain (elderly); strangulated obstruction: pain becomes constant/severe, fever, peritonitis, leukocytosis; large bowel obstruction has more distension",
        redFlags: ["fever + peritonitis (strangulation)", "constant severe pain", "bilious/ feculent vomiting", "obstipation", "history of abdominal surgery/adhesions", "hernia"],
        riskFactors: ["prior abdominal surgery (adhesions)", "hernia (inguinal, femoral, ventral, incisional)", "cancer", "IBD (Crohn stricture)", "volvulus (sigmoid, cecal)", "gallstone ileus", "intussusception (children)"],
        urgency: "RED if strangulation suspected — ORANGE if suspected obstruction",
        advice: "NPO completely. No laxatives. Seek ER evaluation."
      },
      {
        name: "GI Perforation",
        typical: "Sudden onset severe abdominal pain, board-like rigidity, guarding, rebound tenderness, absent bowel sounds, hypotension, fever, tachycardia, septic shock, free air under diaphragm",
        atypical: "Elderly/steroid patients: minimal tenderness despite perforation; retroperitoneal perforation (duodenal): back/flank pain with mild abdo findings; contained perforation: gradual onset, localized pain",
        redFlags: ["board-like rigidity", "severe sudden pain", "hypotension/shock", "history of PUD/ulcer", "peritonitis signs", "free air"],
        riskFactors: ["PUD (NSAIDs, H pylori)", "diverticulitis", "appendicitis", "cancer", "IBD (toxic megacolon)", "recent abdominal surgery", "trauma", "iatrogenic (endoscopy)"],
        urgency: "RED - 911 immediately. Surgical emergency."
      },
      {
        name: "Cholecystitis / Cholangitis",
        typical: "RUQ pain radiating to right shoulder/scapula, Murphy sign (inspiratory arrest on palpation), fever, N/V, jaundice (cholangitis), dark urine/light stool, leukocytosis, LFTs elevated",
        atypical: "Elderly/diabetic: only fever and vague discomfort, no localized RUQ pain; acalculous cholecystitis (ICU, trauma, burn patients); chronic cholecystitis with milder, intermittent symptoms.",
        redFlags: ["high fever + jaundice (Charcot triad: fever, RUQ pain, jaundice) → cholangitis", "sepsis/hypotension (Reynolds pentad: add AMS, shock)", "known gallstones + fever"],
        riskFactors: ["gallstones", "female", "fat", "fertile (estrogen)", "age >40", "rapid weight loss", "Native American/Hispanic", "hemolytic conditions"],
        urgency: "RED if cholangitis/sepsis — YELLOW/ORANGE if mild cholecystitis",
        advice: "Nothing by mouth. Seek ER evaluation if fever or worsening pain."
      },
      {
        name: "Hepatitis / Liver Failure (Acute)",
        typical: "Jaundice, dark urine, pale stool, RUQ pain, N/V, fatigue, pruritus, fever (if infectious), hepatomegaly, coagulopathy in acute liver failure",
        atypical: "Only profound fatigue/flu-like prodrome (especially hep A/B pre-icteric); only confusion (hepatic encephalopathy as first sign of fulminant); only coagulopathy (bruising, bleeding)",
        redFlags: ["acute liver failure: coagulopathy (INR >1.5) + encephalopathy", "altered mental status", "bleeding/bruising", "hypoglycemia", "known acetaminophen overdose", "known hepatitis + worsening"],
        riskFactors: ["viral hepatitis (A, B, C, E)", "acetaminophen overdose (most common ALF)", "alcohol", "medications (INH, TMP-SMX, amoxicillin-clav, statins, anticonvulsants)", "herbal supplements (kava, chaparral, etc.)", "shock liver (ischemic hepatitis)", "Wilson disease"],
        urgency: "RED if acute liver failure/encephalopathy — YELLOW if mild hepatitis",
        advice: "No alcohol. No acetaminophen. Seek medical evaluation for any jaundice."
      }
    ]
  },

  genitourinary: {
    label: "Genitourinary & Renal Diseases",
    conditions: [
      {
        name: "Acute Kidney Injury (AKI)",
        typical: "Rapid decline in urine output, fluid overload (edema, SOB), confusion (uremia), fatigue, N/V, hyperkalemia (arrhythmia), metabolic acidosis, pruritus, elevated Cr/BUN",
        atypical: "Non-oliguric AKI: normal urine output but rising Cr (common with contrast/meds); only confusion and fatigue (elderly); only oliguria without other symptoms",
        redFlags: ["anuria", "severe hyperkalemia >6.5 or ECG changes", "uremic encephalopathy/AMS", "severe fluid overload/pulmonary edema", "known AKI causes (contrast, meds, sepsis)"],
        riskFactors: ["dehydration", "sepsis", "nephrotoxic meds (NSAIDs, ACEi, contrast, aminoglycosides)", "DM", "hypertension", "HF", "CKD", "liver disease", "recent surgery"],
        urgency: "RED if severe/with complications — YELLOW if mild/moderate",
        advice: "Hold nephrotoxic meds (NSAIDs, ACEi/ARB, metformin). Seek medical evaluation."
      },
      {
        name: "Nephrolithiasis (Kidney Stones)",
        typical: "Sudden severe colicky flank pain radiating to groin/testicles/labia, N/V, hematuria (gross or microscopic), dysuria, urinary frequency/urgency, restless unable to sit still",
        atypical: "Larger stones: dull ache/flank fullness without classic colic; lower ureter stones: only frequency/dysuria mimicking UTI; renal pelvis stones: flank pain with position change only; asymptomatic stones found incidentally.",
        redFlags: ["fever + stone = infected stone / urosepsis = EMERGENCY", "solitary kidney obstructed", "oliguria/anuria", "intractable pain/vomiting", "transplant kidney"],
        riskFactors: ["dehydration", "family history", "prior stones", "hypercalciuria", "hyperoxaluria", "gout/hyperuricosuria", "cystinuria"],
        urgency: "RED if with fever (infected stone) — YELLOW/ORANGE if afebrile",
        advice: "Strain urine to catch stone. Hydrate well. NSAIDs for pain. Seek ER if fever or intractable pain."
      },
      {
        name: "Testicular Torsion",
        typical: "Sudden severe scrotal pain, N/V, absent cremasteric reflex, high-riding testicle with transverse lie, scrotal erythema/edema, pain 2-6 hours duration",
        atypical: "Intermittent torsion: episodes of pain that self-resolve (bell-clapper deformity); gradual onset of pain over hours (missed torsion); only lower abdominal pain (especially children)",
        redFlags: ["sudden onset scrotal pain", "N/V with scrotal pain", "absent cremasteric reflex", "duration >6hrs = likely testicular loss", "neonatal torsion: painless scrotal discoloration"],
        riskFactors: ["age 12-18", "bell-clapper deformity (bilateral)", "prior similar episodes", "family history", "cold/ trauma"],
        urgency: "RED - Surgical emergency. Testicular salvage >90% within 6hrs, <10% at 24hrs.",
        advice: "Go to ER immediately. Do not delay for ultrasound. Time = testicle."
      },
      {
        name: "Epididymitis / Orchitis",
        typical: "Gradual onset testicular pain, scrotal swelling/erythema, fever, dysuria, urethral discharge, Prehn sign (elevation relieves pain, vs torsion), normal cremasteric reflex",
        atypical: "Only fever and vague groin pain; chronic epididymitis with mild persistent discomfort; post-vasectomy pain syndrome",
        redFlags: ["fever + severe pain + swelling (abscess/fournier)", "immunocompromised", "worsening despite antibiotics", "bilateral (consider mumps orchitis)"],
        riskFactors: ["sexual activity (STI)", "UTI", "catheter/prostate instrumentation", "uncircumcised", "Valsalva/strenuous activity"],
        urgency: "YELLOW if mild — ORANGE if severe/febrile — RED if abscess/fournier suspected",
        advice: "Scrotal support, ice, NSAIDs, and antibiotics if prescribed. Seek ER if torsion cannot be ruled out."
      },
      {
        name: "Ovarian Torsion",
        typical: "Sudden severe lower abdominal/pelvic pain (unilateral), N/V, adnexal tenderness, may have palpable mass, pain intermittent (if twists/untwists), peritoneal signs",
        atypical: "Only N/V with mild pain; radiation to back/thigh; gradual onset over hours; postmenopausal: milder presentation but higher malignancy risk; previous similar self-limited episodes",
        redFlags: ["sudden severe unilateral pelvic pain", "N/V + pelvic pain", "known ovarian cyst/mass", "tenderness on exam"],
        riskFactors: ["ovarian cyst/mass (most common)", "ovarian hyperstimulation (IVF)", "pregnancy", "prior torsion", "tubal ligation"],
        urgency: "RED - Gynecologic surgical emergency. Ovary salvage within 2-4hrs.",
        advice: "Go to ER immediately."
      }
    ]
  },

  musculoskeletal: {
    label: "Musculoskeletal & Connective Tissue",
    conditions: [
      {
        name: "Compartment Syndrome",
        typical: "Severe pain OUT OF PROPORTION to injury, pain with passive stretch of muscles, paresthesia/numbness, pallor, pulselessness (late findings), tense/swollen compartment, weakness, pressure increase",
        atypical: "Early: only severe pain and anxiety; chronic exertional compartment syndrome: exercise-induced pain/numbness resolving with rest; in unconscious/sedated patients: only elevated pressures",
        redFlags: ["pain out of proportion", "pain with passive stretch", "trauma (fracture, crush, reperfusion)", "tight cast/dressing", "burn", "anticoagulant use (spontaneous bleed)"],
        riskFactors: ["long bone fracture (tibia, forearm most common)", "crush injury", "reperfusion after ischemia", "tight casts/splints", "hemorrhage/anticoagulation", "burn", "post-surgical"],
        urgency: "RED - Surgical emergency. Fasciotomy within 6hrs to avoid permanent loss.",
        advice: "Remove any tight dressings/casts. Elevate to heart level (NOT above). Go to ER immediately."
      },
      {
        name: "Septic Arthritis",
        typical: "Acute monoarticular joint pain (hot, swollen, red, tender, extremely painful with passive motion), fever, chills, inability to bear weight, refusal to move joint (pseudoparalysis in children), leukocytosis",
        atypical: "Oligoarticular: 10-20% have >1 joint involved. Hip/shoulder: pain referred to knee/groin (hip), shoulder diffuse. Immunocompromised: minimal fever, milder pain. Axial joints (sacroiliac, symphysis): back/pelvic pain.",
        redFlags: ["prosthetic joint + acute pain/fever", "immunocompromised", "rapid destructive course", "high fever + toxicity", "IV drug use"],
        riskFactors: ["prosthetic joint", "prior joint damage (RA, OA)", "immunosuppression", "IV drug use", "skin infection", "bacteremia", "recent joint surgery/injection"],
        urgency: "RED - Orthopedic emergency. Joint destruction within 24-48hrs without treatment.",
        advice: "Do NOT bear weight. Go to ER. Do not take NSAIDs (masks fever)."
      },
      {
        name: "Fracture (Open/Closed/Pathologic)",
        typical: "Pain, swelling, deformity, crepitus, loss of function, ecchymosis, open wound with bone visible (open fracture), neurovascular compromise distal",
        atypical: "Stress fracture: gradual onset pain with activity, no deformity. Pathologic fracture: occurs with minimal/normal activity (underlying tumor, osteoporosis). Occult fracture: clinically suspected but X-ray negative initially (scaphoid, hip, stress).",
        redFlags: ["open fracture (bone exposed)", "neurovascular compromise (pulseless, numb, pale, cold)", "compartment syndrome", "suspected pathologic fracture (cancer history)", "femur/hip fracture in elderly"],
        riskFactors: ["trauma/fall", "osteoporosis", "cancer (metastatic/myeloma)", "Paget disease", "overuse/repetitive stress", "age (elderly, children) = falls"],
        urgency: "RED if open, neurovascular compromise, or compartment suspicion — YELLOW/ORANGE if closed/stable",
        advice: "Immobilize, apply ice, elevate. Do NOT eat/drink if surgery likely. Go to ER for evaluation."
      },
      {
        name: "Spinal Cord Compression (Cauda Equina)",
        typical: "Acute or progressive: severe low back pain, bilateral sciatica, saddle anesthesia (loss of sensation in perineum), urinary retention/incontinence, fecal incontinence, bilateral leg weakness/numbness, decreased anal sphincter tone, areflexia",
        atypical: "Only urinary retention without pain; only unilateral symptoms initially; only impotence and saddle numbness; gradual onset over days/weeks (tumor) vs sudden (disc)",
        redFlags: ["saddle anesthesia - EMERGENCY", "new urinary retention or incontinence", "bilateral leg weakness/numbness", "loss of anal sphincter tone", "acute onset with trauma"],
        riskFactors: ["acute disc herniation", "spinal tumor (metastatic most common)", "spinal epidural abscess/hematoma", "spinal stenosis", "trauma", "anticoagulant use (epidural hematoma)"],
        urgency: "RED - Neurosurgical emergency. Decompression within 24-48hrs for best outcome.",
        advice: "Go to ER immediately. Do NOT manipulate back. Do NOT delay for imaging."
      },
      {
        name: "Rhabdomyolysis",
        typical: "Muscle pain, weakness, swelling (may be severe), dark/red-brown urine (cola-colored), oliguria, fatigue, confusion if severe electrolyte abnormalities, elevated CK",
        atypical: "Only dark urine and mild myalgias; only fatigue/weakness; asymptomatic with lab-only elevation (CK elevated); compartment syndrome in severe cases",
        redFlags: ["dark urine + muscle pain + weakness", "oliguria/renal failure", "CK >5000", "hyperkalemia", "hypocalcemia", "known crush/immobilization"],
        riskFactors: ["crush/compression injury", "prolonged immobilization (fall, overdose, coma)", "severe exertion (marathon, military, extreme exercise)", "statins (especially with other risk factors)", "alcohol/drugs (cocaine, meth, heroin)", "sepsis, infection, hyperthermia", "seizures, dystonic reactions"],
        urgency: "RED if oliguric/hyperkalemic/severe — YELLOW if mild and early",
        advice: "Hydrate aggressively with oral fluids (water/electrolyte drinks). Go to ER for IV fluids if dark urine."
      }
    ]
  },

  psychiatric: {
    label: "Psychiatric & Behavioral Emergencies",
    conditions: [
      {
        name: "Suicidal Ideation (Acute)",
        typical: "Verbalized suicidal thoughts, specific plan, access to means, intent to die, hopelessness, anhedonia, recent loss/trauma, giving away possessions, writing a will, final messages, recent severe depression",
        atypical: "Smiling depression: appear well/composed but severely suicidal; only somatic complaints (sleep/appetite disturbances); sudden calm after severe depression (decision made); only giving away belongings without verbalizing intent; suicidal ideation in context of severe anxiety/psychosis/substance use",
        redFlags: ["specific plan + access to means", "intent to act", "recent attempt (greatest risk factor)", "giving away possessions", "new final messages/goodbyes", "recently started antidepressants (activation phase)", "substance intoxication", "psychosis/hallucinations commanding suicide"],
        riskFactors: ["prior suicide attempt", "mental illness (depression, bipolar, schizophrenia, BPD, PTSD)", "substance use disorder", "chronic pain/medical illness", "recent loss (relationship, job, death)", "social isolation", "LGBTQ+ youth", "access to firearms"],
        urgency: "RED - 911 or take to ER immediately. Do not leave alone.",
        advice: "Remove all lethal means (guns, pills, knives, ropes, car keys). Stay with the person. Call 988 Suicide & Crisis Lifeline. Call 911 if immediate risk."
      },
      {
        name: "Psychosis / Acute Psychotic Episode",
        typical: "Hallucinations (auditory most common, visual, tactile), delusions (paranoid, bizarre, grandiose), disorganized speech/behavior, agitation, aggression, catatonia, social withdrawal, lack of insight",
        atypical: "First episode: may present with social withdrawal/decline before florid psychosis; late-onset psychosis (age >45): always rule out medical cause (dementia, delirium, tumor); only bizarre behavior without hallucinations; negative symptoms (flat affect, apathy, social withdrawal - often missed)",
        redFlags: ["new onset in elderly = medical cause until proven otherwise", "command hallucinations to harm self/others", "aggression/violence", "no sleep for days + escalating agitation", "catatonia (stupor, rigidity, waxy flexibility)", "medical signs (fever, confusion, tremor, autonomic instability - could be NMS, serotonin syndrome, or medical delirium)"],
        riskFactors: ["schizophrenia/schizoaffective", "bipolar disorder (manic phase with psychosis)", "substance-induced (meth, cocaine, LSD, PCP, cannabis)", "medical causes (infections, metabolic, neurologic, autoimmune)", "medication nonadherence", "sleep deprivation"],
        urgency: "RED if violent, homicidal, catatonic, or medical cause suspected — ORANGE if stable psychosis with support",
        advice: "Stay calm, use de-escalation. Do not argue with delusions. Call 911 if risk of harm. Medical evaluation first if new onset."
      },
      {
        name: "Overdose / Poisoning",
        typical: "Depends on substance: Opioids: pinpoint pupils, respiratory depression, coma. Stimulants: agitation, psychosis, hyperthermia, tachycardia, hypertension, seizures. Sedatives: drowsiness, ataxia, slurred speech, respiratory depression. Anticholinergics: hot/dry skin, dilated pupils, urinary retention, hallucination, tachycardia, ileus. TCA: seizures, wide QRS, arrhythmias. Acetaminophen: initially asymptomatic (12-24hrs), then N/V, then liver failure at 48-72hrs.",
        atypical: "Polysubstance overdose: mixed toxidrome, confusing presentation; body packers/stuffers: delayed massive release with minimal initial symptoms; withdrawal confusion with overdose; 'ecstasy' (MDMA): hyponatremia/seizures from water intoxication",
        redFlags: ["respiratory depression <10/min", "GCS <8/coma", "seizure", "wide QRS >100ms (TCA overdose)", "hyperthermia >104 (malignant hyperthermia, serotonin syndrome, NMS, stimulant)", "hypotension/shock", "known or suspected ingestion (especially TCA, CCB, beta-blocker, digoxin, opioid)"],
        riskFactors: ["substance use disorder", "depression/suicidal", "polysubstance use", "accidental (children, elderly med errors)", "prescription changes"],
        urgency: "RED - 911 immediately. Bring pill bottles/medications to ER.",
        advice: "Call Poison Control 1-800-222-1222. Do NOT induce vomiting. Place in recovery position if unconscious. Bring all medications/containers."
      },
      {
        name: "Serotonin Syndrome / Neuroleptic Malignant Syndrome",
        typical: "Serotonin syndrome: recent serotonergic drug (SSRI, SNRI, MAOI, linezolid, tramadol, dextromethorphan, St. John's wort, MDMA) + clonus, hyperreflexia, tremor, agitation, hyperthermia, diaphoresis, tachycardia, mydriasis. NMS: recent antipsychotic (or withdrawal of dopaminergic) + lead-pipe rigidity, hyperthermia, altered mental status, autonomic instability (labile BP, tachycardia), elevated CK.",
        atypical: "Serotonin: mild may have only tremor/diarrhea/mild agitation (can progress rapidly). NMS: rigidity may be subtle; only AMS and autonomic changes initially; 'incipient' NMS with mild CPK elevation.",
        redFlags: ["severe hyperthermia >104", "rigidity + fever + AMS = NMS until proven otherwise", "clonus + agitation + hyperthermia = serotonin syndrome", "CK markedly elevated", "autonomic instability"],
        riskFactors: ["SSRI/SNRI + MAOI/tramadol/linezolid combo (serotonin)", "antipsychotic initiation/dose increase (NMS)", "recent high-potency neuroleptic (haloperidol, fluphenazine)", "dehydration + exhaustion (NMS)", "baseline brain injury/TBI (NMS risk)"],
        urgency: "RED - 911. Both can be fatal without treatment.",
        advice: "Stop all serotonergic/antipsychotic meds. Immediate ER for supportive care."
      },
      {
        name: "Delirium Tremens / Alcohol Withdrawal Severe",
        typical: "History of heavy alcohol use with cessation/reduction 24-72hrs prior: autonomic hyperactivity (tachycardia, hypertension, hyperthermia, diaphoresis), tremor, agitation, hallucinations (visual/tactile most common: seeing bugs, rats, snakes), illusions, confusion, seizures, clouded sensorium",
        atypical: "Atypical presentation in elderly: only confusion/falls, no tremor or hallucinations; withdrawal without full DTs but with seizure; atypical antipsychotics can mask withdrawal severity; concurrent medical illness (pneumonia, pancreatitis, hepatitis) worsens course.",
        redFlags: ["seizure (generalized tonic-clonic)", "severe hyperthermia >103", "hallucinations with agitation", "autonomic instability (tachycardia, hypertension)", "history of DTs or withdrawal seizures", "concurrent medical illness"],
        riskFactors: ["chronic heavy alcohol use", "prior DTs/withdrawal seizures", "concurrent medical illness (pancreatitis, hepatitis, infection)", "older age", "benzodiazepine dependence (cross-tolerance)"],
        urgency: "RED - 911. DTs have 5-15% mortality without treatment.",
        advice: "Stay calm, quiet, reassuring environment. Do NOT confront hallucinations. Call 911. ER needs IV benzodiazepines."
      }
    ]
  },

  pediatric: {
    label: "Pediatric-Specific Conditions",
    conditions: [
      {
        name: "Bronchiolitis (RSV) - Severe",
        typical: "Infants <1yr: nasal congestion, cough, tachypnea, wheezing, retractions, grunting, nasal flaring, hypoxia, apnea, poor feeding, irritability, fever (may be present)",
        atypical: "Apnea may be FIRST sign before respiratory symptoms; only poor feeding and irritability; silent chest (ominous = severe obstruction); very young (<6wk) may have minimal findings before acute deterioration; fever may trigger febrile seizure.",
        redFlags: ["apnea", "grunting", "severe retractions/head bobbing", "hypoxia SaO2 <90%", "poor feeding (<50% usual)", "lethargy", "silent chest", "infant <12wk with fever"],
        riskFactors: ["prematurity <37wk", "CHD/congenital heart disease", "CLD/BPD chronic lung disease", "immunodeficiency", "age <12wk", "Down syndrome", "neuromuscular disease", "RSV season"],
        urgency: "RED if severe respiratory distress/apnea — YELLOW if mild-moderate and well-hydrated",
        advice: "Suction nose. Keep upright. Monitor O2. Seek ER if labored breathing or poor feeding."
      },
      {
        name: "Febrile Seizure",
        typical: "Age 6mo-5yr: generalized tonic-clonic seizure associated with fever, typically at onset of illness/rapid temp rise, lasts <15min (simple), no post-ictal deficit, normal neuro development, self-limited",
        atypical: "Complex febrile seizure: >15min duration, focal features, >1 in 24hrs, may have post-ictal deficit; first seizure at <6mo or >5yr — consider other causes; afebrile in child with same presentation = not febrile seizure.",
        redFlags: ["seizure >15min (status)", "focal seizure", "multiple in 24hrs", "child <6mo or >5yr", "meningeal signs", "no known fever source", "prolonged post-ictal", "abnormal neuro exam", "known epilepsy"],
        riskFactors: ["age 6mo-5yr", "family history febrile seizure", "rapid fever rise", "certain viruses (HHV-6/roseola, influenza)"],
        urgency: "RED if first seizure, prolonged, or concerning features — ORANGE if simple febrile seizure in known age range"
      },
      {
        name: "Intussusception",
        typical: "Age 3mo-3yr: sudden onset severe colicky abdominal pain with drawing up of legs, bilious vomiting, 'currant jelly' stools (red/mucoid) — LATE sign, palpable 'sausage-shaped' mass in RUQ, right upper quadrant pain, lethargy between episodes",
        atypical: "Only lethargy and vomiting without pain; only bilious vomiting; only currant jelly stool without pain — very late; chronic intermittent intussusception (older children) with recurrent self-limited episodes",
        redFlags: ["bilious vomiting", "currant jelly stool (late)", "lethargy with abdominal pain", "pallor with acute episodes", "signs of peritonitis/perforation", "shock/dehydration"],
        riskFactors: ["age 3mo-3yr peak", "male sex", "viral infection (viral gastroenteritis, URI)", "Meckel diverticulum, polyp, HSP (leading point in older children)", "CF, celiac disease"],
        urgency: "RED - Pediatric emergency. Air/contrast enema reduction within 24hrs.",
        advice: "Nothing by mouth. Go to children's hospital ER."
      },
      {
        name: "Meningococcemia / Purpura Fulminans",
        typical: "Fever, headache, neck stiffness, photophobia, altered mental status, then RAPIDLY PROGRESSIVE petechial/purpuric rash (anywhere, including pressure areas, extremities), hypotension/shock, multiorgan failure, DIC, limb ischemia",
        atypical: "Rash may start as nonspecific maculopapular (can look viral initially — press a glass test: non-blanching = suspect); mild viral prodrome 1-2 days before rapid deterioration; only fever and rash initially; 'meningococcal septicemia' without meningitis — just shock and rash.",
        redFlags: ["any non-blanching rash + fever", "petechiae spreading rapidly", "fever + purpura + hypotension = EMERGENCY", "tail of lesions under tourniquet", "meningococcal vaccine not received", "close contact with meningitis"],
        riskFactors: ["age <5yr", "asplenia/sickle cell", "complement deficiency", "college dormitories/military barracks", "late summer/winter season"],
        urgency: "RED - 911. Time-critical. IM/IV antibiotics within 60min.",
        advice: "Do not wait for rash to progress. If non-blanching rash + fever = immediate ER."
      },
      {
        name: "Dehydration (Pediatric - Severe)",
        typical: "Dry mucous membranes, sunken eyes/fontanelles, decreased skin turgor, absence of tears, lethargy/irritability, decreased urine output (<1 wet diaper in 6-8hrs in infants, <4-6hrs in older children), tachycardia, tachypnea, delayed capillary refill >2sec, hypotension (late)",
        atypical: "Hypernatremic dehydration: skin turgor may deceptively feel normal, excessively irritable/high-pitched cry, doughy skin, less urine concentration; chronic malnutrition: signs of dehydration masked; only weight loss as sign",
        redFlags: ["lethargic/unconscious", "sunken eyes AND decreased skin turgor", ">10% body weight loss", "capillary refill >3sec", "hypotension (late)", "no urine >8hrs", "vomiting everything", "bilious vomiting"],
        riskFactors: ["age <6mo (higher Risk)", "vomiting/diarrhea", "fever", "breastfeeding+? (mildly increased Risk)", "hot weather", "decreased intake due to illness"],
        urgency: "RED if severe dehydration — YELLOW if mild-moderate",
        advice: "Oral rehydration solution (Pedialyte) for mild-mod. Small frequent sips. Go to ER if unable to keep down fluids, persistent vomiting, or severe."
      }
    ]
  },

  pregnancy: {
    label: "Pregnancy & Obstetric Emergencies",
    conditions: [
      {
        name: "Preeclampsia / Eclampsia",
        typical: "Pregnancy >20wk: hypertension (≥140/90), proteinuria, severe headache, visual disturbances (scotomata, blurry), RUQ/epigastric pain, N/V, sudden weight gain, edema, shortness of breath (pulmonary edema), hyperreflexia, clonus",
        atypical: "HELLP syndrome (hemolysis, elevated LFTs, low platelets): may have only RUQ pain/fatigue; only epigastric pain (reflux-like); postpartum preeclampsia: can occur up to 6wk after delivery; no proteinuria (atypical preeclampsia); only elevated BP without other symptoms — can still progress rapidly",
        redFlags: ["severe headache + visual changes + RUQ pain", "seizure (eclampsia)", "pulmonary edema/dyspnea", "BP >160/110", "thrombocytopenia/abnormal LFTs", "oliguria", "altered mental status"],
        riskFactors: ["first pregnancy", "prior preeclampsia", "multiple gestation", "pre-existing hypertension or CKD", "diabetes", "obesity", "age >35", "autoimmune (SLE, APS)"],
        urgency: "RED if severe preeclampsia/eclampsia — ORANGE if mild",
        advice: "BP >160/110 + any symptom = 911 immediately. Lie on left side. Do NOT take BP meds without doctor."
      },
      {
        name: "Placental Abruption / Previa",
        typical: "Abruption: sudden severe abdominal pain (constant, board-like uterus), vaginal bleeding (may be concealed if retroplacental), fetal distress, uterine hypertonicity/rigid, maternal shock. Previa: painless bright red vaginal bleeding in 3rd trimester, presenting part high, may be provoked by exam/cervical checks.",
        atypical: "Abruption with concealed bleed: no vaginal bleeding but severe pain + fetal distress + maternal hypotension; 'marginal' abruption: mild pain, small bleed; preterm previa: sentinel bleed days-weeks before major hemorrhage; low-lying placenta may have milder intermittent bleeding.",
        redFlags: ["ANY vaginal bleeding in 3rd trimester", "severe constant abdominal pain (abruption)", "fetal distress/decreased movement", "hemorrhagic shock", "abruption: DIC complication"],
        riskFactors: ["abruption: hypertension/preeclampsia, trauma, cocaine, smoking, prior abruption, thrombophilia", "previa: prior previa, prior C-section, multiple gestation, smoking, advanced maternal age"],
        urgency: "RED - 911 immediately. Fetal/maternal emergency.",
        advice: "Do not insert anything into vagina. Lie on left side. Go to ER, not a birth center."
      },
      {
        name: "Ectopic Pregnancy Rupture",
        typical: "6-10wk gestation: severe unilateral lower abdominal/pelvic pain, syncope/near-syncope, hypotension/shock, shoulder pain (diaphragm irritation from blood), positive pregnancy test, vaginal bleeding (may be absent), cervical motion tenderness, adnexal mass/tenderness",
        atypical: "Only vaginal spotting and mild pain (unruptured) — no specific symptoms; only syncope without pain (rupture into peritoneum); GI symptoms (nausea, rectal pressure, diarrhea) mimicking gastroenteritis; amenorrhea not recalled → delayed diagnosis; heterotopic pregnancy with IUD or IVF (both intrauterine AND ectopic — can be missed).",
        redFlags: ["positive pregnancy test + severe unilateral pain", "syncope + positive pregnancy test", "hypotension/shock + pregnancy", "shoulder tip pain", "known risk factors"],
        riskFactors: ["PID/tubal damage", "prior ectopic", "tubal surgery/ligation", "IUD in place", "IVF/assisted reproduction", "age >35", "smoking", "sterilization failure"],
        urgency: "RED - 911. Ruptured ectopic is surgical emergency. 15% maternal mortality if untreated.",
        advice: "Go to ER immediately. If unstable, do not drive."
      },
      {
        name: "Third Trimester Bleeding",
        typical: "Painless bright red bleeding (previa) vs painful constant bleeding with rigid abdomen (abruption); may be minimal to catastrophic hemorrhage; fetal distress; maternal shock; bleeding may be concealed (abruption without vaginal bleed)",
        atypical: "Bloody show (normal labor) vs pathological bleeding — bloody show is small, mixed with mucus, no pain; vasa previa: fetal vessels over cervix (fetal hemorrhage when membranes rupture — small maternal bleed but severe fetal bradycardia/distress).",
        redFlags: ["ANY bleeding in 3rd trimester is red flag until proven otherwise", "more than bloody show", "associated pain", "fetal distress/decreased movement", "hemodynamic instability"],
        riskFactors: ["previa: prior previa, prior C-section, smoking, multiple gestation, advanced age", "abruption: hypertension/preeclampsia, cocaine, smoking, trauma, prior abruption"],
        urgency: "RED - 911. All third trimester bleeding requires immediate evaluation.",
        advice: "Go to ER. Do not insert anything. Do not have sex. Place pad for bleeding estimation."
      }
    ]
  },

  geriatric: {
    label: "Geriatric-Specific Conditions & Considerations",
    conditions: [
      {
        name: "Falls in Elderly (Trauma + Complications)",
        typical: "Fall from standing or height: hip fracture (shortened externally rotated leg, unable to bear weight, groin pain), wrist fracture, head trauma/subdural (especially on anticoagulants), vertebral compression fracture, rib fracture",
        atypical: "Main complaint is 'I just can't get up' without pain (hip fracture may be subtle, impactation); only confusion/AMS after fall (subdural may have delayed presentation — lucid interval then decline); only unwillingness to bear weight without deformity; vertebral fracture may present as referred abdominal pain",
        redFlags: ["on anticoagulant (warfarin, apixaban, rivaroxaban) + ANY head impact = potential intracranial bleed", "loss of consciousness", "not found for hours (rhabdomyolysis, hypothermia)", "hip pain + inability to bear weight", "new confusion after fall"],
        riskFactors: ["age >75", "anticoagulant use", "osteoporosis", "prior falls", "polypharmacy (especially sedatives, antihypertensives)", "gait instability", "vision impairment", "orthostatic hypotension", "environmental hazards"],
        urgency: "RED if on anticoag + head strike, LOC, or suspected hip fracture — YELLOW/ORANGE if minor",
        advice: "Do not move if spine injury suspected unless immediate danger. Call 911 for head strike on blood thinners or hip fracture."
      },
      {
        name: "Subdural Hematoma (Chronic/Acute)",
        typical: "Acute: after head trauma, depressed consciousness, neuro deficit, headache, N/V, seizure. Chronic (elderly): subtle confusion, personality change, lethargy, hemiparesis (fluctuating), headache (mild), gait disturbance, falls, dementia-like presentation, often days-weeks after even MINOR head trauma",
        atypical: "No known head trauma history in 30-50% of chronic SDH; only slow decline in cognition or mobility; new headache in elderly on anticoagulant; focal weakness fluctuating; gait apraxia; urinary incontinence as only symptom",
        redFlags: ["known anticoagulation + ANY head trauma = CT indicated", "reduced consciousness after head strike", "focal neuro deficit", "severe headache post-trauma", "anticoagulant therapy + confusion/fall"],
        riskFactors: ["anticoagulant/antiplatelet therapy", "age >65 (brain atrophy stretches bridging veins)", "alcohol use", "fall risk", "prior SDH"],
        urgency: "RED if acute or subacute with neuro symptoms — YELLOW if chronic mild and no mass effect",
        advice: "On blood thinners + fall/head strike + new symptoms = go to ER. Even if symptoms are mild, get a CT head."
      },
      {
        name: "Functional Decline / Failure to Thrive (Elderly)",
        typical: "Unexplained weight loss, decreased appetite, weakness/fatigue, mobility decline, falls, social withdrawal, depression, cognitive decline (new or worsening), poor oral intake, dehydration, frailty — often due to underlying MEDICAL illness (not just 'old age')",
        atypical: "Only new incontinence; only 'giving up' attitude; only recurrent falls without explanation; only poor appetite and staying in bed; physician labels as 'deconditioning' when underlying cancer/infection/organ failure is cause",
        redFlags: ["acute decline over days-weeks = likely acute medical cause", "weight loss >5% in 1 month", "new incontinence", "recurrent falls", "fevers (even low-grade)", "new confusion/delirium"],
        riskFactors: ["age >80", "polypharmacy", "dementia", "depression", "social isolation", "recent hospitalization", "recent loss of spouse"],
        urgency: "YELLOW-ORANGE — requires medical evaluation within days to identify underlying cause",
        advice: "This is not 'normal aging.' Medical evaluation needed for reversible causes (infection, med side effects, organ failure, depression, cancer)."
      },
      {
        name: "Polypharmacy / Medication Toxicity in Elderly",
        typical: "Confusion/delirium, falls, orthostatic hypotension, bradycardia (beta-blockers, CCB, digoxin), hypoglycemia (insulin, sulfonylureas), electrolyte disturbances (diuretics), bleeding (anticoagulants), GI bleeding (NSAIDs, aspirin), serotonin syndrome (SSRI combinations), lithium toxicity (tremor, ataxia, confusion, vomiting), digoxin toxicity (N/V, visual halos, arrhythmias, confusion, bradycardia)",
        atypical: "Only recurrent falls (orthostasis); only confusion/delirium; only GI bleed from NSAIDs with no pain; only electrolyte abnormality found on labs; digoxin toxicity presenting as only weakness and confusion. Elderly are more sensitive to anticholinergics (diphenhydramine, oxybutynin, TCA) → confusion, constipation, urinary retention.",
        redFlags: ["new confusion/delirium", "falls with med change", "hypoglycemia <60", "bleeding on anticoagulant", "bradycardia <50", "orthostatic hypotension"],
        riskFactors: [">5 medications", "recent medication change", "age >75", "renal impairment", "hepatic impairment", "low body weight", "multiple prescribers"],
        urgency: "RED if toxicity severe (hypoglycemia, bleeding, bradycardia, severe confusion/delirium) — YELLOW if mild",
        advice: "Bring ALL medications (pill bottles/actual bottles) to ER. Do NOT stop medications abruptly (especially beta-blockers, benzodiazepines)."
      }
    ]
  },

  oncologic: {
    label: "Oncologic Emergencies",
    conditions: [
      {
        name: "Febrile Neutropenia",
        typical: "Cancer patient on chemotherapy: single temp ≥101°F (38.3°C) OR ≥100.4°F for >1hr, ANC <500, often no localizing signs due to lack of neutrophils (no pus, no WBC in urine), may have only fever and malaise, rapid progression to septic shock",
        atypical: "Hypothermia instead of fever (poor prognosis); only mucositis, diarrhea, or skin changes as infection source; afebrile but hypotensive; no obvious infection source; C diff may present with only diarrhea and fever; port/catheter infection with minimal local signs",
        redFlags: ["ANY fever in chemo patient = neutropenia until proven otherwise", "hypotension", "hypothermia", "severe mucositis", "central line catheter", "known MDR organism"],
        riskFactors: ["recent chemotherapy (nadir at 7-14 days)", "recent bone marrow transplant", "hematologic malignancy (leukemia, lymphoma)", "prolonged steroid use", "mucous membrane barrier disruption", "indwelling catheter"],
        urgency: "RED - 911. Broad-spectrum antibiotics within 60min is standard of care.",
        advice: "If fever + recent chemo = go to ER immediately. Do NOT take Tylenol (masks fever). Broad-spectrum antibiotics time-critical."
      },
      {
        name: "Superior Vena Cava Syndrome (SVC)",
        typical: "Gradual or acute: facial/neck swelling (plethora), arm edema, distended neck/chest veins, dyspnea, cough, hoarseness, headache (worse bending forward), visual changes, plethora, cyanosis, Horner syndrome (if Pancoast tumor)",
        atypical: "Only cough/dyspnea/dysphagia (from external compression); only hoarseness; only headache; presentation may mimic HF (but unilateral extremity edema points to SVC); stridor (life-threatening airway compromise)",
        redFlags: ["stridor/airway compromise", "altered mental status (cerebral edema)", "severe dyspnea at rest", "syncope (decreased preload)", "rapid progression over days"],
        riskFactors: ["lung cancer (most common: SCLC, squamous)", "lymphoma", "thymoma", "germ cell tumors", "central venous catheter (thrombosis)"],
        urgency: "RED if severe (airway compromise, AMS, rest dyspnea) — ORANGE if mild",
        advice: "Sit upright. Elevate head. Call oncologist. Go to ER if severe/worsening."
      },
      {
        name: "Tumor Lysis Syndrome",
        typical: "After starting chemotherapy (especially for high-burden hematologic malignancies), can be spontaneous: hyperuricemia (gout/nephropathy), hyperkalemia (ECG changes, weakness, arrhythmia, cardiac arrest), hyperphosphatemia/hypocalcemia (tetany, cramps, Chvostek/Trousseau sign, arrhythmia), AKI (oliguria), N/V, lethargy, muscle cramps, seizure",
        atypical: "Spontaneous TLS: before any treatment (high-burden lymphoma/leukemia); only AKI without electrolyte disturbances; only tetany/cramps from hypocalcemia; only arrhythmia from hyperkalemia; TLS in solid tumors (rare but reported).",
        redFlags: ["hyperkalemia ECG changes", "AKI/oliguria", "symptomatic hypocalcemia (tetany, seizure)", "arrhythmia", "suspected TLS with any symptoms"],
        riskFactors: ["acute leukemia (especially ALL, AML)", "high-grade NHL (Burkitt, lymphoblastic)", "high tumor burden", "high LDH", "pre-existing renal impairment", "dehydration", "uric acid >8"],
        urgency: "RED if any of hyperK, AKI, arrhythmia, seizures — ORANGE if high risk but asymptomatic",
        advice: "If recent chemo + symptoms = go to ER immediately. Urgent labs (K, Ca, Phos, UA, Cr). IV fluids needed."
      },
      {
        name: "Spinal Cord Compression (Malignant)",
        typical: "Back pain (worse lying down/worse at night — inflammatory pattern) is FIRST symptom in 95%, then: progressive bilateral leg weakness, sensory level loss, gait ataxia, bladder/bowel dysfunction (retention or incontinence), bilateral Babinski, hyperreflexia, then paralysis",
        atypical: "Only back pain without neuro symptoms (most common missed diagnosis); only bladder/bowel symptoms without weakness; only radicular pain (band-like chest/abdomen pain = thoracic cord compression); Brown-Séquard (ipsilateral weakness + contralateral pain/temp loss). Cervical: quadriparesis; cauda equina: flaccid areflexic paralysis + saddle anesthesia.",
        redFlags: ["back pain + cancer history = spinal cord compression until proven otherwise", "bladder retention/ incontinence (late sign)", "saddle anesthesia", "rapidly progressive weakness", "inability to walk"],
        riskFactors: ["known cancer (breast, lung, prostate, renal, multiple myeloma, lymphoma most common)", "back pain as first presentation of cancer in some", "bone metastases", "vertebral body collapse"],
        urgency: "RED - Emergency RT or surgical consult. Paralysis can become permanent within hours to days.",
        advice: "Go to ER + call oncologist. Keep patient lying flat if possible. High-dose steroids may be given. Do NOT manipulate back."
      }
    ]
  },

  environmental: {
    label: "Environmental & Toxicological Emergencies",
    conditions: [
      {
        name: "Hypothermia (Severe)",
        typical: "Core temp <95°F (35°C), shivering (mild 90-95°F: conscious, shivering; moderate 82-90°F: decreased consciousness, no shivering; severe <82°F: coma, areflexic, fixed pupils, bradycardia, hypotension, apparent death), cold skin, bradycardia, J wave (Osborn wave on EKG), hyporeflexia, oliguria, coagulopathy, metabolic acidosis",
        atypical: "Paradoxical undressing (disrobe in final stages — mistaken for hyperthermia/DEA); 'metabolic icebox' — patients can appear dead with minimal detectable signs but survive full resuscitation; elderly in cold homes with temp <95 but no classic presentation; hypothermia from sepsis or endocrine cause (myxedema coma).",
        redFlags: ["core temp <90°F", "decreased consciousness", "bradycardia/hypotension", "no shivering", "history of prolonged cold exposure", "elderly living without heat"],
        riskFactors: ["elderly (decreased thermoregulation)", "homelessness/inadequate housing", "alcohol use", "hypothyroidism", "sepsis", "medications (beta-blockers, sedatives)", "dementia/cannot shelter", "outdoor activities"],
        urgency: "RED if temp <90°F or AMS — YELLOW if mild and awake/shivering",
        advice: "Handle gently (rough handling can cause V-fib). Remove wet clothing. Passive rewarming with blankets/warm room. Warm sweet drinks if able. Call 911 if severe."
      },
      {
        name: "Heat Stroke / Hyperthermia",
        typical: "Core temp >104°F (40°C), HOT DRY SKIN (no sweating in classic heat stroke), altered mental status/coma, confusion, seizures, tachycardia, tachypnea, hypotension, cardiovascular collapse, DIC, rhabdomyolysis, AKI, electrolyte disorders, hepatic failure, ARDS, multiorgan failure",
        atypical: "Exertional heat stroke: may still be sweating (different from classic); only confusion without hyperthermia documented; exercise-associated collapse in athlete with gradual onset; heat exhaustion prodrome: heavy sweating, weakness, dizziness, headache, N/V, thirst, normal mental status",
        redFlags: ["core temp >104°F + AMS = heat stroke", "hot dry skin + confusion", "seizure", "collapse in heat", "no improvement with initial cooling"],
        riskFactors: ["extreme heat/humidity", "age >65 / <4", "exertion in heat (athletes, military, laborers)", "obesity", "CVD", "medications (anticholinergics, diuretics, beta-blockers, antihistamines, phenothiazines)", "alcohol", "lack of AC", "dehydration"],
        urgency: "RED - 911 immediately. Heat stroke has 10-50% mortality.",
        advice: "Move to shade/AC. Remove excess clothing. Aggressive cooling: cold water immersion, ice packs to neck/axillae/groin. Do NOT give antipyretics (ineffective). Call 911."
      },
      {
        name: "Carbon Monoxide Poisoning",
        typical: "Headache, dizziness, weakness, N/V, confusion, chest pain (if CAD), palpitations, dyspnea (especially with exertion), syncope, seizure, coma, cherry-red skin (very late/unreliable sign), metabolic acidosis, elevated COHb level",
        atypical: "Flu-like symptoms without fever (classic presentation — multiple family members sick in same space); only syncope; only chest pain/arrhythmia; only headache/dizziness worsening with time in environment; only nausea ('food poisoning' often misdiagnosis). Patients may know they 'feel better' when away from the building.",
        redFlags: ["confirmed or suspected exposure (furnace, car in garage, generator indoors, fire)", "loss of consciousness", "seizure", "chest pain + known CAD", "multiple household members with same symptoms", "COHb >25%"],
        riskFactors: ["furnace/water heater malfunction", "car idling in attached garage", "indoor generator/charcoal grill/kerosene heater", "fire", "ice storms/power outages (alternate heating)", "winter season"],
        urgency: "RED - 911. High-flow O2 and get to hyperbaric chamber if severe (AMS, seizure, coma, COHb >25%).",
        advice: "Get fresh air immediately. Get out of building. Call 911. Do NOT re-enter. High-flow NRB O2."
      },
      {
        name: "Smoke Inhalation",
        typical: "Cough, dyspnea, hoarseness, stridor, soot in sputum/nose, facial burns, singed nasal hairs, carbonaceous sputum, altered mental status, headache (CO poisoning), hypoxia, cyanosis, wheezing, crackles (pulmonary edema), confusion, coma",
        atypical: "Delayed pulmonary edema up to 24-48hrs after exposure; only hoarseness/stridor initially without respiratory distress → can rapidly progress to airway obstruction; only confusion from CO/cyanide; anxiety/agitation from hypoxia",
        redFlags: ["stridor (impending airway obstruction)", "facial burns", "soot around nose/mouth", "hoarseness", "altered mental status", "hypoxia", "known enclosed space fire exposure"],
        riskFactors: ["fire in enclosed space", "loss of consciousness during fire", "prolonged exposure", "structural collapse", "explosion"],
        urgency: "RED - 911. Airway may rapidly deteriorate. Early intubation may be needed.",
        advice: "Get to fresh air. High-flow O2. 911. Any facial burns or hoarseness = airway risk."
      }
    ]
  },

  autoimmune: {
    label: "Autoimmune & Inflammatory Diseases",
    conditions: [
      {
        name: "Systemic Lupus Erythematosus (SLE Flare)",
        typical: "Malar/butterfly rash, photosensitivity, oral ulcers, arthritis/arthralgias, fever, fatigue, serositis (pleuritic chest pain, pericarditis), nephritis (edema, hypertension, foamy urine, hematuria, oliguria), CNS: headache, seizure, psychosis, confusion, transverse myelitis (leg weakness, bladder/bowel dysfunction)",
        atypical: "Only nephritis without rash (lupus nephritis can be silent until renal failure); only hematologic (thrombocytopenia, hemolytic anemia, leukopenia); only recurrent clots (antiphospholipid syndrome); only pericarditis; only psychosis/confusion without other organ involvement; can present as only fatigue and arthralgia",
        redFlags: ["seizure/psychosis/confusion (CNS lupus)", "nephritis: foamy urine, edema, hypertension, oliguria", "hemolytic anemia/thrombocytopenia", "pulmonary hemorrhage", "vasculitis with organ involvement", "pregnancy + active lupus"],
        riskFactors: ["female sex (9:1)", "African American, Hispanic, Asian ethnicity", "family history", "known SLE", "medication nonadherence", "recent sun exposure"],
        urgency: "RED if CNS, renal, pulmonary, severe hematologic involvement — YELLOW if mild flare",
        advice: "Avoid sun. NSAIDs for mild pain. Contact rheumatologist. ER if severe organ involvement."
      },
      {
        name: "Ankylosing Spondylitis / Axial SpA",
        typical: "Inflammatory back pain: insidious onset, age <40, >3 months duration, morning stiffness >30min, improvement with exercise (NOT rest), worse at night (wakes patient up in second half of night alternating buttock pain), improvement with NSAIDs",
        atypical: "Only peripheral arthritis (knee, ankle); only enthesitis (Achilles, plantar fascia); only uveitis (acute red painful eye, photophobia, blurred vision); only dactylitis (sausage digit); only psoriasiform rash (PsA); only IBD-related back pain; HLA-B27+ asymptomatic.",
        redFlags: ["acute onset of severe low back pain + fever + recent infection (septic discitis/osteomyelitis)", "night pain not relieved by position change", "new neuro deficits (cauda equina warning)", "weight loss + back pain (malignancy)", "age >40 new onset (not typical for AS)"],
        riskFactors: ["HLA-B27 positive", "family history", "male sex", "IBD (Crohn, UC)", "psoriasis", "reactive arthritis"],
        urgency: "YELLOW for known AS/SpA — ORANGE if new diagnosis or complication"
      },
      {
        name: "Anaphylactic / Allergic Reaction",
        typical: "Acute onset after allergen exposure: urticaria, angioedema (lips, tongue, throat), stridor, wheeze, dyspnea, hypotension, abdominal pain, nausea, vomiting",
        atypical: "Only GI symptoms; only hypotension without skin findings; only severe anxiety/feeling of doom; biphasic reaction hours later",
        redFlags: ["airway compromise (stridor, tongue swelling)", "hypotension", "hypoxia", "rapid progression", "previous severe reaction", "biphasic risk"],
        riskFactors: ["known allergies (food, drug, insect, latex)", "prior anaphylaxis", "asthma", "mastocytosis", "recent allergen exposure"],
        urgency: "RED - Call 911, use epinephrine auto-injector",
        advice: "Use epinephrine auto-injector (EpiPen) in lateral thigh — do NOT delay. Lie flat with legs elevated. Second dose after 5min if needed."
      }
    ]
  },

  // ===== KEY TRIAGE RULES & RED FLAGS SUMMARY =====
  triageRules: {
    redFlags_anyPatient: [
      "Airway compromise (stridor, tongue swelling, inability to speak)",
      "Breathing difficulty (severe dyspnea at rest, hypoxia SaO2 <90%, cyanosis)",
      "Circulation compromise (hypotension, syncope, severe pallor, cold extremities)",
      "Disability (new altered mental status, confusion, unconsciousness)",
      "Exposure/Environment (hypothermia, hyperthermia, severe hypothermia <90°F, heat stroke >104°F)",
      "Hemorrhage (massive bleeding, bleeding on anticoagulant, GI bleed with unstable vitals)",
      "Anaphylaxis (sudden onset, airway/breathing/circulation compromise)",
      "Sepsis (fever + confusion, hypotension, or poor perfusion)",
      "Stroke signs (sudden onset facial droop, arm weakness, speech difficulty, time ≤4.5hrs)",
      "Chest pain at rest with associated symptoms",
      "Suicidal ideation with plan, intent, and access to means",
      "Overdose with respiratory depression, seizure, or AMS"
    ],
    
    atypicalPresentationWarning: `
      - Women: Heart attack often WITHOUT chest pain. Look for: back pain, jaw pain, extreme fatigue, nausea, SOB.
      - Diabetics: Heart attack may be SILENT or present as only: nausea, SOB, fatigue, confusion.
      - Elderly: Infection may present as: confusion, falls, functional decline, no fever.
      - Immunocompromised: Infection may present with: minimal fever, subtle signs, rapid progression.
      - Children: Serious illness may present as: poor feeding, lethargy, irritability, apnea.
      - Preeclampsia: can occur up to 6 weeks POSTPARTUM.
      - Chronic subdural in elderly: 30-50% have NO KNOWN head trauma history.
      - Sepsis in young healthy: tachycardia is early sign; confusion is late ominous sign.
    `,

    dontMissDangerPairs: [
      "Head trauma + anticoagulant = intracranial bleed until proven otherwise",
      "Fever + petechiae/purpura = meningococcemia",
      "Fever + back pain + IV drug use = spinal epidural abscess",
      "Chest pain + diabetes/female = atypical MI possible without classic pain",
      "Cancer patient + any fever = febrile neutropenia until proven otherwise",
      "Fall in elderly + anticoag = CT head regardless of symptoms",
      "Pregnancy + BP >160/110 = preeclampsia emergency",
      "Recent chemo + fever = neutropenic fever (antibiotics within 60min)",
      "Back pain + cancer history = spinal cord compression until proven otherwise",
      "Sudden severe headache = subarachnoid hemorrhage until proven otherwise",
      "Elderly with AMS = infection/delirium until proven otherwise (not just dementia)"
    ]
  }
};
