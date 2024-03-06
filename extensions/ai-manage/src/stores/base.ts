import { useUrl } from '@ks-console/shared';
import { useStore, mutate } from '@kubed/stook';

export interface BaseStore {
  pageHeaderHeight: number;
  globalNavOpen: boolean;
}

const initialBseStore: BaseStore = {
  pageHeaderHeight: 0,
  globalNavOpen: false,
};

export const useBaseStore = () => {
  const [baseStore, setBaseStore] = useStore<BaseStore>('BaseStore', initialBseStore);

  const setPageHeaderHeight = (height: number) =>
    mutate('BaseStore', (state: BaseStore) => {
      state.pageHeaderHeight = height;
    });

  return {
    baseStore,
    setBaseStore,
    setPageHeaderHeight
  }

}

export const defaultUrl = "kapis/resources.kubesphere.io/v1alpha3";

export const getResourceUrl = () => {

}