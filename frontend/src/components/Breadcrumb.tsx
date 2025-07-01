import { Breadcrumb, BreadcrumbProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppBreadcrumb() {
  const pathname = usePathname();

  const pathSegments = (pathname || "")
    .split("/")
    .filter((segment) => segment.length > 0);

  const breadcrumbItems: BreadcrumbProps['items'] = [
    {
      title: <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>,
    },
    ...pathSegments
      .filter((segment) => segment.toLowerCase() !== "edit")
      .map((segment, index) => {
        const href = "/" + pathSegments.slice(0, index + 1).join("/");
        const isLast = index === pathSegments.length - 1;

        const label = segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

        return {
          title: isLast ? (
            <span className="font-semibold text-gray-700">{decodeURIComponent(label.replace("_", " "))}</span>
          ) : (
            <Link href={href} className="text-blue-600 hover:text-blue-800">
              {decodeURIComponent(label)}
            </Link>
          ),
        };
      }),
  ];

  return (
    <Breadcrumb
      items={breadcrumbItems}
      separator="/"
      className="text-base py-2"
    />
  );
}