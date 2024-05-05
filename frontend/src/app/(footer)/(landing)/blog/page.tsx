import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

const Blog = () => {
  const blogs: {
    id: number,
    title: string,
    snippet: string,
    date: Date,
    image: {
      src: string,
      alt: string,
      height: number,
      width: number,
    }
  }[] = [
    {
      id: 1,
      title: "Fashion Digital Transformation: Maximising ROI of 3D Technology",
      snippet: "Today, the topic on everyone's mind is the future of Augmented Reality (AR) for fashion brands. What does it hold, and how can we harness its potential?",
      date: new Date(Date.parse('2023-10-29')),
      image: {
        src: "https://thumb.tildacdn.com/tild6136-3938-4730-b836-613636326233/-/cover/560x300/center/center/-/format/webp/__2023-10-24__003607.png",
        alt: "A 3D watch.",
        width: 560,
        height: 300,
      },
    },
    {
      id: 2,
      title: "How Fashion Brands are Using 3D, AR, and Virtual Try-On Solutions",
      snippet: "This article explores how fashion companies are using cutting-edge technologies like 3D imagery, augmented reality, and virtual try-on functions to differentiate themselves in an industry where competition is fierce.",
      date: new Date(Date.parse('2023-7-4')),
      image: {
        src: "https://thumb.tildacdn.com/tild3331-6139-4466-a434-323735623361/-/cover/560x300/center/center/-/format/webp/Frame_4_1.png",
        alt: "A 3D watch.",
        width: 560,
        height: 300,
      },
    },
    {
      id: 3,
      title: "The Perfect Fit: Impact of AR Watch Virtual Try-Ons technology on Watch Purchasers",
      snippet: "In the article we will delve deeper into Augmented Reality (AR) technology for watch benefits and why luxury brands were among the first to adopt virtual try-on technology for watches. Why brands should invest in fashion technologies and the future implications of AR virtual try-ons on the luxury watch industry.",
      date: new Date(Date.parse('2023-4-29')),
      image: {
        src: "https://thumb.tildacdn.com/tild3031-3338-4264-a234-656432613362/-/cover/560x300/center/center/-/format/webp/Frame_20864.png",
        alt: "A 3D watch.",
        width: 560,
        height: 300,
      },
    },
    {
      id: 4,
      title: "Virtual Try-On Technology for the Luxury Industry: How It Works, Benefits & Challenges",
      snippet: "Augmented reality (AR) is the new big thing in luxury fashion retail, providing customers with a true-to-life experience of their clothes before even setting eyes on them in person. But how does virtual try-on technology actually work, what advantages are there for both retailers and customers, and what challenges still need to be overcome?",
      date: new Date(Date.parse('2023-4-11')),
      image: {
        src: "https://thumb.tildacdn.com/tild3632-3363-4565-a632-333765356433/-/cover/560x300/center/center/-/format/webp/2_8.png",
        alt: "A 3D watch.",
        width: 560,
        height: 300,
      },
    },
    {
      id: 5,
      title: "The Future of Luxury Fashion Retail: Trends for 2023",
      snippet: "With recovery still slow post-pandemic, what opportunities are there in AR technology, consumer behavior, and sustainability that fashion retailers can seize to drive growth this year? In this article, we’re looking at the opportunities available to the luxury fashion industry in 2023.",
      date: new Date(Date.parse('2023-3-23')),
      image: {
        src: "https://thumb.tildacdn.com/tild3738-3736-4234-b034-336566343861/-/cover/560x300/center/center/-/format/webp/tiko-giorgadze-nBerk.jpeg",
        alt: "A 3D watch.",
        width: 560,
        height: 300,
      },
    },
    {
      id: 6,
      title: "How AR is Changing the Shopping Experience",
      snippet: "Here's how AR is revolutionizing shopping as we know it.",
      date: new Date(Date.parse('2021-8-27')),
      image: {
        src: "https://thumb.tildacdn.com/tild3738-6563-4236-b063-353639313632/-/cover/560x300/center/center/-/format/webp/Frame_20863.png",
        alt: "A 3D watch.",
        width: 560,
        height: 300,
      },
    },
    {
      id: 7,
      title: "Gen Z & Shopping: What's Changing?",
      snippet: "Retail is evolving at a rapid pace. Here's how Gen Z is shaping the future of shopping and what you can do about it.",
      date: new Date(Date.parse('2021-7-28')),
      image: {
        src: "https://thumb.tildacdn.com/tild3935-3434-4132-b661-396334366631/-/cover/560x300/center/center/-/format/webp/Frame_20868.png",
        alt: "A 3D watch.",
        width: 560,
        height: 300,
      },
    },
  ]

  return (
    <main className="flex flex-col items-center py-10 gap-10">
      <h1>Blog</h1>
      <section className="flex flex-col lg:grid grid-cols-2 gap-4">
        {
          blogs.map(blog => (
            <Link className="h-full" key={blog.id} href={`/blog/${blog.id}`}>
              <Card className="h-full">
                <CardHeader className="gap-2">
                  <Image
                    src={blog.image.src}
                    alt={blog.image.alt}
                    height={blog.image.height}
                    width={blog.image.width}
                    className="object-cover rounded-[1rem] aspect-video"
                  />
                  <p className="text-sm">
                    {blog.date.toDateString()}
                  </p>
                  <CardTitle>
                    {blog.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {blog.snippet}
                </CardContent>
              </Card>
            </Link>
          ))
        }
      </section>
    </main>
  );
}
 
export default Blog;