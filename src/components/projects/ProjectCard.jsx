import { useId, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, MapPin, Route, Ruler, Building2, CheckCircle2, Loader } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { CATEGORIES } from '@/data/projects';

/**
 * Project card — deliberately image-free.
 *
 * The official titles run to several hundred characters, so the card leads
 * with a short scannable name and keeps the full title behind a disclosure
 * toggle rather than truncating it away.
 */
export default function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const panelId = useId();

  const category = CATEGORIES.find((c) => c.id === project.category);
  const isCompleted = project.status === 'completed';
  const StatusIcon = isCompleted ? CheckCircle2 : Loader;

  const meta = [
    project.highways.length > 0 && {
      icon: Route,
      label: 'Corridor',
      value: project.highways.join(' · '),
    },
    project.lengthKm != null && {
      icon: Ruler,
      label: 'Length',
      value: `${project.lengthKm.toLocaleString('en-IN')} km`,
    },
    project.states.length > 0 && {
      icon: MapPin,
      label: 'State',
      value: project.states.join(' · '),
    },
    project.lanes && { icon: Route, label: 'Configuration', value: project.lanes },
    project.client && { icon: Building2, label: 'Client', value: project.client },
  ].filter(Boolean);

  return (
    <Card
      as="article"
      interactive
      accentLine
      className="group h-full p-6 lg:p-7"
      // Clicking anywhere on the card reveals the full title. Clicks that
      // originate on the button (or any link) are left alone, otherwise the
      // two handlers would toggle twice and cancel out.
      onClick={(event) => {
        if (event.target.closest('button, a')) return;
        setOpen((v) => !v);
      }}
    >
      {/* Top row: reference + status */}
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted">
          {project.ref}
        </span>

        <span
          className={[
            'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1',
            'font-mono text-eyebrow uppercase tracking-eyebrow',
            isCompleted
              ? 'border-verified/25 bg-verified-soft text-verified-ink'
              : 'border-accent/25 bg-accent-soft text-accent-ink',
          ].join(' ')}
        >
          <StatusIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {isCompleted ? 'Completed' : 'Ongoing'}
        </span>
      </div>

      {/* Short name */}
      <h3 className="mt-5 text-h3 text-ink">{project.name}</h3>

      {/* Category + mode + programme chips */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {category && <Badge variant="category">{category.short}</Badge>}
        {project.mode && <Badge variant="accent">{project.mode}</Badge>}
        {project.programme && <Badge>{project.programme}</Badge>}
      </div>

      {/* Meta grid. A few source records state no corridor, length or state —
          say so explicitly rather than leaving a gap that reads as a fault. */}
      {meta.length === 0 && (
        <p className="mt-6 border-t border-hairline pt-5 text-small italic text-muted">
          Corridor and length not recorded in the source register.
        </p>
      )}

      {meta.length > 0 && (
        <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-hairline pt-5">
          {meta.map((m) => (
            <div key={m.label} className="min-w-0">
              <dt className="flex items-center gap-1.5 font-mono text-eyebrow uppercase tracking-eyebrow text-muted">
                <m.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {m.label}
              </dt>
              <dd className="mt-1.5 break-words text-small font-medium text-ink">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {/* Full official title, disclosed on demand */}
      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded text-small font-medium text-ink
                     transition-colors duration-200 hover:text-accent-ink
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {open ? 'Hide full title' : 'Full project title'}
          <ChevronDown
            className={[
              'h-4 w-4 transition-transform duration-300 ease-out',
              open ? 'rotate-180' : '',
            ].join(' ')}
            aria-hidden="true"
          />
          <span className="sr-only"> for {project.name}</span>
        </button>

        <motion.div
          id={panelId}
          initial={false}
          animate={
            prefersReducedMotion
              ? undefined
              : { height: open ? 'auto' : 0, opacity: open ? 1 : 0 }
          }
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
          hidden={prefersReducedMotion ? !open : undefined}
        >
          <p className="mt-4 border-l-2 border-hairline pl-4 text-small leading-relaxed text-body">
            {project.title}
          </p>
        </motion.div>
      </div>
    </Card>
  );
}
