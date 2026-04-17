import React, { useMemo, useState } from "react";
import { Activity, AlertTriangle, Bone, Microscope, Stethoscope, Syringe } from "lucide-react";

const IMG = {
  mammoCC: "/case1_mammogram_cc.png",
  mammoMLO: "/case1_mammogram_mlo.png",
  pathNormal: "/case1_pathology_normal.png",
  pathPatient: "/case1_pathology_patient.png",
  tumor: "/case1_tumor_map.png",
  cxr: "/case2_chest_xray.jpg",
  cxr2: "/case2_chest_xray2.jpg",
  hip: "/case2_hip_xray.jpg",
};

const CASES = {
  case1: {
    title: "Cancer Detection & Treatment Journey",
    badge: "Case 1",
    patient: { name: "Angela Brooks, 45", mrn: "10233987", complaint: "Lump in breast", vitals: ["Temp 98.8°F", "HR 84", "BP 126/78", "RR 16"] },
    stations: [
      { title: "PCP: Find the Red Flags", role: "First point of contact", icon: Stethoscope, tabs: ["Summary", "History", "Orders", "Results"] },
      { title: "Pathology: You Are the Diagnostician", role: "Makes the diagnosis", icon: Microscope, tabs: ["Slide Viewer", "Report Builder", "Diagnosis Reveal"] },
      { title: "Oncology: Build the Treatment Plan", role: "Plans treatment", icon: Activity, tabs: ["Case Data", "Treatment Scenarios", "Outcomes"] },
      { title: "Surgery: Plan the Operation", role: "Removes the tumor", icon: Syringe, tabs: ["Tumor Map", "Surgery Plan", "Wrap-Up"] },
    ],
  },
  case2: {
    title: "Cough, Weakness, and Fall",
    badge: "Case 2",
    patient: { name: "Mr. Lewis Carter, 61", mrn: "20841766", complaint: "Cough, fever, weakness", vitals: ["Temp 101.4°F", "HR 108", "BP 102/64", "RR 22"] },
    stations: [
      { title: "PCP: What’s Going On?", role: "First evaluation", icon: Stethoscope, tabs: ["Summary", "History", "Orders", "Decision"] },
      { title: "Emergency Medicine: Trauma First", role: "Manages trauma + illness", icon: AlertTriangle, tabs: ["Triage", "Vitals", "Decision Reveal"] },
      { title: "Hospitalist: Stabilize for Surgery", role: "Manages medical complexity", icon: Activity, tabs: ["Scenario Board", "Outcome"] },
      { title: "Orthopaedic Surgery: Fix the Bone", role: "Fixes the fracture", icon: Bone, tabs: ["X-ray Match", "Recovery"] },
    ],
  },
};

const ONC_OPT = {
  stage: ["I-III", "IV"],
  surgery: ["Lumpectomy", "Mastectomy"],
  systemic: ["Chemotherapy", "Targeted Therapy", "Hormone Therapy", "Immunotherapy"],
  radiation: ["Radiation Therapy", "No Radiation Therapy"],
};

const ONC = [
  {
    label: "Scenario 1",
    sub: "ER/PR/HER2 negative",
    age: "45 years old",
    pref: "preserve breast and aggressive medical treatment",
    details: ["Triple negative breast cancer", "No hormone receptors", "No HER2 expression"],
    goal: "Build a treatment plan that fits triple negative disease and the patient's preferences.",
    req: { stage: ["I-III"], surgery: ["Lumpectomy"], systemic: ["Chemotherapy", "Immunotherapy"], radiation: ["Radiation Therapy"] },
    rat: "Expected educational plan: lumpectomy, chemotherapy, Immunotherapy, and radiation therapy.",
  },
  {
    label: "Scenario 2",
    sub: "ER/PR positive, HER2 negative",
    age: "65 years old",
    pref: "preserve breast, minimize side effects",
    details: ["Hormone receptor positive", "HER2 negative", "Lower-toxicity pathway is preferred"],
    goal: "Choose a lower-toxicity, breast-preserving plan.",
    req: { stage: ["I-III"], surgery: ["Lumpectomy"], systemic: ["Hormone Therapy"], radiation: ["Radiation Therapy"] },
    rat: "Expected educational plan: lumpectomy, hormone therapy, and radiation therapy.",
  },
  {
    label: "Scenario 3",
    sub: "ER/PR negative, HER2 positive",
    age: "45 years old",
    pref: "Most aggressive treatment and surgery",
    details: ["3 cm mass on mammogram", "No abnormal lymph nodes", "HER2 positive and targetable"],
    goal: "Choose an aggressive HER2-positive treatment approach.",
    req: { stage: ["I-III"], surgery: ["Mastectomy"], systemic: ["Chemotherapy", "Targeted Therapy"], radiation: ["No Radiation Therapy"] },
    rat: "Expected educational plan: mastectomy, chemotherapy, targeted therapy, and no radiation therapy.",
  },
];

