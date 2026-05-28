import { useState } from 'react';
import { Star, Pencil, Trash2 } from 'lucide-react';
import { businessesService } from '../../services/businesses.service';
import { Review } from '../../types'; // ← usa o tipo global com userId

interface Props {
  review: Review;
  currentUserId?: string;
  isDeleting: boolean;
  onDelete: (id: string) => void;
  onRefresh: () => Promise<void>;
}

export function ReviewCard({ review, currentUserId, isDeleting, onDelete, onRefresh }: Props) {
  const [isEditing,        setIsEditing]        = useState(false);
  const [editRating,       setEditRating]        = useState(review.rating);
  const [editComment,      setEditComment]       = useState(review.comment);
  const [editError,        setEditError]         = useState('');
  const [isSubmittingEdit, setIsSubmittingEdit]  = useState(false);

  // ✅ review.userId === currentUserId — compara autor da review com usuário logado
  const isOwner = !!currentUserId && !!review.userId && review.userId === currentUserId;

  const handleEditSubmit = async () => {
    if (editComment.trim().length < 3) {
      setEditError('Comentário deve ter pelo menos 3 caracteres.');
      return;
    }
    setIsSubmittingEdit(true);
    try {
      await businessesService.updateReview(review.id, {
        rating: editRating,
        comment: editComment.trim(),
      });
      await onRefresh();
      setIsEditing(false);
    } catch {
      setEditError('Não foi possível editar a avaliação.');
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditRating(review.rating);
    setEditComment(review.comment);
    setEditError('');
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-moss/10">
      {isEditing ? (
        /* ── Modo edição ── */
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} type="button" onClick={() => setEditRating(s)} className="text-yellow-400">
                <Star size={22} className={s <= editRating ? 'fill-current' : 'text-moss-200'} />
              </button>
            ))}
          </div>
          <textarea
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
            rows={3}
            className="w-full border border-moss/20 rounded-xl px-4 py-3 outline-none focus:border-terracotta bg-white resize-none text-sm"
          />
          {editError && <p className="text-sm text-red-600">{editError}</p>}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleEditSubmit}
              disabled={isSubmittingEdit}
              className="bg-terracotta hover:bg-terracotta-600 disabled:bg-moss-200 disabled:text-moss-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
              {isSubmittingEdit ? 'Salvando...' : 'Salvar'}
            </button>
            <button
              type="button"
              onClick={handleEditCancel}
              className="bg-moss-50 hover:bg-moss-100 text-moss-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        /* ── Modo visualização ── */
        <>
          <div className="flex justify-between items-start mb-3">
            {/* Avatar + nome + data */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-terracotta-100 text-terracotta-700 flex items-center justify-center font-bold text-sm">
                {review.authorName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-medium text-charcoal">{review.authorName}</div>
                <div className="text-xs text-charcoal-light">
                  {new Date(review.date).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </div>

            {/* Estrelas + botões de ação */}
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    className={star <= review.rating ? 'fill-current' : 'text-moss-200'}
                  />
                ))}
              </div>

              {isOwner && (
                <div className="flex items-center gap-1 ml-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    title="Editar avaliação"
                    className="p-1.5 rounded-lg text-moss-400 hover:text-moss-700 hover:bg-moss-50 transition-colors">
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(review.id)}
                    disabled={isDeleting}
                    title="Excluir avaliação"
                    className="p-1.5 rounded-lg text-moss-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-40 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="text-charcoal text-sm leading-relaxed">{review.comment}</p>
        </>
      )}
    </div>
  );
}