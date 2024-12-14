import { LoadMoreDirection } from "@/types"
import { useRef } from "react"

type GetMore = (args:{direction: LoadMoreDirection}) => void
type LoadMoreBackwards = (args:{offsetId?: string | number}) => void
const DEFAULT_LIST_SLICE = 30

const useInfiniteScroll = <ListId extends string | number>(
    loadMoreBackwards?: LoadMoreBackwards,
    listIds?: ListId[],
    isDisabled = false,
    listSlice = DEFAULT_LIST_SLICE,
  ): [ListId[]?, GetMore?, number?] => {
    const requestParamsRef = useRef<{
        direction?: LoadMoreDirection
        offsetId?: ListId
    }>
    
  }

  export default useInfiniteScroll