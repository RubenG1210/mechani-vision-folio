import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Gauge, BatteryCharging, Activity } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Mechatronics Toolkit — Ruben G." },
      {
        name: "description",
        content:
          "Interactive embedded engineering calculators: ESP32 ADC-to-voltage, battery lifespan estimation, and PWM duty cycle to RMS voltage.",
      },
      { property: "og:title", content: "Mechatronics Toolkit — Ruben G." },
      {
        property: "og:description",
        content: "ADC, battery runtime, and PWM calculators for embedded hardware work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ToolsPage,
});

function Field({
  label,
  value,
  onChange,
  suffix,
  min,
  max,
  step = "any",
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  suffix: string;
  min?: number;
  max?: number;
  step?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="mt-1 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 focus-within:border-forest">
        <input
          type="number"
          value={Number.isFinite(value) ? value : ""}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full bg-transparent font-mono text-sm outline-none"
        />
        <span className="text-xs font-mono text-forest">{suffix}</span>
      </span>
    </label>
  );
}

function ToolCard({
  icon: Icon,
  title,
  blurb,
  children,
}: {
  icon: typeof Gauge;
  title: string;
  blurb: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-forest/30 bg-card p-6 animate-fade-up transition-all duration-300 hover:scale-[1.015] hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]">
      <div className="flex items-center gap-3">
        <div className="rounded-lg border border-forest/40 bg-forest/10 p-2">
          <Icon className="h-5 w-5 text-forest" />
        </div>
        <h2 className="font-display text-xl font-semibold">{title}</h2>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{blurb}</p>
      <div className="mt-5 space-y-4">{children}</div>
    </article>
  );
}

function Result({ lines }: { lines: { label: string; value: string }[] }) {
  return (
    <div className="rounded-lg border border-forest/40 bg-forest/5 p-4 space-y-2">
      {lines.map((l) => (
        <div key={l.label} className="flex items-baseline justify-between gap-4">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">{l.label}</span>
          <span className="font-mono text-lg text-forest">{l.value}</span>
        </div>
      ))}
    </div>
  );
}

function Formula({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-black/30 p-3 text-[11px] font-mono text-muted-foreground">
      {children}
    </pre>
  );
}

function AdcTool() {
  const [adc, setAdc] = useState(2048);
  const [vref, setVref] = useState(3.3);
  const clamped = Math.min(Math.max(adc || 0, 0), 4095);
  const volts = (clamped / 4095) * (vref || 0);

  return (
    <ToolCard
      icon={Gauge}
      title="ADC → Voltage Converter"
      blurb="12-bit ESP32 ADC counts mapped to a real voltage at the pin."
    >
      <Field label="Raw ADC value" value={adc} onChange={setAdc} suffix="counts" min={0} max={4095} />
      <Field label="Reference voltage" value={vref} onChange={setVref} suffix="V" step="0.1" />
      <Result
        lines={[
          { label: "Voltage", value: `${volts.toFixed(4)} V` },
          { label: "Millivolts", value: `${(volts * 1000).toFixed(1)} mV` },
          { label: "Scale", value: `${((clamped / 4095) * 100).toFixed(2)} %` },
        ]}
      />
      <Formula>{`V = (ADC / 4095) x Vref
V = (${clamped} / 4095) x ${vref || 0} = ${volts.toFixed(4)} V
Resolution = ${vref ? ((vref / 4095) * 1000).toFixed(3) : "0"} mV per count`}</Formula>
    </ToolCard>
  );
}

function BatteryTool() {
  const [capacity, setCapacity] = useState(500);
  const [active, setActive] = useState(80);
  const [sleepUa, setSleepUa] = useState(15);
  const [dutySec, setDutySec] = useState(60);

  const secPerHour = Math.min(Math.max(dutySec || 0, 0), 3600);
  const activeH = secPerHour / 3600;
  const avgMa = (active || 0) * activeH + ((sleepUa || 0) / 1000) * (1 - activeH);
  const hours = avgMa > 0 ? (capacity || 0) / avgMa : 0;
  const days = hours / 24;

  return (
    <ToolCard
      icon={BatteryCharging}
      title="Battery Lifespan Estimator"
      blurb="Duty-cycled runtime for a deep-sleeping wearable or sensor node."
    >
      <Field label="Battery capacity" value={capacity} onChange={setCapacity} suffix="mAh" />
      <Field label="Active current" value={active} onChange={setActive} suffix="mA" />
      <Field label="Deep sleep current" value={sleepUa} onChange={setSleepUa} suffix="uA" />
      <Field label="Active time per hour" value={dutySec} onChange={setDutySec} suffix="s/hr" min={0} max={3600} />
      <Result
        lines={[
          { label: "Average draw", value: `${avgMa.toFixed(4)} mA` },
          { label: "Runtime", value: `${days.toFixed(1)} days` },
          { label: "Months", value: `${(days / 30.44).toFixed(2)} mo` },
        ]}
      />
      <Formula>{`duty = ${secPerHour} / 3600 = ${(activeH * 100).toFixed(3)} %
I_avg = I_active x duty + I_sleep x (1 - duty)
I_avg = ${avgMa.toFixed(4)} mA
runtime = ${capacity || 0} mAh / I_avg = ${hours.toFixed(1)} h`}</Formula>
    </ToolCard>
  );
}

function PwmTool() {
  const [duty, setDuty] = useState(50);
  const [supply, setSupply] = useState(3.3);
  const d = Math.min(Math.max(duty || 0, 0), 100) / 100;
  const rms = (supply || 0) * Math.sqrt(d);
  const avg = (supply || 0) * d;
  const dutyBits = useMemo(() => Math.round(d * 255), [d]);

  return (
    <ToolCard
      icon={Activity}
      title="PWM Duty Cycle Calculator"
      blurb="Duty percentage to RMS and average output for motor and LED drive."
    >
      <Field label="Duty cycle" value={duty} onChange={setDuty} suffix="%" min={0} max={100} />
      <Field label="Supply voltage" value={supply} onChange={setSupply} suffix="V" step="0.1" />
      <input
        type="range"
        min={0}
        max={100}
        value={Math.min(Math.max(duty || 0, 0), 100)}
        onChange={(e) => setDuty(parseFloat(e.target.value))}
        className="w-full accent-[oklch(0.62_0.13_155)]"
        aria-label="Duty cycle slider"
      />
      <Result
        lines={[
          { label: "RMS voltage", value: `${rms.toFixed(3)} V` },
          { label: "Average voltage", value: `${avg.toFixed(3)} V` },
          { label: "8-bit value", value: `${dutyBits} / 255` },
        ]}
      />
      <Formula>{`V_rms = V_supply x sqrt(D)
V_rms = ${supply || 0} x sqrt(${d.toFixed(3)}) = ${rms.toFixed(3)} V
V_avg = V_supply x D = ${avg.toFixed(3)} V`}</Formula>
    </ToolCard>
  );
}

function ToolsPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-24">
        <div className="max-w-2xl animate-fade-up">
          <p className="text-sm uppercase tracking-widest text-forest mb-4">Toolkit</p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight">
            Mechatronics calculators I actually use.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Quick math for embedded builds — ADC scaling, battery budgets, and PWM drive levels.
            Every result shows its formula.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <AdcTool />
          <BatteryTool />
          <PwmTool />
        </div>
      </section>
    </SiteLayout>
  );
}
