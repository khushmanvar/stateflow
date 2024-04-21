import { useMemo } from 'react'
import { useAtom } from 'stateflow'
import type { PrimitiveAtom } from 'stateflow'
import { splitAtom } from 'stateflow/utils'

const useAtomSlice = <Item>(arrAtom: PrimitiveAtom<Item[]>) => {
  const [atoms, remove] = useAtom(useMemo(() => splitAtom(arrAtom), [arrAtom]))
  return useMemo(
    () => atoms.map((itemAtom) => [itemAtom, () => remove(itemAtom)] as const),
    [atoms, remove],
  )
}

export default useAtomSlice
