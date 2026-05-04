import { useState } from "react";
import { Shield, ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import type { AppState, Character, SpecialNPC } from "@/data/initialState";

interface CharactersProps {
  state: AppState;
  onUpdateCharacters: (chars: Character[]) => void;
  onUpdateNPCs: (npcs: SpecialNPC[]) => void;
}

function StatBox({ label, value }: { label: string; value: number }) {
  const mod = Math.floor((value - 10) / 2);
  return (
    <div className="rounded border border-border bg-secondary/30 px-2 py-1.5 text-center">
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">{label}</p>
      <p className="text-base font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{mod >= 0 ? `+${mod}` : mod}</p>
    </div>
  );
}

function SlotTracker({
  level,
  used,
  total,
  onChange,
}: {
  level: string;
  used: number;
  total: number;
  onChange: (used: number) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-muted-foreground w-6 font-mono">{level}</span>
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onChange(i < used ? i : i + 1)}
            data-testid={`slot-${level}-${i}`}
            className={`w-3.5 h-3.5 rounded-full border transition-colors ${
              i < used
                ? "bg-muted-foreground/40 border-muted-foreground/40"
                : "bg-primary/80 border-primary"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground font-mono">{total - used}/{total}</span>
    </div>
  );
}

function ResourceTracker({
  name,
  used,
  total,
  refreshOn,
  onChange,
}: {
  name: string;
  used: number;
  total: number;
  refreshOn: string;
  onChange: (used: number) => void;
}) {
  return (
    <div className="flex items-start gap-2 py-1">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium">{name}</p>
        <p className="text-xs text-muted-foreground font-mono">{refreshOn}</p>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(Math.max(0, used - 1))}
          className="w-5 h-5 rounded bg-secondary hover:bg-secondary/80 flex items-center justify-center"
          data-testid={`resource-dec-${name}`}
        >
          <Minus size={10} />
        </button>
        <span className="text-xs font-mono w-10 text-center">{total - used}/{total}</span>
        <button
          onClick={() => onChange(Math.min(total, used + 1))}
          className="w-5 h-5 rounded bg-secondary hover:bg-secondary/80 flex items-center justify-center"
          data-testid={`resource-inc-${name}`}
        >
          <Plus size={10} />
        </button>
      </div>
    </div>
  );
}

function CharacterCard({
  char,
  onUpdate,
}: {
  char: Character;
  onUpdate: (updated: Character) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [editingHP, setEditingHP] = useState(false);
  const [hpInput, setHpInput] = useState(String(char.hp));

  const updateSlot = (level: "1st" | "2nd" | "3rd", used: number) => {
    if (!char.spellSlots) return;
    onUpdate({ ...char, spellSlots: { ...char.spellSlots, [level]: { ...char.spellSlots[level], used } } });
  };

  const updateResource = (idx: number, used: number) => {
    const resources = char.resources.map((r, i) => (i === idx ? { ...r, used } : r));
    onUpdate({ ...char, resources });
  };

  const pct = Math.round((char.hp / char.maxHp) * 100);
  const barColor = pct > 50 ? "bg-emerald-500" : pct > 25 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="rounded border border-border bg-card" data-testid={`character-card-${char.id}`}>
      {/* Header */}
      <button
        className="w-full px-4 py-3 flex items-center justify-between"
        onClick={() => setExpanded(!expanded)}
        data-testid={`button-expand-${char.id}`}
      >
        <div className="flex items-start gap-3 text-left min-w-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm">{char.name}</span>
              <span className="text-xs text-muted-foreground">{char.player}</span>
              <span className="text-xs font-mono text-primary">{char.race} {char.class} {char.level}</span>
            </div>
            <p className="text-xs text-muted-foreground">{char.subclass} · {char.alignment}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* HP bar */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-24 h-1.5 rounded-full bg-secondary overflow-hidden">
              <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs font-mono">{char.hp}/{char.maxHp}</span>
          </div>
          {expanded ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-border">
          {/* HP editor */}
          <div className="pt-3 flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">HP</span>
              {editingHP ? (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    className="w-16 text-xs bg-secondary border border-border rounded px-2 py-0.5 text-foreground"
                    value={hpInput}
                    onChange={(e) => setHpInput(e.target.value)}
                    data-testid={`input-hp-${char.id}`}
                  />
                  <span className="text-xs text-muted-foreground">/ {char.maxHp}</span>
                  <button
                    className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded"
                    onClick={() => {
                      const v = Math.max(0, Math.min(char.maxHp, Number(hpInput)));
                      onUpdate({ ...char, hp: isNaN(v) ? char.hp : v });
                      setEditingHP(false);
                    }}
                    data-testid={`button-save-hp-${char.id}`}
                  >
                    save
                  </button>
                  <button className="text-xs text-muted-foreground" onClick={() => setEditingHP(false)}>cancel</button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-bold">{char.hp}/{char.maxHp}</span>
                  <button
                    className="text-xs text-muted-foreground hover:text-foreground underline"
                    onClick={() => { setEditingHP(true); setHpInput(String(char.hp)); }}
                    data-testid={`button-edit-hp-${char.id}`}
                  >
                    edit
                  </button>
                  <button className="text-xs text-muted-foreground hover:text-foreground" onClick={() => onUpdate({ ...char, hp: char.maxHp })} data-testid={`button-fullheal-${char.id}`}>full heal</button>
                </div>
              )}
            </div>
            <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden min-w-24">
              <div className={`h-full rounded-full ${barColor} transition-all`} style={{ width: `${pct}%` }} />
            </div>
          </div>

          {/* Ability scores */}
          <div className="grid grid-cols-6 gap-1.5">
            {(["str", "dex", "con", "int", "wis", "cha"] as const).map((stat) => (
              <StatBox key={stat} label={stat} value={char[stat]} />
            ))}
          </div>

          {/* Key stats row */}
          <div className="flex flex-wrap gap-3 text-xs">
            <span className="text-muted-foreground">AC <span className="text-foreground font-mono font-bold">{char.ac}</span></span>
            <span className="text-muted-foreground">Init <span className="text-foreground font-mono font-bold">{char.initiative >= 0 ? `+${char.initiative}` : char.initiative}</span></span>
            <span className="text-muted-foreground">Speed <span className="text-foreground font-mono font-bold">{char.speed}ft</span></span>
            <span className="text-muted-foreground">Prof <span className="text-foreground font-mono font-bold">+{char.profBonus}</span></span>
            <span className="text-muted-foreground">Passive Perc <span className="text-foreground font-mono font-bold">{char.passivePerception}</span></span>
          </div>

          {/* Saves + Skills */}
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Saving Throws</p>
              <div className="flex flex-wrap gap-1.5">
                {char.savingThrows.map((s) => (
                  <span key={s} className="text-xs font-mono bg-secondary px-1.5 py-0.5 rounded">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {char.skills.map((s) => (
                  <span key={s} className="text-xs font-mono bg-secondary/50 px-1.5 py-0.5 rounded text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Attacks */}
          <div>
            <p className="text-xs text-muted-foreground mb-1.5">Attacks</p>
            <div className="space-y-1">
              {char.attacks.map((atk, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <span className="font-medium w-36 flex-shrink-0">{atk.name}</span>
                  <span className="text-primary font-mono">{atk.bonus}</span>
                  <span className="text-muted-foreground">{atk.damage}</span>
                  {atk.notes && <span className="text-muted-foreground/70 italic">{atk.notes}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Cantrips */}
          {char.cantrips.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Cantrips</p>
              <div className="flex flex-wrap gap-1">
                {char.cantrips.map((c) => (
                  <span key={c} className="text-xs bg-secondary/50 px-1.5 py-0.5 rounded text-muted-foreground">{c}</span>
                ))}
              </div>
            </div>
          )}

          {/* Spell slots */}
          {char.spellSlots && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-xs text-muted-foreground">Spell Slots</p>
                {char.spellcastingAbility && (
                  <span className="text-xs font-mono text-muted-foreground">
                    DC {char.spellDC} · {char.spellAttack} · {char.spellcastingAbility}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                {(["1st", "2nd", "3rd"] as const).map((level) => (
                  <SlotTracker
                    key={level}
                    level={level}
                    used={char.spellSlots![level].used}
                    total={char.spellSlots![level].total}
                    onChange={(used) => updateSlot(level, used)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Portent dice for Alphie */}
          {char.portentDice !== undefined && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Portent Dice (roll 2d20 after long rest)</p>
              <div className="flex gap-2">
                {([0, 1] as const).map((i) => (
                  <input
                    key={i}
                    type="number"
                    min={1}
                    max={20}
                    placeholder="d20"
                    className="w-16 text-xs bg-secondary border border-border rounded px-2 py-1 text-foreground font-mono text-center"
                    value={char.portentDice![i] ?? ""}
                    onChange={(e) => {
                      const v = e.target.value === "" ? null : Math.max(1, Math.min(20, Number(e.target.value)));
                      const dice: [number | null, number | null] = [...char.portentDice!] as [number | null, number | null];
                      dice[i] = v;
                      onUpdate({ ...char, portentDice: dice });
                    }}
                    data-testid={`portent-die-${i}`}
                  />
                ))}
                <button
                  className="text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => onUpdate({ ...char, portentDice: [null, null] })}
                  data-testid="button-clear-portent"
                >
                  clear (long rest)
                </button>
              </div>
            </div>
          )}

          {/* Spells list */}
          {char.spells && char.spells.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">Spells</p>
              <div className="space-y-1.5">
                {char.spells.map((s) => (
                  <div key={s.level} className="text-xs">
                    <span className="text-muted-foreground font-mono mr-2">{s.level}:</span>
                    <span className="text-foreground/80">{s.spells}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {char.resources.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Resources</p>
              <div className="divide-y divide-border">
                {char.resources.map((res, i) => (
                  <ResourceTracker
                    key={i}
                    name={res.name}
                    used={res.used}
                    total={res.total}
                    refreshOn={res.refreshOn}
                    onChange={(used) => updateResource(i, used)}
                  />
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <button
                  className="text-xs text-muted-foreground hover:text-foreground underline"
                  onClick={() => {
                    const resources = char.resources.map((r) => ({ ...r, used: 0 }));
                    const spellSlots = char.spellSlots
                      ? {
                          "1st": { ...char.spellSlots["1st"], used: 0 },
                          "2nd": { ...char.spellSlots["2nd"], used: 0 },
                          "3rd": { ...char.spellSlots["3rd"], used: 0 },
                        }
                      : char.spellSlots;
                    onUpdate({ ...char, resources, spellSlots, hp: char.maxHp, arcaneRecoveryUsed: false, portentDice: char.portentDice ? [null, null] : undefined });
                  }}
                  data-testid={`button-long-rest-${char.id}`}
                >
                  Long rest (restore all)
                </button>
                <button
                  className="text-xs text-muted-foreground hover:text-foreground underline"
                  onClick={() => {
                    const resources = char.resources.map((r) =>
                      r.refreshOn.toLowerCase().includes("short") ? { ...r, used: 0 } : r
                    );
                    onUpdate({ ...char, resources });
                  }}
                  data-testid={`button-short-rest-${char.id}`}
                >
                  Short rest
                </button>
              </div>
            </div>
          )}

          {/* Features */}
          <div>
            <p className="text-xs text-muted-foreground mb-1.5">Features</p>
            <div className="space-y-2">
              {char.features.map((f, i) => (
                <div key={i} className="text-xs">
                  <span className="font-medium text-foreground">{f.name}: </span>
                  <span className="text-muted-foreground">{f.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">Equipment</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{char.equipment}</p>
          </div>

          {/* Roleplay notes */}
          <div className="rounded border border-border bg-secondary/20 p-3">
            <p className="text-xs text-muted-foreground mb-1">Roleplay Notes</p>
            <p className="text-xs leading-relaxed text-foreground/80">{char.roleplayNotes}</p>
          </div>

          {/* Character notes */}
          {char.notes && (
            <div className="rounded border border-yellow-500/20 bg-yellow-500/5 p-3">
              <p className="text-xs text-yellow-400 mb-1">Notes / Unresolved</p>
              <p className="text-xs leading-relaxed text-foreground/80">{char.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function NPCCard({ npc, onUpdate }: { npc: SpecialNPC; onUpdate: (n: SpecialNPC) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [editingHP, setEditingHP] = useState(false);
  const [hpInput, setHpInput] = useState(String(npc.hp));
  const pct = Math.round((npc.hp / npc.maxHp) * 100);
  const barColor = pct > 50 ? "bg-emerald-500" : pct > 25 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="rounded border border-border bg-card/70" data-testid={`npc-sheet-${npc.id}`}>
      <button
        className="w-full px-4 py-3 flex items-center justify-between"
        onClick={() => setExpanded(!expanded)}
        data-testid={`button-expand-npc-${npc.id}`}
      >
        <div className="text-left">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm">{npc.name}</span>
            <span className="text-xs text-muted-foreground">{npc.controlledBy} → {npc.pairedWith}</span>
          </div>
          <p className="text-xs text-muted-foreground">{npc.type}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs font-mono text-muted-foreground hidden md:block">{npc.hp}/{npc.maxHp} HP</span>
          {expanded ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-border space-y-3">
          {/* HP */}
          <div className="pt-3 flex items-center gap-3 flex-wrap">
            <span className="text-xs text-muted-foreground">HP</span>
            {editingHP ? (
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  className="w-16 text-xs bg-secondary border border-border rounded px-2 py-0.5 text-foreground"
                  value={hpInput}
                  onChange={(e) => setHpInput(e.target.value)}
                  data-testid={`input-npc-hp-${npc.id}`}
                />
                <span className="text-xs text-muted-foreground">/ {npc.maxHp}</span>
                <button
                  className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded"
                  onClick={() => { const v = Math.max(0, Math.min(npc.maxHp, Number(hpInput))); onUpdate({ ...npc, hp: v }); setEditingHP(false); }}
                  data-testid={`button-save-npc-hp-${npc.id}`}
                >save</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-bold">{npc.hp}/{npc.maxHp}</span>
                <button className="text-xs text-muted-foreground hover:text-foreground underline" onClick={() => { setEditingHP(true); setHpInput(String(npc.hp)); }} data-testid={`button-edit-npc-hp-${npc.id}`}>edit</button>
              </div>
            )}
            <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden min-w-16">
              <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
            </div>
          </div>

          <p className="text-xs text-muted-foreground">{npc.keyStats}</p>
          <p className="text-xs text-muted-foreground">Speed: {npc.speed}ft | AC: {npc.ac}</p>

          <div>
            <p className="text-xs text-muted-foreground mb-1">Attacks</p>
            {npc.attacks.map((atk, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <span className="font-medium w-36 flex-shrink-0">{atk.name}</span>
                <span className="text-primary font-mono">{atk.bonus}</span>
                <span className="text-muted-foreground">{atk.damage}</span>
                {atk.notes && <span className="text-muted-foreground/70 italic">{atk.notes}</span>}
              </div>
            ))}
          </div>

          {npc.features.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Features</p>
              <ul className="space-y-0.5">
                {npc.features.map((f, i) => (
                  <li key={i} className="text-xs text-muted-foreground">• {f}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded border border-border bg-secondary/20 p-2.5">
            <p className="text-xs font-medium mb-0.5">Roleplay</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{npc.roleplay}</p>
          </div>

          {npc.notes && (
            <div className="rounded border border-yellow-500/20 bg-yellow-500/5 p-2.5">
              <p className="text-xs text-muted-foreground leading-relaxed">{npc.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function Characters({ state, onUpdateCharacters, onUpdateNPCs }: CharactersProps) {
  const [tab, setTab] = useState<"pcs" | "npcs">("pcs");

  const updateChar = (updated: Character) => {
    onUpdateCharacters(state.characters.map((c) => (c.id === updated.id ? updated : c)));
  };

  const updateNPC = (updated: SpecialNPC) => {
    onUpdateNPCs(state.specialNPCs.map((n) => (n.id === updated.id ? updated : n)));
  };

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Shield size={18} className="text-primary" />
        <div>
          <h1 className="text-xl font-semibold">Character Sheets</h1>
          <p className="text-xs text-muted-foreground">L3 · Storm King's Thunder — Level 5 · 2014 D&D 5e RAW</p>
        </div>
      </div>

      <div className="flex gap-1 border-b border-border">
        {([["pcs", "Player Characters (4)"], ["npcs", "Special NPCs (4)"]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            data-testid={`tab-${key}`}
            className={`px-3 py-1.5 text-xs font-medium border-b-2 transition-colors ${
              tab === key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "pcs" && (
        <div className="space-y-3">
          {state.characters.map((char) => (
            <CharacterCard key={char.id} char={char} onUpdate={updateChar} />
          ))}
        </div>
      )}

      {tab === "npcs" && (
        <div className="space-y-3">
          <div className="rounded border border-border bg-secondary/20 p-3">
            <p className="text-xs text-muted-foreground">
              Special NPCs act on their player's initiative, immediately after that player's PC. Each player controls their NPC during the giant attack. Keep them alive for quest rewards.
            </p>
          </div>
          {state.specialNPCs.map((npc) => (
            <NPCCard key={npc.id} npc={npc} onUpdate={updateNPC} />
          ))}
        </div>
      )}
    </div>
  );
}
