import { create } from 'zustand';
import { query } from '@/modules/query';
type Store = {
  list: any[];
  setList: (list: any[]) => void;
  data: any;
  setData: (data: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  formData: any;
  setFormData: (data: any) => void;
  getList: () => Promise<any>;
  init: () => Promise<void>;
  getData: (id: number) => Promise<any>;
  updateData: (data: any, opts?: { refresh?: boolean }) => Promise<any>;
  deleteData: (id: number, opts?: { refresh?: boolean }) => Promise<any>;
};
export const useStore = create<Store>((set, get) => ({
  list: [],
  setList: (list) => set({ list }),
  data: null,
  setData: (data) => set({ data }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  formData: null,
  setFormData: (formData) => set({ formData }),
  getList: async () => {
    set({ loading: true });
    const res = await query.post({ path: 'posts', key: 'list' });
    set({ loading: false });
    if (res.code === 200) {
      set({ list: res.data });
    }
    return res;
  },
  init: async () => {
    await get().getList();
  },
  getData: async (id) => {
    set({ loading: true });
    const res = await query.post({
      path: 'posts',
      key: 'get',
      id,
    });
    set({ loading: false });
    if (res.code === 200) {
      const data = res.data;
      set({ data });
    }
    return res;
  },
  updateData: async (data, opts = { refresh: true }) => {
    set({ loading: true });
    const res = await query.post({
      path: 'posts',
      key: 'update',
      data,
    });
    set({ loading: false });
    if (res.code === 200) {
      set({ data: res.data });
    }
    if (opts.refresh) {
      await get().getList();
    }
    return res;
  },
  deleteData: async (id, opts = { refresh: true }) => {
    set({ loading: true });
    const res = await query.post({
      path: 'posts',
      key: 'delete',
      id,
    });
    set({ loading: false });
    if (res.code === 200) {
      set({ data: null });
    }
    if (opts.refresh) {
      await get().getList();
    }
    return res;
  },
}));
