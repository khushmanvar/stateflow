import { types } from '@babel/core'

export interface PluginOptions {
  customAtomNames?: string[]
}

export function isAtom(
  t: typeof types,
  callee: babel.types.Expression | babel.types.V8IntrinsicIdentifier,
  customAtomNames: PluginOptions['customAtomNames'] = [],
) {
  const atomNames = [...atomFunctionNames, ...customAtomNames]
  if (t.isIdentifier(callee) && atomNames.includes(callee.name)) {
    return true
  }

  if (t.isMemberExpression(callee)) {
    const { property } = callee
    if (t.isIdentifier(property) && atomNames.includes(property.name)) {
      return true
    }
  }
  return false
}

const atomFunctionNames = [
  // Core
  'atom',
  'atomFamily',
  'atomWithDefault',
  'atomWithObservable',
  'atomWithReducer',
  'atomWithReset',
  'atomWithStorage',
  'freezeAtom',
  'loadable',
  'selectAtom',
  'splitAtom',
  'unwrap',
  // stateflow-xstate
  'atomWithMachine',
  // stateflow-immer
  'atomWithImmer',
  // stateflow-valtio
  'atomWithProxy',
  // stateflow-trpc + stateflow-relay
  'atomWithQuery',
  'atomWithMutation',
  'atomWithSubscription',
  // stateflow-redux + stateflow-zustand
  'atomWithStore',
  // stateflow-location
  'atomWithHash',
  'atomWithLocation',
  // stateflow-optics
  'focusAtom',
  // stateflow-form
  'atomWithValidate',
  'validateAtoms',
  // stateflow-cache
  'atomWithCache',
  // stateflow-recoil
  'atomWithRecoilValue',
]
