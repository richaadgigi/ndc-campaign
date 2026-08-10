import api from './api';

export interface Post {
  unique_id: string;
  candidate_unique_id: string;
  category_unique_id: string | null;
  title: string;
  stripped: string;
  alt_text: string | null;
  description: string | null;
  tags: string[] | null;
  minutes_read: number;
  views: number;
  image: string | null;
  image_public_id: string | null;
  image_base64: string | null;
  created_by: string;
  approved_by: string | null;
  status: number;
  createdAt: string;
  updatedAt: string;
  Candidate?: { unique_id: string; name: string; stripped: string; image?: string | null };
  Category?: { unique_id: string; name: string; stripped: string } | null;
  Creator?: { unique_id: string; firstname: string; lastname: string; Role?: { name: string } };
  Approver?: { unique_id: string; firstname: string; lastname: string } | null;
}

export interface PostsResponse {
  success: boolean;
  message: string;
  data: { count: number; rows: Post[]; pages: number } | Post[] | null;
}

export interface PostResponse {
  success: boolean;
  message: string;
  data: Post | null;
}

interface PaginationParams { page?: number; size?: number; orderBy?: string; sortBy?: 'ASC' | 'DESC'; module_unique_id: string; sub_module_unique_id?: string; tags?: string; }
interface SearchParams extends PaginationParams { search: string; }
interface FilterParams extends PaginationParams { start_date: string; end_date: string; }

const buildQueryParams = (params: Record<string, any>): string => {
  const qp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== null && v !== '') qp.append(k, String(v)); });
  return qp.toString();
};

const postsService = {
  getAll: async (params: PaginationParams): Promise<PostsResponse> => {
    const response = await api.get(`/portal/posts?${buildQueryParams(params)}`);
    return response.data;
  },

  getOne: async (unique_id: string, params: Omit<PaginationParams, 'page' | 'size'>): Promise<PostResponse> => {
    const response = await api.get(`/portal/post?${buildQueryParams({ unique_id, ...params })}`);
    return response.data;
  },

  search: async (params: SearchParams): Promise<PostsResponse> => {
    const response = await api.get(`/portal/search/posts?${buildQueryParams(params)}`);
    return response.data;
  },

  filter: async (params: FilterParams): Promise<PostsResponse> => {
    const response = await api.get(`/portal/filter/posts?${buildQueryParams(params)}`);
    return response.data;
  },

  add: async (data: Record<string, any>, params: Omit<PaginationParams, 'page' | 'size'>): Promise<PostResponse> => {
    const response = await api.post(`/portal/post/add?${buildQueryParams(params)}`, data);
    return response.data;
  },

  editDetails: async (data: Record<string, any>, params: Omit<PaginationParams, 'page' | 'size'>): Promise<PostResponse> => {
    const response = await api.put(`/portal/post/edit/details?${buildQueryParams(params)}`, data);
    return response.data;
  },

  editImage: async (data: { unique_id: string; image: string; image_public_id?: string }, params: Omit<PaginationParams, 'page' | 'size'>): Promise<PostResponse> => {
    const response = await api.put(`/portal/post/edit/image?${buildQueryParams(params)}`, data);
    return response.data;
  },

  editCategory: async (data: { unique_id: string; category_unique_id: string }, params: Omit<PaginationParams, 'page' | 'size'>): Promise<PostResponse> => {
    const response = await api.put(`/portal/post/edit/category?${buildQueryParams(params)}`, data);
    return response.data;
  },

  editDescription: async (data: { unique_id: string; description: string }, params: Omit<PaginationParams, 'page' | 'size'>): Promise<PostResponse> => {
    const response = await api.put(`/portal/post/edit/description?${buildQueryParams(params)}`, data);
    return response.data;
  },

  editTags: async (data: { unique_id: string; tags: string[] }, params: Omit<PaginationParams, 'page' | 'size'>): Promise<PostResponse> => {
    const response = await api.put(`/portal/post/edit/tags?${buildQueryParams(params)}`, data);
    return response.data;
  },

  approve: async (data: { unique_id: string }, params: Omit<PaginationParams, 'page' | 'size'>): Promise<{ success: boolean; message: string }> => {
    const response = await api.put(`/portal/approve/post?${buildQueryParams(params)}`, data);
    return response.data;
  },

  remove: async (unique_id: string, params: Omit<PaginationParams, 'page' | 'size'>): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete(`/portal/post?${buildQueryParams(params)}`, { data: { unique_id } });
    return response.data;
  },
};

export default postsService;
