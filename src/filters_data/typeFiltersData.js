export const generateTypeFiltersFrom = (products) => {
  const typeFilters = Array.from(new Set(products.map((types) => types.type)));
  return typeFilters;
};
