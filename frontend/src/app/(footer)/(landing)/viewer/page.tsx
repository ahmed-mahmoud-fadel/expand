import { Button } from "@/components/ui/button";
import Link from "next/link";
import ModelViewer from "@/components/ModelViewer";

const Viewer = () => {
  return (
    <main className="py-12">
      <section className="text-lg md:text-2xl flex flex-col lg:grid grid-cols-2 text-center bg-secondary rounded-[1rem] overflow-clip">
        <div className="flex flex-col justify-evenly p-5">
          <h3 className="mb-4">3D Viewer</h3>
          <p>Showcase your iconic watches, footwear or glasses in an engaging way with our new 3D Viewer. Let customers explore the details from every angle and get a better understanding of the details and texture of the product as if they had it in their hands.</p>
          <Link href="/signup" className="my-4">
            <Button className="text-white font-bold">Get Started</Button>
          </Link>
        </div>
        <ModelViewer model="/model/glasses 1.glb" className="w-full h-full" />
      </section>
    </main>
  );
}
 
export default Viewer;