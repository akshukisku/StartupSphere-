import StartupDetails from "@/layout/investor/StartupDetails";


interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return <StartupDetails startupId={id} />;
};

export default Page;