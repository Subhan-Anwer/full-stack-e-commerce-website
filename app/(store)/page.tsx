import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className="bg-slate-300 p-9 flex items-center justify-center flex-col gap-3" >
      <h1>Hello world!!!</h1>
      <Button className="active:scale-90 transition-transform duration-200">Click me</Button>
    </div>
  );
}
