import NextHead from "next/head";
import React from "react";

type HeadProps = {
  title?: string;
  description?: string | null;
  keywords?: string;
  image?: string;
  canonicalLink?: string;
};

const Head: React.FC<HeadProps> = ({
  title,
  description,
  keywords,
  image,
  canonicalLink,
}) => {
  return (
    <>
      <NextHead>
        <title>{title} | Aseel</title>
        <meta name="name" content={title} />
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
        {image && <meta name="image" content={image} />}
        <link
          rel="icon"
          href="https://aseel-medusa.s3.us-east-1.amazonaws.com/images/file_01HN0C52KN787BZA1EE10GQGM3.svg"
        />
        <meta property="og:title" content={title || "DirectAid Beta"} />
        <meta
          property="og:description"
          content={description || "Experience transparent aid delivery"}
        />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content="AseelApp" key="ogsitename" />

        {/* twitter open graph */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ASEELApp" />
        <meta name="twitter:creator" content="@ASEELApp" />
        <meta name="twitter:title" content={title || "Aseel DirectAid Beta"} />
        <meta
          name="twitter:description"
          content={description || "Experience transparent aid delivery"}
        />
        <meta name="twitter:image" content={image} />
        <link rel="canonical" href={`${canonicalLink}`} />
      </NextHead>
    </>
  );
};

export default Head;
