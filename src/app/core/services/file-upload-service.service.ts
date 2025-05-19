import { Injectable } from "@angular/core";
import { catchError, finalize, from, map, Observable, throwError } from "rxjs";

export interface ImageConversionOptions {
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  forceResize?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {
  private readonly DEFAULT_QUALITY = 0.7;
  private readonly DEFAULT_MAX_WIDTH = 1080;
  private readonly DEFAULT_MAX_HEIGHT = 1350;

  compressAndPreview(
    originalFile: File,
    options: ImageConversionOptions = {}
  ): Observable<{ compressedFile: File; fileName: string; previewUrl: string | ArrayBuffer | null }> {
    const quality = options.quality ?? this.DEFAULT_QUALITY;
    const maxWidth = options.maxWidth ?? this.DEFAULT_MAX_WIDTH;
    const maxHeight = options.maxHeight ?? this.DEFAULT_MAX_HEIGHT;
    const forceResize = options.forceResize ?? false;

    if (!originalFile.type.startsWith('image/')) {
      return throwError(() => new Error('Only image files are supported.'));
    }

    const promise = new Promise<File>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();

        img.onload = () => {
          try {
            const { width, height } = this.calculateDimensions(
              img.width,
              img.height,
              maxWidth,
              maxHeight,
              forceResize
            );

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d', { alpha: false });
            if (!ctx) return reject(new Error('Failed to get canvas context'));

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const webpFile = new File([blob], originalFile.name.replace(/\.\w+$/, '.webp'), {
                    type: 'image/webp'
                  });
                  resolve(webpFile);
                } else {
                  reject(new Error('Failed to convert image to WebP'));
                }
              },
              'image/webp',
              quality
            );
          } catch (error) {
            reject(error);
          }
        };

        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = reader.result as string;
      };

      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(originalFile);
    });

    return from(promise).pipe(
      map((compressedFile: File) => {
        const fileName = `${Date.now()}_${this.sanitizeFileName(compressedFile.name)}`;
        const previewUrl = URL.createObjectURL(compressedFile);
        return { compressedFile, fileName, previewUrl };
      }),
      catchError((error) => {
        console.error('Image compression error:', error);
        return throwError(() => new Error('Image compression failed.'));
      })
    );
  }

  private calculateDimensions(
    originalWidth: number,
    originalHeight: number,
    maxWidth: number,
    maxHeight: number,
    forceResize: boolean
  ): { width: number; height: number } {
    let width = originalWidth;
    let height = originalHeight;

    if (forceResize || width > maxWidth) {
      height = (maxWidth * height) / width;
      width = maxWidth;
    }

    if (forceResize || height > maxHeight) {
      width = (maxHeight * width) / height;
      height = maxHeight;
    }

    return { width: Math.round(width), height: Math.round(height) };
  }

  private sanitizeFileName(fileName: string): string {
    return fileName.replace(/[^\w.]+/g, '_');
  }
}
