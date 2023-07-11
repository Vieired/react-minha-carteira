export const encodeToBase64 = (item: any) => btoa(item);

export const decodeBase64 = (item: any) => atob(item);

export async function encodeFileToBase64(
  file: File
): Promise<string | undefined> {
  const reader = new FileReader();

  reader.readAsDataURL(file as Blob);

  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result as any);
    reader.onerror = error => reject(error);
  });
}

export function decodeBase64ToFile(dataurl: any, filename: any): File | null {
  if (!dataurl) {
    return null;
  }

  const arr = dataurl.split(',');

  if (!arr[0]) {
    return null;
  }

  // const mime = arr[0].match(/:(.*?);/)[0];
  const bstr = atob(arr[0]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, {
    //  type: mime
    type: filename
  });
}
