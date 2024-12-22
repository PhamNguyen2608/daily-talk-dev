import Main from "@/components/main/Main";
import ReduxTest from "@/components/ReduxTest";
export default function Home() {

  return (
    <div>
      <main >
        <Main />
        <ReduxTest />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