const HOSP = [
  {
    label: "Scenario 1",
    note: "Hypoxic and still clinically ill",
    vitals: { o2: "88%", bp: "106/68", hr: "112", rr: "24", temp: "101.2°F", pain: "8/10" },
    details: ["Needs oxygen support", "Likely still volume depleted", "Pneumonia not controlled yet"],
    goal: "Stabilize oxygenation, support perfusion, and intensify treatment.",
    req: { oxygen: ["Start nasal cannula oxygen"], fluids: ["Give IV fluids"], abx: ["Start IV antibiotics"], pain: ["Oxycodone"], dispo: [] },
    rat: "This scenario supports nasal cannula oxygen, IV fluids, IV antibiotics, and stronger pain control.",
  },
  {
    label: "Scenario 2",
    note: "Still a little tachycardic, O2 sat ok",
    vitals: { o2: "94%", bp: "110/70", hr: "104", rr: "20", temp: "100.1°F", pain: "7/10" },
    details: ["Oxygen status acceptable on current support", "Still mildly tachycardic", "Not ready to de-escalate treatment yet"],
    goal: "Maintain support while continuing active treatment.",
    req: { oxygen: ["Remain on current nasal cannula oxygen"], fluids: ["Give IV fluids"], abx: ["Continue IV antibiotics"], pain: ["Oxycodone"], dispo: [] },
    rat: "Do not step down oxygen or antibiotics yet. Continue fluids and stronger pain control.",
  },
  {
    label: "Scenario 3",
    note: "Still tachycardic, now a little hypotensive, O2 sat OK",
    vitals: { o2: "94%", bp: "94/60", hr: "110", rr: "20", temp: "99.8°F", pain: "7/10" },
    details: ["Oxygen saturation remains acceptable", "Now somewhat hypotensive", "Needs continued medical optimization"],
    goal: "Support circulation without unnecessarily escalating oxygen.",
    req: { oxygen: ["Remain on current nasal cannula oxygen"], fluids: ["Give IV fluids"], abx: ["Continue IV antibiotics"], pain: ["Oxycodone"], dispo: [] },
    rat: "Continue current nasal cannula, IV fluids, IV antibiotics, and oxycodone.",
  },
  {
    label: "Scenario 4",
    note: "Now optimized for surgery",
    vitals: { o2: "95%", bp: "118/74", hr: "92", rr: "18", temp: "98.8°F", pain: "4/10" },
    details: ["Stable on current support", "No longer needs additional IV fluids", "Ready for operative clearance"],
    goal: "Recognize readiness for surgery and step down pain support appropriately.",
    req: { oxygen: ["Remain on current nasal cannula oxygen"], fluids: ["Hold IV fluids"], abx: ["Continue IV antibiotics"], pain: ["Acetaminophen"], dispo: ["Ready for surgery"] },
    rat: "Hold IV fluids, continue current oxygen and IV antibiotics, use acetaminophen, and clear for surgery.",
  },
];

const Card = ({ children, className = "" }) => <div className={`rounded-2xl border border-neutral-300 bg-white p-4 shadow-sm ${className}`}>{children}</div>;
const Chip = ({ on, children, onClick }) => <button onClick={onClick} className={`rounded-xl border px-3 py-2 text-left ${on ? "border-yellow-500 bg-yellow-50" : "border-neutral-300 bg-white"}`}>{children}</button>;
const Metric = ({ label, value }) => <div className="rounded-xl border bg-white p-3 text-center"><div className="text-xs uppercase tracking-wide text-neutral-500">{label}</div><div className="font-bold text-neutral-900">{value}</div></div>;
const Bullets = ({ title, items }) => <Card><div className="mb-2 text-lg font-bold text-neutral-900">{title}</div><ul className="space-y-1 text-sm text-neutral-800">{items.map((i) => <li key={i}>• {i}</li>)}</ul></Card>;

function ImgCard({ src, label, file, height = "h-80" }) {
  const [hide, setHide] = useState(false);
  return (
    <Card className="p-3">
      <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">{label}</div>
      {!hide ? (
        <div className={`flex items-center justify-center rounded-xl border border-neutral-200 bg-white ${height}`}>
          <img src={src} alt={label} className="max-h-full max-w-full object-contain" onError={() => setHide(true)} />
        </div>
      ) : (
        <div className={`flex items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 text-neutral-500 ${height}`}>
          <div className="text-center text-sm">
            <div className="font-semibold">Missing image</div>
            <div className="mt-1 font-mono text-xs">{file}</div>
          </div>
        </div>
      )}
    </Card>
  );
}

