import { Helmet } from "react-helmet-async";

type Props = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
};
export default function SEO({
  title = "TD Studios — Design, Dev, Packaging",
  description = "Premium websites, product packaging, and creator systems by TD Studios.",
  url = "https://tdstudiosdigital.com",
  image = "/og-default.jpg",
}: Props) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="theme-color" content="#0b0b0c" />
    </Helmet>
  );
}
