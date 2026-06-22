import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { HelpCircle, ChevronRight, RefreshCw, ShoppingBag, Sparkles, AlertCircle } from 'lucide-react';
import { ATTARS } from '../data';
import { AttarItem } from '../types';

interface QuizProps {
  onSelectAttar: (name: string) => void;
}

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    value: string; // matches attar id
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Which scent family speaks to your inner desire?',
    options: [
      { text: 'An exquisite, clean, royal and creamy powdery bubble', value: 'royal-musk' },
      { text: 'Earthy, green, wild vetiver grass and wet rain soil', value: 'ruh-khus' },
      { text: 'Vibrant active woods, marine fresh splash and sharp spices', value: 'cr7' },
      { text: 'Night-blooming sweet flowers, celestial nectar and sacred herbs', value: 'jannat-e-zuhr' },
      { text: 'Opulent crimson rose petals intertwined with deep amber and heavy oud wood', value: 'arba-wardath' }
    ]
  },
  {
    id: 2,
    text: 'What kind of sillage (scent trail) do you want to project?',
    options: [
      { text: 'Intimate & Calm - primarily a therapeutic personal bubble', value: 'ruh-khus' },
      { text: 'Pragmatic & Clean - perfect for long corporate office hours', value: 'royal-musk' },
      { text: 'Bold & Carismatic - projecting high athletic ambition', value: 'cr7' },
      { text: 'Enveloping & Sweet - floating gracefully around you', value: 'jannat-e-zuhr' },
      { text: 'Extremely Strong & Majestic - unforgettable, statement-making presence', value: 'arba-wardath' }
    ]
  },
  {
    id: 3,
    text: 'Identify your ultimate occasion or setting:',
    options: [
      { text: 'Spiritual quietness, heavy monsoon showers, or hot summer cooling', value: 'ruh-khus' },
      { text: 'A royal coronation, formal corporate panels, or daily premium clean feel', value: 'royal-musk' },
      { text: 'Gym workout, hot summer days, yacht cruises, or active direct sales', value: 'cr7' },
      { text: 'Blessed midday prayers, sweet garden strolls, or family morning visits', value: 'jannat-e-zuhr' },
      { text: 'Elite wedding festivals, deep romantic evenings, or cold winter cosiness', value: 'arba-wardath' }
    ]
  }
];

