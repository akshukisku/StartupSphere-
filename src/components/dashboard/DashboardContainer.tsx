interface DashboardContainerProps {
  children: React.ReactNode;
}

const DashboardContainer = ({
  children,
}: DashboardContainerProps) => {
  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-8">
        {children}
      </div>
    </div>
  );
};

export default DashboardContainer;