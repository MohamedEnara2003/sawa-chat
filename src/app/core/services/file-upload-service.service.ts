import { Injectable } from '@angular/core';
import { from, map, Observable, switchMap, throwError } from 'rxjs';
import imageCompression from 'browser-image-compression';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  compressAndPreview(file: File): Observable<{ compressedFile: File; fileName: string; previewUrl: string | ArrayBuffer | null }> {
    const maxFileSizeWithoutCompression = 300 * 1024;

    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      return throwError(() => new Error('Only image files are allowed.'));
    }

    const compressOrUseOriginal = (fileToUse: File) =>
      this.readFileAsDataURL(fileToUse).pipe(
        map((previewUrl) => {
          const fileName = `${Date.now()}_${this.sanitizeFileName(fileToUse.name)}`;
          return { compressedFile: fileToUse, previewUrl, fileName };
        })
      );

    if (file.size > maxFileSizeWithoutCompression) {
      const options = {
        maxSizeMB: 0.9,
        maxWidthOrHeight: 1024,
      };
      return from(imageCompression(file, options)).pipe(
        switchMap((compressedFile) => compressOrUseOriginal(compressedFile))
      );
    } else {
      return compressOrUseOriginal(file);
    }
  }
  private readFileAsDataURL(file: File): Observable<string | ArrayBuffer | null> {
    return new Observable((observer) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        observer.next(reader.result);
        observer.complete();
      };

      reader.onerror = (error) => {
        observer.error(error);
      };
      reader.readAsDataURL(file);
    });
  }
  
  private sanitizeFileName(fileName: string): string {
    return fileName.replace(/[^\w.]+/g, '_');
  }
}
