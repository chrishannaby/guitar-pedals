import PedalChain from "../components/PedalChain.client";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-start gap-12 bg-gradient-to-br from-slate-700 to-slate-900 pt-40">
      <PedalChain />
    </div>
  );
}
