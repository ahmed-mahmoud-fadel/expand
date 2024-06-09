import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  const modelCards: {
    title: string,
    content: string,
    video: string,
    path: string,
  }[] = [
    {
      title: "Glasses",
      content: "Experience a seamless and realistic virtual try-on, exploring our stylish glasses frames in detail. From classic to contemporary designs, adjust the fit, and find the perfect pair that suits your unique style—all from the comfort of your device.",
      video: "/video/glasses.mp4",
      path: "glasses"
    },
    {
      title: "Watches",
      content: "Provide your customers with a realistic 'try-before-you-buy' experience, allowing them to understand the sizing, details, and fit of your iconic timepieces as if they had it on their hand. Our markerless technology and animated clock hands deliver a premium user experience.",
      video: "/video/watches.mp4",
      path: "watches"
    },
    {
      title: "Shoes",
      content: "Showcase the brand's sneakers, boots, loafers, sandals, and other footwear styles in an engaging way with 3D and AR experiences. Provide customers with an opportunity to explore design features such as eye-catching soles or metallic embellishments.",
      video: "/video/footwear.mp4",
      path: "shoes"
    }
  ]

  return (
    <main className="flex flex-col gap-10">
      <section className="flex flex-col gap-12 py-16 text-center">
        <h1>Digital Transformation Expert for Luxury Brands</h1>
        <p className="subheading">
          We empower brands on their 3D journey,
          implementing cutting-edge 3D and AR technologies
          to enhance business outcomes across the entire
          fashion value chain.
        </p>
        <div className="flex flex-col md:flex-row gap-5 justify-center">
          <Link href="/demo">
            <Button variant="secondary" className="w-full">Try a demo!</Button>
          </Link>
          <Link href="#contact">
            <Button className="text-white w-full font-bold">Get started</Button>
          </Link>
        </div>
      </section>

      <section className="flex flex-col lg:grid grid-cols-3 gap-10">
        {
          modelCards.map(card => (
            <Card key={card.path} className="flex flex-col">
              <CardHeader className="flex flex-col gap-3">
                <video className="rounded-t-[3rem]" src={card.video} controls={false} autoPlay loop muted />
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                {card.content}
              </CardContent>
              <CardFooter>
                <Link href={`/demo/${card.path}`}><Button variant="secondary">Try it out!</Button></Link>
              </CardFooter>
            </Card>
          ))
        }
      </section>

      <section className="flex flex-col gap-5 text-lg">
        <h2>Solutions</h2>
        <div className="flex flex-col lg:grid grid-cols-2 gap-5">

          <Card>
            <CardHeader>
              <CardTitle>
                Digital Marketing & 3D Advertising
              </CardTitle>
              <CardContent>
                <ul className="list-disc">
                  <li>
                    Engage your customers by interactively showcasing the new collection with immersive web experiences (virtual try-on, 3D viewer, 3D elements incorporated into website).
                  </li>
                  <li>
                    Save on your budget by supporting your launch with additional photo/video content generated from 3D.
                  </li>
                  <li>
                    Promote via social media promotion (Facebook, Instagram, Snapchat, and TikTok).
                  </li>
                  <li>
                    Use 3D ads for paid media.
                  </li>
                </ul>
              </CardContent>
            </CardHeader>
          </Card>

          <Card className="flex justify-center items-end">
            <video
              src="/video/showcase-1.mp4"
              className="h-96 rounded-t-[3rem]"
              autoPlay
              muted
              loop
            />
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Distribution, Sales & E-commerce
              </CardTitle>
              <CardContent>
                <ul className="list-disc">
                  <li>
                    Create personalized experience in-store with virtual try-on mirrors and stations.
                  </li>
                  <li>
                    Allow customers to explore products in detail, increasing confidence in their online purchasing decisions.
                  </li>
                </ul>
              </CardContent>
            </CardHeader>
          </Card>

          <div className="flex gap-5 h-80">
            <div className="rounded-[1rem] bg-gradient-to-b from-secondary flex-1 flex flex-col">
              <div className="w-full h-1/2 bg-secondary rounded-[1rem] shadow-xl p-3">
                <p className="w-3/4">Conversion rates increase</p>
                <p className="text-end md:text-7xl text-5xl">9%</p>
              </div>
            </div>
            <div className="rounded-[1rem] bg-gradient-to-t from-secondary flex-1 flex flex-col-reverse">
              <div className="w-full h-1/2 bg-secondary rounded-[1rem] shadow-xl p-3">
                <p className="w-3/4">Returns rates decrease</p>
                <p className="text-end md:text-7xl text-5xl">4%</p>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                Innovations
              </CardTitle>
              <CardContent>
                <ul className="list-disc">
                  <li>
                    Streamline the development process, allowing for faster iterations, reduced production costs, and shorter time-to-market.
                  </li>
                  <li>
                    Promote sustainability: 3D and AR technologies contribute to eco-friendly practices by reducing the need for physical samples, optimizing production processes, and minimizing product returns due to better-informed purchasing decisions.
                  </li>
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>
                Creative Operations
              </CardTitle>
              <CardContent>
                <ul className="list-disc">
                  <li>
                    Convert 3D models to 2D images or videos for e-commerce listings and marketing content and enjoy flexibility, cost savings, and creative freedom, resulting in a more efficient and effective product presentation.
                  </li>
                  <li>
                    3D and AR enable designers to experiment with new materials, shapes, and textures without wasting time and money on producing the real models.
                  </li>
                </ul>
              </CardContent>
            </CardHeader>
          </Card>

        </div>
      </section>
    </main>
  )
}