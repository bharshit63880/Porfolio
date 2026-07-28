import { useMemo, useState } from 'react';
import { Braces, RotateCcw, Trophy, Zap } from 'lucide-react';

const challenges = [
  {
    code: 'const result = [1, 2, 3].map(n => n * 2);',
    question: 'What is result?',
    options: ['[2, 4, 6]', '[1, 4, 9]', '6', '[1, 2, 3, 2]'],
    answer: 0,
  },
  {
    code: 'console.log(typeof null);',
    question: 'What will JavaScript print?',
    options: ['"null"', '"undefined"', '"object"', '"boolean"'],
    answer: 2,
  },
  {
    code: 'const x = 0;\nconsole.log(x || 10, x ?? 10);',
    question: 'Choose the correct output.',
    options: ['0 0', '10 10', '10 0', '0 10'],
    answer: 2,
  },
  {
    code: 'Promise.resolve(7).then(n => n + 3)',
    question: 'What value does the Promise resolve to?',
    options: ['7', '10', 'undefined', '"73"'],
    answer: 1,
  },
  {
    code: 'const word = "CODE";\nconsole.log(word.slice(1, 3));',
    question: 'What is printed?',
    options: ['"COD"', '"OD"', '"ODE"', '"DE"'],
    answer: 1,
  },
];

export function CodeGame() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const challenge = challenges[index];
  const progress = useMemo(() => ((index + (finished ? 1 : 0)) / challenges.length) * 100, [index, finished]);

  const chooseAnswer = (option: number) => {
    if (selected !== null) return;
    setSelected(option);
    if (option === challenge.answer) setScore((value) => value + 1);
  };

  const next = () => {
    if (index === challenges.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  return (
    <section id="code-game" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="relative z-10 section-padding max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-purple text-sm tracking-widest mb-4 block">&lt;CodeQuest /&gt;</span>
          <h2 className="font-display text-5xl sm:text-6xl font-bold text-white">
            TEST YOUR <span className="gradient-text">CODE IQ</span>
          </h2>
          <p className="font-body text-white/60 mt-3">Five quick JavaScript challenges. Can you get a perfect score?</p>
        </div>

        <div className="glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="h-1.5 bg-white/5">
            <div className="h-full bg-gradient-to-r from-cyan via-purple to-pink transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>

          {finished ? (
            <div className="p-10 sm:p-16 text-center">
              <Trophy size={64} className="mx-auto text-cyan mb-5" />
              <p className="font-mono text-white/50 mb-2">CHALLENGE COMPLETE</p>
              <h3 className="font-display text-6xl sm:text-8xl font-bold gradient-text">{score}/{challenges.length}</h3>
              <p className="text-white/60 mt-3 mb-8">
                {score === challenges.length ? 'Perfect run — compiler approved!' : score >= 3 ? 'Strong run — almost production ready!' : 'Good start — debug and try again!'}
              </p>
              <button onClick={restart} className="btn-cyber inline-flex items-center gap-2">
                <RotateCcw size={18} className="text-cyan" /> Play Again
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1.1fr_1fr]">
              <div className="p-7 sm:p-10 bg-black/40 border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="flex items-center justify-between mb-7">
                  <span className="font-mono text-cyan text-sm flex items-center gap-2"><Braces size={18} /> CHALLENGE {index + 1}</span>
                  <span className="font-mono text-white/40 text-sm">SCORE {score}</span>
                </div>
                <pre className="min-h-40 flex items-center p-5 rounded-2xl bg-black border border-cyan/20 text-cyan text-sm sm:text-base overflow-x-auto whitespace-pre-wrap">
                  <code>{challenge.code}</code>
                </pre>
              </div>

              <div className="p-7 sm:p-10">
                <h3 className="font-display text-3xl text-white mb-6">{challenge.question}</h3>
                <div className="space-y-3">
                  {challenge.options.map((option, optionIndex) => {
                    const correct = selected !== null && optionIndex === challenge.answer;
                    const wrong = selected === optionIndex && optionIndex !== challenge.answer;
                    return (
                      <button
                        key={option}
                        onClick={() => chooseAnswer(optionIndex)}
                        disabled={selected !== null}
                        className={`w-full text-left p-4 rounded-xl border font-mono text-sm transition-all ${
                          correct ? 'border-green-400 bg-green-400/10 text-green-300' :
                          wrong ? 'border-pink bg-pink/10 text-pink' :
                          'border-white/10 bg-white/5 text-white/70 hover:border-cyan/50 hover:text-white'
                        }`}
                      >
                        <span className="text-white/30 mr-3">{String.fromCharCode(65 + optionIndex)}.</span>{option}
                      </button>
                    );
                  })}
                </div>
                {selected !== null && (
                  <button onClick={next} className="mt-6 w-full btn-cyber flex items-center justify-center gap-2">
                    <Zap size={18} className="text-cyan" />
                    {index === challenges.length - 1 ? 'See Result' : 'Next Challenge'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
