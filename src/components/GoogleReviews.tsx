import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, ThumbsUp, MapPin } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  likes: number;
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Rahul Mehta',
    avatar: 'R',
    rating: 5,
    date: '2 weeks ago',
    text: 'Exceptional experience! Manthan predicted my job change within the exact month. The cross-verification method gives confidence no single-system astrologer can match.',
    likes: 12
  },
  {
    id: '2',
    name: 'Priya Khanna',
    avatar: 'P',
    rating: 5,
    date: '1 month ago',
    text: 'Finally, an astrologer who doesn\'t sell fear or gemstones. The reading was like a strategic life audit. Highly analytical approach with no nonsense.',
    likes: 18
  },
  {
    id: '3',
    name: 'Amit Sharma',
    avatar: 'A',
    rating: 5,
    date: '3 weeks ago',
    text: 'Business partnership issues were spot on. The palmistry validation confirmed what Nadi said. Impressed by the systematic methodology.',
    likes: 9
  },
  {
    id: '4',
    name: 'Sarah Lewis',
    avatar: 'S',
    rating: 5,
    date: '2 months ago',
    text: 'International consultation was seamless. Past events verification was eerily accurate. No vague predictions, just specific insights.',
    likes: 15
  },
  {
    id: '5',
    name: 'Vikram Reddy',
    avatar: 'V',
    rating: 5,
    date: '1 week ago',
    text: 'Skeptical at first, but the Trikal Darshan method won me over. Three independent systems pointing to the same conclusion is hard to dismiss.',
    likes: 7
  },
  {
    id: '6',
    name: 'Neha Gupta',
    avatar: 'N',
    rating: 5,
    date: '3 weeks ago',
    text: 'Career guidance was precise and actionable. No "wear this gemstone" nonsense. Just clear timeline analysis based on multiple sciences.',
    likes: 21
  },
  {
    id: '7',
    name: 'Arjun Patel',
    avatar: 'A',
    rating: 5,
    date: '1 month ago',
    text: 'Best astrologer I\'ve consulted. The Nadi reading matched my life events perfectly. Numerology gave precise timing. Palmistry confirmed everything.',
    likes: 14
  },
  {
    id: '8',
    name: 'Kavita Rao',
    avatar: 'K',
    rating: 5,
    date: '2 weeks ago',
    text: 'Marriage prediction was accurate to the month! Manthan\'s approach is refreshingly honest. No remedies sold, just pure analysis.',
    likes: 11
  },
  {
    id: '9',
    name: 'Rajesh Kumar',
    avatar: 'R',
    rating: 5,
    date: '3 days ago',
    text: 'Property investment decision - his guidance was spot on. The cross-verification through three sciences gave me confidence.',
    likes: 6
  },
  {
    id: '10',
    name: 'Anita Verma',
    avatar: 'A',
    rating: 5,
    date: '1 month ago',
    text: 'Health concern prediction was accurate. What impressed me most was the no-fear approach. He explains things scientifically.',
    likes: 19
  }
];

export default function GoogleReviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const visibleReviews = reviews.slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section ref={ref} className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
      >
        {/* Header - Google Style */}
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
              <span className="text-xl text-gray-600">ॐ</span>
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900">Satvik Jyotish</h3>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#Fbbc04] text-[#Fbbc04]" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-1">4.9</span>
                <span className="text-sm text-gray-400">• 170+ reviews</span>
              </div>
            </div>
          </div>
          <img 
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" 
            alt="Google" 
            className="h-5 object-contain" 
          />
        </div>

        {/* Reviews Grid */}
        <div className="p-4">
          <div className="grid md:grid-cols-3 gap-3">
            {visibleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">
              {currentPage + 1} / {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <a
            href="https://maps.app.goo.gl/wzWb6xqLvczRfCbf9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#1a73e8] hover:underline"
          >
            View all reviews
          </a>
          <a
            href="https://maps.app.goo.gl/wzWb6xqLvczRfCbf9"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#1a73e8] text-white text-sm font-medium rounded hover:bg-[#1557b0] transition-colors"
          >
            Write a review
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(review.likes);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-semibold text-sm">
          {review.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 text-sm truncate">{review.name}</h4>
          <div className="flex items-center gap-1 mt-0.5">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#Fbbc04] text-[#Fbbc04]" />
            ))}
            <span className="text-xs text-gray-400 ml-1">{review.date}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-4">
        {review.text}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-xs transition-colors ${
            liked ? 'text-[#1a73e8]' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          <span>{likes}</span>
        </button>
        <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
    </div>
  );
}
