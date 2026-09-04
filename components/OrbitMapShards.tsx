'use client'

import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/components/usePrefersReducedMotion'

// Each fragment is a broken piece of a system tile: labelled shard,
// no links between fragments — this is the "before" state.
type ShardSpec = {
  id: string
  label: string
  x: number
  y: number
  rotate: number
  scale: number
  points: string
  crack: string[]
}

const SHARDS: ShardSpec[] = [
  {
    id: '1c',
    label: '1С',
    x: 168,
    y: 102,
    rotate: -9,
    scale: 1,
    points: '-66,-28 -6,-30 58,-24 66,-4 58,26 -20,28 -64,16',
    crack: ['-60,-12 10,-16 40,-4', '12,20 -40,12'],
  },
  {
    id: 'crm',
    label: 'CRM',
    x: 646,
    y: 84,
    rotate: 7,
    scale: 0.96,
    points: '-60,-32 46,-30 60,-14 56,28 -28,32 -60,10',
    crack: ['-52,-14 8,-18 34,-8', '4,22 -36,16'],
  },
  {
    id: 'tg',
    label: 'Telegram',
    x: 718,
    y: 268,
    rotate: -6,
    scale: 1.04,
    points: '-75,-29 -28,-26 66,-24 75,-6 68,26 -42,28 -75,10',
    crack: ['-66,-14 -10,-18 40,-6', '6,18 -44,12'],
  },
  {
    id: 'xl',
    label: 'Excel',
    x: 592,
    y: 402,
    rotate: 5,
    scale: 0.98,
    points: '-66,-31 36,-28 66,-10 60,26 -38,30 -66,12',
    crack: ['-58,-16 4,-18 30,-6', '8,20 -40,14'],
  },
  {
    id: 'hand',
    label: 'Ручной ввод',
    x: 196,
    y: 392,
    rotate: -7,
    scale: 1,
    points: '-90,-28 -4,-26 86,-24 90,-8 84,24 -32,28 -90,12',
    crack: ['-80,-14 -6,-18 56,-6', '10,18 -52,12'],
  },
]

// Inert micro-debris: atmosphere only, no lines between fragments
const DEBRIS: Array<{ x: number; y: number; r: number; opacity: number; accent: boolean }> = [
  { x: 330, y: 148, r: 1.4, opacity: 0.35, accent: false },
  { x: 452, y: 112, r: 1.1, opacity: 0.25, accent: false },
  { x: 508, y: 190, r: 1.6, opacity: 0.4, accent: true },
  { x: 368, y: 236, r: 1.2, opacity: 0.3, accent: false },
  { x: 512, y: 312, r: 1.3, opacity: 0.3, accent: false },
  { x: 300, y: 330, r: 1.1, opacity: 0.25, accent: false },
  { x: 436, y: 388, r: 1.5, opacity: 0.35, accent: true },
  { x: 286, y: 226, r: 1.2, opacity: 0.22, accent: false },
  { x: 612, y: 160, r: 1.2, opacity: 0.3, accent: false },
  { x: 250, y: 60, r: 1.1, opacity: 0.2, accent: false },
]

const CRASH_X = 400
const CRASH_Y = 235

function ShardShape({ shard }: { shard: ShardSpec }) {
  return (
    <>
      <polygon
        points={shard.points}
        fill="rgba(139,152,169,0.045)"
        stroke="rgba(139,152,169,0.5)"
        strokeWidth={1}
      />
      {shard.crack.map((points, index) => (
        <polyline
          key={index}
          points={points}
          fill="none"
          stroke="rgba(230,237,243,0.09)"
          strokeWidth={1}
        />
      ))}
      <text
        x={0}
        y={4}
        textAnchor="middle"
        className="font-mono"
        fontSize={13}
        fill="#AAB4C2"
      >
        {shard.label}
      </text>
    </>
  )
}

export default function OrbitMapShards() {
  const reduce = usePrefersReducedMotion()

  return (
    <svg
      viewBox="0 0 800 470"
      className="h-full w-full"
      role="img"
      aria-label="Состояние до: обломки систем 1С, CRM, Telegram, Excel и ручного ввода разорваны, связей между ними нет"
    >
      {reduce
        ? SHARDS.map((shard) => (
            <g
              key={shard.id}
              transform={`translate(${shard.x} ${shard.y}) rotate(${shard.rotate}) scale(${shard.scale})`}
            >
              <ShardShape shard={shard} />
            </g>
          ))
        : SHARDS.map((shard, index) => (
            <g key={shard.id} transform={`translate(${shard.x} ${shard.y})`}>
              <motion.g
                initial={{
                  x: CRASH_X - shard.x,
                  y: CRASH_Y - shard.y,
                  scale: 0.45,
                  rotate: 0,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  y: 0,
                  scale: shard.scale,
                  rotate: shard.rotate,
                  opacity: 1,
                }}
                transition={{ type: 'spring', stiffness: 55, damping: 13, delay: index * 0.07 }}
              >
                <ShardShape shard={shard} />
              </motion.g>
            </g>
          ))}

      <g fill="#8B98A9">
        {DEBRIS.map((d, index) => (
          <circle
            key={index}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fillOpacity={d.opacity}
            fill={d.accent ? '#00D4FF' : '#8B98A9'}
          />
        ))}
      </g>
    </svg>
  )
}
