import React from "react";
import { AuthPage } from "@/components/AuthPage";

// TD Linkage page
const MbDesigns = () => {
  // Card logo (centered inside card) - TD USA flag logo
  const logo = "/images/TD FLAG USA.png";

  // Bouncing background logo (desktop only) - using TD images
  const bounce = ["/images/TD FLAG USA.png", "/images/TD FLAG USA.png"];

  // TD Linkage slideshow images for the bottom image box (3 images)
  const tdLinkageImages = [
    "/tdlinkage-slide1.png",
    "/tdlinkage-slide2.jpg",
    "/tdlinkage-slide3.png",
  ];

  // Use first image as default, slideshow will cycle through all
  const promoImage = tdLinkageImages[0];

  // Set page background - using diamond background
  const bg = "/diamond-bg.jpg";

  // Custom buttons for TD Linkage (no URLs - no embedded links)
  const customButtons = [
    { label: "TD WEBSITE", url: "" },
    { label: "DESIGNS", url: "" },
    { label: "CONTACT", url: "" },
  ];

  return (
    <AuthPage
      brandLogoSrc={logo}
      bounceSrc={bounce}
      showBounceOnMobile={false}
      hideExtraButtons
      hideAuthForm
      extraImageSrc={promoImage}
      bgImageSrc={bg}
      slideshowImages={tdLinkageImages}
      slideshowInterval={1500}
      customButtons={customButtons}
      mainImageSrc={logo}
    />
  );
};

export default MbDesigns;
