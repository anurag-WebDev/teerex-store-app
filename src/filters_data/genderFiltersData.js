export const generateGenderFiltersFrom = (products) => {
  const genderFilters = Array.from(
    new Set(products.map((genders) => genders.gender))
  );
  return genderFilters;
};
