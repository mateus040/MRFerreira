interface BreadCrumbProps {
  history: Page[];
}

export interface Page {
  name: string;
  link: string;
}

export default function BreadCrumb({ history }: BreadCrumbProps) {
  return (
    <>
      <div className="flex flex-wrap items-center">
        {history.map((page, index) => (
          <a
            key={index}
            href={page.link}
            className={`${
              page === history[history.length - 1]
                ? "text-black"
                : "text-slate-500"
            } no-underline flex font-semibold`}
          >
            {page.name.toUpperCase()}
            {page !== history[history.length - 1] && (
              <p className="text-black m-0 mx-2 font-semibold">•</p>
            )}
          </a>
        ))}
      </div>
    </>
  );
}
