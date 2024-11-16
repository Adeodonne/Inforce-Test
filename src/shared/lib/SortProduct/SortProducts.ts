import { Product } from "../../../entities/product";

const SortProducts = (products: Product[], sortOption : "alphabetical" | "numeric") => {
   return [...products].sort((a, b) => {
    if (sortOption === 'alphabetical') {
      return a.name.localeCompare(b.name) || a.count - b.count;
    }
    return a.count - b.count || a.name.localeCompare(b.name);
  });
}

export default SortProducts;