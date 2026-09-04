'use client'

import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const TITLE = 'Большинство бизнесов управляет процессами, которых не существует'
const WORDS = TITLE.split(' ')
const H1_CLASS =
  'mt-7 font-display text-[40px] font-semibold leading-[1.06] tracking-tight text-ink sm:text-5xl xl:text-[62px]'

export default function HeroHeading() {
  const reduce = useReducedMotion()

  if (reduce) {
    return <h1 className={H1_CLASS}>{TITLE}</h1>
  }

  return (
    <h1 className={H1_CLASS}>
      {WORDS.map((word, index) => (
        <Fragment key={index}>
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
          >
            {word}
          </motion.span>
          {index < WORDS.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </h1>
  )
}
