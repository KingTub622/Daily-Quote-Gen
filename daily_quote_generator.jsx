import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const quotes = [
  {
    quote: 'In the end we will remember not the words of our enemies...but the silence of our friends.\n\n- Martin Luther King, Jr.',
    author: 'Mark Long',
    book: 'The Silence of Our Friends',
    tags: ['Civil-Rights', 'Mlk', 'Martin-Luther-King-Jr', 'Social-Consciousness', 'Comic', 'Graphic-Novel']
  },
  {
    quote: "I suspect the most we can hope for, and it's no small hope, is that we never give up, that we never stop giving ourselves permission to try to love and receive love.",
    author: 'Elizabeth Strout',
    book: 'Abide with Me',
    tags: ['Uncategorized']
  },
  {
    quote: 'You have power over your mind - not outside events. Realize this, and you will find strength.',
    author: 'Marcus Aurelius',
    book: 'Meditations',
    tags: ['Self-Control', 'Inner-Strength', 'Strength', 'Ataraxy', 'Inspiration']
  },
  {
    quote: "I saw my life branching out before me like the green fig tree in the story. From the tip of every branch, like a fat purple fig, a wonderful future beckoned and winked. One fig was a husband and a happy home and children, and another fig was a famous poet and another fig was a brilliant professor, and another fig was Ee Gee, the amazing editor, and another fig was Europe and Africa and South America, and another fig was Constantin and Socrates and Attila and a pack of other lovers with queer names and offbeat professions, and another fig was an Olympic lady crew champion, and beyond and above these figs were many more figs I couldn't quite make out. I saw myself sitting in the crotch of this fig tree, starving to death, just because I couldn't make up my mind which of the figs I would choose. I wanted each and every one of them, but choosing one meant losing all the rest, and, as I sat there, unable to decide, the figs began to wrinkle and go black, and, one by one, they plopped to the ground at my feet.",
    author: 'Sylvia Plath',
    book: 'The Bell Jar',
    tags: ['Life-Choices-Fig-Trees']
  },
  {
    quote: 'Feet, what do I need them for\nIf I have wings to fly.',
    author: 'Frida Kahlo',
    book: null,
    tags: ['Inspirational']
  }
  // Additional cleaned and consolidated quotes go here
];

const getUniqueTags = () => {
  const tagSet = new Set();
  quotes.forEach(q => q.tags?.forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet).sort();
};

const getDailyIndex = (listLength, offset = 0) => {
  const today = new Date();
  const baseIndex = today.getFullYear() * 1000 + today.getMonth() * 100 + today.getDate();
  return (baseIndex + offset) % listLength;
};

export default function DailyQuote() {
  const [category, setCategory] = useState("all");
  const [refreshIndex, setRefreshIndex] = useState(0);

  const filteredQuotes = category === "all"
    ? quotes
    : quotes.filter(q => q.tags?.includes(category));

  const dailyQuote = filteredQuotes.length
    ? filteredQuotes[getDailyIndex(filteredQuotes.length, refreshIndex)]
    : null;

  return (
    <div className="max-w-xl mx-auto p-4 grid gap-4">
      <h1 className="text-2xl font-bold text-center">Quote of the Day</h1>

      <Select onValueChange={setCategory} defaultValue="all">
        <SelectTrigger>
          <SelectValue placeholder="Filter by Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {getUniqueTags().map(tag => (
            <SelectItem key={tag} value={tag}>{tag}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {dailyQuote ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-lg italic">"{dailyQuote.quote}"</p>
            <p className="text-right mt-4 font-semibold">— {dailyQuote.author}</p>
            {dailyQuote.book && <p className="text-right text-sm italic">{dailyQuote.book}</p>}
          </CardContent>
        </Card>
      ) : (
        <p className="text-center">No quotes available for this category.</p>
      )}

      <Button onClick={() => setRefreshIndex(prev => prev + 1)} className="w-full">
        🔁 Refresh Quote
      </Button>
    </div>
  );
}
