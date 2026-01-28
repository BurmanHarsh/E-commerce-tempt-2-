import { useQuery } from "@tanstack/react-query";
import {
  storefrontApiRequest,
  PRODUCTS_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
} from "@/lib/shopify";

export function useProducts(first = 20, query) {
  return useQuery({
    queryKey: ["products", first, query],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCTS_QUERY, {
        first,
        query,
      });
      return data?.data?.products?.edges || [];
    },
  });
}

export function useProductByHandle(handle) {
  return useQuery({
    queryKey: ["product", handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, {
        handle,
      });
      if (!data?.data?.productByHandle) return null;
      return { node: data.data.productByHandle };
    },
    enabled: !!handle,
  });
}
