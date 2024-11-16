import { Product } from "../../../entities/product";

const SortProducts = (products: Product[], sortOption : "alphabetical" | "numeric") => {
   return [...products].sort((a, b) => {
    if (sortOption === 'alphabetical') {
      return a.name.localeCompare(b.name) || b.count - a.count;
    }
    return  b.count - a.count || a.name.localeCompare(b.name);
  });
}

export default SortProducts;
