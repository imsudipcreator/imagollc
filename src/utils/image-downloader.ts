export const downloadImage = (imageUrl: string) => {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imageUrl;
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx?.drawImage(img, 0, 0);

    const watermark = new Image();
    watermark.crossOrigin = "anonymous";
    watermark.src = "https://res.cloudinary.com/sudipbackend/image/upload/v1753113462/imago-logo_1_vdikq5.webp";
    watermark.onload = () => {
      const scale = 0.1;
      const watermarkWidth = canvas.width * scale;
      const watermarkHeight =
        (watermark.height / watermark.width) * watermarkWidth;

      const padding = 20;
      const x = canvas.width - watermarkWidth - padding;
      const y = canvas.height - watermarkHeight - padding;

      ctx!.globalAlpha = 0.5;
      ctx?.drawImage(watermark, x, y, watermarkWidth, watermarkHeight);
      ctx!.globalAlpha = 1.0;

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "imago-generated-image.png";
      link.click();
    };

    watermark.onerror = (e) => {
      console.error("Watermark load failed:", e);
      alert("Failed to load watermark image");
    };
  };

  img.onerror = (e) => {
    console.error("Image load failed:", e);
    alert("Failed to load image");
  };
};
