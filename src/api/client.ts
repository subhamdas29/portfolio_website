import { Liker } from '../types';

export interface CommentItem {
  id: string;
  name: string;
  occupation: string;
  email: string;
  text: string;
  createdAt: string;
}

const API_BASE = '/api';

export const getStoredUserLike = (): Liker | null => {
  try {
    const stored = localStorage.getItem('portfolio_user_like');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const setStoredUserLike = (user: Liker) => {
  try {
    localStorage.setItem('portfolio_user_like', JSON.stringify(user));
  } catch (e) {
    console.error('Failed to store user session:', e);
  }
};

export const fetchLikes = async (): Promise<{ count: number; likers: Liker[] }> => {
  try {
    const res = await fetch(`${API_BASE}/likes`);
    if (!res.ok) throw new Error('Failed to fetch likes');
    return await res.json();
  } catch (err) {
    console.error('fetchLikes error:', err);
    return { count: 0, likers: [] };
  }
};

export const fetchWhoFormatted = async (): Promise<string[]> => {
  try {
    const data = await fetchLikes();
    return data.likers.map(l => `${l.name} (${l.occupation || 'Visitor'})`);
  } catch {
    return ['Subham Das (Full-Stack Engineer)'];
  }
};

export const signupLike = async (data: {
  name: string;
  occupation?: string;
  email: string;
  password: string;
}): Promise<{ success: boolean; data?: { count: number; likers: Liker[] }; user?: Liker; message?: string }> => {
  try {
    const res = await fetch(`${API_BASE}/likes/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.success && json.user) {
      setStoredUserLike(json.user);
    }
    return json;
  } catch (err) {
    console.error('signupLike error:', err);
    return { success: false, message: 'Network error during signup' };
  }
};

export const loginLike = async (data: {
  email: string;
  password: string;
}): Promise<{ success: boolean; data?: { count: number; likers: Liker[] }; user?: Liker; message?: string }> => {
  try {
    const res = await fetch(`${API_BASE}/likes/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.success && json.user) {
      setStoredUserLike(json.user);
    }
    return json;
  } catch (err) {
    console.error('loginLike error:', err);
    return { success: false, message: 'Network error during login' };
  }
};

export const toggleLike = async (email: string): Promise<{ success: boolean; userHasLiked: boolean; count?: number }> => {
  try {
    const res = await fetch(`${API_BASE}/likes/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return await res.json();
  } catch (err) {
    console.error('toggleLike error:', err);
    return { success: false, userHasLiked: false };
  }
};

export const fetchComments = async (): Promise<CommentItem[]> => {
  try {
    const res = await fetch(`${API_BASE}/comments`);
    if (!res.ok) throw new Error('Failed to fetch comments');
    const json = await res.json();
    return json.comments || [];
  } catch (err) {
    console.error('fetchComments error:', err);
    return [];
  }
};

export const postComment = async (email: string, text: string): Promise<{ success: boolean; requireAuth?: boolean; comments?: CommentItem[]; message?: string }> => {
  try {
    const res = await fetch(`${API_BASE}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, text }),
    });
    return await res.json();
  } catch (err) {
    console.error('postComment error:', err);
    return { success: false, message: 'Network error posting comment' };
  }
};

export const deleteComment = async (id: string, email: string): Promise<{ success: boolean; comments?: CommentItem[]; message?: string }> => {
  try {
    const res = await fetch(`${API_BASE}/comments/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return await res.json();
  } catch (err) {
    console.error('deleteComment error:', err);
    return { success: false, message: 'Network error deleting comment' };
  }
};
