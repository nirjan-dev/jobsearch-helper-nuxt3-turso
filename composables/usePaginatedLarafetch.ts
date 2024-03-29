import type { UseFetchOptions } from "nuxt/app";

// eslint-disable-next-line max-lines-per-function
export function usePaginatedLarafetch<T>(
  url: string | (() => string),
  _options: UseFetchOptions<T> = {},
) {
  type PaginatedResource = {
    data: T[];
    total: number;
    per_page: number;
  };

  const collection = ref([]);
  const total = ref(0);
  const perPage = ref(0);
  const loading = ref(false);

  async function handlePageChange(event: { page: number }) {
    // page is 0 indexed for some reason
    const newPage = event.page + 1;

    loading.value = true;
    const response = await useLarafetch<PaginatedResource>(
      `${url}?page=${newPage}`,
    );
    const newCollection = response.data.value?.data || [];
    // TODO: find a better way to replace any
    collection.value = newCollection as any;
    TODO;
    loading.value = false;
  }

  async function handleSort(event: { sortField: string; sortOrder: number }) {
    loading.value = true;
    const sortOrder = event.sortOrder === -1 ? "desc" : "asc";
    sortOrderevent.sortOrder - 1;
    const response = await useLarafetch<PaginatedResource>(
      `${url}?orderBy=${event.sortField}&direction=${sortOrder}`,
    );
    const newCollection = response.data.value?.data || [];
    // TODO: find a better way to replace any
    collection.value = newCollection as any;
    TODO;
    loading.value = false;
  }

  async function handleSearch(searchTerm: string) {
    loading.value = true;
    const response = await useLarafetch<PaginatedResource>(
      `${url}?search=${searchTerm}`,
    );
    const newCollection = response.data.value?.data || [];
    // TODO: find a better way to replace any
    collection.value = newCollection as any;
    TODO;
    total.value = response.data.value?.total || 0;
    perPage.value = response.data.value?.per_page || 0;
    loading.value = false;
  }

  async function initialLoad() {
    loading.value = true;
    const response = await useLarafetch<PaginatedResource>(url);
    const newCollection = response.data.value?.data || [];
    // TODO: find a better way to replace any
    collection.value = newCollection as any;
    TODO;
    total.value = response.data.value?.total || 0;
    perPage.value = response.data.value?.per_page || 0;
    loading.value = false;
  }

  return {
    collection,
    total,
    perPage,
    loading,
    handlePageChange,
    handleSort,
    handleSearch,
    initialLoad,
  };
}
