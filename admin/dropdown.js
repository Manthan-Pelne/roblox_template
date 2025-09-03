import Category from '../models/Category.js'; // adjust your path

export const getdropDownCategoryOptions = async () => {
  const categories = await Category.find({}, 'title');

  const availableValues = categories.map(cat => ({
    value: cat.title,
    label: cat.title,
  }));

  return availableValues;
};