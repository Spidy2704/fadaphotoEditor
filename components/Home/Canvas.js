import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function OverlayPage({ avatarValue, name, activeOverlay }) {
  const canvasRef = useRef(null);
  const downloadRef = useRef(null);
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const filename = avatarValue.split("/").pop();

  useEffect(() => {
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
      });
    };

    const drawOverlay = async () => {
      const faceImage = await loadImage(avatarValue);
      let glassImage = null;

      if (activeOverlay) {
        glassImage = await loadImage(activeOverlay);
      }

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Set canvas size to match the face image
      canvas.width = faceImage.width;
      canvas.height = faceImage.height;

      // Draw the face image on the canvas
      context.drawImage(faceImage, 0, 0);

      if (glassImage) {
        // Calculate the position and size of the glass overlay
        const overlayWidth = faceImage.width * 1; // Adjust the scale as needed
        const overlayHeight = overlayWidth * (glassImage.height / glassImage.width);
        const overlayX = (faceImage.width - overlayWidth) / 2;
        const overlayY = faceImage.height - overlayHeight;

        // Draw the glass overlay on top of the face image
        context.drawImage(glassImage, overlayX, overlayY, overlayWidth, overlayHeight);
      }

      // Update the download link with the full HD image
      downloadRef.current.href = canvas.toDataURL("image/jpeg");
      setIsLoaded(true);
    };

    drawOverlay();
  }, [avatarValue, activeOverlay]);

  return (
    <div
      className={`border lg:sticky lg:top-20 mx-auto border-primary rounded-2xl overflow-clip ${
        isLoaded ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
    >
      <canvas
        ref={canvasRef}
        className={`object-contain w-full border ${isLoaded ? "" : "hidden"}`}
      />
      <div className="p-5 backdrop-blur-xl flex justify-between items-center">
        <span className="lg:text-2xl md:text-xl text-lg font-bold text-white">
          Fayden #{router.query.slug}
        </span>
        <a

          ref={downloadRef}
          download={filename}
          className="w-fit"
        >
          <Button variant="contained"  className="bg-primary hover:bg-primary">
            Download
          </Button>
        </a>
      </div>
    </div>
  );
}
