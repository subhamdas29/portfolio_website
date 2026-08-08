import React, { useState, useEffect, useRef } from 'react';
import { Send, LogIn, MessageSquare, User, Sparkles, Trash2, ShieldCheck } from 'lucide-react';
import { CommentItem, fetchComments, postComment, deleteComment } from '../../api/client';
import { Liker } from '../../types';

interface MessagesAppProps {
  userLiker: Liker | null;
  onOpenAuthModal: () => void;
}

const ADMIN_EMAIL = 'subhamdas5477@gmail.com';

export const MessagesApp: React.FC<MessagesAppProps> = ({
  userLiker,
  onOpenAuthModal,
}) => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const loadCommentsList = async () => {
    const data = await fetchComments();
    setComments(data);
  };

  useEffect(() => {
    loadCommentsList();
    const interval = setInterval(loadCommentsList, 5000); // Polling every 5s for new comments
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userLiker || !userLiker.email) {
      onOpenAuthModal();
      return;
    }

    if (!inputText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMsg('');

    const res = await postComment(userLiker.email, inputText.trim());
    setIsSubmitting(false);

    if (res.success && res.comments) {
      setComments(res.comments);
      setInputText('');
    } else if (res.requireAuth) {
      onOpenAuthModal();
    } else {
      setErrorMsg(res.message || 'Failed to post comment');
      if (res.message?.includes('log in') || res.message?.includes('sign up')) {
        onOpenAuthModal();
      }
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!userLiker || !userLiker.email || deletingId) return;

    setDeletingId(commentId);
    setErrorMsg('');

    const res = await deleteComment(commentId, userLiker.email);
    setDeletingId(null);

    if (res.success && res.comments) {
      setComments(res.comments);
    } else {
      setErrorMsg(res.message || 'Failed to delete comment');
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' · ' + d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  const isAdmin = userLiker?.email?.toLowerCase() === ADMIN_EMAIL;

  return (
    <div className="w-full h-full bg-[#F5F5F7] text-stone-900 flex flex-col font-sans select-none overflow-hidden">
      {/* Light macOS Comments Header Bar */}
      <div className="h-12 border-b border-stone-300 bg-[#ECEAE5] px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-[#007AFF] flex items-center justify-center text-white shadow-sm">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-stone-900 tracking-wide">Public Comments</h2>
            <div className="text-[10px] text-stone-600 font-medium">
              {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
            </div>
          </div>
        </div>

        {/* User Logged-in Status Indicator */}
        {userLiker && userLiker.email ? (
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[11px] font-bold shadow-xs">
            {isAdmin ? (
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
            <span className="truncate max-w-[150px]">
              {userLiker.name} {isAdmin && '(Admin)'}
            </span>
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#007AFF] hover:bg-blue-600 active:scale-95 text-white text-[11px] font-bold transition-all shadow-sm cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login / Sign Up</span>
          </button>
        )}
      </div>

      {/* Full-Line Comments Feed Container */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-3 bg-[#F5F5F7]">
        {comments.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-stone-500 space-y-2 p-6">
            <Sparkles className="w-8 h-8 text-amber-500 animate-bounce" />
            <p className="text-xs font-semibold text-stone-700">No comments yet. Be the first to leave a comment!</p>
          </div>
        ) : (
          comments.map((msg) => {
            const isUserOwner = userLiker?.email?.toLowerCase() === msg.email?.toLowerCase();
            const canDelete = isUserOwner || isAdmin;

            return (
              <div
                key={msg.id}
                className="w-full bg-white border border-stone-200/90 rounded-xl p-3.5 shadow-xs flex flex-col space-y-2 transition-all hover:border-stone-300"
              >
                {/* Full-width Card Top Row: User Avatar, Name, Occupation, Date & Delete Button */}
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-[#007AFF] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                      {msg.name ? msg.name.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
                    </div>
                    <div className="flex items-center space-x-2 flex-wrap min-w-0">
                      <span className="font-bold text-xs text-stone-900 truncate">{msg.name}</span>
                      {msg.occupation && (
                        <span className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px] border border-stone-200 font-medium">
                          {msg.occupation}
                        </span>
                      )}
                      <span className="text-[10px] text-stone-400 font-medium">
                        {formatDate(msg.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Delete Button (Visible to comment owner OR Admin) */}
                  {canDelete && (
                    <button
                      onClick={() => handleDelete(msg.id)}
                      disabled={deletingId === msg.id}
                      className="p-1 rounded-md text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer shrink-0 disabled:opacity-50"
                      title={isAdmin && !isUserOwner ? "Admin Delete Comment" : "Delete Your Comment"}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Full-width Comment Body Text */}
                <div className="text-xs text-stone-800 leading-relaxed font-normal text-left break-words pt-0.5">
                  {msg.text}
                </div>
              </div>
            );
          })
        )}
        <div ref={commentsEndRef} />
      </div>

      {/* Footer Comment Input Box */}
      <div className="p-3 bg-[#F0F0F3] border-t border-stone-300 shrink-0">
        {errorMsg && (
          <div className="mb-2 text-[11px] text-rose-600 font-medium px-2">
            {errorMsg}
          </div>
        )}

        {userLiker && userLiker.email ? (
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Write a public comment..."
              className="flex-1 bg-white border border-stone-300 focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] focus:outline-none text-stone-900 text-xs rounded-xl px-3.5 py-2.5 transition-all placeholder:text-stone-400 font-sans shadow-xs"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isSubmitting}
              className="w-9 h-9 rounded-xl bg-[#007AFF] hover:bg-blue-600 active:scale-95 disabled:opacity-40 disabled:hover:bg-[#007AFF] text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm"
              title="Send Comment"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div
            onClick={onOpenAuthModal}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-700 shadow-xs cursor-pointer hover:border-[#007AFF] transition-all"
          >
            <span className="font-medium text-stone-500">Log in or sign up to post a comment...</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenAuthModal();
              }}
              className="px-3 py-1 rounded-lg bg-[#007AFF] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0 ml-2"
            >
              Login / Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
