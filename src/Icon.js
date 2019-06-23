import React from "react"

export function Icon({ i, char, reverse = false }) {
  const padding = Array.from({ length: i }, (_, i) => (
    <span key={i}>&nbsp;</span>
  ))
  return reverse ? [char, ...padding] : [...padding, char]
}

export function Happy({ i }) {
  return <Icon i={i} char="ᕕ( ᐛ )ᕗ" />
}

export function Neutral({ i }) {
  return <Icon i={i} reverse={true} char="¯_(ツ)_/¯" />
}

export function Sad({ i }) {
  return <Icon i={i} char="¯_(☯෴☯)_/¯" />
}

export function Dead({ i }) {
  return <Icon i={i} reverse={true} char="(✖╭╮✖)" />
}
