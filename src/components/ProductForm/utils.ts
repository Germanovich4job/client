export const readImageAsBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = event => resolve(event.target.result.toString());
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};
