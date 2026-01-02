export const setFilters = filters => ({
  type: 'FILTER_SET',
  payload: filters
})

export const resetFilters = () => ({
  type: 'FILTER_RESET'
})