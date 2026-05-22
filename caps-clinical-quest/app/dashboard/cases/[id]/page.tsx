interface PageProps {
  params: {
    id: string;
  };
}

export default function CaseEditorPage({ params }: PageProps) {
  return (
    <main className="min-h-screen bg-[#020B24] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <p className="uppercase tracking-[0.3em] text-cyan-400 text-xs mb-4">
          Clinical Case Management
        </p>

        <h1 className="text-5xl font-black mb-8">
          Edit Case #{params.id}
        </h1>

        <form
  onSubmit={(e) => {
    e.preventDefault();

    alert('Save functionality coming next.');
  }}
  className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 space-y-6"
>
          <div>
            <label className="block mb-2 font-semibold">
              Case Title
            </label>

            <input
              className="w-full rounded-2xl bg-slate-900 border border-white/10 px-5 py-4"
              placeholder="Enter case title"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Clinical Presentation
            </label>

            <textarea
              className="w-full min-h-[220px] rounded-2xl bg-slate-900 border border-white/10 px-5 py-4"
              placeholder="Enter patient presentation..."
            />
          </div>

          <div className="flex gap-4">
  <button
    type="submit"
    className="px-6 py-4 rounded-2xl bg-cyan-400 text-slate-950 font-black hover:scale-105 transition-all duration-300"
  >
    Save Changes
  </button>

  <button
    type="button"
    onClick={() => window.history.back()}
    className="px-6 py-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
  >
    Cancel
  </button>
</div>
        </div>
      </form>
    </main>
  );
}
