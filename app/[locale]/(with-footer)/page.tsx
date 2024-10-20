import { Button } from "@/components/ui/button";
import Translation from "@/components/translation";
import Compo from "@/components/compo";

export default function Home() {
  return (
    <main className="container-box">

      <Button>
        <Translation translationKey="no_driver" />
      </Button>

      <Compo />
    </main>
  );
}
