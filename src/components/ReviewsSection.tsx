import React, { useState, useEffect } from 'react';
import { 
  Star, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  X, 
  User as UserIcon,
  Quote
} from 'lucide-react';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  serverTimestamp, 
  query, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { INITIAL_REVIEWS } from '../data/initialReviews';
import { CustomerReview } from '../types';
import { MENU_ITEMS } from '../data/menuData';

export const ReviewsSection: React.FC = () => {
  const { user, signInWithGoogle } = useAuth();
  const toast = useToast();
  const [firestoreReviews, setFirestoreReviews] = useState<CustomerReview[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Review form state
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewerName, setReviewerName] = useState('');
  const [comment, setComment] = useState('');
  const [favoriteDish, setFavoriteDish] = useState('Special Chicken Cheese Tikka Paratha');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sync reviewer name if user logs in
  useEffect(() => {
    if (user?.displayName) {
      setReviewerName(user.displayName);
    }
  }, [user]);

  // Firestore real-time listener
  useEffect(() => {
    const reviewsCol = collection(db, 'reviews');
    const path = 'reviews';

    const unsubscribe = onSnapshot(
      reviewsCol,
      (snapshot) => {
        const fetched: CustomerReview[] = [];
        snapshot.forEach((d) => {
          const data = d.data();
          fetched.push({
            id: d.id,
            userId: data.userId,
            userName: data.userName,
            userPhoto: data.userPhoto,
            rating: data.rating,
            comment: data.comment,
            favoriteDish: data.favoriteDish,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
            verifiedVisit: true,
          });
        });
        setFirestoreReviews(fetched);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
      }
    );

    return () => unsubscribe();
  }, []);

  // Merge initial reviews with user submitted reviews
  const allReviews: CustomerReview[] = [...firestoreReviews, ...INITIAL_REVIEWS];

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      try {
        await signInWithGoogle();
      } catch {
        return;
      }
    }

    if (!comment.trim() || comment.trim().length < 3) {
      setSubmitError('Please write at least a few words in your review.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const reviewId = `rev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const reviewPath = `reviews/${reviewId}`;
    const docRef = doc(db, 'reviews', reviewId);

    try {
      await setDoc(docRef, {
        userId: user!.uid,
        userName: reviewerName.trim() || user!.displayName || 'Customer',
        userPhoto: user!.photoURL || '',
        rating: Number(rating),
        comment: comment.trim(),
        favoriteDish: favoriteDish || 'Special Chicken Cheese Tikka Paratha',
        createdAt: serverTimestamp(),
      });

      setSubmitSuccess(true);
      toast.success(
        'Review Published! ⭐',
        'Shukriya! Your feedback helps food lovers across Rahim Yar Khan discover Paratha Plus.'
      );
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
        setComment('');
      }, 1500);
    } catch (err: any) {
      handleFirestoreError(err, OperationType.WRITE, reviewPath);
      setSubmitError('Failed to publish review. Please try again.');
      toast.error('Review Error', 'Could not save review. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-20 bg-stone-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Summary Score */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              Real Diners, Real Stories
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-serif-title">
              Customer <span className="text-amber-500">Reviews</span>
            </h2>
            <p className="text-stone-300 text-sm sm:text-base max-w-xl">
              From Sheikh Zayed Hospital doctors to Khwaja Fareed University students and Faisal Road families.
            </p>
          </div>

          {/* Rating Summary Card & Write Review Button */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-stone-950 p-4 sm:p-5 rounded-3xl border border-stone-800">
            <div className="flex items-center gap-3">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">
                4.9
              </div>
              <div>
                <div className="flex items-center text-amber-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[11px] text-stone-400 font-medium mt-0.5">
                  Based on 850+ local reviews in RYK
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95 ml-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allReviews.slice(0, 6).map((rev, idx) => (
            <div
              key={rev.id || idx}
              className="bg-stone-950/80 rounded-3xl p-6 border border-stone-800/90 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl relative group"
            >
              <Quote className="w-8 h-8 text-amber-500/15 absolute top-5 right-5 group-hover:text-amber-500/30 transition-colors" />

              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating ? 'fill-amber-400' : 'text-stone-700'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold ml-1.5 text-stone-300">
                    {rev.rating}.0
                  </span>
                </div>

                {/* Comment */}
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed italic">
                  "{rev.comment}"
                </p>

                {/* Favorite Dish */}
                {rev.favoriteDish && (
                  <div className="inline-block bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-medium px-2.5 py-1 rounded-lg">
                    Fav: {rev.favoriteDish}
                  </div>
                )}
              </div>

              {/* Reviewer Details */}
              <div className="pt-4 mt-4 border-t border-stone-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {rev.userPhoto ? (
                    <img
                      src={rev.userPhoto}
                      alt={rev.userName}
                      className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm">
                      {rev.userName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white flex items-center gap-1">
                      {rev.userName}
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </h4>
                    <span className="text-[10px] text-stone-400">
                      Verified Foodie • Faisal Road
                    </span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Modal: Write Review */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-stone-950 border border-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-white shadow-2xl relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 rounded-xl hover:bg-stone-900"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-white font-serif-title">
                  Share Your Experience
                </h3>
                <p className="text-xs sm:text-sm text-stone-400">
                  How was your paratha and chai at Paratha Plus on Faisal Road?
                </p>
              </div>

              {submitSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Shukriya!</h4>
                  <p className="text-xs text-stone-300">
                    Your review has been saved to Firestore and published live!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Star Rating Selector */}
                  <div className="space-y-1.5 text-center sm:text-left">
                    <label className="text-xs font-semibold text-stone-300">
                      Your Rating (Tap Stars)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              star <= (hoverRating || rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-stone-700'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-amber-400 ml-2">
                        {rating} out of 5 Stars
                      </span>
                    </div>
                  </div>

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asad Khan"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      maxLength={80}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Favorite Dish select */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300">
                      What was your favorite dish?
                    </label>
                    <select
                      value={favoriteDish}
                      onChange={(e) => setFavoriteDish(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs sm:text-sm text-stone-200 focus:outline-none focus:border-amber-500"
                    >
                      {MENU_ITEMS.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Comment text */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300">
                      Your Review / Feedback
                    </label>
                    <textarea
                      required
                      placeholder="Tell other foodies about the crispness, taste, service, or delivery speed..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      minLength={3}
                      maxLength={500}
                      rows={4}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 resize-none"
                    />
                    <span className="text-[10px] text-stone-500 block text-right">
                      {comment.length}/500
                    </span>
                  </div>

                  {submitError && (
                    <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-300 text-xs">
                      {submitError}
                    </div>
                  )}

                  {!user && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        Submitting will prompt quick Google Sign-In to verify your review.
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="w-1/2 py-3 rounded-xl border border-stone-800 text-stone-300 text-xs font-semibold hover:bg-stone-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-1/2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-lg disabled:opacity-50"
                    >
                      {submitting ? 'Publishing...' : 'Submit Review'}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
