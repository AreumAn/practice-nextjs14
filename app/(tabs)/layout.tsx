import TabBar from "@/app/components/tab-bar";
import TopLogo from "@/app/components/top-logo";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <TopLogo />
      <div className="py-24 px-4">
        {children}
      </div>
      <TabBar />
    </>
  )
}
