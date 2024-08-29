import React from 'react'

function loading() {
  return (
    <div>
      <div
  class="flex flex-col bg-neutral-300 w-56 h-64 animate-pulse rounded-xl p-4 gap-4"
>
  <div class="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
  <div class="flex flex-col gap-2">
    <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
    <div class="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
    <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
    <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
  </div>
</div>

    </div>
  )
}

export default loading
