
export const svgToBase64 = (svg: any) => {
    const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(svgBlob);
    });
};