export default function ScentQuiz({ onSelectAttar }: QuizProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yGlow = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const yFrame = useTransform(scrollYProgress, [0, 1], [25, -25]);

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultAttar, setResultAttar] = useState<AttarItem | null>(null);

  const handleOptionSelect = (value: string) => {
    const updatedAnswers = [...answers, value];
    setAnswers(updatedAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate Recommendation: Find the most frequent answer
      const frequencyMap: Record<string, number> = {};
      let maxFrequency = 0;
      let recommendedId = value;

      updatedAnswers.forEach((ans) => {
        frequencyMap[ans] = (frequencyMap[ans] || 0) + 1;
        if (frequencyMap[ans] > maxFrequency) {
          maxFrequency = frequencyMap[ans];
          recommendedId = ans;
        }
      });

      // Find the matched attar
      const match = ATTARS.find((a) => a.id === recommendedId) || ATTARS[0];
      setResultAttar(match);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResultAttar(null);
  };

  return (
    <section
      id="quiz"
      ref={containerRef}
      className="py-20 bg-black/90 border-t border-gold/10 relative overflow-hidden"
    >
      {/* Drifting parallax glows */}
      <motion.div 
        style={{ y: yGlow, willChange: 'transform' }}
        className="absolute top-1/4 left-[10%] w-72 h-72 rounded-full bg-burgundy/10 blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [60, -60]), willChange: 'transform' }}
        className="absolute bottom-1/4 right-[10%] w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-gold block mb-1">Interactive Matchmaker</span>
          <h2 className="font-serif text-3xl text-white font-medium tracking-wide">
            Find Your Aura Signature
          </h2>
          <p className="text-cream/60 text-xs mt-2 font-light">
            Indecisive about traditional oils? Take our brief sensory alchemy questionnaire to reveal your recommended botanical match.
          </p>
          <div className="w-16 h-[1px] bg-gold/20 mx-auto mt-4"></div>
        </div>

        {/* Dashboard Frame */}
        <motion.div 
          style={{ y: yFrame, willChange: 'transform' }}
          className="bg-zinc-950/60 backdrop-blur-md border border-gold/15 p-6 sm:p-10 relative shadow-[0_12px_45px_0_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(212,175,55,0.06)] transition-all duration-500 min-h-[360px] flex flex-col justify-between"
        >
          
          {/* Subtle design corners */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/35"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/35"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/35"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold/35"></div>

          <AnimatePresence mode="wait">
            {!resultAttar ? (
              <motion.div
                key={`quiz-q-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 flex-grow flex flex-col justify-between"
              >
                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-gold">
                    <span>A-ONE Perfumer Questionnaire</span>
                    <span>Step {currentStep + 1} of {QUESTIONS.length}</span>
                  </div>
                  <div className="h-1 bg-neutral-900 w-full relative">
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-gold transition-all duration-300"
                      style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Question Text */}
                <div className="py-2">
                  <h3 className="font-serif text-lg sm:text-xl text-white leading-relaxed font-medium">
                    {QUESTIONS[currentStep].text}
                  </h3>
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 gap-3.5 pt-2">
                  {QUESTIONS[currentStep].options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleOptionSelect(opt.value)}
                      className="w-full text-left bg-black hover:bg-burgundy/15 border border-gold/15 hover:border-gold py-3 px-5 text-xs sm:text-sm text-cream hover:text-white transition-all cursor-pointer rounded-none flex items-center justify-between group"
                    >
                      <span className="font-light pr-4">{opt.text}</span>
                      <ChevronRight className="h-4 w-4 text-gold/40 group-hover:text-gold group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* RESULT PAGE CARD */
              <motion.div
                key="quiz-result-slide"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Left product image stage */}
                <div className="md:col-span-4 flex justify-center">
                  <div className="relative aspect-square p-1 border border-gold/20 max-w-[200px] w-full bg-black">
                    <img
                      src={resultAttar.imagePath}
                      alt={resultAttar.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-burgundy text-gold text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 border border-gold/20">
                      Match 98%
                    </div>
                  </div>
                </div>

                {/* Right detailed specifications */}
                <div className="md:col-span-8 space-y-4 text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold text-left block">Your Perfect Match:</span>
                    <h3 className="font-serif text-2xl text-white font-bold">{resultAttar.name}</h3>
                    <p className="font-serif text-gold text-xs italic">"{resultAttar.tagline}"</p>
                  </div>

                  <p className="text-cream/80 text-xs sm:text-sm font-light leading-relaxed">
                    {resultAttar.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gold/10 text-[10px] font-mono uppercase tracking-wider text-cream/60">
                    <p>Longevity: <strong className="text-white">{resultAttar.longevity}</strong></p>
                    <p>Sillage: <strong className="text-white">{resultAttar.projection}</strong></p>
                    <p className="col-span-2">Ideal Season: <strong className="text-[#D4AF37]">{resultAttar.season}</strong></p>
                  </div>

                  {/* Cta Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      onClick={() => onSelectAttar(resultAttar.name)}
                      className="px-5 py-3 bg-gradient-to-r from-burgundy to-burgundy-dark hover:from-burgundy-dark hover:to-burgundy border border-gold text-white font-semibold text-xs tracking-widest uppercase rounded-none transition-all cursor-pointer flex items-center justify-center space-x-2 flex-grow sm:flex-grow-0"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>Select & Reserve Scent Test</span>
                    </button>
                    
                    <button
                      onClick={handleReset}
                      className="px-5 py-3 bg-transparent border border-gold/20 hover:border-gold hover:bg-gold/10 text-gold font-semibold text-xs tracking-widest uppercase rounded-none transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Retake Quiz</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  );
}
