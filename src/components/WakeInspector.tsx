import { useState } from "react";
import { Cpu, Clock, MonitorSmartphone, Zap } from "lucide-react";

type Node = {
  id: string;
  name: string;
  part: string;
  icon: typeof Cpu;
  bus: "i2c" | "power" | "irq";
  specs: string[];
};

const NODES: Node[] = [
  {
    id: "mcu",
    name: "Seeed XIAO ESP32-C3",
    part: "Host MCU",
    icon: Cpu,
    bus: "i2c",
    specs: [
      "GPIO8 = SDA · GPIO9 = SCL",
      "I2C master @ 400 kHz",
      "Deep sleep wake on RTC interrupt",
      "~15 uA sleep / ~80 mA radio active",
    ],
  },
  {
    id: "rtc",
    name: "DS3231 RTC Module",
    part: "0x68",
    icon: Clock,
    bus: "irq",
    specs: [
      "I2C address 0x68",
      "SQW pin configured as 1 Hz interrupt",
      "±2 ppm temperature-compensated crystal",
      "Coin-cell backed timekeeping",
    ],
  },
  {
    id: "oled",
    name: '0.96" OLED Display',
    part: "0x3C",
    icon: MonitorSmartphone,
    bus: "i2c",
    specs: [
      "I2C address 0x3C",
      "SSD1306, 128x64 monochrome",
      "Shares SDA/SCL with RTC and haptic driver",
      "Powered down between UI wakes",
    ],
  },
  {
    id: "haptic",
    name: "DRV2605L Haptic Driver",
    part: "0x5A",
    icon: Zap,
    bus: "power",
    specs: [
      "I2C address 0x5A",
      "Dual ERM motor outputs (OUT+ / OUT-)",
      "Built-in effect library for pulse patterns",
      "Drives 2x 12 mm coin ERM actuators",
    ],
  },
];

const BUS_LABEL: Record<Node["bus"], string> = {
  i2c: "I2C DATA BUS",
  irq: "I2C + SQW INTERRUPT",
  power: "I2C + MOTOR DRIVE",
};

export function WakeInspector() {
  const [active, setActive] = useState<string>("mcu");
  const current = NODES.find((n) => n.id === active) ?? NODES[0];

  return (
    <div
      className="relative mt-6 overflow-hidden rounded-xl border border-forest/30 bg-[#0a1410] p-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(34,197,120,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,120,0.08) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-forest animate-pulse" />
          <p className="text-[10px] uppercase tracking-[0.2em] text-forest">
            Hardware Inspector · Pinout Map
          </p>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-forest/60 font-mono">
          {BUS_LABEL[current.bus]}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-[1.1fr_1fr]">
        <div className="space-y-3">
          {NODES.map((n) => {
            const isActive = n.id === current.id;
            const Icon = n.icon;
            return (
              <button
                key={n.id}
                type="button"
                onMouseEnter={() => setActive(n.id)}
                onFocus={() => setActive(n.id)}
                onClick={() => setActive(n.id)}
                aria-pressed={isActive}
                className={`w-full flex items-center gap-3 rounded-md border p-3 text-left transition ${
                  isActive
                    ? "border-forest bg-forest/10 shadow-lg shadow-forest/10"
                    : "border-forest/25 bg-black/30 hover:border-forest/60"
                }`}
              >
                <div
                  className={`rounded border p-2 transition ${
                    isActive ? "border-forest bg-forest/20" : "border-forest/40 bg-forest/5"
                  }`}
                >
                  <Icon className="h-4 w-4 text-forest" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-sm truncate">{n.name}</div>
                  <div className="text-[10px] uppercase tracking-widest text-forest/70 font-mono">
                    {n.part}
                  </div>
                </div>
                <span
                  className={`h-8 w-1 rounded-full transition-all ${
                    isActive ? "bg-forest" : "bg-forest/20"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="rounded-md border border-forest/40 bg-black/40 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-forest/70 font-mono">
            Connection detail
          </p>
          <h4 className="mt-2 font-display text-lg font-semibold">{current.name}</h4>
          <ul className="mt-4 space-y-2">
            {current.specs.map((s) => (
              <li key={s} className="flex gap-2 font-mono text-xs text-foreground/85">
                <span className="text-forest">▸</span>
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-forest/70">
            <span className="h-px flex-1 bg-forest/30" />
            bus highlighted
            <span className="h-px flex-1 bg-forest/30" />
          </div>
        </div>
      </div>

      <p className="mt-4 text-[10px] text-muted-foreground font-mono">
        Hover or tap a component to trace its bus.
      </p>
    </div>
  );
}