function exact(a, b) { return JSON.stringify([...a].sort()) === JSON.stringify([...b].sort()); }
function toggleMulti(arr, val, setter) { setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]); }
function setSingle(obj, key, val, setter) { setter({ ...obj, [key]: [val] }); }

export default function App() {
  const [caseId, setCaseId] = useState("case1");
  const [station, setStation] = useState(0);
  const [tab, setTab] = useState(CASES.case1.stations[0].tabs[0]);
  const [s1Orders, setS1Orders] = useState([]);
  const [c2Orders, setC2Orders] = useState([]);
  const [s1Decision, setS1Decision] = useState([]);
  const [pathPick, setPathPick] = useState("");
  const [pathReport, setPathReport] = useState({ pattern: "", dx: "" });
  const [surgPick, setSurgPick] = useState([]);
  const [oncIdx, setOncIdx] = useState(0);
  const [oncChecked, setOncChecked] = useState(false);
  const [onc, setOnc] = useState({ stage: [], surgery: [], systemic: [], radiation: [] });
  const [hIdx, setHIdx] = useState(0);
  const [hChecked, setHChecked] = useState(false);
  const [hPlan, setHPlan] = useState({ oxygen: [], fluids: [], abx: [], pain: [], dispo: [] });
  const [c2DecisionChoice, setC2DecisionChoice] = useState("");
  const [triage, setTriage] = useState([]);
  const [orthoPlan, setOrthoPlan] = useState([]);

  const cc = CASES[caseId];
  const st = cc.stations[station];
  const Icon = st.icon;
  const patient = cc.patient;
  const curOnc = ONC[oncIdx];
  const curH = HOSP[hIdx];
  const oncCorrect = exact(onc.stage, curOnc.req.stage) && exact(onc.surgery, curOnc.req.surgery) && exact(onc.systemic, curOnc.req.systemic) && exact(onc.radiation, curOnc.req.radiation);
  const hCorrect = exact(hPlan.oxygen, curH.req.oxygen) && exact(hPlan.fluids, curH.req.fluids) && exact(hPlan.abx, curH.req.abx) && exact(hPlan.pain, curH.req.pain) && exact(hPlan.dispo, curH.req.dispo);
  const triageCorrect = exact(triage, ["Check ABCs first", "Assess oxygen needs", "Control pain and get imaging"]);
  const c1OrdersCorrect = exact(s1Orders, ["Mammogram", "Breast ultrasound", "CBC"]);
  const c2OrdersCorrect = exact(c2Orders, ["Chest X-ray", "Start antibiotics", "Recommend fluids and rest"]);
  const hospOxygen = hIdx === 0 ? ["Start nasal cannula oxygen", "Remain on room air"] : ["Remain on current nasal cannula oxygen", "Increase nasal cannula oxygen"];
  const hospAbx = hIdx === 0 ? ["Continue oral antibiotics", "Start IV antibiotics"] : ["Continue IV antibiotics", "Transition to oral antibiotics"];
  const progressNote = useMemo(() => `${hIdx + 1} of ${HOSP.length}`, [hIdx]);

  const goCase = (id) => { setCaseId(id); setStation(0); setTab(CASES[id].stations[0].tabs[0]); };
  const goStation = (i) => { setStation(i); setTab(cc.stations[i].tabs[0]); };

  return (
    <div className="min-h-screen bg-neutral-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border-8 border-neutral-900 bg-neutral-200 shadow-2xl">
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 px-6 py-5 text-white">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-md bg-yellow-500 text-2xl font-black text-black">MU</div>
              <div><div className="text-3xl font-bold">MU BtG Health</div><div className="text-sm text-neutral-300">{cc.title}</div></div>
            </div>
            <div className="rounded-2xl border border-neutral-700 bg-neutral-800/80 px-4 py-3 text-sm">{cc.badge}</div>
          </div>
        </div>

        <div className="border-t-4 border-yellow-500 bg-white px-5 py-5">
          <div className="mb-4 flex flex-wrap gap-3">
            {Object.entries(CASES).map(([id, c]) => <button key={id} onClick={() => goCase(id)} className={`rounded-xl border px-4 py-2 text-sm font-semibold ${caseId === id ? "border-yellow-600 bg-yellow-500 text-black" : "border-neutral-300 bg-white text-neutral-800"}`}>{c.badge}: {c.title}</button>)}
          </div>

          <div className="mb-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {cc.stations.map((s, i) => <button key={s.title} onClick={() => goStation(i)} className={`rounded-2xl border p-4 text-left ${station === i ? "border-yellow-600 bg-yellow-50" : "border-neutral-300 bg-white"}`}><div className="mb-1 text-sm uppercase tracking-wide text-neutral-500">Station {i + 1}</div><div className="font-bold text-neutral-900">{s.title}</div><div className="mt-1 text-sm text-neutral-600">{s.role}</div></button>)}
          </div>

          <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
            <div className="space-y-4 rounded-2xl border border-neutral-300 bg-neutral-50 p-5 shadow-sm">
              <Card><div className="mb-2 text-xl font-bold">Patient</div><div className="font-semibold">{patient.name}</div><div className="text-sm text-neutral-600">MRN: {patient.mrn}</div><div className="mt-2 text-sm text-neutral-800">{patient.complaint}</div></Card>
              <Card><div className="mb-2 text-xl font-bold">Vitals</div>{patient.vitals.map((v) => <div key={v}>{v}</div>)}</Card>
              <Card className="border-yellow-300 bg-yellow-50"><div className="mb-2 text-lg font-bold">Student Goal</div><div className="text-sm text-neutral-800">{st.role}</div></Card>
            </div>

            <div className="space-y-4">
              <Card className="bg-neutral-50"><div className="mb-2 flex items-center gap-3 text-xl font-bold text-neutral-900"><Icon className="h-6 w-6 text-yellow-600" />{st.title}</div><div className="text-neutral-700">{st.role}</div></Card>
              <div className="flex flex-wrap gap-2">{st.tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`rounded-t-xl border px-4 py-2 font-semibold ${tab === t ? "border-yellow-600 bg-yellow-500 text-black" : "border-neutral-400 bg-neutral-800 text-white"}`}>{t}</button>)}</div>

              {caseId === "case1" && station === 0 && tab === "Summary" && <div className="space-y-4"><Bullets title="History Clues" items={["Self-exam found lump", "Hard and not easily moved", "Not painful", "Fatigue"]} /><Bullets title="Exam Clues" items={["Palpable breast lump", "Skin changes", "Nipple inversion/discharge", "Axillary nodes"]} /></div>}
              {caseId === "case1" && station === 0 && tab === "History" && <div className="space-y-4"><Bullets title="HPI" items={["Monthly self-exam", "Hard, fixed lump", "No pain", "Fatigue over weeks", "Skin changes and nipple discharge"]} /><Bullets title="Hint" items={["Hard, fixed lumps are more concerning than soft, mobile lumps."]} /></div>}
              {caseId === "case1" && station === 0 && tab === "Orders" && <div className="space-y-4"><Card><div className="mb-2 text-lg font-bold">Orders</div><div className="grid gap-2 md:grid-cols-2">{["Mammogram", "Breast ultrasound", "CBC", "No testing needed"].map((o) => <Chip key={o} on={s1Orders.includes(o)} onClick={() => toggleMulti(s1Orders, o, setS1Orders)}>{o}</Chip>)}</div></Card><Card><div className="mb-2 text-lg font-bold">Decision</div><div className="grid gap-2 md:grid-cols-2">{["Not concerning / reassure", "Concerning / needs workup", "Refer to specialist", "Monitor for now"].map((o) => <Chip key={o} on={s1Decision.includes(o)} onClick={() => toggleMulti(s1Decision, o, setS1Decision)}>{o}</Chip>)}</div></Card><div className={`rounded-lg px-3 py-2 text-sm ${c1OrdersCorrect ? "bg-green-100 text-green-800" : "bg-neutral-100 text-neutral-600"}`}>{c1OrdersCorrect ? "Correct order set selected." : "Select the appropriate orders for the PCP workup."}</div></div>}
              {caseId === "case1" && station === 0 && tab === "Results" && <div className="space-y-4"><div className="grid gap-4 md:grid-cols-2"><ImgCard title="Mammogram (Normal)" src="/case1_mammogram_normal.png" /><ImgCard title="Mammogram (Abnormal)" src="/case1_mammogram_abnormal.png" /></div><Bullets title="Imaging Preview" items={["Suspicious left breast mass with irregular/spiculated appearance", "Ultrasound confirms solid irregular mass", "Imaging is previewed here; pathology is the next station."]} /></div>}

              {caseId === "case1" && station === 1 && tab === "Slide Viewer" && <div className="space-y-4"><div className="grid gap-4 md:grid-cols-2"><div><ImgCard src={IMG.pathNormal} label="Normal Tissue" file="case1_pathology_normal.png" /><button onClick={() => setPathPick("normal")} className={`mt-2 w-full rounded-lg border px-3 py-2 ${pathPick === "normal" ? "border-yellow-500 bg-yellow-50" : "border-neutral-300 bg-white"}`}>Inspect normal tissue</button></div><div><ImgCard src={IMG.pathPatient} label="Patient Sample" file="case1_pathology_patient.png" /><button onClick={() => setPathPick("patient")} className={`mt-2 w-full rounded-lg border px-3 py-2 ${pathPick === "patient" ? "border-yellow-500 bg-yellow-50" : "border-neutral-300 bg-white"}`}>Inspect patient sample</button></div></div><div className={`rounded-lg px-3 py-2 text-sm ${!pathPick ? "bg-neutral-100 text-neutral-600" : pathPick === "patient" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>{!pathPick ? "Choose a slide to inspect." : pathPick === "patient" ? "Crowded pleomorphic nuclei and invasive architecture are concerning." : "Normal ducts are more organized and uniform."}</div></div>}
              {caseId === "case1" && station === 1 && tab === "Report Builder" && <div className="space-y-4"><Card><div className="mb-2 text-lg font-bold">Cell Pattern</div><div className="grid gap-2 md:grid-cols-2">{["Normal / orderly", "Abnormal / disorganized"].map((o) => <Chip key={o} on={pathReport.pattern === o} onClick={() => setPathReport({ ...pathReport, pattern: o })}>{o}</Chip>)}</div></Card><Card><div className="mb-2 text-lg font-bold">Likely Diagnosis</div><div className="grid gap-2 md:grid-cols-2">{["Normal breast tissue", "Benign change only", "Breast cancer is present"].map((o) => <Chip key={o} on={pathReport.dx === o} onClick={() => setPathReport({ ...pathReport, dx: o })}>{o}</Chip>)}</div></Card><div className={`rounded-lg px-3 py-2 text-sm ${pathReport.pattern === "Abnormal / disorganized" && pathReport.dx === "Breast cancer is present" ? "bg-green-100 text-green-800" : "bg-neutral-100 text-neutral-600"}`}>{pathReport.pattern === "Abnormal / disorganized" && pathReport.dx === "Breast cancer is present" ? "Correct pathology report selections." : "Select the most appropriate cell pattern and diagnosis."}</div></div>}
              {caseId === "case1" && station === 1 && tab === "Diagnosis Reveal" && <Bullets title="Diagnosis" items={["Biopsy confirms invasive ductal carcinoma.", "Pathology confirmation allows treatment planning to begin."]} />}

              {caseId === "case1" && station === 2 && tab === "Case Data" && <div className="space-y-4"><Bullets title="Clinical Data" items={["Cancer confirmed on biopsy", "Localized disease", "Patient is worried about side effects and body image"]} /><Bullets title="Teaching Point" items={["The patient must understand and agree to the plan."]} /></div>}
              {caseId === "case1" && station === 2 && tab === "Treatment Scenarios" && <div className="space-y-4"><Card className="border-yellow-300 bg-yellow-50"><div className="font-semibold">Work through each cancer subtype scenario. Select categories, click Check Plan, and advance only after a correct answer.</div></Card><Card><div className="mb-3 flex items-center justify-between gap-3"><div><div className="text-lg font-bold text-neutral-900">{curOnc.label}</div><div className="text-sm text-neutral-600">Type of Cancer: {curOnc.sub}</div><div className="text-sm text-neutral-600">Patient Age: {curOnc.age}</div><div className="text-sm text-neutral-600">Patient Preference: {curOnc.pref}</div></div><div className="text-sm text-neutral-600">Scenario {oncIdx + 1} of {ONC.length}</div></div><div className="mb-3 text-sm text-neutral-600">Goal: {curOnc.goal}</div><div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]"><div><div className="mb-2 font-semibold text-neutral-900">Case Features</div><ul className="space-y-2 text-sm text-neutral-800">{curOnc.details.map((i) => <li key={i}>• {i}</li>)}</ul></div><div className="space-y-4"><div><div className="mb-2 font-semibold text-neutral-900">Stage</div><div className="grid gap-2 md:grid-cols-2">{ONC_OPT.stage.map((o) => <Chip key={o} on={onc.stage.includes(o)} onClick={() => setSingle(onc, "stage", o, setOnc)}>{o}</Chip>)}</div></div><div><div className="mb-2 font-semibold text-neutral-900">Surgery</div><div className="grid gap-2 md:grid-cols-2">{ONC_OPT.surgery.map((o) => <Chip key={o} on={onc.surgery.includes(o)} onClick={() => setSingle(onc, "surgery", o, setOnc)}>{o}</Chip>)}</div></div><div><div className="mb-2 font-semibold text-neutral-900">Systemic</div><div className="grid gap-2 md:grid-cols-2">{ONC_OPT.systemic.map((o) => <Chip key={o} on={onc.systemic.includes(o)} onClick={() => toggleMulti(onc.systemic, o, (next) => setOnc({ ...onc, systemic: next }))}>{o}</Chip>)}</div></div><div><div className="mb-2 font-semibold text-neutral-900">Radiation Therapy</div><div className="grid gap-2 md:grid-cols-2">{ONC_OPT.radiation.map((o) => <Chip key={o} on={onc.radiation.includes(o)} onClick={() => setSingle(onc, "radiation", o, setOnc)}>{o}</Chip>)}</div></div></div></div><div className="mt-4 flex flex-wrap items-center gap-3"><button onClick={() => setOncChecked(true)} className="rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-black">Check Plan</button><button onClick={() => { if (oncIdx < ONC.length - 1) { setOncIdx(oncIdx + 1); setOnc({ stage: [], surgery: [], systemic: [], radiation: [] }); setOncChecked(false); } }} disabled={oncIdx === ONC.length - 1} className="rounded-lg bg-black px-4 py-2 font-semibold text-white disabled:opacity-40">Next Scenario</button>{oncChecked && <div className={`rounded-lg px-3 py-2 text-sm font-semibold ${oncCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{oncCorrect ? "Correct plan." : "Try again."}</div>}</div></Card>{oncChecked && <Card><div className="mb-2 text-lg font-bold text-neutral-900">Physician Note</div><div className="text-sm text-neutral-700">{curOnc.rat}</div></Card>}</div>}
              {caseId === "case1" && station === 2 && tab === "Outcomes" && <Bullets title="Treatment Reveal" items={["Choices may include surgery, hormone therapy, radiation, chemotherapy, or targeted therapy.", "The best answer should fit both tumor biology and patient preference."]} />}
              {caseId === "case1" && station === 3 && tab === "Tumor Map" && <div className="space-y-4"><ImgCard src={IMG.tumor} label="Tumor Map" file="case1_tumor_map.png" height="h-64" /><Bullets title="Planning Data" items={["Tumor is localized to the upper outer quadrant", "Remove tumor plus a rim of healthy tissue", "Margins matter"]} /></div>}
              {caseId === "case1" && station === 3 && tab === "Surgery Plan" && <div className="space-y-4"><Card><div className="mb-2 text-lg font-bold">Surgery Thinking</div><div className="grid gap-2 md:grid-cols-2">{["Remove tumor with margin", "Discuss risks and recovery with patient", "Ignore pathology findings", "Remove nothing"].map((o) => <Chip key={o} on={surgPick.includes(o)} onClick={() => toggleMulti(surgPick, o, setSurgPick)}>{o}</Chip>)}</div></Card><div className={`rounded-lg px-3 py-2 text-sm ${exact(surgPick, ["Remove tumor with margin", "Discuss risks and recovery with patient"]) ? "bg-green-100 text-green-800" : "bg-neutral-100 text-neutral-600"}`}>{exact(surgPick, ["Remove tumor with margin", "Discuss risks and recovery with patient"]) ? "Correct surgery plan selected." : "Select the appropriate surgery thinking choices."}</div></div>}
              {caseId === "case1" && station === 3 && tab === "Wrap-Up" && <Bullets title="Follow-Up" items={["Primary care and oncology continue supportive care after surgery.", "Recovery includes monitoring, lifestyle support, and emotional support."]} />}

              {caseId === "case2" && station === 0 && tab === "Summary" && <div className="space-y-4"><Bullets title="Chief Concerns" items={["Cough and fever", "Weakness and fatigue", "Likely infection"]} /><Bullets title="Teaching Point" items={["PCPs decide who may go home and who may need hospital-level care."]} /></div>}
              {caseId === "case2" && station === 0 && tab === "History" && <div className="space-y-4"><ImgCard src={IMG.cxr} label="Chest X-ray" file="case2_chest_xray.jpg" /><Bullets title="HPI" items={["Cough for several days", "Fever and weakness", "Reduced appetite", "Short of breath with activity"]} /></div>}
              {caseId === "case2" && station === 0 && tab === "Orders" && <div className="space-y-4"><Card><div className="mb-2 text-lg font-bold">Orders</div><div className="grid gap-2 md:grid-cols-2">{["Chest X-ray", "Start antibiotics", "Recommend fluids and rest", "Ignore symptoms"].map((o) => <Chip key={o} on={c2Orders.includes(o)} onClick={() => toggleMulti(c2Orders, o, setC2Orders)}>{o}</Chip>)}</div></Card><div className={`rounded-lg px-3 py-2 text-sm ${c2OrdersCorrect ? "bg-green-100 text-green-800" : "bg-neutral-100 text-neutral-600"}`}>{c2OrdersCorrect ? "Correct order set selected." : "Select the appropriate orders for the PCP workup."}</div></div>}
              {caseId === "case2" && station === 0 && tab === "Decision" && <div className="space-y-4"><ImgCard src={IMG.cxr2} label="Chest X-ray (Progression)" file="case2_chest_xray2.jpg" /><Card><div className="mb-2 text-lg font-bold text-neutral-900">Image Interpretation</div><div className="mb-3 text-sm text-neutral-600">What changed between the first and second chest X-rays?</div><div className="grid gap-2 md:grid-cols-2">{["Worsening right lower lobe consolidation", "No meaningful change from the first image", "Improving pneumonia", "Normal chest X-ray"].map((o) => <Chip key={o} on={c2DecisionChoice === o} onClick={() => setC2DecisionChoice(o)}>{o}</Chip>)}</div><div className={`mt-3 rounded-lg px-3 py-2 text-sm ${!c2DecisionChoice ? "bg-neutral-100 text-neutral-600" : c2DecisionChoice === "Worsening right lower lobe consolidation" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{!c2DecisionChoice ? "Select the best interpretation of the interval change." : c2DecisionChoice === "Worsening right lower lobe consolidation" ? "Correct. The second image suggests worsening right lower lobe consolidation, which supports pneumonia progression." : "Not the best choice. Look for interval worsening in the right lower lung field."}</div></Card><Bullets title="Likely Diagnosis" items={["This station points to pneumonia.", "Students should discuss home versus hospital if symptoms worsen."]} /></div>}

              {caseId === "case2" && station === 1 && tab === "Triage" && <Card><div className="mb-2 text-lg font-bold">Emergency Priorities</div><div className="grid gap-2 md:grid-cols-2">{["Check ABCs first", "Assess oxygen needs", "Control pain and get imaging", "Send home immediately"].map((o) => <Chip key={o} on={triage.includes(o)} onClick={() => toggleMulti(triage, o, setTriage)}>{o}</Chip>)}</div><div className={`mt-3 rounded-lg px-3 py-2 text-sm ${triageCorrect ? "bg-green-100 text-green-800" : "bg-neutral-100 text-neutral-600"}`}>{triageCorrect ? "Correct triage priorities selected." : "Select the appropriate emergency priorities."}</div></Card>}
              {caseId === "case2" && station === 1 && tab === "Vitals" && <div className="space-y-4"><ImgCard src={IMG.hip} label="Hip X-ray" file="case2_hip_xray.jpg" height="h-96" /><Bullets title="ED Findings" items={["Oxygen level is lower than expected", "Severe hip pain after the fall", "Imaging suggests displaced femoral neck fracture", "Pneumonia is worsening"]} /></div>}
              {caseId === "case2" && station === 1 && tab === "Decision Reveal" && <Bullets title="Teaching Reveal" items={["Emergency physicians stabilize first, then coordinate admission and consultation.", "The fracture matters, but oxygen needs and pneumonia cannot be ignored."]} />}

              {caseId === "case2" && station === 2 && tab === "Scenario Board" && <div className="space-y-4"><Card className="border-yellow-300 bg-yellow-50"><div className="font-semibold">Work through each scenario in order. Choose the plan, click Check Plan, and advance only after a correct answer.</div></Card><Card><div className="mb-3 flex items-center justify-between gap-3"><div><div className="text-lg font-bold text-neutral-900">{curH.label}</div><div className="text-sm text-neutral-600">{curH.note}</div></div><div className="text-sm text-neutral-600">Scenario {progressNote}</div></div><div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-6"><Metric label="O2" value={curH.vitals.o2} /><Metric label="BP" value={curH.vitals.bp} /><Metric label="HR" value={curH.vitals.hr} /><Metric label="Respiratory Rate" value={curH.vitals.rr} /><Metric label="Temperature" value={curH.vitals.temp} /><Metric label="Pain Level" value={curH.vitals.pain} /></div><div className="mb-3 text-sm text-neutral-600">Goal: {curH.goal}</div><div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]"><div><div className="mb-2 font-semibold text-neutral-900">Patient Details</div><ul className="space-y-2 text-sm text-neutral-800">{curH.details.map((i) => <li key={i}>• {i}</li>)}</ul></div><div className="space-y-4"><div><div className="mb-2 font-semibold text-neutral-900">Oxygen</div><div className="grid gap-2 md:grid-cols-2">{hospOxygen.map((o) => <Chip key={o} on={hPlan.oxygen.includes(o)} onClick={() => setSingle(hPlan, "oxygen", o, setHPlan)}>{o}</Chip>)}</div></div><div><div className="mb-2 font-semibold text-neutral-900">Fluids</div><div className="grid gap-2 md:grid-cols-2">{["Give IV fluids", "Hold IV fluids"].map((o) => <Chip key={o} on={hPlan.fluids.includes(o)} onClick={() => setSingle(hPlan, "fluids", o, setHPlan)}>{o}</Chip>)}</div></div><div><div className="mb-2 font-semibold text-neutral-900">Antibiotics</div><div className="grid gap-2 md:grid-cols-2">{hospAbx.map((o) => <Chip key={o} on={hPlan.abx.includes(o)} onClick={() => setSingle(hPlan, "abx", o, setHPlan)}>{o}</Chip>)}</div></div><div><div className="mb-2 font-semibold text-neutral-900">Pain Management</div><div className="grid gap-2 md:grid-cols-3">{["No medication", "Acetaminophen", "Oxycodone"].map((o) => <Chip key={o} on={hPlan.pain.includes(o)} onClick={() => setSingle(hPlan, "pain", o, setHPlan)}>{o}</Chip>)}</div></div>{hIdx === 3 && <div><div className="mb-2 font-semibold text-neutral-900">Final Disposition</div><div className="grid gap-2 md:grid-cols-2">{["Ready for surgery"].map((o) => <Chip key={o} on={hPlan.dispo.includes(o)} onClick={() => setSingle(hPlan, "dispo", o, setHPlan)}>{o}</Chip>)}</div></div>}</div></div><div className="mt-4 flex flex-wrap items-center gap-3"><button onClick={() => setHChecked(true)} className="rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-black">Check Plan</button><button onClick={() => { if (hIdx < HOSP.length - 1) { setHIdx(hIdx + 1); setHPlan({ oxygen: [], fluids: [], abx: [], pain: [], dispo: [] }); setHChecked(false); } }} disabled={hIdx === HOSP.length - 1} className="rounded-lg bg-black px-4 py-2 font-semibold text-white disabled:opacity-40">Next Scenario</button>{hChecked && <div className={`rounded-lg px-3 py-2 text-sm font-semibold ${hCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{hCorrect ? "Correct plan." : "Try again."}</div>}</div></Card>{hChecked && <Card><div className="mb-2 text-lg font-bold text-neutral-900">Physician Note</div><div className="text-sm text-neutral-700">{curH.rat}</div></Card>}</div>}
              {caseId === "case2" && station === 2 && tab === "Outcome" && <Bullets title="Teaching Reveal" items={["The patient must be stable enough for anesthesia before orthopaedic surgery.", "Medicine and surgery work together here."]} />}
              {caseId === "case2" && station === 3 && tab === "X-ray Match" && <div className="space-y-4"><ImgCard src={IMG.hip} label="Hip X-ray" file="case2_hip_xray.jpg" height="h-96" /><Bullets title="Surgical Clues" items={["Hip fracture confirmed on imaging", "Surgery follows stabilization", "Post-op mobility planning matters"]} /><Card><div className="mb-2 text-lg font-bold">Orthopaedic Plan</div><div className="grid gap-2 md:grid-cols-2">{["Fix the fracture", "Guide post-op mobility plan", "Ignore pneumonia recovery", "Delay follow-up care"].map((o) => <Chip key={o} on={orthoPlan.includes(o)} onClick={() => toggleMulti(orthoPlan, o, setOrthoPlan)}>{o}</Chip>)}</div><div className={`mt-3 rounded-lg px-3 py-2 text-sm ${exact(orthoPlan, ["Fix the fracture", "Guide post-op mobility plan"]) ? "bg-green-100 text-green-800" : "bg-neutral-100 text-neutral-600"}`}>{exact(orthoPlan, ["Fix the fracture", "Guide post-op mobility plan"]) ? "Correct orthopaedic plan selected." : "Select the appropriate orthopaedic plan."}</div></Card></div>}
              {caseId === "case2" && station === 3 && tab === "Recovery" && <Bullets title="Teaching Reveal" items={["Repairing the fracture is only part of the job.", "Students should connect surgery, rehab, and medical recovery."]} />}

              <div className="flex justify-between"><button onClick={() => goStation(Math.max(0, station - 1))} disabled={station === 0} className="rounded-xl border border-neutral-400 bg-neutral-800 px-5 py-3 font-semibold text-white disabled:opacity-40">Previous Station</button><button onClick={() => goStation(Math.min(cc.stations.length - 1, station + 1))} disabled={station === cc.stations.length - 1} className="rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black disabled:opacity-40">Next Station</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
