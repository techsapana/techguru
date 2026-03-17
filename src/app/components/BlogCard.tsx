import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  imageSrc?: string;
  href?: string;
  linkLabel?: string;
}

const BlogCard = ({
  title,
  imageSrc,
  href = "#",
  linkLabel = "Read Blog",
}: BlogCardProps) => {
  return (
    <div className="group w-full max-w-70 sm:max-w-xs rounded-2xl border border-slate-200 bg-white/95 shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="relative h-44 bg-sky-50 overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 320px"
          />
        ) : (
          <div className="w-full h-full bg-slate-100" aria-hidden="true" />
        )}
      </div>

      <div className="p-5">
        <h3 className="text-base md:text-lg font-semibold text-slate-900 leading-snug line-clamp-2 min-h-12">
          {title}
        </h3>
        <Link
          href={href}
          className="mt-3 inline-flex items-center text-sm font-semibold text-sky-600 hover:text-sky-700 hover:underline"
        >
          {linkLabel}
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
