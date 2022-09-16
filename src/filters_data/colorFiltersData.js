export const generateColorFiltersFrom = (products) => {
  const colorFilters = Array.from(
    new Set(
      products.map((product, index) => {
        return product.color;
      })
    )
  );
  return colorFilters;
};
