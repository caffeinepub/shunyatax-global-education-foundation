import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const galleryImages = [
  {
    src: '/assets/Screenshot%202025-12-24%20153629.jpg',
    alt: 'Community Education Program',
    category: 'Programs',
  },
  {
    src: '/assets/e00003_42eb4111f5ba46b39436fec811df105d~mv2.avif',
    alt: 'Student Activities',
    category: 'Activities',
  },
  {
    src: '/assets/e00003_b89bd166a314421cbcb505ffec9c884c~mv2.avif',
    alt: 'Learning Environment',
    category: 'Facilities',
  },
  {
    src: '/assets/generated/rural-classroom-education.dim_800x600.jpg',
    alt: 'Rural Classroom Education',
    category: 'Programs',
  },
  {
    src: '/assets/generated/volunteers-distributing-books.dim_800x600.jpg',
    alt: 'Volunteers Distributing Books',
    category: 'Activities',
  },
  {
    src: '/assets/generated/students-studying-tree.dim_800x600.jpg',
    alt: 'Students Studying Under Tree',
    category: 'Programs',
  },
  {
    src: '/assets/generated/community-building-school.dim_800x600.jpg',
    alt: 'Community Building School',
    category: 'Facilities',
  },
  {
    src: '/assets/generated/school-feeding-program.dim_800x600.jpg',
    alt: 'School Feeding Program',
    category: 'Activities',
  },
  {
    src: '/assets/generated/adult-literacy-class.dim_800x600.jpg',
    alt: 'Adult Literacy Class',
    category: 'Programs',
  },
  {
    src: '/assets/generated/mobile-education-unit.dim_800x600.jpg',
    alt: 'Mobile Education Unit',
    category: 'Facilities',
  },
  {
    src: '/assets/generated/graduation-ceremony.dim_800x600.jpg',
    alt: 'Graduation Ceremony',
    category: 'Activities',
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(galleryImages.map((img) => img.category)))];

  const filteredImages =
    selectedCategory === 'all' ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in', 'fade-in', 'scale-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredImages]);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end gradient-animate" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,oklch(var(--accent)/0.15),transparent_70%)]" />
        
        <div className="container relative mx-auto px-4">
          <div className="animate-on-scroll mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-accent/95 text-accent-foreground shadow-accent-glow">Gallery</Badge>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Our Impact in Pictures</h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Explore moments of transformation, joy, and learning from our programs and communities.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="animate-on-scroll mb-12 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={`capitalize transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary to-accent shadow-glow'
                    : 'hover:border-primary/40'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredImages.map((image, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div
                    className="animate-on-scroll group relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-glow float-animation"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animationDuration: `${3 + (index % 3) * 0.5}s`
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="font-semibold text-lg mb-2">{image.alt}</p>
                        <Badge variant="secondary" className="bg-accent/95 text-accent-foreground">
                          {image.category}
                        </Badge>
                      </div>
                      <div className="absolute right-4 top-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <div className="rounded-full bg-white/15 p-3 backdrop-blur-md shadow-glow">
                          <ZoomIn className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </div>
                    {/* Decorative floating element */}
                    <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/5 to-accent/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 overflow-hidden border-2 border-primary/15">
                  <div className="relative">
                    <img src={image.src} alt={image.alt} className="h-auto w-full" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-8 text-white">
                      <h3 className="text-2xl font-semibold mb-2">{image.alt}</h3>
                      <Badge variant="secondary" className="bg-accent/95 text-accent-foreground">
                        {image.category}
                      </Badge>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
