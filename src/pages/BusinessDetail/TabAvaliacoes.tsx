import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Business } from '../../types';
import { businessesService } from '../../services/businesses.service';
import { ReviewCard } from './ReviewCard';

interface Props {
  business: Business;
  currentUserId?: string;
  onRefresh: () => Promise<void>;
}

export function TabAvaliacoes({ business, currentUserId, onRefresh }: Props) {
  const navigate = useNavigate();

  const [rating,       setRating]       = useState(5);
  const [comment,      setComment]      = useState('');
  const [error,        setError]        = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId,   setDeletingId]   = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (comment.trim().length < 3) {
      setError('Escreva um comentário com pelo menos 3 caracteres.');
      return;
    }

    setIsSubmitting(true);
    try {
      await businessesService.createReview(business.id, {
        rating,
        comment: comment.trim(),
      });
      await onRefresh();
      setComment('');
      setRating(5);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível enviar sua avaliação.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (reviewId: string) => {
    setDeletingId(reviewId);
    try {
      await businessesService.deleteReview(reviewId);
      await onRefresh();
    } catch {
      alert('Não foi possível excluir a avaliação.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

      {/* Rating summary */}
      <div className="flex items-center gap-6 mb-8 bg-white dark:bg-dark-surface p-6 rounded-2xl shadow-sm border border-moss/10 dark:border-dark-border">
        <div className="text-center">
          <div className="text-4xl font-serif font-bold text-moss-900 dark:text-dark-text">{business.rating}</div>
          <div className="flex text-yellow-400 my-1 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={16} className={star <= Math.round(business.rating) ? 'fill-current' : 'text-moss-200'} />
            ))}
          </div>
          <div className="text-sm text-charcoal-light dark:text-dark-muted">{business.reviewCount} avaliações</div>
        </div>
        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-2 text-sm mb-1">
              <span className="w-3 text-charcoal-light dark:text-dark-muted">{star}</span>
              <Star size={12} className="text-charcoal-light dark:text-dark-muted" />
              <div className="flex-1 h-2 bg-moss-100 dark:bg-dark-elevated rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: star === 5 ? '70%' : star === 4 ? '20%' : '5%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Bloqueia formulário para não logados */}
      {!currentUserId ? (
        <div className="bg-white dark:bg-dark-surface p-6 rounded-2xl shadow-sm border border-moss/10 dark:border-dark-border mb-6 text-center space-y-3">
          <p className="text-charcoal dark:text-dark-text font-medium">Faça login para deixar uma avaliação</p>
          <p className="text-sm text-charcoal-light dark:text-dark-muted">Apenas usuários cadastrados podem avaliar estabelecimentos.</p>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors">
            <LogIn size={18} />
            Entrar na conta
          </button>
        </div>
      ) : (
       // formulario de avaliação
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-dark-surface p-5 rounded-2xl shadow-sm border border-moss/10 dark:border-dark-border mb-6 space-y-4">
          <h3 className="font-serif font-bold text-moss-900 dark:text-dark-text text-lg">Deixe sua avaliação</h3>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} type="button" onClick={() => setRating(s)} className="text-yellow-400">
                <Star size={24} className={s <= rating ? 'fill-current' : 'text-moss-200'} />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Conte como foi sua experiência"
            rows={4}
            className="w-full border border-moss/20 dark:border-dark-border rounded-xl px-4 py-3 outline-none focus:border-terracotta bg-white dark:bg-dark-elevated text-charcoal dark:text-dark-text placeholder:text-moss-400 dark:placeholder:text-dark-muted resize-none"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-terracotta hover:bg-terracotta-600 disabled:bg-moss-200 disabled:text-moss-500 text-white px-5 py-3 rounded-xl font-medium transition-colors">
            {isSubmitting ? 'Enviando...' : 'Enviar avaliação'}
          </button>
        </form>
      )}

      {/* Review list */}
      <div className="space-y-4">
        {business.reviews.length > 0 ? (
          business.reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              currentUserId={currentUserId}
              isDeleting={deletingId === review.id}
              onDelete={handleDelete}
              onRefresh={onRefresh}
            />
          ))
        ) : (
          <div className="text-center py-8 text-charcoal-light dark:text-dark-muted bg-white dark:bg-dark-surface rounded-2xl border border-moss/10 dark:border-dark-border">
            Ainda não há avaliações para este estabelecimento.
          </div>
        )}
      </div>
    </motion.div>
  );
}