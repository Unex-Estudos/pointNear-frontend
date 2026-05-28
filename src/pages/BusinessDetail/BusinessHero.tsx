import { Store } from 'lucide-react';

interface Props {
  photos: string[];
  name: string;
}

export function BusinessHero({ photos, name }: Props) {
  const heroPhoto =
    photos[0] ??
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800';

  return (
    <div className="h-64 md:h-96 w-full relative flex gap-1 md:gap-2 bg-moss-900">
      <div className="w-full md:w-2/3 h-full relative">
        <img src={heroPhoto} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
      </div>
      <div className="hidden md:flex w-1/3 flex-col gap-2">
        {photos.slice(1, 3).map((photo, idx) => (
          <div key={idx} className="h-1/2 w-full relative">
            <img src={photo} alt={`${name} ${idx + 2}`} className="w-full h-full object-cover" />
          </div>
        ))}
        {photos.length < 3 && (
          <div className="h-1/2 w-full bg-moss-800 flex items-center justify-center">
            <Store className="text-moss-600" size={48} />
          </div>
        )}
      </div>
    </div>
  );
}